import React, { Suspense } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Loading } from 'components'

import NotFoundPage from 'pages/NotFound'
import { Layout } from 'components'
import Dashboard from './dashboard'
import Patients from './patients'
import Appointments from './appointment'
import Referrals from './referral'
import Reports from './report'
import Settings from '../settings'
import Patient from './patients/patient'
import { useQuery } from '@apollo/react-hooks'
import { Content } from 'components'

import { GetCountries, GetPremise } from './patients/queries'

export default function Support() {
  const match = useRouteMatch()

  // Getting and Storing Addessing information need for all address related forms
  if (
    localStorage.getItem('Countries') === null ||
    localStorage.getItem('Countries') === undefined
  ) {
    GetAndStoreAddresses()
  }

  return (
    <Layout.MainContainer type="facility">
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path={`${match.url}/dashboard`} component={Dashboard} />
          <Route path={`${match.url}/patients`} component={Patients} />
          <Route path={`${match.url}/patient`} component={Patient} />
          <Route path={`${match.url}/appointments`} component={Appointments} />
          <Route path={`${match.url}/referrals`} component={Referrals} />
          <Route path={`${match.url}/reports`} component={Reports} />
          <Route path={`${match.url}/settings`} component={Settings} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Layout.MainContainer>
  )
}

function GetAndStoreAddresses() {
  //Query
  const { loading, error, data } = useQuery(GetCountries)
  const { loading: PLoading, error: PError, data: PDate } = useQuery(GetPremise)

  if (loading || PLoading) return null
  if (error || PError)
    return <Content.Alert type="error" message={'Failed to get Addresses'} />

  function _delete(obj, prop) {
    if (obj[prop] && !obj[prop].length) delete obj[prop]
  }
  const neededCountries = data.listCountries
    .map((country, index) => {
      if (
        country.id === 54 ||
        country.id === 124 ||
        country.id === 244 ||
        country.id === 245
      ) {
        _delete(country, '__typename')
        return country
      }
      return null
    })
    .filter((item, index) => item !== null)

  localStorage.setItem('Countries', JSON.stringify(neededCountries))
  localStorage.setItem('Canada', JSON.stringify(PDate.Canada))
  localStorage.setItem('Jamaica', JSON.stringify(PDate.Jamaica))
  localStorage.setItem('United States', JSON.stringify(PDate.US))
  localStorage.setItem('United Kingdom', JSON.stringify(PDate.UK))
}
