import React, { Suspense } from 'react'
import 'styled-components/macro'
import { Route, Switch } from 'react-router-dom'

import { Loading } from 'components'
import Calendar from './Calendar'
import ManageEvent from './ManageEvent'
import NotFoundPage from 'pages/NotFound'

export default function Referrals() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route
          exact
          path={`/facility/patient/appointments/:patientId`}
          component={Calendar}
        />
        <Route
          exact
          path={`/facility/patient/appointments/:patientId/updateAppointment/:eventId`}
          component={ManageEvent}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}
