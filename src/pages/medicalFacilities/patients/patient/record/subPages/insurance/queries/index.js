import gql from 'graphql-tag'

export const LIST_INSURANCES = gql`
  query listMedicalInsurances($patientId: Int!) {
    listMedicalInsurances(
      params: { patientId: $patientId, limit: 1000, offset: 0 }
    ) {
      total
      data {
        id
        name
        policyNumber
        issueDate
        expiryDate
        insuranceStatus {
          name
        }
      }
    }
  }
`
