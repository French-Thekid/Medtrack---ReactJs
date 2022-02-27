import React, { Suspense } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import { Layout, Loading } from 'components'
import Facility from './facilities'
import Pharmacies from './pharmacies'
import NotFoundPage from 'pages/NotFound'

export default function Support() {
  const match = useRouteMatch()
  return (
    <Layout.MainContainer type="support">
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path={`${match.url}/facilities`} component={Facility} />
          <Route path={`${match.url}/pharmacies`} component={Pharmacies} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Layout.MainContainer>
  )
}
