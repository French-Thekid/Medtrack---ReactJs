import { gql } from 'apollo-boost'

export const CREATE_REFERRAL = gql`
  mutation createReferral($referral: ReferralCreateInput!) {
    createReferral(referral: $referral) {
      id
    }
  }
`

export const CREATE_EXTERNAL_REFERRAL = gql`
  mutation createExternalReferral(
    $referral: ReferralExternalFacilityCreateInput!
  ) {
    createExternalReferral(referral: $referral) {
      id
    }
  }
`

export const ACCEPT_REFERRAL = gql`
  mutation acceptReferral($id: [Int]!) {
    acceptReferral(id: $id) {
      message
    }
  }
`
export const DECLINE_REFERRAL = gql`
  mutation declineReferral($id: [Int]!) {
    declineReferral(id: $id) {
      message
    }
  }
`
