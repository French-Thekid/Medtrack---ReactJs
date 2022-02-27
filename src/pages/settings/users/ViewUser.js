import React, { useState, useContext } from 'react'
import 'styled-components/macro'

import {
  Content,
  Layout,
  Core,
  Colours,
  Icons,
  FormControl,
  Notification,
} from 'components'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import { ForcePasswordModal, DisableUserModal, EnableUser } from './modals'
import { OrganisationContext } from 'context'

const queryString = require('query-string')

export default function ViewUser() {
  const {
    params: { userId },
  } = useRouteMatch()
  const { status } = useContext(OrganisationContext)
  const [completedSuspended, setcompletedSuspended] = useState(false)
  const [completedEnabled, setcompletedEnabled] = useState(false)
  const [completedReset, setcompletedReset] = useState(false)
  const [showMenu, setshowMenu] = useState(false)

  const history = useHistory()
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  const {
    firstName,
    lastName,
    avatar,
    doctor = [],
    person,
    email,
    enabled,
    type,
    role,
  } = JSON.parse(localStorage.getItem('selectedUser')) || {}
  const { name, description } = role || {}
  const { contact = {} } = person || {}
  const { contact_number } = contact || {}
  const { registrationNumber } = doctor && doctor.length > 0 ? doctor[0] : {}

  const showNotificationSuspend = () => {
    setcompletedSuspended(true)
    setTimeout(() => {
      setcompletedSuspended(false)
    }, 6000)
  }
  const showNotificationEnable = () => {
    setcompletedEnabled(true)
    setTimeout(() => {
      setcompletedEnabled(false)
    }, 6000)
  }
  const showNotificationReset = () => {
    setcompletedReset(true)
    setTimeout(() => {
      setcompletedReset(false)
    }, 6000)
  }

  return (
    <>
      <div
        css={`
          height: 100%;
          display: grid;
          grid-template-rows: max-content 1fr;
          grid-gap: 20px;
        `}
      >
        <Layout.TopPanel
          title="View User"
          to="/facility/settings/users/tables/allUsers"
          cleanUp={() => localStorage.removeItem('selectedUser')}
        >
          <Notification
            setcompleted={setcompletedSuspended}
            message="User account successfully suspended."
            notification={completedSuspended}
          />
          <Notification
            setcompleted={setcompletedEnabled}
            message="User account successfully enabled."
            notification={completedEnabled}
          />
          <Notification
            setcompleted={setcompletedReset}
            message="Force Reset Password on user successful."
            notification={completedReset}
          />
          <div
            css={`
              display: grid;
              grid-template-columns: repeat(3, max-content);
              grid-gap: 10px;
              align-items: Center;
            `}
          >
            <Core.Button
              purpose="major"
              bgColour={Colours.orange}
              onClick={() => history.push(`?action=ForceResetPassword`)}
            >
              Force Reset Password
            </Core.Button>
            <Core.Button
              purpose="major"
              onClick={() =>
                history.push(`/facility/settings/users/manage-user/${userId}`)
              }
            >
              Manage
            </Core.Button>
            <div
              css={`
                color: ${Colours.textGrey};
                height: max-content;
                display: grid;
                place-items: center;
                &:hover {
                  cursor: ${status === 'SUSPENDED' ? 'not-allowed' : 'pointer'};
                }
              `}
            >
              <section
                onClick={() => {
                  if (status !== 'SUSPENDED') setshowMenu(true)
                }}
              >
                <Icons.MoreVertIcon />
              </section>
              <Content.Menu show={showMenu} action={setshowMenu}>
                <Content.MenuItems
                  title={
                    enabled === 1 ? 'Disassociate/Disable user' : 'Enable user'
                  }
                  Icon={Icons.BlockIcon}
                  setshowMenu={setshowMenu}
                  path={
                    enabled === 1 ? '?action=disableUser' : '?action=enableUser'
                  }
                />
              </Content.Menu>
            </div>
          </div>
        </Layout.TopPanel>
        <div
          css={`
            display: grid;
            grid-template-columns: 400px 1fr;
            grid-gap: 30px;
            height: 100%;
            overflow-y: auto;
            @media screen and (max-width: 769px) {
              grid-template-columns: 1fr;
              grid-template-rows: max-content;
              grid-gap: 50px;
            }
            /* table */
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
            <DetailsDisplay
              firstName={firstName}
              lastName={lastName}
              avatar={avatar}
              registrationNumber={registrationNumber}
              phone={contact_number}
              email={email}
              type={type}
              roleAssigned={name}
            />
          </Layout.Card>
          <Layout.Card title="Role Assigned" responsive>
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
                  grid-template-columns: 200px 1fr;
                  grid-gap: 20px;
                  padding-bottom: 5px;
                  border-bottom: 1px solid ${Colours.border};
                `}
              >
                <Core.Text color={Colours.textGrey}>Name</Core.Text>
                <Core.Text color={Colours.textGrey}>Description</Core.Text>
              </div>
              <div
                css={`
                  height: 100%;
                  overflow-y: auto;
                `}
              >
                <div
                  css={`
                    height: max-content;
                    display: grid;
                    grid-template-columns: 200px 1fr;
                    grid-gap: 20px;
                    overflow-y: auto;
                    padding-bottom: 10px;
                  `}
                >
                  <Core.Text color={Colours.purple}>{name}</Core.Text>
                  <Core.Text>{description}</Core.Text>
                </div>
              </div>
            </div>
          </Layout.Card>
        </div>
      </div>
      {action === 'ForceResetPassword' && (
        <ForcePasswordModal
          userId={userId}
          firstName={firstName}
          lastName={lastName}
          email={email}
          showNotificationReset={showNotificationReset}
        />
      )}
      {action === 'disableUser' && (
        <DisableUserModal
          userId={userId}
          type={type}
          firstName={firstName}
          lastName={lastName}
          showNotificationSuspend={showNotificationSuspend}
        />
      )}
      {action === 'enableUser' && (
        <EnableUser showNotificationEnable={showNotificationEnable} special />
      )}
    </>
  )
}

const DetailsDisplay = ({
  firstName,
  lastName,
  avatar,
  registrationNumber,
  phone,
  email,
  type,
  roleAssigned,
}) => {
  return (
    <div
      css={`
        display: grid;
        grid-gap: 30px;
        justify-items: center;
      `}
    >
      <Content.Avatar
        responsive
        src={avatar}
        size="huge"
        firstName={firstName}
        lastName={lastName}
        shadow
      />
      <FormControl.ResponsiveSection>
        <Layout.DataDisplay label="First Name" value={firstName} />
        <Layout.DataDisplay label="Last Name" value={lastName} />

        <Layout.DataDisplay highlight label="Phone" value={phone} />
        <Layout.DataDisplay label="Type" value={type} />

        <Layout.DataDisplay label="Role" value={roleAssigned || 'Basic'} />
        {type === 'Doctor' && (
          <Layout.DataDisplay
            label="Registration Number"
            value={registrationNumber}
            highlight
          />
        )}
      </FormControl.ResponsiveSection>
      <Layout.DataDisplay highlight label="Email Address" value={email} />
    </div>
  )
}
