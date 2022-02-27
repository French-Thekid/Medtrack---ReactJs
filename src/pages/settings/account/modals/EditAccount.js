import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content } from 'components'
import { useHistory } from 'react-router-dom'
import { EditAccountForm } from '../forms'

export default function DeleteUserModal({ showNotificationProfile }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="300px">
        <Content.CustomCard
          title={'Edit Account'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          <EditAccountForm
            close={() => {
              history.goBack()
            }}
            showNotificationProfile={showNotificationProfile}
          />
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
