import gql from 'graphql-tag'

export const LIST_BILLINGS = gql`
  query listBillings($patientId: Int!) {
    listBillings(params: { patientId: $patientId, limit: 1000, offset: 0 }) {
      total
      data {
        id
        purpose
        amount
        type
        cashAmount
        cardAmount
        checkAmount
        healthCardAmount
        balance
        createdAt
        createdByUser {
          firstName
          lastName
          type
          person {
            title
          }
        }
        billingsStatus {
          name
        }
      }
    }
  }
`

export const SEARCH_BILLINGS = gql`
  query listBillings($patientId: Int!, $query: String) {
    listBillings(
      params: { patientId: $patientId, limit: 1000, offset: 0, search: $query }
    ) {
      total
      data {
        id
        purpose
        amount
        type
        cashAmount
        cardAmount
        checkAmount
        healthCardAmount
        balance
        createdAt
        createdByUser {
          firstName
          lastName
          type
          person {
            title
          }
        }
        billingsStatus {
          name
        }
      }
    }
  }
`
