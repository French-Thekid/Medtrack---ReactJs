import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { EditInsuranceForm } from '../forms'

export default function CreateInsurance({ showNotificationInsuranceEdit }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const Permission = PermissionCheck({
    feature: 'Patient Medical Insurance',
    action: 'UPDATE',
  })
  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Edit Insurance'}
          close={() => {
            history.goBack()
            localStorage.removeItem('selectedInsurance')
          }}
          minWidth="450px"
        >
          {Permission ? (
            <EditInsuranceForm
              close={() => {
                history.goBack()
                localStorage.removeItem('selectedInsurance')
              }}
              showNotificationInsuranceEdit={showNotificationInsuranceEdit}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
