import React from 'react'
import 'styled-components/macro'
import { Layout, Loading, Content } from 'components'
import FacilityTable from './table'
import {
  CreateFacilityModal,
  EditFacilityModal,
  SuspendFacilityModal,
  EnableFacilityModal,
  DeleteFacilityModal,
  ViewFacilityModal,
} from './modals'
import { useLocation } from 'react-router-dom'
import { LIST_MEDICAL_FACILITY } from './forms/queries'
import { useQuery } from '@apollo/react-hooks'

const queryString = require('query-string')

export default function Facilities() {
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  const {
    loading,
    error,
    data: facilities,
    refetch,
  } = useQuery(LIST_MEDICAL_FACILITY)
  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert
        type="error"
        message={'Failed to load Medical Facilities'}
      />
    )

  let flag = false
  const filteredFacilities = facilities.listFacilities
    .map((facility, index) => {
      if (facility.type === 'Medical Facility') {
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
      <FacilityTable data={filteredFacilities} />
      {action === 'createFacility' && <CreateFacilityModal />}
      {action === 'editFacility' && <EditFacilityModal />}
      {action === 'deleteFacility' && <DeleteFacilityModal />}
      {action === 'suspendFacility' && <SuspendFacilityModal />}
      {action === 'enableFacility' && <EnableFacilityModal />}
      {action === 'viewfacility' && <ViewFacilityModal />}
    </Layout.Container>
  )
}
