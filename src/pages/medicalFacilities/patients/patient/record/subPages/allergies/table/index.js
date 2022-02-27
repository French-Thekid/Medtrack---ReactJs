import React from 'react'
import { useHistory } from 'react-router-dom'
import { Table } from 'components'

export default function AllergyTable({ data }) {
  const history = useHistory()

  const HeaderData = [
    'Name',
    'Description',
    'Diagnose At',
    'Diagnose By',
    'Diagnose On',
  ]
  const RowData = data.map(
    ({ allergy, fromOrganizationObject, ...rest }, index) => {
      const { name, createdAt, description, allergyStatus, createdByUser } =
        allergy || {}
      const { name: facilityName } = fromOrganizationObject || {}
      const { name: status } = allergyStatus || {}
      const {
        person,
        firstName: CFirstName,
        lastName: CLastName,
        type: userType,
      } = createdByUser || {}
      const { title } = person || {}
      const createdByFormat = {
        title,
        type: userType,
        firstName: CFirstName,
        lastName: CLastName,
      }
      return {
        name,
        description,
        facilityName,
        createdBy: JSON.stringify(createdByFormat),
        createdAt,
        status: status === 'Active' ? true : false,
        ...rest,
      }
    }
  )

  const editAction = (data) => {
    localStorage.setItem('selectedAllergy', JSON.stringify(data))
    history.push(`?action=updateAllergy&Id=${data.allergyId}`)
  }
  const deleteAction = (data) => {
    localStorage.setItem('selectedAllergy', JSON.stringify(data))
    history.push(`?action=removeAllergy&Id=${data.allergyId}`)
  }

  return (
    <Table
      noTopButton
      title={'Allergies'}
      altTitle="Allergies"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 2fr 1fr 1fr 1fr`}
      searchPlaceholder="Search Allergies"
      searchEnable
      checkBoxNeeded
      massLoading={false}
      massError={false}
      editAction={editAction}
      deleteAction={deleteAction}
      justify="start"
      alignment="start"
    />
  )
}
