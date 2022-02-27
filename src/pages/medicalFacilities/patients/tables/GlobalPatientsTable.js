import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { Table, Loading, Content } from 'components'

import { LIST_GLOBAL_PATIENTS } from '../queries'
import { useQuery } from '@apollo/react-hooks'
import { OrganisationContext } from 'context'

export default function PatientTable() {
  const history = useHistory()
  const { organizationId: MainOrgID, orgName } = useContext(OrganisationContext)

  //Query
  const { loading, error, data: patients } = useQuery(LIST_GLOBAL_PATIENTS)
  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Failed to load Patients'} />

  const { listGlobalPatients } = patients || {}
  const { data: GlobalPatients = [] } = listGlobalPatients || {}
  // eslint-disable-next-line

  const HeaderData = [
    'Avatar',
    'Name',
    'Gender',
    'Facility',
    'Access',
    'Status',
    'Created By',
  ]

  const FilteredList = GlobalPatients.map((item, index) => {
    const { facilities = [] } = item || {}
    if (facilities.length === 0) return null
    return item
  }).filter((item, i) => item !== null)

  const RowData = FilteredList.map(
    ({ facilities = [], patients: p = [] }, index) => {
      let id = ''
      let MPerson = {}
      let createdByUser = {}
      let restofPatient = ''
      let facName =
        facilities.length > 0
          ? facilities[0] !== null
            ? facilities[0].name
            : ''
          : ''

      const patients = p.filter((item, index) => item !== null)
      patients.map((item, index) => {
        let {
          organizationId,
          person,
          id: innerId,
          createdByUser: innerCreatedByUser,
          ...rest
        } = item || {}

        if (organizationId === MainOrgID) {
          MPerson = person
          id = innerId
          createdByUser = innerCreatedByUser
          restofPatient = { ...rest }
        }
        return null
      })

      if (JSON.stringify(MPerson) === '{}') {
        const {
          organizationId,
          person,
          id: innerId,
          createdByUser: innerCreatedByUser,
          ...rest
        } = patients.length > 0 ? (patients[0] !== null ? patients[0] : {}) : {}
        MPerson = person
        id = innerId
        createdByUser = innerCreatedByUser
        restofPatient = { ...rest }
      }

      let found = false
      facilities.map(({ organizationId, name }) => {
        if (organizationId === MainOrgID) {
          found = true
        }
        return null
      })

      const {
        id: patientPersonId,
        avatar,
        firstName,
        lastName,
        gender,
        user,
        dob,
        ...restOfPerson
      } = MPerson || {}

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
        gender,
        facility: found === true ? orgName : facName,
        access: found === true ? 'Granted' : 'Locked',
        status: status === 'CONFIRMED' ? true : false,
        createdBy: JSON.stringify(createdByFormat),
        id,
        firstName,
        lastName,
        createdByUser,
        patientPersonId,
        dateOfBirth: dob ? new Date(parseInt(dob)).toDateString() : '',
        ...restOfPerson,
        ...restofPatient,
      }
    }
  )

  const editAction = (data) => {
    if (data.access === 'Granted') {
      localStorage.setItem('selectedPatient', JSON.stringify(data))
      history.push(`?action=editPatient&&patientId=${data.id}`)
    }
  }

  const requestAction = (data) => {
    if (data.access === 'Locked') {
      localStorage.setItem('selectedPatient', JSON.stringify(data))
      history.push(`?action=requestPatient&&patientId=${data.id}`)
    }
  }

  const handleRowClick = (patientId, data) => {
    if (data.access === 'Granted') {
      history.push(`/facility/patient/overview/${patientId}`)
      localStorage.setItem('selectedPatient', JSON.stringify(data))
    }
  }

  return (
    <Table
      MainButtonpath="?action=createPatient"
      title="Showing Global Patients"
      altTitle="GlobalPatients"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`70px repeat(6,1fr)`}
      searchPlaceholder="Search Patients"
      buttonTitle="New Patient"
      searchEnable
      hasAvatar
      checkBoxNeeded
      rowClick={handleRowClick}
      massLoading={false}
      massError={false}
      editAction={editAction}
      requestAction={requestAction}
      breakingPoint="1338px"
    />
  )
}
