import React from 'react'
import 'styled-components/macro'
import { useLocation } from 'react-router'
import { useQuery } from '@apollo/react-hooks'

import { Layout, Content, Loading } from 'components'
import { LIST_PHARMACY } from './forms/queries'
import {
  CreatePharmacyModal,
  EditPharmacyModal,
  SuspendPharmacyModal,
  EnablePharmacyModal,
  DeletePharmacyModal,
  ViewPharmacyModal,
} from './modals'
import PharmacyTable from './table'

const queryString = require('query-string')

export default function Pharmacies() {
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  const { loading, error, data: pharmacies, refetch } = useQuery(LIST_PHARMACY)
  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert
        type="error"
        message={'Failed to load Medical Facilities'}
      />
    )

  let flag = false
  const filteredFacilities = pharmacies.listFacilities
    .map((facility, index) => {
      if (facility.type === 'Pharmacy') {
        if (facility.status === 'CREATE_IN_PROGRESS') flag = true
        return facility
      }
      return null
    })
    .filter((item, j) => item !== null)

  if (flag) {
    setTimeout(() => refetch(), 5000)
    console.log('Refetching')
  }

  return (
    <Layout.Container>
      <PharmacyTable data={filteredFacilities} />
      {action === 'createPharmacy' && <CreatePharmacyModal />}
      {action === 'editPharmacy' && <EditPharmacyModal />}
      {action === 'deletePharmacy' && <DeletePharmacyModal />}
      {action === 'suspendPharmacy' && <SuspendPharmacyModal />}
      {action === 'enablePharmacy' && <EnablePharmacyModal />}
      {action === 'viewPharmacy' && <ViewPharmacyModal />}
    </Layout.Container>
  )
}
