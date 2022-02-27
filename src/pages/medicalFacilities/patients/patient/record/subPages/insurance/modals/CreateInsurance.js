import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { CreateInsuranceForm } from '../forms'

export default function CreateInsurance({ showNotificationInsuranceCreate }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const Permission = PermissionCheck({
    feature: 'Patient Medical Insurance',
    action: 'CREATE',
  })
  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'New Insurance'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {Permission ? (
            <CreateInsuranceForm
              close={() => {
                history.goBack()
              }}
              showNotificationInsuranceCreate={showNotificationInsuranceCreate}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
