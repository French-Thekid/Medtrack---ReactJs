import React, { Suspense, useState } from 'react'
import 'styled-components/macro'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Loading, Notification } from 'components'

import NotFoundPage from 'pages/NotFound'
import { Layout, Patient } from 'components'
import Overview from './Overview'
import Appointemnts from './appointments'
import Record from './record'
import Doctors from './doctors'
import EPrescription from './prescription'
import ERefferal from './referrals'
import Notes from './notes'
import Billing from './billing'
import { EditPatientModal, Unsubscribed } from '../modals'
import { NewNote } from './notes/modal'
import { LifeStatus } from './modals'

const queryString = require('query-string')

export default function PatientRoutes() {
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const [completedEditAccount, setcompletedEditAccount] = useState(false)
  const [completedRemoveAccount, setcompletedRemoveAccount] = useState(false)
  const [completedNote, setcompletedNote] = useState(false)

  const showNotificationEdit = () => {
    setcompletedEditAccount(true)
    setTimeout(() => {
      setcompletedEditAccount(false)
    }, 6000)
  }
  const showNotificationRemoveAccount = () => {
    setcompletedRemoveAccount(true)
    setTimeout(() => {
      setcompletedRemoveAccount(false)
    }, 6000)
  }
  const showNotificationNote = () => {
    setcompletedNote(true)
    setTimeout(() => {
      setcompletedNote(false)
    }, 6000)
  }

  return (
    <Layout.Container>
      <div
        css={`
          display: grid;
          grid-template-rows: max-content 1fr;
          grid-row-gap: 10px;
          height: 100%;
        `}
      >
        <Route
          path={`/facility/patient/:section/:patientId`}
          component={Patient.Panel}
        />
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              path={`/facility/patient/overview/:patientId`}
              component={Overview}
            />
            <Route
              path={`/facility/patient/appointments/:patientId`}
              component={Appointemnts}
            />
            <Route
              path={`/facility/patient/record/:patientId`}
              component={Record}
            />
            <Route
              path={`/facility/patient/doctors/:patientId`}
              component={Doctors}
            />
            <Route
              path={`/facility/patient/e-prescriptions/:patientId`}
              component={EPrescription}
            />
            <Route
              path={`/facility/patient/e-referrals/:patientId`}
              component={ERefferal}
            />
            <Route
              path={`/facility/patient/notes/:patientId`}
              component={Notes}
            />
            <Route
              path={`/facility/patient/billing/:patientId`}
              component={Billing}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
        <Notification
          setcompleted={setcompletedEditAccount}
          message="Patient account successfully updated."
          notification={completedEditAccount}
        />
        <Notification
          setcompleted={setcompletedRemoveAccount}
          message="Patient account successfully removed."
          notification={completedRemoveAccount}
        />
        <Notification
          setcompleted={showNotificationNote}
          message="Note successfully attached."
          notification={completedNote}
        />
        {action === 'editPatient' && (
          <EditPatientModal showNotificationEdit={showNotificationEdit} />
        )}
        {action === 'attachNote' && (
          <NewNote showNotificationNote={showNotificationNote} />
        )}
        {action === 'unSubscribed' && (
          <Unsubscribed
            showNotificationRemoveAccount={showNotificationRemoveAccount}
          />
        )}
        {action === 'LifeStatus' && <LifeStatus />}
      </div>
    </Layout.Container>
  )
}
