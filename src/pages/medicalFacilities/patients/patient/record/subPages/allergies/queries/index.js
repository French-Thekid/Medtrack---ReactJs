import gql from 'graphql-tag'

export const LIST_ALLERGIES = gql`
  query listExternalAllergies($patientId: Int!) {
    listExternalAllergies(
      params: { patientId: $patientId, limit: 1000, offset: 0 }
    ) {
      total
      data {
        id
        allergyId
        fromOrganizationObject {
          name
        }
        allergy {
          name
          description
          createdAt
          allergyStatus {
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
  }
`
