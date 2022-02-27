import React from 'react'
import { useHistory } from 'react-router-dom'
import { LIST_ROLES, SEARCH_ROLES } from '../queries'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { Table, Content, Loading } from 'components'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_ROLE } from '../../roles/mutations'

export default function ReportTable() {
  const history = useHistory()

  //Query
  let { loading, error, data: roles } = useQuery(LIST_ROLES)
  const [
    searchRoles,
    { loading: loading0, error: error0, data: searchResult },
  ] = useLazyQuery(SEARCH_ROLES)

  //Mutation
  const [deleteRole, { loading: l, error: deleteRoleFailed }] = useMutation(
    DELETE_ROLE,
    {
      refetchQueries: () => [
        {
          query: LIST_ROLES,
        },
      ],
      // onCompleted(deleteRole) {
      //   showNotificationDelete()
      // },
    }
  )

  if (loading || loading0) return <Loading small />
  if (error || error0)
    return <Content.Alert type="error" message={'Failed to load roles'} />

  //Handling Seaarch Results
  const { listRoles: searchListRoles } = searchResult || {}
  const { total: searchTotal } = searchListRoles || {}

  if (searchTotal > 0) roles = searchResult

  const HeaderData = ['Name', 'Description', 'Active Users', 'Created On']
  const RowData = roles.listRoles.data
    .map(
      ({ name, description, activeUserCount, createdAt, ...rest }, index) => {
        if (name !== 'Supreme Administrator')
          return {
            name,
            description,
            activeUserCount,
            createdAt: createdAt
              ? new Date(parseInt(createdAt)).toDateString()
              : '',
            ...rest,
          }
        return null
      }
    )
    .filter((item, index) => item !== null)

  const DeleteMultipleAction = async (ids) => {
    const final = ids
      .map((id, index) => {
        if (id === 1 || id === 2 || id === 3) return null
        return id
      })
      .filter((i, j) => i !== null)
    console.log(final)
    await deleteRole({
      variables: {
        ids: final,
      },
    }).catch((e) => console.log(e))
    history.goBack()
  }

  const editAction = (data) => {
    localStorage.setItem('selectedRole', JSON.stringify(data))
    history.push(`?action=editRole&roleID=${data.id}`)
  }
  const deleteAction = (data) => {
    localStorage.setItem('selectedRole', JSON.stringify(data))
    history.push(`?action=deleteRole&roleID=${data.id}`)
  }
  const permissionAction = (data) => {
    localStorage.setItem('selectedRole', JSON.stringify(data))
    history.push(`/facility/settings/roles/permissions/${data.id}`)
  }

  const handleRowClick = (id, data) => {
    localStorage.setItem('selectedRole', JSON.stringify(data))
    history.push(`/facility/settings/roles/view-role/${id}`)
  }

  return (
    <Table
      MainButtonpath="/facility/settings/roles/create-role"
      title={'Showing all Roles'}
      altTitle="Roles"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 2fr 0.5fr 0.5fr`}
      searchPlaceholder="Search Roles"
      buttonTitle="New Role"
      searchEnable
      checkBoxNeeded
      rowClick={handleRowClick}
      editAction={editAction}
      deleteAction={deleteAction}
      permissionAction={permissionAction}
      deleteMultipleAction={DeleteMultipleAction}
      justify="start"
      alignment="start"
      breakingPoint="1242px"
      searchHandler={searchRoles}
      massLoading={l}
      massError={deleteRoleFailed}
    />
  )
}
