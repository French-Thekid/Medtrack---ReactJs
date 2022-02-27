import gql from 'graphql-tag'

export const LIST_DOCTORS = gql`
  query listDoctors {
    listDoctors(params: { offset: 0, limit: 10000 }) {
      total
      data {
        id
        user {
          avatar
          firstName
          lastName
          type
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
    }
  }
`

export const SEARCH_DOCTORS = gql`
  query listDoctors($query: String) {
    listDoctors(params: { offset: 0, limit: 10000, search: $query }) {
      total
      data {
        id
        user {
          avatar
          firstName
          lastName
          type
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
    }
  }
`
export const LIST_APPOINTMENTS = gql`
  query listAppointments($doctorIds: [Int]) {
    listAppointments(
      params: { limit: 1000, offset: 0, doctorIds: $doctorIds }
    ) {
      total
      data {
        id
        title
        reason
        startTime
        endTime
        createdBy
        statusReason
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
