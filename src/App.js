import { AppProviders } from 'context'
import NotFoundPage from 'pages/NotFound'
import React from 'react'
import Facility from 'pages/medicalFacilities'
import Support from 'pages/support'
import { PrivateRoute, SupportRoute } from './routers'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Medconsole from 'utils/Console'

import {
  SignIn,
  ForgetPassword,
  ForgetPasswordConfirmation,
  NewPassword,
} from './pages/auth'

function App() {
  Medconsole.bindWindow()
  return (
    <AppProviders>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/forget-password" component={ForgetPassword} />
          <Route
            path="/forget-password-confirmation"
            component={ForgetPasswordConfirmation}
          />
          <Route path="/new-password" component={NewPassword} />
          <PrivateRoute path="/facility" component={Facility} />
          <SupportRoute path="/support" component={Support} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </AppProviders>
  )
}

export default App
