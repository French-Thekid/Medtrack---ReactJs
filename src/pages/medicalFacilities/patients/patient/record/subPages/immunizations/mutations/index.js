import { gql } from 'apollo-boost'

export const CREATE_IMMUNIZATION = gql`
  mutation createImmunizationsVaccination(
    $immunizationsVaccination: ImmunizationsVaccinationsCreateInput!
  ) {
    createImmunizationsVaccination(
      immunizationsVaccination: $immunizationsVaccination
    ) {
      id
    }
  }
`
export const UPDATE_IMMUNIZATION = gql`
  mutation updateImmunizationsVaccination(
    $immunizationsVaccination: ImmunizationsVaccinationsUpdateInput!
  ) {
    updateImmunizationsVaccination(
      immunizationsVaccination: $immunizationsVaccination
    ) {
      id
    }
  }
`
export const DELETE_IMMUNIZATION = gql`
  mutation deleteImmunizationsVaccination($id: [Int]!) {
    deleteImmunizationsVaccination(id: $id) {
      message
    }
  }
`
