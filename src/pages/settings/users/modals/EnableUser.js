import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content } from 'components'
import { useHistory } from 'react-router-dom'
import { EnableUser } from '../forms'

export default function EnableUserModal({ showNotificationEnable, special }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  const { userId, type, firstName, lastName } =
    JSON.parse(localStorage.getItem('selectedUser')) || {}

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="300px">
        <Content.CustomCard
          title={'Enable User'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          <EnableUser
            userId={userId}
            type={type}
            firstName={firstName}
            lastName={lastName}
            close={() => {
              history.goBack()
              if (!special) localStorage.removeItem('selectedUser')
            }}
            showNotificationEnable={showNotificationEnable}
          />
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
