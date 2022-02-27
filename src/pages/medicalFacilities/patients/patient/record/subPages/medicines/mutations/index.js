import { gql } from 'apollo-boost'

export const CREATE_MEDICINE = gql`
  mutation createMedicine($medicine: MedicineCreateInput!) {
    createMedicine(medicine: $medicine) {
      id
    }
  }
`
export const UPDATE_MEDICINE = gql`
  mutation updateMedicine($medicine: MedicineUpdateInput!) {
    updateMedicine(medicine: $medicine) {
      id
    }
  }
`
export const DELETE_MEDICINE = gql`
  mutation deleteMedicine($id: [Int]!) {
    deleteMedicine(id: $id) {
      message
    }
  }
`
