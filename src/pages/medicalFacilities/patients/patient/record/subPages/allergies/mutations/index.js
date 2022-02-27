import { gql } from 'apollo-boost'

export const CREATE_ALLERGY = gql`
  mutation createAllergy($allergy: AllergiesCreateInput!) {
    createAllergy(allergy: $allergy) {
      id
    }
  }
`
export const UPDATE_ALLERGY = gql`
  mutation updateAllergy($allergy: AllergiesUpdateInput!) {
    updateAllergy(allergy: $allergy) {
      id
    }
  }
`
export const DELETE_ALLERGY = gql`
  mutation deleteAllergies($id: [Int]!) {
    deleteAllergies(id: $id) {
      message
    }
  }
`
