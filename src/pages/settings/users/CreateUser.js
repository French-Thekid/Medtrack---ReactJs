import React, { useState } from 'react'
import 'styled-components/macro'
import {
  Layout,
  Core,
  Colours,
  FormControl,
  Notification,
  Loading,
  Content,
} from 'components'
import { RadioGroup, FormControlLabel } from '@material-ui/core'
import { LIST_ROLES, SEARCH_ROLES } from '../roles/queries'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { CreateUserForm } from './forms'

export default function CreateUser() {
  const [selectedRole, setSelectedRole] = useState('')
  const [complete, setcompleted] = useState(false)

  const handleRoleSelection = (event) => {
    setSelectedRole(event.target.value)
  }

  //Query
  let { loading, error, data: roles } = useQuery(LIST_ROLES)
  const [
    searchRoles,
    { loading: loading0, error: error0, data: searchResult },
  ] = useLazyQuery(SEARCH_ROLES)

  if (loading) return <Loading small />
  if (loading0) console.log('Searching')
  if (error || error0)
    return <Content.Alert type="error" message={'Failed to load roles'} />

  //Handling Seaarch Results
  const { listRoles: searchListRoles } = searchResult || {}
  const { total: searchTotal } = searchListRoles || {}

  if (searchTotal > 0) roles = searchResult

  const showNotification = () => {
    setcompleted(true)
    setTimeout(() => {
      setcompleted(false)
    }, 8000)
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
        setcompleted={setcompleted}
        message="User account successfully created."
        notification={complete}
      />
      <Layout.TopPanel
        title="New User"
        btnTitle="Create"
        to={'/facility/settings/users/tables/allUsers'}
      >
        <Core.Button type="submit" form="createUser">
          Create
        </Core.Button>
      </Layout.TopPanel>
      <div
        css={`
          display: grid;
          grid-template-columns: 400px 1fr;
          grid-gap: 30px;
          height: 100%;
          overflow-y: auto;

          /* Tablets */
          @media screen and (max-width: 769px) {
            @media screen and (max-height: 1025px) {
              @media screen and (orientation: portrait) {
                grid-template-columns: 1fr;
                grid-template-rows: max-content;
                grid-gap: 50px;
              }
            }
          }
        `}
      >
        <Layout.Card title="User Details">
          <CreateUserForm
            formId="createUser"
            selectedRole={selectedRole}
            showNotification={showNotification}
          />
        </Layout.Card>
        <Layout.Card
          title="Assign Role"
          responsive
          searchHandler={searchRoles}
          searchPlaceholder="search Roles"
        >
          <div
            css={`
              height: 100%;
              display: grid;
              grid-template-rows: max-content 1fr;
              grid-gap: 20px;
              overflow-y: auto;
            `}
          >
            <div
              css={`
                height: 100%;
                display: grid;
                grid-template-columns: 150px 1fr 50px;
                grid-gap: 20px;
                padding-bottom: 5px;
                border-bottom: 1px solid ${Colours.border};
              `}
            >
              <Core.Text color={Colours.textGrey}>Name</Core.Text>
              <Core.Text color={Colours.textGrey}>Description</Core.Text>
              <Core.Text color={Colours.textGrey}>Select</Core.Text>
            </div>
            <div
              css={`
                height: 100%;
                overflow-y: auto;
              `}
            >
              {loading0 && <Loading Contained />}
              <RadioGroup
                name="role"
                value={selectedRole}
                onChange={handleRoleSelection}
              >
                {roles.listRoles.data.map((role, index) => {
                  if (role.name !== 'Supreme Administrator')
                    return (
                      <div
                        key={index}
                        css={`
                          height: max-content;
                          display: grid;
                          grid-template-columns: 150px 1fr 40px;
                          grid-gap: 20px;
                          overflow-y: auto;
                          padding-bottom: 10px;
                          border-bottom: 1px solid ${Colours.border};
                          margin-bottom: 40px;
                        `}
                      >
                        <Core.Text color={Colours.purple}>
                          {role.name}
                        </Core.Text>
                        <Core.Text>{role.description}</Core.Text>
                        <FormControlLabel
                          value={role.id.toString()}
                          control={<FormControl.RadioButton />}
                        />
                      </div>
                    )
                  return null
                })}
              </RadioGroup>
            </div>
          </div>
        </Layout.Card>
      </div>
    </div>
  )
}
