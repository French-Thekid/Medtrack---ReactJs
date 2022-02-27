import gql from 'graphql-tag'

export const LIST_MEDICINES = gql`
  query listExternalMedicines($patientId: Int!) {
    listExternalMedicines(
      params: { patientId: $patientId, limit: 1000, offset: 0 }
    ) {
      total
      data {
        id
        medicineId
        fromOrganizationObject {
          name
        }
        medicine {
          name
          dosage
          prescriptionId
          description
          createdAt
          medicineStatus {
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
