import gql from 'graphql-tag'

export const LIST_NOTES = gql`
  query listNotes($patientId: Int!) {
    listNotes(params: { patientId: $patientId, offset: 0, limit: 10000 }) {
      total
      data {
        id
        title
        section
        details
        createdAt
        createdByUser {
          id
          avatar
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

export const SEARCH_NOTES = gql`
  query listNotes($patientId: Int!, $query: String) {
    listNotes(
      params: { patientId: $patientId, offset: 0, limit: 10000, search: $query }
    ) {
      total
      data {
        id
        title
        section
        details
        createdAt
        createdByUser {
          id
          avatar
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
