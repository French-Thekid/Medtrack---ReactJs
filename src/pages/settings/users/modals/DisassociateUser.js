import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content } from 'components'
import { useHistory } from 'react-router-dom'
import { DissociateUserForm } from '../forms'

export default function DissociateUser({ showNotificationSuspend }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  const { type } = JSON.parse(localStorage.getItem('selectedUser')) || {}

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="300px">
        <Content.CustomCard
          title={type === 'Doctor' ? 'Disassociate User' : 'Disable User'}
          close={() => {
            history.goBack()
            localStorage.removeItem('selectedUser')
          }}
          minWidth="450px"
        >
          <DissociateUserForm
            close={() => {
              history.goBack()
              localStorage.removeItem('selectedUser')
            }}
            showNotificationSuspend={showNotificationSuspend}
          />
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
