import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content } from 'components'
import { useHistory } from 'react-router-dom'
import { EditRoleform } from '../form'

export default function EditRole({ showNotification }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="300px">
        <Content.CustomCard
          title={'Edit Role'}
          close={() => {
            localStorage.removeItem('selectedRole')
            history.goBack()
          }}
          minWidth="450px"
        >
          <EditRoleform
            close={() => {
              localStorage.removeItem('selectedRole')
              history.goBack()
            }}
            showNotification={showNotification}
          />
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
