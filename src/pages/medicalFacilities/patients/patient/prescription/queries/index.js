import gql from 'graphql-tag'

export const LIST_PRESCRIPTIONS = gql`
  query listPrescriptions($patientId: Int!) {
    listPrescriptions(
      params: { patientId: $patientId, limit: 1000, offset: 0 }
    ) {
      total
      data {
        title
        url
        createdAt
        IsRepeated
        repeated
        prescriptionStatus {
          name
        }
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
