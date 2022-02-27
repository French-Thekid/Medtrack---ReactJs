import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content } from 'components'
import { useHistory } from 'react-router-dom'
import { ForcePasswordResetForm } from '../forms'

export default function ForcePasswordModal({
  email,
  userId,
  firstName,
  lastName,
  showNotificationReset,
}) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="300px">
        <Content.CustomCard
          title="Force Password Reset"
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          <ForcePasswordResetForm
            userId={userId}
            email={email}
            firstName={firstName}
            lastName={lastName}
            close={() => {
              history.goBack()
            }}
            showNotificationReset={showNotificationReset}
          />
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
