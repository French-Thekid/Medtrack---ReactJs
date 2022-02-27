import gql from 'graphql-tag'

export const LIST_VACCINES = gql`
  query listExternalImmunizationsVaccinations($patientId: Int!) {
    listExternalImmunizationsVaccinations(
      params: { patientId: $patientId, limit: 1000, offset: 0 }
    ) {
      total
      data {
        fromOrganizationObject {
          name
        }
        id
        immunizationsVaccination {
          name
          type
          dateTaken
          expiryDate
          vaccinationsStatus {
            name
          }
        }
      }
    }
  }
`
