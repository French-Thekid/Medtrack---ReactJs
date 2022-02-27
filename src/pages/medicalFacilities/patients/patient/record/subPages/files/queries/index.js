import gql from 'graphql-tag'

export const LIST_FILES = gql`
  query listExternalPatientDocuments($patientId: Int!) {
    listExternalPatientDocuments(
      params: { patientId: $patientId, limit: 1200, offset: 0 }
    ) {
      total
      data {
        id
        documentId
        fromOrganizationObject {
          name
        }
        document {
          url
          fileName
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
  }
`
