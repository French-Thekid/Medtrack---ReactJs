import { gql } from 'apollo-boost'

export const CREATE_MEDICAL_FACILITY = gql`
  mutation createFacility($facility: FacilityCreateInput!) {
    createFacility(facility: $facility) {
      organizationId
    }
  }
`
export const DELETE_MEDICAL_FACILITY = gql`
  mutation deleteFacility($id: [String]!) {
    deleteFacility(organizationId: $id) {
      message
    }
  }
`
export const UPDATE_MEDICAL_FACILITY = gql`
  mutation updateFacility($facility: FacilityUpdateInput!) {
    updateFacility(facility: $facility) {
      organizationId
      status
    }
  }
`
