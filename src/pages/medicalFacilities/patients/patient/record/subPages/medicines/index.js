import React, { useState } from 'react'
import 'styled-components/macro'
import {
  Layout,
  Core,
  MenuNavigation,
  Loading,
  Content,
  Notification,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { CreateMedicine, EditMedicine, DeleteMedicine } from './modals'
import MedicineTable from './table'
import { LIST_MEDICINES } from './queries'
import { useQuery } from '@apollo/react-hooks'

const queryString = require('query-string')

export default function Index() {
  const {
    params: { patientId },
  } = useRouteMatch()
  const history = useHistory()
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const [view, setView] = useState('Active')
  const [completedMedicineCreate, setcompletedMedicineCreate] = useState(false)
  const [completedMedicineEdit, setcompletedMedicineEdit] = useState(false)
  const ReadPermission = PermissionCheck({
    feature: 'Patient Medicine',
    action: 'READ',
  })
  //Query
  const { loading, error, data } = useQuery(LIST_MEDICINES, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading Contained />
  if (error)
    return <Content.Alert type="error" message={'Failed to load medicines'} />

  const medicines = data.listExternalMedicines.data || []

  const activeMedicines = medicines
    .map((medicineMain, index) => {
      const { id, medicineId, medicine, fromOrganizationObject } =
        medicineMain || {}
      const { medicineStatus } = medicine || {}
      const { name: status } = medicineStatus || {}
      if (status === 'Active')
        return { id, medicineId, medicine, fromOrganizationObject }
      return null
    })
    .filter((item, index) => item !== null)

  const pastMedicines = medicines
    .map((medicineMain, index) => {
      const { id, medicineId, medicine, fromOrganizationObject } =
        medicineMain || {}
      const { medicineStatus } = medicine || {}
      const { name: status } = medicineStatus || {}
      if (status === 'Past')
        return { id, medicineId, medicine, fromOrganizationObject }
      return null
    })
    .filter((item, index) => item !== null)

  let MedicineData = medicines
  if (view === 'Active') MedicineData = activeMedicines
  else MedicineData = pastMedicines

  const showNotificationMedicineCreate = () => {
    setcompletedMedicineCreate(true)
    setTimeout(() => {
      setcompletedMedicineCreate(false)
    }, 6000)
  }
  const showNotificationMedicineEdit = () => {
    setcompletedMedicineEdit(true)
    setTimeout(() => {
      setcompletedMedicineEdit(false)
    }, 6000)
  }

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 20px;
      `}
    >
      <Notification
        setcompleted={setcompletedMedicineCreate}
        message="Medicine Successfully added."
        notification={completedMedicineCreate}
      />
      <Notification
        setcompleted={setcompletedMedicineEdit}
        message="Medicine Successfully updated."
        notification={completedMedicineEdit}
      />
      <Layout.TopPanel
        title="Medicines"
        to={`/facility/patient/record/${patientId}`}
      >
        <Core.Button
          purpose="major"
          onClick={() => history.push('?action=newMedicine')}
        >
          Add New
        </Core.Button>
      </Layout.TopPanel>
      {ReadPermission ? (
        <div
          css={`
            display: grid;
            grid-template-rows: max-content 1fr;
            grid-row-gap: 20px;
            overflow-y: auto;
          `}
        >
          <MenuNavigation.Container>
            <MenuNavigation.MainItem
              alternative={() => setView('Active')}
              active={view === 'Active'}
            >
              Active
            </MenuNavigation.MainItem>
            <MenuNavigation.MainItem
              alternative={() => setView('Past')}
              active={view === 'Past'}
            >
              Past
            </MenuNavigation.MainItem>
          </MenuNavigation.Container>

          <MedicineTable data={MedicineData} />
        </div>
      ) : (
        <RestrictedAccess small />
      )}
      {action === 'newMedicine' && (
        <CreateMedicine
          showNotificationMedicineCreate={showNotificationMedicineCreate}
        />
      )}
      {action === 'updateMedicine' && (
        <EditMedicine
          showNotificationMedicineEdit={showNotificationMedicineEdit}
        />
      )}
      {action === 'removeMedicine' && <DeleteMedicine />}
    </div>
  )
}
