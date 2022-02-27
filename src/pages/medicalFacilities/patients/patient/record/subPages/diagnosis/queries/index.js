import gql from 'graphql-tag'

export const LIST_DIAGNOSIS = gql`
  query listExternalDiagnosis($patientId: Int!) {
    listExternalDiagnosis(
      params: { patientId: $patientId, limit: 1000, offset: 0 }
    ) {
      total
      data {
        id
        diagnosisId
        fromOrganizationObject {
          name
        }
        diagnosis {
          name
          description
          createdAt
          symptoms {
            id
            name
            description
            symptomStatus {
              name
            }
          }
          diagnosisStatus {
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
