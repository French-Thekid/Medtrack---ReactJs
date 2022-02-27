import React, { useState } from 'react'
import 'styled-components/macro'
import UserSelection from './UserSelection'
import { Layout, Core, Notification } from 'components'
import { CreateRoleForm } from './form'

export default function CreateRole() {
  const [selectedUsers, setSelectedUsers] = useState({ users: [] })
  const [completed, setcompleted] = useState(false)
  const showNotification = () => {
    setcompleted(true)
    setTimeout(() => {
      setcompleted(false)
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
      <Layout.TopPanel title="New Role" btnTitle="Create">
        <Core.Button type="submit" form="createRole">
          Create
        </Core.Button>
      </Layout.TopPanel>
      <div
        css={`
          display: grid;
          grid-template-columns: 350px 1fr;
          grid-gap: 30px;
          height: 100%;
          overflow-y: auto;
          @media screen and (max-width: 769px) {
            grid-template-columns: 1fr;
            grid-template-rows: max-content;
            grid-gap: 50px;
          }
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
          /* Ipod Pro */
          @media (width: 1024px) {
            @media (height: 1366px) {
              @media (orientation: portrait) {
                grid-template-columns: 1fr;
                grid-template-rows: max-content;
                grid-gap: 50px;
              }
            }
          }
        `}
      >
        <Layout.Card title="Role Details">
          <CreateRoleForm
            formId="createRole"
            selectedUsers={selectedUsers.users}
            showNotification={showNotification}
          />
        </Layout.Card>
        <UserSelection
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      </div>
      <Notification
        setcompleted={setcompleted}
        message="Role successfully created."
        notification={completed}
      />
    </div>
  )
}
