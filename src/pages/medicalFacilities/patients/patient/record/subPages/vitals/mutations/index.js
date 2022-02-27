import { gql } from 'apollo-boost'

export const CREATE_VITALS = gql`
  mutation createVital($vital: VitalCreateInput!) {
    createVital(vital: $vital) {
      id
    }
  }
`
export const UPDATE_VITALS = gql`
  mutation updateVital($vital: VitalUpdateInput!) {
    updateVital(vital: $vital) {
      id
    }
  }
`
export const DELETE_VITALS = gql`
  mutation deleteVital($id: [Int]!) {
    deleteVital(id: $id) {
      message
    }
  }
`
