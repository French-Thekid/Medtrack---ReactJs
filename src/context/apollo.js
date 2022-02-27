import React, { useContext } from 'react'
import { ApolloProvider as ApolloProviderImport } from '@apollo/react-hooks'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createHttpLink } from '@apollo/client/link/http'
import { setContext } from 'apollo-link-context'
import { SessionContext } from './session'
import { config } from '../config/config'

const Provider = ApolloProviderImport
function ApolloProvider({ children }) {
  const userType = JSON.parse(localStorage.getItem('session'))
  const { idToken } = useContext(SessionContext)
  const httpLink = createHttpLink({ uri: config.GQL_ENDPOINT })
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    let body = { Authorization: `cognito ${idToken}` }

    if (
      (localStorage.getItem('ActiveOrg') !== null ||
        localStorage.getItem('ActiveOrg') !== undefined) &&
      userType.user.role !== 'AdminUser' &&
      userType.user.role !== 'SupportAdmin'
    ) {
      const { organizationId } = JSON.parse(localStorage.getItem('ActiveOrg'))
      body = {
        Authorization: `cognito ${idToken}`,
        organization: organizationId,
      }
    }
    return {
      headers: {
        ...headers,
        ...body,
      },
    }
  })
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return <Provider client={client}>{children}</Provider>
}

export default ApolloProvider
