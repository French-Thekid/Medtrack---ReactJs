import gql from 'graphql-tag'

export const LIST_USERS = gql`
  query listUsers {
    listUsers(params: { limit: 1000, offset: 0 }) {
      total
      data {
        avatar
        firstName
        lastName
        type
        id
        email
        enabled
        role {
          id
          name
          description
        }
        userStatus {
          name
        }
        doctor {
          registrationNumber
          yearsOfExperience
        }
        person {
          contact {
            contact_number
          }
        }
      }
    }
  }
`

export const SEARCH_USERS = gql`
  query listUsers($query: String) {
    listUsers(params: { limit: 1000, offset: 0, search: $query }) {
      total
      data {
        avatar
        firstName
        lastName
        type
        id
        email
        enabled
        role {
          id
          name
          description
        }
        userStatus {
          name
        }
        doctor {
          registrationNumber
          yearsOfExperience
        }
        person {
          contact {
            contact_number
          }
        }
      }
    }
  }
`
