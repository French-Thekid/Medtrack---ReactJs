import React from 'react'
import { Route } from 'react-router-dom'
import Users from './Users'
import ViewUser from './ViewUser'
import ManageUser from './ManageUser'
import CreateUser from './CreateUser'

export default function Index({ match }) {
  return (
    <>
      <Route exact path={`${match.url}/tables/:section`} component={Users} />
      <Route
        exact
        path={`${match.url}/view-user/:userId`}
        component={ViewUser}
      />
      <Route
        exact
        path={`${match.url}/manage-user/:userId`}
        component={ManageUser}
      />
      <Route exact path={`${match.url}/create-user`} component={CreateUser} />
    </>
  )
}
