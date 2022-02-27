import { gql } from 'apollo-boost'

export const CREATE_REPORT = gql`
  mutation createReport($report: ReportCreateInput!) {
    createReport(report: $report) {
      id
    }
  }
`

export const DELETE_REPORT = gql`
  mutation deleteReport($id: [Int]!) {
    deleteReport(id: $id) {
      message
    }
  }
`
