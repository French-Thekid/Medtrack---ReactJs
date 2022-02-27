import gql from 'graphql-tag'

export const LIST_REFERRALS = gql`
  query listReferrals {
    listReferrals(params: { limit: 1000, offset: 0 }) {
      total
      to {
        id
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

export const SEARCH_REFERRALS = gql`
  query listReferrals($query: String) {
    listReferrals(params: { limit: 1000, offset: 0, search: $query }) {
      total
      to {
        id
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
