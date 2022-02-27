import { gql } from 'apollo-boost'

export const BOOK_APPOINTMENT = gql`
  mutation createAppointment($appointment: AppointmentCreateInput!) {
    createAppointment(appointment: $appointment) {
      id
    }
  }
`
export const COMPLETE_APPOINTMENT = gql`
  mutation completeAppointment($id: [Int]!) {
    completeAppointment(id: $id) {
      id
      title
      reason
      startTime
      endTime
      createdBy
      appointmentStatus {
        name
      }
      createdByUser {
        firstName
        lastName
        person {
          title
        }
      }
      doctor {
        id
        user {
          firstName
          lastName
          person {
            title
            avatar
          }
          qualifications {
            specification
          }
        }
      }
      patient {
        id
        person {
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
`

export const UPDATE_APPOINTMENT = gql`
  mutation updateAppointment($appointment: AppointmentUpdateInput!) {
    updateAppointment(appointment: $appointment) {
      id
      title
      reason
      startTime
      endTime
      createdBy
      appointmentStatus {
        name
      }
      createdByUser {
        firstName
        lastName
        person {
          title
        }
      }
      doctor {
        id
        user {
          firstName
          lastName
          person {
            title
            avatar
          }
          qualifications {
            specification
          }
        }
      }
      patient {
        id
        person {
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
`

export const DELETE_APPOINTMENT = gql`
  mutation deleteAppointment($id: [Int]!) {
    deleteAppointment(id: $id) {
      message
    }
  }
`
