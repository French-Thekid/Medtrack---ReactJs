import gql from 'graphql-tag'

export const LIST_REFERRALS = gql`
  query listReferrals($patientId: Int!) {
    listReferrals(params: { patientId: $patientId, limit: 1000, offset: 0 }) {
      total
      to {
        id
        createdAt
        fromOrganization
        toOrganizationObject {
          name
        }
        referralStatus {
          name
        }
        title
        url
        createdByUser {
          firstName
          lastName
          type
          person {
            title
          }
        }
      }
      from {
        id
        createdAt
        fromOrganization
        toOrganizationObject {
          name
        }
        referralStatus {
          name
        }
        title
        url
        createdByUser {
          firstName
          lastName
          type
          person {
            title
          }
        }
      }
    }
  }
`
