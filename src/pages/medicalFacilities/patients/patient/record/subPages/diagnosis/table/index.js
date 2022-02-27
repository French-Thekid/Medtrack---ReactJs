import React from 'react'
import { useHistory } from 'react-router-dom'
import { Table } from 'components'

export default function DiagnosisTable({ data }) {
  const history = useHistory()

  const HeaderData = [
    'Name',
    'Description',
    'Diagnose At',
    'Diagnose By',
    'Diagnose On',
  ]
  const RowData = data.map(
    ({ diagnosis, fromOrganizationObject, ...rest }, index) => {
      const {
        name,
        createdAt,
        description,
        diagnosisStatus,
        createdByUser,
        symptoms,
      } = diagnosis || {}
      const { name: facilityName } = fromOrganizationObject || {}
      const { name: status } = diagnosisStatus || {}
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
        symptoms,
        ...rest,
      }
    }
  )

  const editAction = (data) => {
    localStorage.setItem('selectedDiagnosis', JSON.stringify(data))
    history.push(`?action=updateDiagnosis&Id=${data.diagnosisId}`)
  }
  const viewSymptomsAction = (data) => {
    localStorage.setItem('selectedDiagnosis', JSON.stringify(data))
    history.push(`?action=viewSymptoms`)
  }
  const deleteAction = (data) => {
    localStorage.setItem('selectedDiagnosis', JSON.stringify(data))
    history.push(`?action=removeDiagnosis&Id=${data.diagnosisId}`)
  }
  const handleRowClick = (id, data) => {
    localStorage.setItem('selectedDiagnosis', JSON.stringify(data))
    history.push(`?action=viewSymptoms`)
  }

  return (
    <Table
      noTopButton
      title={'Diagnosis'}
      altTitle="Diagnosis"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 2fr 1fr 1fr 1fr`}
      searchPlaceholder="Search Diagnosis"
      searchEnable
      checkBoxNeeded
      massLoading={false}
      massError={false}
      editAction={editAction}
      deleteAction={deleteAction}
      justify="start"
      alignment="start"
      rowClick={handleRowClick}
      symptomsAction={viewSymptomsAction}
    />
  )
}
