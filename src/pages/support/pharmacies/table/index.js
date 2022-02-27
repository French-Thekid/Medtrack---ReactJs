import React from 'react'
import { useHistory } from 'react-router-dom'

import { Table } from 'components'

export default function PharmacyTable({ data = [] }) {
  const history = useHistory()

  // eslint-disable-next-line

  const HeaderData = ['Logo', 'Name', 'Status', 'Tax ID', 'Pharmacy ID']
  const RowData = data.map(
    ({ logoUrl, name, status, taxId, organizationId, ...rest }, index) => {
      return {
        logoUrl,
        name,
        status,
        taxId,
        organizationId,
        id: organizationId,
        ...rest,
      }
    }
  )
  const DeleteAction = (data) =>
    history.push(`?action=deletePharmacy&&pharmacyId=${data.id}`)

  const suspendAction = (data) =>
    history.push(
      `?action=suspendPharmacy&&pharmacyId=${data.id}&&status=SUSPENDED`
    )

  const enableAction = (data) =>
    history.push(`?action=enablePharmacy&&pharmacyId=${data.id}&&status=ACTIVE`)

  const editAction = (data) => {
    localStorage.setItem('selectedOrg', JSON.stringify(data))
    history.push(`?action=editPharmacy&&pharmacyId=${data.id}`)
  }

  const handleRowClick = (id, data) => {
    localStorage.setItem('selectedOrg', JSON.stringify(data))
    history.push(`?action=viewPharmacy`)
  }

  return (
    <Table
      MainButtonpath="?action=createPharmacy"
      title="Showing All Pharmacies"
      altTitle="Medical Facilities"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`100px repeat(4,1fr)`}
      searchPlaceholder="Search Pharmacy"
      buttonTitle="New Pharmacy"
      searchEnable
      hasAvatar
      checkBoxNeeded
      rowClick={handleRowClick}
      massLoading={false}
      massError={false}
      deleteAction={DeleteAction}
      suspendAction={suspendAction}
      enableAction={enableAction}
      editAction={editAction}
      breakingPoint="1250px"
    />
  )
}
