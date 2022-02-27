import { gql } from 'apollo-boost'

export const CREATE_BILLING = gql`
  mutation createBillings($billings: BillingsCreateInput!) {
    createBillings(billings: $billings) {
      id
    }
  }
`
export const UPDATE_BILLING = gql`
  mutation updateBillings($billings: BillingsUpdateInput!) {
    updateBillings(billings: $billings) {
      id
    }
  }
`
export const DELETE_BILLING = gql`
  mutation deleteBillings($id: [Int]!) {
    deleteBillings(id: $id) {
      message
    }
  }
`
