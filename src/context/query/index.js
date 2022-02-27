import gql from 'graphql-tag'

export const LOGGED_IN_USER = gql`
  query loggedInUser {
    loggedInUser {
      id
      avatar
      email
      type
      firstName
      lastName
      type
      status
      signature
      qualifications {
        name
        specification
      }
      doctor {
        id
        registrationNumber
        yearsOfExperience
      }
      person {
        aboutMe
        dob
        gender
        title
        contact {
          contact_number
        }
      }
      role {
        name
        description
        permissions {
          entity
          action
        }
      }
    }
  }
`

export const GET_ORGANIZATION = gql`
  query readFacility($id: String) {
    readFacility(id: $id) {
      name
      logoUrl
      base64Logo
      organizationId
      taxId
      type
      status
      organisationEmail
      location {
        streetName
        streetNumber
        province
        city
        country
      }
      billingContact {
        firstName
        lastName
        email
        phone
        position
      }
      technicalContact {
        firstName
        lastName
        email
        phone
        position
      }
      adminContact {
        firstName
        lastName
        email
        phone
        position
      }
      templates {
        color
      }
      referral {
        color
      }
    }
  }
`
