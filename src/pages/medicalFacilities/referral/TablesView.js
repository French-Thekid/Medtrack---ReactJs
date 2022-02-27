import React, { useState } from 'react'
import 'styled-components/macro'
import { useLocation } from 'react-router-dom'
import ReferralsTable from './tables'
import { CreateReferral } from './modal'
import { LIST_REFERRALS, SEARCH_REFERRALS } from './queries'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import {
  Layout,
  MenuNavigation,
  Content,
  Loading,
  Notification,
} from 'components'

const queryString = require('query-string')

export default function Referrals() {
  const { pathname, search } = useLocation()
  const { action } = queryString.parse(search)
  const [completed, setcompleted] = useState(false)

  //Query
  let { loading, error, data } = useQuery(LIST_REFERRALS)
  const [
    searchReferral,
    { loading: loading1, error: error1, data: searchResult },
  ] = useLazyQuery(SEARCH_REFERRALS)
  if (loading || loading1) return <Loading small />
  if (error || error1)
    return <Content.Alert type="error" message={'Failed to load Referrals'} />

  const { listReferrals: searchReferrals } = searchResult || {}
  const { total: searchTotal } = searchReferrals || {}

  if (searchTotal > 0) data = searchResult

  const { listReferrals } = data || {}
  const { to = [], from = [] } = listReferrals || {}

  const referrals = to.concat(from)

  const refinedData =
    referrals.map((value, index) => {
      const { name: status } = value.referralStatus || {}
      if (pathname.includes('openReferrals')) {
        if (status === 'Open') return value
        else return null
      }
      if (pathname.includes('acceptedReferrals')) {
        if (status === 'Accepted') return value
        else return null
      }
      if (pathname.includes('deniedReferrals')) {
        if (status === 'Declined') return value
        else return null
      }
      return value
    }) || []

  const showNotification = () => {
    setcompleted(true)
    setTimeout(() => {
      setcompleted(false)
    }, 6000)
  }
  return (
    <Layout.Container double>
      <MenuNavigation.Container>
        <MenuNavigation.MainItem
          to={`/facility/referrals/tables/allReferrals`}
          active={pathname.includes('allReferrals')}
        >
          All
        </MenuNavigation.MainItem>
        <MenuNavigation.MainItem
          to={`/facility/referrals/tables/openReferrals`}
          active={pathname.includes('openReferrals')}
        >
          Open
        </MenuNavigation.MainItem>
        <MenuNavigation.MainItem
          to={`/facility/referrals/tables/acceptedReferrals`}
          active={pathname.includes('acceptedReferrals')}
        >
          Accepted
        </MenuNavigation.MainItem>
        <MenuNavigation.MainItem
          to={`/facility/referrals/tables/deniedReferrals`}
          active={pathname.includes('deniedReferrals')}
        >
          Declined
        </MenuNavigation.MainItem>
      </MenuNavigation.Container>
      <ReferralsTable
        Data={refinedData.filter(function (el) {
          return el != null
        })}
        searchReferral={searchReferral}
      />
      <Notification
        setcompleted={setcompleted}
        message="E-Referral successfully generated and submitted."
        notification={completed}
      />
      {action === 'createReferral' && (
        <CreateReferral showNotification={showNotification} />
      )}
    </Layout.Container>
  )
}
