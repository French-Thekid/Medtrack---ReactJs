import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content } from 'components'
import { useHistory } from 'react-router-dom'
import { EditBillForm } from '../forms'

export default function EditBilling({ showNotificationEdit }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Edit Bill'}
          close={() => {
            history.goBack()
            localStorage.removeItem('selectedBilling')
          }}
          minWidth="450px"
        >
          <EditBillForm
            close={() => {
              history.goBack()
              localStorage.removeItem('selectedBilling')
            }}
            showNotificationEdit={showNotificationEdit}
          />
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
