import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import { LIST_ASSOCIATED_PATIENTS } from '../queries'
import { TERMINATE_ASSOCIATION } from '../mutations'
import { Table } from 'components'

export default function ReferralTable({
  data = [],
  searchDoctors,
  searchProps,
}) {
  const {
    params: { patientId },
  } = useRouteMatch()
  const history = useHistory()
  //Mutation
  const [removePatientDoctorRelationship, { loading, error }] = useMutation(
    TERMINATE_ASSOCIATION,
    {
      refetchQueries: () => [
        {
          query: LIST_ASSOCIATED_PATIENTS,
          variables: { id: parseInt(patientId) },
        },
      ],
    }
  )
  const HeaderData = [
    'Avatar',
    'Name',
    'Reg. Number',
    'Specialty',
    'Status',
    'Assigned By',
    'Assigned On',
  ]

  const RowData = data.map(
    (
      {
        doctorsId: id,
        doctor: {
          registrationNumber,
          user: { avatar, firstName, lastName, status, qualifications = [] },
        },
        createdByUser,
        createdAt,
        ...rest
      },
      index
    ) => {
      const { specification } =
        qualifications.length > 0
          ? qualifications[0] !== null
            ? qualifications[0]
            : {}
          : {}
      const {
        person,
        firstName: CFirstName,
        lastName: CLastName,
        type,
      } = createdByUser || {}
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
        registrationNumber,
        specification: specification || 'Not Specified',
        status,
        assignedBy: JSON.stringify(createdByFormat),
        createdOn: new Date(parseInt(createdAt)).toDateString(),
        firstName,
        lastName,
        id,
        ...rest,
      }
    }
  )

  const DeleteAction = (data) => {
    console.log(data)
    history.push(`?action=removeDoctor&Id=${data.id}`)
  }

  const DeleteMultipleAction = async (ids) => {
    let Ids = ids.map((i, j) => parseInt(i))
    await removePatientDoctorRelationship({
      variables: {
        patientId: parseInt(patientId),
        doctors: Ids,
      },
    }).catch((e) => console.log(e))
    history.goBack()
  }

  return (
    <Table
      MainButtonpath="?action=addDoctor"
      title={'Associated Doctors'}
      altTitle="Doctors"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`70px repeat(6,1fr)`}
      searchPlaceholder="Search Doctors"
      buttonTitle="Add Doctor"
      searchEnable
      checkBoxNeeded
      massLoading={loading}
      massError={error}
      deleteAction={DeleteAction}
      hasAvatar
      breakingPoint="1206px"
      searchHandler={searchDoctors}
      searchProps={searchProps}
      deleteMultipleAction={DeleteMultipleAction}
    />
  )
}
