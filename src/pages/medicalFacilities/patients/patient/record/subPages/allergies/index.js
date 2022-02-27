import React, { useState } from 'react'
import 'styled-components/macro'
import {
  Core,
  Layout,
  Content,
  Loading,
  MenuNavigation,
  Notification,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { CreateAllergy, EditAllergy, DeleteAllergy } from './modals'
import { LIST_ALLERGIES } from './queries'
import { useQuery } from '@apollo/react-hooks'
import AllergyTable from './table'

const queryString = require('query-string')

export default function Index() {
  const [view, setView] = useState('Active')
  const {
    params: { patientId },
  } = useRouteMatch()
  const history = useHistory()
  const [completedAllergyCreate, setcompletedAllergyCreate] = useState(false)
  const [completedAllergyEdit, setcompletedAllergyEdit] = useState(false)
  const ReadPermission = PermissionCheck({
    feature: 'Patient Allergy',
    action: 'READ',
  })
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  //Query
  const { loading, error, data } = useQuery(LIST_ALLERGIES, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading Contained />
  if (error)
    return <Content.Alert type="error" message={'Failed to load allergies'} />

  const allergies = data.listExternalAllergies.data

  const activeAllergy = allergies
    .map((allergyMain, index) => {
      const { id, allergyId, allergy, fromOrganizationObject } =
        allergyMain || {}
      const { allergyStatus } = allergy || {}
      const { name: status } = allergyStatus || {}
      if (status === 'Active')
        return { id, allergyId, allergy, fromOrganizationObject }
      return null
    })
    .filter((item, index) => item !== null)

  const pastAllergy = allergies
    .map((allergyMain, index) => {
      const { id, allergyId, allergy, fromOrganizationObject } =
        allergyMain || {}
      const { allergyStatus } = allergy || {}
      const { name: status } = allergyStatus || {}
      if (status === 'Past')
        return { id, allergyId, allergy, fromOrganizationObject }
      return null
    })
    .filter((item, index) => item !== null)

  let AllergyData = allergies
  if (view === 'Active') AllergyData = activeAllergy
  else AllergyData = pastAllergy

  const showNotificationAllergyCreate = () => {
    setcompletedAllergyCreate(true)
    setTimeout(() => {
      setcompletedAllergyCreate(false)
    }, 6000)
  }
  const showNotificationAllergyEdit = () => {
    setcompletedAllergyEdit(true)
    setTimeout(() => {
      setcompletedAllergyEdit(false)
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
        setcompleted={setcompletedAllergyCreate}
        message="Allergy Successfully added."
        notification={completedAllergyCreate}
      />
      <Notification
        setcompleted={setcompletedAllergyEdit}
        message="Allergy Successfully updated."
        notification={completedAllergyEdit}
      />
      <Layout.TopPanel
        title="Allergies"
        to={`/facility/patient/record/${patientId}`}
      >
        <Core.Button
          purpose="major"
          onClick={() => history.push('?action=newAllergy')}
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
          <AllergyTable data={AllergyData} />
        </div>
      ) : (
        <RestrictedAccess small />
      )}
      {action === 'newAllergy' && (
        <CreateAllergy
          showNotificationAllergyCreate={showNotificationAllergyCreate}
        />
      )}
      {action === 'updateAllergy' && (
        <EditAllergy
          showNotificationAllergyEdit={showNotificationAllergyEdit}
        />
      )}
      {action === 'removeAllergy' && <DeleteAllergy />}
    </div>
  )
}
