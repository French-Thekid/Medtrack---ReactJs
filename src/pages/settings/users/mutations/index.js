import { gql } from 'apollo-boost'

export const CREATE_USER = gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
    }
  }
`
export const UPDATE_USER = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      avatar
      id
      firstName
      lastName
      email
      type
      role {
        name
        description
        permissions {
          entity
          action
        }
      }
      doctor {
        registrationNumber
      }
      person {
        contact {
          contact_number
        }
      }
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($id: [String]!) {
    deleteUser(id: $id) {
      message
    }
  }
`

export const FORCE_RESET_PASSWORD = gql`
  mutation adminForceResetUserPassword($email: String!) {
    adminForceResetUserPassword(email: $email) {
      message
    }
  }
`

export const DISASSOCIATE_USER = gql`
  mutation disassociateUser($id: [String]!) {
    disassociateUser(id: $id) {
      message
    }
  }
`
export const DISABLE_USER = gql`
  mutation disableUser($id: [String]!) {
    suspendUser(id: $id) {
      message
    }
  }
`

export const ENABLE_USER = gql`
  mutation reassociateUser($id: [String]!) {
    reassociateUser(id: $id) {
      message
    }
  }
`
