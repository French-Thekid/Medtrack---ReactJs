import gql from 'graphql-tag'

export const LIST_MEDICAL_FACILITY = gql`
  query listFacilities {
    listFacilities(params: { id: "" }) {
      organizationId
      type
      name
      taxId
      organisationEmail
      status
      logoUrl
      description
      location {
        streetNumber
        streetName
        city
        province
        country
      }
      adminContact {
        avatar
        firstName
        lastName
        phone
        position
        email
      }
      billingContact {
        avatar
        firstName
        lastName
        phone
        position
        email
      }
      technicalContact {
        avatar
        firstName
        lastName
        phone
        position
        email
      }
    }
  }
`
