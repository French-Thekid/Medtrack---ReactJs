import { gql } from 'apollo-boost'

export const CREATE_PRESCRIPTION = gql`
  mutation createPrescription(
    $prescription: PrescriptionCreateInput!
    $prescriptionItems: [PrescriptionItemCreateInput]!
    $toOrganization: String!
  ) {
    createPrescription(
      prescription: $prescription
      prescriptionItems: $prescriptionItems
      toOrganization: $toOrganization
    ) {
      id
    }
  }
`
