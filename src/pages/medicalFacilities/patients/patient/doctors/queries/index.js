import gql from 'graphql-tag'

export const LIST_ASSOCIATED_PATIENTS = gql`
  query listPatientDoctors($id: Int!) {
    listPatientDoctors(patientId: $id) {
      doctorsId
      createdByUser {
        firstName
        lastName
        type
        person {
          id
          title
          id
        }
      }
      createdBy
      createdAt
      doctor {
        registrationNumber
        id
        user {
          avatar
          firstName
          lastName
          status
          person {
            id
            title
            id
          }
          qualifications {
            name
            specification
          }
        }
      }
    }
  }
`

export const SEARCH_DOCTORS = gql`
  query listPatientDoctors($id: Int!, $query: String) {
    listPatientDoctors(patientId: $id, search: $query) {
      doctorsId
      createdByUser {
        firstName
        lastName
        type
        person {
          id
          title
          id
        }
      }
      createdBy
      createdAt
      doctor {
        registrationNumber
        id
        user {
          avatar
          firstName
          lastName
          status
          person {
            id
            title
            id
          }
          qualifications {
            name
            specification
          }
        }
      }
    }
  }
`
