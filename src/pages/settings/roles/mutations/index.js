import { gql } from 'apollo-boost'

export const CREATE_ROLE = gql`
  mutation createRole($role: RoleCreateInput!) {
    createRole(role: $role) {
      id
    }
  }
`

export const UPDATE_ROLE = gql`
  mutation updateRole($role: RoleUpdateInput!) {
    updateRole(role: $role) {
      id
    }
  }
`

export const DUPLICATE_UPDATE_ROLE = gql`
  mutation duplicateRoles($params: DuplicateRolesInput) {
    duplicateRoles(params: $params) {
      id
    }
  }
`

export const UPDATE_ROLE_USERS = gql`
  mutation updateRoleUsers($params: UpdateRoleUsersInput) {
    updateRoleUsers(params: $params) {
      id
      name
      description
    }
  }
`

export const DELETE_ROLE = gql`
  mutation deleteRole($ids: [Int]!) {
    deleteRole(id: $ids) {
      message
    }
  }
`

export const ADD_USER_TO_ROLE = gql`
  mutation addUsersToRole($params: AddUsersToRoleInput) {
    addUsersToRole(params: $params) {
      id
      name
      description
    }
  }
`

export const UPDATE_ROLE_PERMISSIONS = gql`
  mutation updateRolePermissions($params: UpdateRolePermissionsInput) {
    updateRolePermissions(params: $params) {
      id
    }
  }
`
