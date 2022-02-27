import React, { useState } from 'react'
import 'styled-components/macro'
import {
  Layout,
  MenuNavigation,
  Loading,
  Content,
  Notification,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { useLocation, useRouteMatch } from 'react-router-dom'
import {
  MyPatientsTable,
  PatientRecentlyAdded,
  AllPatientsTable,
  GlobalPatientsTable,
} from './tables'
import {
  NewPatientModal,
  Unsubscribed,
  EditPatientModal,
  RequestAccess,
} from './modals'
import { LIST_PATIENTS, SEARCH_PATIENTS } from './queries'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import moment from 'moment'

const queryString = require('query-string')

export default function Patients() {
  const { pathname, search } = useLocation()
  const { action } = queryString.parse(search)
  const match = useRouteMatch()
  const [completedCreate, setcompletedCreate] = useState(false)
  const [completedEdit, setcompletedEdit] = useState(false)
  const [completedDelete, setcompletedDelete] = useState(false)
  const [completedRequest, setcompletedRequest] = useState(false)

  const user = JSON.parse(localStorage.getItem('user')) || {}

  //Query
  let { loading, error, data: patients } = useQuery(LIST_PATIENTS)
  const [
    searchPatient,
    { loading: loading1, error: error1, data: searchResult },
  ] = useLazyQuery(SEARCH_PATIENTS)

  if (loading || loading1) return <Loading small />
  if (error || error1)
    return <Content.Alert type="error" message={'Failed to load Patients'} />

  const { listPatients } = searchResult || {}
  const { total: searchTotal } = listPatients || {}

  if (searchTotal > 0) patients = searchResult

  //Filtering Data for respective tables
  const FiveDaysBeforeToday = new Date(moment().subtract(5, 'days'))
  const MyPatients = patients.listPatients.data
    .map((patient, index) => {
      const { createdByUser } = patient || {}
      const { id: CID } = createdByUser || {}
      if (CID === user.id) return patient
      return null
    })
    .filter((item, index) => item !== null)

  const recentPatients = patients.listPatients.data
    .map((patient, index) => {
      const { createdAt } = patient || {}
      if (new Date(parseInt(createdAt)) >= FiveDaysBeforeToday) return patient
      return null
    })
    .filter((item, index) => item !== null)

  const showNotificationCreate = () => {
    setcompletedCreate(true)
    setTimeout(() => {
      setcompletedCreate(false)
    }, 6000)
  }
  const showNotificationEdit = () => {
    setcompletedEdit(true)
    setTimeout(() => {
      setcompletedEdit(false)
    }, 6000)
  }
  const showNotificationDelete = () => {
    setcompletedDelete(true)
    setTimeout(() => {
      setcompletedDelete(false)
    }, 6000)
  }
  const showNotificationRequest = () => {
    setcompletedRequest(true)
    setTimeout(() => {
      setcompletedRequest(false)
    }, 6000)
  }

  return PermissionCheck({ feature: 'Patient', action: 'READ' }) ? (
    <Layout.Container double>
      <MenuNavigation.Container>
        <MenuNavigation.MainItem
          to={`${match.url}/myPatient`}
          active={pathname.includes('myPatient')}
        >
          My Patients
        </MenuNavigation.MainItem>
        <MenuNavigation.MainItem
          to={`${match.url}/allPatients`}
          active={pathname.includes('allPatients')}
        >
          All Patients
        </MenuNavigation.MainItem>
        <MenuNavigation.MainItem
          to={`${match.url}/recentPatients`}
          active={pathname.includes('recentPatients')}
        >
          Patients Recently Added
        </MenuNavigation.MainItem>
        <MenuNavigation.MainItem
          to={`${match.url}/globalPatients`}
          active={pathname.includes('globalPatients')}
        >
          Global Patients
        </MenuNavigation.MainItem>
      </MenuNavigation.Container>
      <Notification
        setcompleted={setcompletedCreate}
        message="New Patient account successfully created."
        notification={completedCreate}
      />
      <Notification
        setcompleted={setcompletedEdit}
        message="Patient account successfully updated."
        notification={completedEdit}
      />
      <Notification
        setcompleted={setcompletedDelete}
        message="Patient account successfully removed."
        notification={completedDelete}
      />
      <Notification
        setcompleted={setcompletedRequest}
        message="Your access request has been submitted."
        notification={completedRequest}
      />

      {pathname.includes('myPatient') && (
        <MyPatientsTable
          data={MyPatients}
          searchPatient={searchPatient}
          showNotificationDelete={showNotificationDelete}
        />
      )}
      {pathname.includes('recentPatients') && (
        <PatientRecentlyAdded
          data={recentPatients}
          searchPatient={searchPatient}
          showNotificationDelete={showNotificationDelete}
        />
      )}
      {pathname.includes('allPatients') && (
        <AllPatientsTable
          data={patients.listPatients.data}
          searchPatient={searchPatient}
          showNotificationDelete={showNotificationDelete}
        />
      )}
      {pathname.includes('globalPatients') && <GlobalPatientsTable />}
      {action === 'createPatient' && (
        <NewPatientModal showNotificationCreate={showNotificationCreate} />
      )}
      {action === 'editPatient' && (
        <EditPatientModal showNotificationEdit={showNotificationEdit} />
      )}
      {action === 'requestPatient' && (
        <RequestAccess showNotificationRequest={showNotificationRequest} />
      )}
      {action === 'deletePatient' && (
        <Unsubscribed showNotificationRemoveAccount={showNotificationDelete} />
      )}
    </Layout.Container>
  ) : (
    <Layout.Container>
      <RestrictedAccess />
    </Layout.Container>
  )
}
