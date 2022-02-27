import React, { useState } from 'react'
import 'styled-components/macro'
import {
  Core,
  Layout,
  Content,
  Loading,
  MenuNavigation,
  Notification,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import {
  CreateDiagnosis,
  EditDiagnosis,
  DeletDiagnosis,
  ViewSymptoms,
} from './modals'
import { LIST_DIAGNOSIS } from './queries'
import { useQuery } from '@apollo/react-hooks'
import DiagnosisTable from './table'

const queryString = require('query-string')

export default function Index() {
  const [view, setView] = useState('Active')
  const {
    params: { patientId },
  } = useRouteMatch()
  const history = useHistory()
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const [completedDiagnosisCreate, setcompletedDiagnosisCreate] =
    useState(false)
  const [completedDiagnosisEdit, setcompletedDiagnosisEdit] = useState(false)

  //Query
  const { loading, error, data } = useQuery(LIST_DIAGNOSIS, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading Contained />
  if (error)
    return <Content.Alert type="error" message={'Failed to load diagnosis'} />

  const diagnosis = data.listExternalDiagnosis.data || []

  const activeDiagnosis = diagnosis
    .map((diagnosisMain, index) => {
      const { id, diagnosisId, diagnosis, fromOrganizationObject } =
        diagnosisMain || {}
      const { diagnosisStatus } = diagnosis || {}
      const { name: status } = diagnosisStatus || {}
      if (status === 'Active')
        return { id, diagnosisId, diagnosis, fromOrganizationObject }
      return null
    })
    .filter((item, index) => item !== null)
  const ReadPermission = PermissionCheck({
    feature: 'Patient Diagnosis',
    action: 'READ',
  })
  const pastDiagnosis = diagnosis
    .map((diagnosisMain, index) => {
      const { id, diagnosisId, diagnosis, fromOrganizationObject } =
        diagnosisMain || {}
      const { diagnosisStatus } = diagnosis || {}
      const { name: status } = diagnosisStatus || {}
      if (status === 'Past')
        return { id, diagnosisId, diagnosis, fromOrganizationObject }
      return null
    })
    .filter((item, index) => item !== null)

  let DiagnosisData = diagnosis
  if (view === 'Active') DiagnosisData = activeDiagnosis
  else DiagnosisData = pastDiagnosis

  const showNotificationDiagnosisCreate = () => {
    setcompletedDiagnosisCreate(true)
    setTimeout(() => {
      setcompletedDiagnosisCreate(false)
    }, 6000)
  }
  const showNotificationDiagnosisEdit = () => {
    setcompletedDiagnosisEdit(true)
    setTimeout(() => {
      setcompletedDiagnosisEdit(false)
    }, 6000)
  }

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 20px;
      `}
    >
      <Notification
        setcompleted={setcompletedDiagnosisCreate}
        message="Diagnosis Successfully added."
        notification={completedDiagnosisCreate}
      />
      <Notification
        setcompleted={setcompletedDiagnosisEdit}
        message="Diagnosis Successfully updated."
        notification={completedDiagnosisEdit}
      />
      <Layout.TopPanel
        title="Diagnosis"
        to={`/facility/patient/record/${patientId}`}
      >
        <Core.Button
          purpose="major"
          onClick={() => history.push('?action=newDiagnosis')}
        >
          Add New
        </Core.Button>
      </Layout.TopPanel>
      {ReadPermission ? (
        <div
          css={`
            display: grid;
            grid-template-rows: max-content 1fr;
            grid-row-gap: 20px;
            overflow-y: auto;
          `}
        >
          <MenuNavigation.Container>
            <MenuNavigation.MainItem
              alternative={() => setView('Active')}
              active={view === 'Active'}
            >
              Active
            </MenuNavigation.MainItem>
            <MenuNavigation.MainItem
              alternative={() => setView('Past')}
              active={view === 'Past'}
            >
              Past
            </MenuNavigation.MainItem>
          </MenuNavigation.Container>
          <DiagnosisTable data={DiagnosisData} />
        </div>
      ) : (
        <RestrictedAccess small />
      )}
      {action === 'newDiagnosis' && (
        <CreateDiagnosis
          showNotificationDiagnosisCreate={showNotificationDiagnosisCreate}
        />
      )}
      {action === 'updateDiagnosis' && (
        <EditDiagnosis
          showNotificationDiagnosisEdit={showNotificationDiagnosisEdit}
        />
      )}
      {action === 'removeDiagnosis' && <DeletDiagnosis />}
      {action === 'viewSymptoms' && <ViewSymptoms />}
    </div>
  )
}
