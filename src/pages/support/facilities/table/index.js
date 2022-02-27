import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import { Table } from 'components'
import { DELETE_MEDICAL_FACILITY } from '../forms/mutations'
import { LIST_MEDICAL_FACILITY } from '../forms/queries'

export default function FacilityTable({ data = [] }) {
  const history = useHistory()

  const [deleteFacility, { loading, error: deleteFacilityFailed }] =
    useMutation(DELETE_MEDICAL_FACILITY, {
      refetchQueries: () => [
        {
          query: LIST_MEDICAL_FACILITY,
        },
      ],
    })
  // eslint-disable-next-line

  const HeaderData = ['Logo', 'Name', 'Status', 'Tax ID', 'Facility ID']
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

  const DeleteMultipleAction = async (ids) => {
    console.log('Deleting: ', ids)
    await deleteFacility({
      variables: {
        id: ids,
      },
    }).catch((e) => console.log(e))
    // refetch()
    history.goBack()
  }

  const SuspendMultipleAction = (ids) => {
    ids.map((id, index) =>
      // DeleteOrgContext(id, noRefresh).catch((e) => console.log(e))
      console.log(id)
    )
    history.goBack()
  }

  const EnableMultipleAction = (ids) => {
    ids.map((id, index) =>
      // DeleteOrgContext(id, noRefresh).catch((e) => console.log(e))
      console.log(id)
    )
    history.goBack()
  }

  const DeleteAction = (data) =>
    history.push(`?action=deleteFacility&&facilityId=${data.id}`)

  const suspendAction = (data) =>
    history.push(
      `?action=suspendFacility&&facilityId=${data.id}&&status=SUSPENDED`
    )

  const enableAction = (data) =>
    history.push(`?action=enableFacility&&facilityId=${data.id}&&status=ACTIVE`)

  const editAction = (data) => {
    localStorage.setItem('selectedOrg', JSON.stringify(data))
    history.push(`?action=editFacility&&facilityId=${data.id}`)
  }

  const handleRowClick = (id, data) => {
    localStorage.setItem('selectedOrg', JSON.stringify(data))
    history.push(`?action=viewfacility`)
  }

  return (
    <Table
      MainButtonpath="?action=createFacility"
      title="Showing All Medical Facilities"
      altTitle="Medical Facilities"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`100px repeat(4,1fr)`}
      searchPlaceholder="Search Facility Name"
      buttonTitle="New Medical Facility"
      searchEnable
      hasAvatar
      checkBoxNeeded
      rowClick={handleRowClick}
      massLoading={loading}
      massError={deleteFacilityFailed}
      deleteAction={DeleteAction}
      suspendAction={suspendAction}
      enableAction={enableAction}
      editAction={editAction}
      deleteMultipleAction={DeleteMultipleAction}
      suspendMultipleAction={SuspendMultipleAction}
      enableMultipleAction={EnableMultipleAction}
      breakingPoint="1250px"
    />
  )
}
