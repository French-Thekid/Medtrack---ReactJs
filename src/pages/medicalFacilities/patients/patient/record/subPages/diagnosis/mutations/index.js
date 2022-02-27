import { gql } from 'apollo-boost'

export const CREATE_DIAGNOSIS = gql`
  mutation createDiagnosis($diagnosis: DiagnosisCreateInput!) {
    createDiagnosis(diagnosis: $diagnosis) {
      id
    }
  }
`
export const UPDATE_DIAGNOSIS = gql`
  mutation updateDiagnosis($diagnosis: DiagnosisUpdateInput!) {
    updateDiagnosis(diagnosis: $diagnosis) {
      id
    }
  }
`
export const DELETE_DIAGNOSIS = gql`
  mutation deleteDiagnosis($id: [Int]!) {
    deleteDiagnosis(id: $id) {
      message
    }
  }
`
