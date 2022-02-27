import gql from 'graphql-tag'

export const LIST_AVAILABILITY = gql`
  query listAvailability($doctorId: Int!, $date: String) {
    listAvailability(params: { doctorId: $doctorId, date: $date }) {
      data {
        sunday {
          id
          start
          end
          available
          doctorId
        }
        monday {
          id
          start
          end
          available
          doctorId
        }
        tuesday {
          id
          start
          end
          available
          doctorId
        }
        wednesday {
          id
          start
          end
          available
          doctorId
        }
        thursday {
          id
          start
          end
          available
          doctorId
        }
        friday {
          id
          start
          end
          available
          doctorId
        }
        saturday {
          id
          start
          end
          available
          doctorId
        }
      }
    }
  }
`

export const GET_PATIENTS = gql`
  query getTotalPatients($id: Int!) {
    getTotalPatients(doctor: $id) {
      totalInternal
    }
  }
`
