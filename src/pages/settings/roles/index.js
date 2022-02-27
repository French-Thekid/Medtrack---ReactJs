import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import CreateRole from './CreateRole'
import RoleTable from './table'
import ViewRole from './ViewRole'
import ManageRole from './ManageRole'
import { EditRoleModal, DeleteRoleModal } from './modal'
import { Notification } from 'components'
import Permissions from './Permissions'
import ManagePermissions from './ManagePermissions'

const queryString = require('query-string')

export default function Index({ match }) {
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const [completed, setcompleted] = useState(false)
  const [completedDelete, setcompletedDelete] = useState(false)

  const showNotification = () => {
    setcompleted(true)
    setTimeout(() => {
      setcompleted(false)
    }, 6000)
  }

  const showNotificationDelete = () => {
    setcompletedDelete(true)
    setTimeout(() => {
      setcompletedDelete(false)
    }, 6000)
  }

  return (
    <>
      <Notification
        setcompleted={setcompleted}
        message="Role details successfully updated."
        notification={completed}
      />
      <Notification
        setcompleted={setcompletedDelete}
        message="Role successfully deleted."
        notification={completedDelete}
      />
      <Route exact path={`${match.url}/`} component={RoleTable} />
      <Route
        exact
        path={`${match.url}/view-role/:roleId`}
        component={ViewRole}
      />
      <Route
        exact
        path={`${match.url}/manage-role/:roleId`}
        component={ManageRole}
      />
      <Route
        exact
        path={`${match.url}/permissions/:roleId`}
        component={Permissions}
      />
      <Route
        exact
        path={`${match.url}/manage-permissions/:roleId`}
        component={ManagePermissions}
      />
      <Route exact path={`${match.url}/create-role`} component={CreateRole} />
      {action === 'editRole' && (
        <EditRoleModal showNotification={showNotification} />
      )}
      {action === 'deleteRole' && (
        <DeleteRoleModal showNotificationDelete={showNotificationDelete} />
      )}
    </>
  )
}
