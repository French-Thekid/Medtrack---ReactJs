import { gql } from 'apollo-boost'

export const CREATE_INSURANCE = gql`
  mutation createMedicalInsurance(
    $medicalInsurance: MedicalInsuranceCreateInput!
  ) {
    createMedicalInsurance(medicalInsurance: $medicalInsurance) {
      id
    }
  }
`

export const UPDATE_INSURANCE = gql`
  mutation updateMedicalInsurance(
    $medicalInsurance: MedicalInsuranceUpdateInput!
  ) {
    updateMedicalInsurance(medicalInsurance: $medicalInsurance) {
      id
    }
  }
`

export const DELETE_INSURANCE = gql`
  mutation deleteMedicalInsurance($id: [Int]!) {
    deleteMedicalInsurance(id: $id) {
      message
    }
  }
`
