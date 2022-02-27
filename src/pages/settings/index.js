import React, { Suspense } from 'react'
import 'styled-components/macro'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

// import ErrorPage from '../ErrorPage'
import Account from './account'
import Facility from './facility'
import Users from './users'
import Roles from './roles'
import ReferralTemplate from './referralTemplate'
import PrescriptionTemplate from './prescriptionTemplate'
import { Layout, Loading } from 'components'
import NotFound from 'pages/NotFound'

export default function Settings() {
  const match = useRouteMatch()

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        overflow-y: auto;
      `}
    >
      <Layout.Container>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path={`${match.url}/account`} component={Account} />
            <Route path={`${match.url}/facility`} component={Facility} />
            <Route path={`${match.url}/users`} component={Users} />
            <Route path={`${match.url}/roles`} component={Roles} />
            <Route
              path={`${match.url}/e-referral-template`}
              component={ReferralTemplate}
            />
            <Route
              path={`${match.url}/e-prescription-template`}
              component={PrescriptionTemplate}
            />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Layout.Container>
    </div>
  )
}
