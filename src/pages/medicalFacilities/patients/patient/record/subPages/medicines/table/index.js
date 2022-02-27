import React from 'react'
import { useHistory } from 'react-router-dom'
import { Table } from 'components'

export default function MedicineTable({ data }) {
  const history = useHistory()

  const HeaderData = [
    'Name',
    'Dosage',
    'Instructions',
    'Prescribed At',
    'Prescribed By',
    'Prescribed On',
  ]
  const RowData = data.map(
    ({ medicine, fromOrganizationObject, ...rest }, index) => {
      const {
        name,
        dosage,
        createdAt,
        description,
        medicineStatus,
        createdByUser,
      } = medicine || {}
      const { name: facilityName } = fromOrganizationObject || {}
      const { name: status } = medicineStatus || {}
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
        dosage,
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
    localStorage.setItem('selectedMedicine', JSON.stringify(data))
    history.push(`?action=updateMedicine&Id=${data.medicineId}`)
  }
  const deleteAction = (data) => {
    localStorage.setItem('selectedMedicine', JSON.stringify(data))
    history.push(`?action=removeMedicine&Id=${data.medicineId}`)
  }

  //   const handleRowClick = (id, data) => {
  // localStorage.setItem('selectedMedicine', JSON.stringify(data))
  // history.push(`/facility/settings/roles/view-role/${id}`)
  //   }

  return (
    <Table
      noTopButton
      title={'Medicines'}
      altTitle="Medicines"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 2fr 1fr 1fr 1fr`}
      searchPlaceholder="Search Medicines"
      searchEnable
      checkBoxNeeded
      //   rowClick={handleRowClick}
      massLoading={false}
      massError={false}
      editAction={editAction}
      deleteAction={deleteAction}
      justify="start"
      alignment="start"
    />
  )
}
