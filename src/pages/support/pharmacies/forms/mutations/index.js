import { gql } from 'apollo-boost'

export const CREATE_PHARMACY = gql`
  mutation createFacility($facility: FacilityCreateInput!) {
    createFacility(facility: $facility) {
      organizationId
    }
  }
`
export const DELETE_PHARMACY = gql`
  mutation deleteFacility($id: [String]!) {
    deleteFacility(organizationId: $id) {
      message
    }
  }
`

export const UPDATE_PHARMACY = gql`
  mutation updateFacility($facility: FacilityUpdateInput!) {
    updateFacility(facility: $facility) {
      organizationId
      status
    }
  }
`
