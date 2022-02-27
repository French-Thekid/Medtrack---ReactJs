import gql from 'graphql-tag'

export const LIST_ROLES = gql`
  query listRoles {
    listRoles(params: { limit: 1000, offset: 0 }) {
      total
      data {
        id
        name
        description
        activeUserCount
        createdAt
      }
    }
  }
`

export const SEARCH_ROLES = gql`
  query listRoles($query: String) {
    listRoles(params: { limit: 1000, offset: 0, search: $query }) {
      total
      data {
        id
        name
        description
        activeUserCount
        createdAt
      }
    }
  }
`

export const READ_ROLES = gql`
  query readRole($id: Int!) {
    readRole(id: $id) {
      id
      name
      description
      activeUsers {
        id
        email
        type
        firstName
        lastName
        avatar
      }
      permissions {
        id
        entity
        action
        endpoint
      }
    }
  }
`

export const LIST_PERMISSIONS = gql`
  query listPermissions {
    listPermissions {
      total
      data {
        id
        entity
        action
        endpoint
      }
    }
  }
`
