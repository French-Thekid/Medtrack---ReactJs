import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { UNSUBSCRIBE } from '../mutations'
import { LIST_PATIENTS } from '../queries'
import { Table } from 'components'

export default function MyPatientTable({
  showNotificationDelete,
  data,
  searchPatient,
}) {
  const history = useHistory()

  const [deletePatient, { loading, error: deletePatientFailed }] = useMutation(
    UNSUBSCRIBE,
    {
      refetchQueries: () => [
        {
          query: LIST_PATIENTS,
        },
      ],
      onCompleted(deletePatient) {
        showNotificationDelete()
      },
    }
  )
  // eslint-disable-next-line

  const HeaderData = [
    'Avatar',
    'Name',
    'TRN',
    'Gender',
    'Date of Birth',
    'Status',
    'Created By',
  ]

  const RowData = data.map(
    (
      {
        id,
        person: {
          avatar,
          firstName,
          lastName,
          dob,
          gender,
          trn,
          user,
          id: patientPersonId,
          ...restOfPerson
        },
        createdByUser,
        ...restofPatient
      },
      index
    ) => {
      const {
        person,
        firstName: CFirstName,
        lastName: CLastName,
        type,
      } = createdByUser || {}
      const { status } = user || {}
      const { title } = person || {}

      const createdByFormat = {
        title,
        type,
        firstName: CFirstName,
        lastName: CLastName,
      }

      return {
        avatar,
        name: `${firstName} ${lastName}`,
        trn,
        gender,
        dateOfBirth: dob ? new Date(parseInt(dob)).toDateString() : '',
        status: status === 'CONFIRMED' ? true : false,
        createdBy: JSON.stringify(createdByFormat),
        id,
        firstName,
        lastName,
        createdByUser,
        dob,
        patientPersonId,
        ...restOfPerson,
        ...restofPatient,
      }
    }
  )

  const DeleteMultipleAction = async (ids) => {
    await deletePatient({
      variables: {
        id: ids,
      },
    }).catch((e) => console.log(e))
    history.goBack()
  }

  const DeleteAction = (data) =>
    history.push(`?action=deletePatient&&patientId=${data.id}`)

  const editAction = (data) => {
    localStorage.setItem('selectedPatient', JSON.stringify(data))
    history.push(`?action=editPatient&&patientId=${data.id}`)
  }

  const handleRowClick = (patientId, data) => {
    localStorage.setItem('selectedPatient', JSON.stringify(data))
    history.push(`/facility/patient/overview/${patientId}`)
  }

  return (
    <Table
      MainButtonpath="?action=createPatient"
      title="Showing Your Patients"
      altTitle="Patients"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`70px repeat(6,1fr)`}
      searchPlaceholder="Search Patients"
      buttonTitle="New Patient"
      searchEnable
      hasAvatar
      checkBoxNeeded
      rowClick={handleRowClick}
      massLoading={loading}
      massError={deletePatientFailed}
      deleteAction={DeleteAction}
      editAction={editAction}
      deleteMultipleAction={DeleteMultipleAction}
      breakingPoint="1153px"
      searchHandler={searchPatient}
    />
  )
}
