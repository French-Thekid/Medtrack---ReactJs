import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content } from 'components'
import { useHistory } from 'react-router-dom'
import { DisableUserForm } from '../forms'

export default function DisableUser({
  userId,
  type,
  firstName,
  lastName,
  showNotificationSuspend,
}) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="300px">
        <Content.CustomCard
          title={type === 'Doctor' ? 'Disassociate User' : 'Disable User'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          <DisableUserForm
            userId={userId}
            type={type}
            firstName={firstName}
            lastName={lastName}
            close={() => {
              history.goBack()
            }}
            showNotificationSuspend={showNotificationSuspend}
          />
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
