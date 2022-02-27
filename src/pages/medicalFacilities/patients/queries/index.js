import gql from 'graphql-tag'

export const LIST_PATIENTS = gql`
  query listPatients {
    listPatients(params: { limit: 1000, offset: 0 }) {
      total
      data {
        id
        life
        person {
          id
          title
          firstName
          middleName
          lastName
          avatar
          email
          dob
          gender
          trn
          contact {
            contact_number
            carrier
            type
            extension
          }
          user {
            status
          }
          address {
            streetName
            streetNumber
            city
            province
            country
          }
          primaryPerson {
            id
            relationship
            emergencyPerson {
              firstName
              lastName
              email
              contact {
                contact_number
              }
              address {
                streetName
              }
            }
          }
        }
        createdByUser {
          id
          type
          firstName
          lastName
          person {
            title
          }
        }
        createdAt
        medicalCondition
      }
    }
  }
`
export const SEARCH_PATIENTS = gql`
  query listPatients($query: String) {
    listPatients(params: { limit: 1000, offset: 0, search: $query }) {
      total
      data {
        id
        life
        person {
          id
          title
          firstName
          middleName
          lastName
          avatar
          email
          dob
          gender
          trn
          contact {
            contact_number
            carrier
            type
            extension
          }
          user {
            status
          }
          address {
            streetName
            streetNumber
            city
            province
            country
          }
          primaryPerson {
            id
            relationship
            emergencyPerson {
              firstName
              lastName
              email
              contact {
                contact_number
              }
              address {
                streetName
              }
            }
          }
        }
        createdByUser {
          id
          type
          firstName
          lastName
          person {
            title
          }
        }
        createdAt
        medicalCondition
      }
    }
  }
`

export const LIST_GLOBAL_PATIENTS = gql`
  query listGlobalPatients {
    listGlobalPatients(params: { limit: 1000, offset: 0 }) {
      total
      data {
        id
        facilities {
          organizationId
          name
        }
        patients {
          id
          organizationId
          medicalCondition
          person {
            id
            title
            firstName
            middleName
            lastName
            avatar
            email
            dob
            gender
            trn
            contact {
              contact_number
              carrier
              type
              extension
            }
            user {
              status
            }
            address {
              streetName
              streetNumber
              city
              province
              country
            }
            primaryPerson {
              id
              relationship
              emergencyPerson {
                firstName
                lastName
                email
                contact {
                  contact_number
                }
                address {
                  streetName
                }
              }
            }
          }
          createdByUser {
            id
            type
            firstName
            lastName
            person {
              title
            }
          }
          createdAt
        }
      }
    }
  }
`

export const LIST_EMERGENCY_CONTACT = gql`
  query listEmergencyContacts($patientPersonId: Int!) {
    listEmergencyContacts(
      params: { patientPersonId: $patientPersonId, limit: 1000, offset: 0 }
    ) {
      data {
        id
        relationship
        emergencyPerson {
          firstName
          lastName
          email
          contact {
            contact_number
          }
          address {
            streetName
          }
        }
      }
    }
  }
`

export const GetCountries = gql`
  query listCountries {
    listCountries(params: { limit: 100, offset: 0 }) {
      name
      id
      code
    }
  }
`
export const GetPremise = gql`
  query listProvinces {
    Canada: listProvinces(params: { countryId: 54 }) {
      id
      code
      name
    }
    Jamaica: listProvinces(params: { countryId: 124 }) {
      id
      code
      name
    }
    UK: listProvinces(params: { countryId: 244 }) {
      id
      code
      name
    }
    US: listProvinces(params: { countryId: 245 }) {
      id
      code
      name
    }
  }
`
