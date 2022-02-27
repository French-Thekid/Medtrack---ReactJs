import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content } from 'components'
import { useHistory } from 'react-router-dom'
import { DeleteUser } from '../forms'

export default function DeleteUserModal({ showNotificationDelete }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="300px">
        <Content.CustomCard
          title={'Delete User'}
          close={() => {
            localStorage.removeItem('selectedUser')
            history.goBack()
          }}
          minWidth="450px"
        >
          <DeleteUser
            close={() => {
              localStorage.removeItem('selectedUser')
              history.goBack()
            }}
            showNotificationDelete={showNotificationDelete}
          />
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
