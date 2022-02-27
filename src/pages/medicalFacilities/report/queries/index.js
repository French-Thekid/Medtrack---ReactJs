import { gql } from 'apollo-boost'

export const LIST_REPORT = gql`
  query listReports {
    listReports(params: { limit: 1000, offset: 0 }) {
      total
      data {
        id
        fileName
        url
        createdAt
        createdByUser {
          firstName
          lastName
          type
          person {
            title
          }
        }
      }
    }
  }
`
