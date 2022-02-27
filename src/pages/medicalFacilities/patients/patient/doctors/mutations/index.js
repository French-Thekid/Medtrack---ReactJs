import gql from 'graphql-tag'

export const TERMINATE_ASSOCIATION = gql`
  mutation removePatientDoctorRelationship($patientId: Int!, $doctors: [Int]!) {
    removePatientDoctorRelationship(
      patientId: $patientId
      doctorsIds: $doctors
    ) {
      message
    }
  }
`

export const ADD_ASSOCIATION = gql`
  mutation addDoctorsToPatient($patientId: Int!, $doctors: [Int]!) {
    addDoctorsToPatient(patientId: $patientId, doctorsIds: $doctors) {
      id
    }
  }
`
