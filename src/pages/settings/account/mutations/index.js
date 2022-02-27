import { gql } from 'apollo-boost'

export const CHANGE_PASSWORD = gql`
  mutation changeUserPassword($params: ChangePasswordInput!) {
    changeUserPassword(params: $params) {
      message
    }
  }
`

export const CREATE_AVAILABILITY = gql`
  mutation createAvailability(
    $availability: [CreateAvailabilityInput]!
    $doctorId: Int!
  ) {
    createAvailability(availability: $availability, doctorId: $doctorId) {
      start
      end
      id
      weekday
      doctorId
    }
  }
`
export const DELETE_AVAILABILITY = gql`
  mutation deleteAvailability($id: [Int]!) {
    deleteAvailability(id: $id) {
      message
    }
  }
`
export const UPDATE_AVAILABILITY = gql`
  mutation updateAvailability($availability: [UpdateAvailabilityInput]!) {
    updateAvailability(availability: $availability) {
      id
    }
  }
`

export const UPDATE_SIGNATURE = gql`
  mutation updateUserSignature($userId: String!, $signature: String!) {
    updateUserSignature(userId: $userId, signature: $signature) {
      message
    }
  }
`
