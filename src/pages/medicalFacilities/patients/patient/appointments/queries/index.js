import gql from 'graphql-tag'

export const LIST_PATIENTS_APPOINTMENTS = gql`
  query listPatientAppointments($patientId: Int!) {
    listPatientAppointments(
      params: { patientId: $patientId, offset: 0, limit: 1000 }
    ) {
      total
      data {
        id
        title
        reason
        startTime
        endTime
        createdBy
        availabilityId
        appointmentStatus {
          name
        }
        createdByUser {
          firstName
          lastName
          person {
            id
            title
          }
        }
        doctor {
          id
          user {
            avatar
            firstName
            lastName
            person {
              id
              title
              id
            }
            qualifications {
              specification
            }
          }
        }
        patient {
          id
          person {
            id
            avatar
            firstName
            lastName
            contact {
              contact_number
            }
          }
        }
      }
    }
  }
`
