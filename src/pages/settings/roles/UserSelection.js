import React from 'react'
import 'styled-components/macro'

import { Layout, Content, Loading } from 'components'
import { LIST_USERS, SEARCH_USERS } from '../users/queries'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'

export default function UserSelection({ selectedUsers, setSelectedUsers }) {
  //Query
  let { loading, error, data: users } = useQuery(LIST_USERS)
  const [
    searchUsers,
    { loading: loading0, error: error0, data: searchResult },
  ] = useLazyQuery(SEARCH_USERS)

  if (loading) return <Loading Contained />
  if (loading0) console.log('Seaching')
  if (error || error0)
    return <Content.Alert type="error" message={'Failed to load Users'} />
  //Handling Seaarch Results
  const { listUsers: searchListUsers } = searchResult || {}
  const { total: searchTotal } = searchListUsers || {}

  if (searchTotal > 0) users = searchResult

  const UserList = users.listUsers.data

  return (
    <Layout.Card
      title="Assign Users"
      responsive
      searchHandler={searchUsers}
      searchPlaceholder="search Users"
    >
      {loading0 && <Loading Contained />}
      <div
        css={`
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          align-content: flex-start;
          width: 100%;
          height: 100%;
          overflow-y: auto;
        `}
      >
        {UserList.map(({ avatar, firstName, lastName, type, id }, index) => {
          return (
            <>
              <Content.UserCard
                key={index}
                avatar={avatar}
                firstName={firstName}
                lastName={lastName}
                extra={type}
                id={id}
                setSelectedUsers={setSelectedUsers}
                selectedUsers={selectedUsers}
              />
            </>
          )
        })}
      </div>
    </Layout.Card>
  )
}
