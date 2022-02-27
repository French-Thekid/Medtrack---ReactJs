import React, { Suspense } from 'react'
import 'styled-components/macro'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import { Loading } from 'components'
import ReferralsTables from './TablesView'
import NotFoundPage from 'pages/NotFound'
import ViewReferral from './ViewReferral'

export default function Referrals() {
  const match = useRouteMatch()

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route
          path={`${match.url}/tables/:section`}
          component={ReferralsTables}
        />
        <Route
          path={`/facility/referrals/viewReferral/:referralId`}
          component={ViewReferral}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}
