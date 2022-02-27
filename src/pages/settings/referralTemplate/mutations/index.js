import { gql } from 'apollo-boost'

export const UPDATE_TEMPLATE_COLOR = gql`
  mutation updateFacility($organizationId: String!, $color: String) {
    updateFacility(
      facility: { organizationId: $organizationId, referral: { color: $color } }
    ) {
      organizationId
      templates {
        color
      }
    }
  }
`
