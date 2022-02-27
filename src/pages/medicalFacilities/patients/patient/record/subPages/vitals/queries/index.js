import { gql } from 'apollo-boost'

export const LIST_VITALS = gql`
  query listVitals($patientId: Int!) {
    listVitals(params: { patientId: $patientId, limit: 1000, offset: 0 }) {
      total
      data {
        id
        height
        weight
        bloodPressure
        temperature
        BMI
        createdAt
      }
    }
  }
`
