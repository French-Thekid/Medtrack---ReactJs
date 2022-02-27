import React, { Suspense } from 'react'
import 'styled-components/macro'
import { Route, Switch } from 'react-router-dom'

import { Loading } from 'components'
import NotFoundPage from 'pages/NotFound'
import Record from './Record'
import { Medicines, Allergies, Files, Diagnosis } from './subPages'

export default function Referrals() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route
          exact
          path={`/facility/patient/record/:patientId`}
          component={Record}
        />
        <Route
          path={`/facility/patient/record/:patientId/medicines`}
          component={Medicines}
        />
        <Route
          path={`/facility/patient/record/:patientId/allergies`}
          component={Allergies}
        />
        <Route
          path={`/facility/patient/record/:patientId/files`}
          component={Files}
        />
        <Route
          path={`/facility/patient/record/:patientId/diagnosis`}
          component={Diagnosis}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}
