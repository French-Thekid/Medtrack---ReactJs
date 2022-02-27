import React from 'react'
import { SessionContext, SessionProvider } from './session'
import { UserProvider, UserContext } from './user'
import { AuthContext, AuthProvider } from './auth'
import { OrganisationContext, OrganisationProvider } from './organisation'
import ApolloProvider from './apollo'

function AppProviders({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ApolloProvider>
          <OrganisationProvider>
            <UserProvider>{children}</UserProvider>
          </OrganisationProvider>
        </ApolloProvider>
      </AuthProvider>
    </SessionProvider>
  )
}
export {
  AppProviders,
  SessionContext,
  UserContext,
  AuthContext,
  OrganisationContext,
}
