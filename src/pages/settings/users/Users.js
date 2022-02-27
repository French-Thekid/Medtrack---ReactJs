import React, { useState } from 'react'
import 'styled-components/macro'
import { useLocation } from 'react-router-dom'

import UserTable from './table'
import { MenuNavigation, Loading, Content, Notification } from 'components'
import { LIST_USERS, SEARCH_USERS } from './queries'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { DeleteUser, EnableUser, DissociateUser } from './modals'

const queryString = require('query-string')

export default function Users() {
  const { pathname, search } = useLocation()
  const { action } = queryString.parse(search)
  const [completedDelete, setcompletedDelete] = useState(false)
  const [completedSuspended, setcompletedSuspended] = useState(false)
  const [completedEnabled, setcompletedEnabled] = useState(false)

  //Query
  let { loading, error, data: users } = useQuery(LIST_USERS)
  const [
    searchUsers,
    { loading: loading0, error: error0, data: searchResult },
  ] = useLazyQuery(SEARCH_USERS)

  if (loading || loading0) return <Loading small />
  if (error || error0)
    return <Content.Alert type="error" message={'Failed to load Users'} />

  //Handling Seaarch Results
  const { listUsers: searchListUsers } = searchResult || {}
  const { total: searchTotal } = searchListUsers || {}

  if (searchTotal > 0) users = searchResult

  const refinedData =
    users.listUsers.data.map((value, index) => {
      if (pathname.includes('activeUsers')) {
        if (value.enabled) return value
        else return null
      }

      if (pathname.includes('deactivated')) {
        // if (!value.userStatus) return value
        const { userStatus = {} } = value || {}
        const { name = '' } = userStatus || {}
        if (name === 'Disassociated' || name === 'Suspended') return value
        return null
      }
      return value
    }) || []

  const showNotificationDelete = () => {
    setcompletedDelete(true)
    setTimeout(() => {
      setcompletedDelete(false)
    }, 6000)
  }

  const showNotificationSuspend = () => {
    setcompletedSuspended(true)
    setTimeout(() => {
      setcompletedSuspended(false)
    }, 6000)
  }
  const showNotificationEnable = () => {
    setcompletedEnabled(true)
    setTimeout(() => {
      setcompletedEnabled(false)
    }, 6000)
  }

  return (
    <>
      <div
        css={`
          display: grid;
          grid-template-rows: max-content 1fr;
          grid-row-gap: 20px;
          height: 100%;
        `}
      >
        <MenuNavigation.Container>
          <MenuNavigation.MainItem
            to={`/facility/settings/users/tables/allUsers`}
            active={pathname.includes('allUsers')}
          >
            All
          </MenuNavigation.MainItem>
          <MenuNavigation.MainItem
            to={`/facility/settings/users/tables/activeUsers`}
            active={pathname.includes('activeUsers')}
          >
            Active
          </MenuNavigation.MainItem>
          <MenuNavigation.MainItem
            to={`/facility/settings/users/tables/deactivated`}
            active={pathname.includes('deactivated')}
          >
            Disabled/Disassociated
          </MenuNavigation.MainItem>
        </MenuNavigation.Container>

        <UserTable
          Data={refinedData.filter(function (el) {
            return el != null
          })}
          searchHandler={searchUsers}
        />
      </div>
      <Notification
        setcompleted={setcompletedDelete}
        message="User account successfully deleted."
        notification={completedDelete}
      />
      <Notification
        setcompleted={setcompletedSuspended}
        message="User account successfully suspended."
        notification={completedSuspended}
      />
      <Notification
        setcompleted={setcompletedEnabled}
        message="User account successfully enabled."
        notification={completedEnabled}
      />
      {action === 'deleteUser' && (
        <DeleteUser showNotificationDelete={showNotificationDelete} />
      )}
      {action === 'disableUser' && (
        <DissociateUser showNotificationSuspend={showNotificationSuspend} />
      )}
      {action === 'enableUser' && (
        <EnableUser showNotificationEnable={showNotificationEnable} />
      )}
    </>
  )
}
