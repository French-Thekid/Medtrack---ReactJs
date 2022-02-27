import React, { Suspense } from 'react'
import 'styled-components/macro'
import { Layout, Loading, Content } from 'components'
import ReportTable from './tables'
import { Route, Switch } from 'react-router-dom'
import NotFoundPage from 'pages/NotFound'
import ViewReport from './ViewReport'
import { LIST_REPORT } from './queries'
import { useQuery } from '@apollo/react-hooks'

export default function Reports() {
  //Query
  const { loading, error, data } = useQuery(LIST_REPORT)
  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Failed to load Reports'} />

  const { listReports } = data || {}
  const { data: Data } = listReports || {}

  return (
    <Layout.Container>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route
            exact
            path={`/facility/reports/`}
            render={() => <ReportTable Data={Data} />}
          />
          <Route
            exact
            path={`/facility/reports/viewReport/:reportId`}
            component={ViewReport}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Layout.Container>
  )
}
