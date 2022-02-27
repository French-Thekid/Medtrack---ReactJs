import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_USER } from '../mutations'
import { LIST_USERS } from '../queries'

import { Table } from 'components'

export default function ReferralTable({ Data, searchHandler }) {
  const history = useHistory()
  const { pathname } = useLocation()

  const [deleteUser, { loading, error: deleteUserFailed }] = useMutation(
    DELETE_USER,
    {
      refetchQueries: () => [
        {
          query: LIST_USERS,
        },
      ],
    }
  )

  console.log(Data)

  // eslint-disable-next-line

  const HeaderData = ['Avatar', 'Name', 'Email Address', 'Type', 'Role']
  const RowData = Data.map(
    (
      {
        avatar,
        firstName,
        lastName,
        id,
        email,
        type,
        role,
        userStatus,
        enabled,
        ...rest
      },
      index
    ) => {
      let { name } = userStatus || {}
      const { name: roleName } = role || {}

      if (name === 'Disassociated' || name === 'Suspended') name = 0
      else name = 1

      return {
        avatar,
        name: `${firstName} ${lastName}`,
        email,
        type,
        roleAssigned: roleName || 'None Assigned',
        firstName,
        lastName,
        id,
        enabled: name,
        role,
        ...rest,
      }
    }
  )

  const editAction = (data) => {
    localStorage.setItem('selectedUser', JSON.stringify(data))
    history.push(`/facility/settings/users/manage-user/${data.id}`)
  }

  const DeleteMultipleAction = async (ids) => {
    await deleteUser({
      variables: {
        id: ids,
      },
    }).catch((e) => console.log(e))
    history.goBack()
  }

  const DeleteAction = (data) => {
    localStorage.setItem('selectedUser', JSON.stringify(data))
    history.push(`?action=deleteUser&&userId=${data.id}`)
  }
  const SuspendAction = (data) => {
    localStorage.setItem('selectedUser', JSON.stringify(data))
    history.push(`?action=disableUser&&userId=${data.id}`)
  }
  const EnableAction = (data) => {
    localStorage.setItem('selectedUser', JSON.stringify(data))
    history.push(`?action=enableUser&&userId=${data.id}`)
  }

  const handleRowClick = (id, data) => {
    localStorage.setItem('selectedUser', JSON.stringify(data))
    history.push(`/facility/settings/users/view-user/${id}`)
  }

  return (
    <Table
      MainButtonpath="/facility/settings/users/create-user"
      title={
        pathname.includes('allUsers')
          ? 'Showing All Users'
          : pathname.includes('activeUsers')
          ? 'Showing Active Users'
          : 'Showing Disabled/Disassociated Users'
      }
      altTitle="Users"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`70px repeat(4,1fr)`}
      searchPlaceholder="Search Users"
      buttonTitle="New User"
      searchEnable
      checkBoxNeeded
      rowClick={handleRowClick}
      editAction={editAction}
      deleteMultipleAction={DeleteMultipleAction}
      deleteAction={DeleteAction}
      hasAvatar
      imageStatusNeeded
      massLoading={loading}
      massError={deleteUserFailed}
      suspendAction={SuspendAction}
      enableAction={EnableAction}
      breakingPoint="1320px"
      searchHandler={searchHandler}
    />
  )
}
