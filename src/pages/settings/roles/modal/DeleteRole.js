import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content } from 'components'
import { useHistory } from 'react-router-dom'
import { DeleteRoleform } from '../form'

export default function DeleteRole({ showNotificationDelete }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="300px">
        <Content.CustomCard
          title={'Delete Role'}
          close={() => {
            localStorage.removeItem('selectedRole')
            history.goBack()
          }}
          minWidth="450px"
        >
          <DeleteRoleform
            close={() => {
              localStorage.removeItem('selectedRole')
              history.goBack()
            }}
            showNotificationDelete={showNotificationDelete}
          />
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
