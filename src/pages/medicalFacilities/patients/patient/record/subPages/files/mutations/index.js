import { gql } from 'apollo-boost'

export const CREATE_FILE = gql`
  mutation createPatientDocument(
    $patientDocument: PatientDocumentCreateInput!
  ) {
    createPatientDocument(patientDocument: $patientDocument) {
      id
    }
  }
`

export const DELETE_FILE = gql`
  mutation deletePatientDocument($id: [Int]!) {
    deletePatientDocument(id: $id) {
      message
    }
  }
`
