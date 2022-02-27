import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content } from 'components'
import { useHistory } from 'react-router-dom'
import { CreateBillForm } from '../forms'

export default function CreateBilling({ showNotificationCreate }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'New Bill'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          <CreateBillForm
            close={() => {
              history.goBack()
            }}
            showNotificationCreate={showNotificationCreate}
          />
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
