import { gql } from 'apollo-boost'

export const UNSUBSCRIBE = gql`
  mutation deletePatient($id: [Int]!) {
    deletePatient(id: $id) {
      message
    }
  }
`
export const TOGGLE_LIFE_STATUS = gql`
  mutation togglePatientLifeStatus($id: Int!, $lifeStatus: String) {
    togglePatientLifeStatus(id: $id, lifeStatus: $lifeStatus) {
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
`

export const CREATE_PATIENT = gql`
  mutation createPatient($patient: PatientCreateInput!) {
    createPatient(patient: $patient) {
      id
    }
  }
`

export const UPDATE_PATIENT = gql`
  mutation updatePatient($patient: PatientUpdateInput!) {
    updatePatient(patient: $patient) {
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
`

export const CREATE_EMERGENCY_CONTACT = gql`
  mutation createEmergencyContact(
    $emergencyContact: EmergencyContactCreateInput!
  ) {
    createEmergencyContact(emergencyContact: $emergencyContact) {
      id
    }
  }
`

export const UPDATE_EMERGENCY_CONTACT = gql`
  mutation updateEmergencyContact(
    $emergencyContact: EmergencyContactUpdateInput!
  ) {
    updateEmergencyContact(emergencyContact: $emergencyContact) {
      id
    }
  }
`

export const DELETE_EMERGENCY_CONTACT = gql`
  mutation deleteEmergencyContact($id: [Int]!) {
    deleteEmergencyContact(id: $id) {
      message
    }
  }
`
