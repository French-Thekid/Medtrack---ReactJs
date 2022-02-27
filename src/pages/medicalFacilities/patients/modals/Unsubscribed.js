import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { UnsubscribedForm } from '../forms'

export default function CreatePatient({ showNotificationRemoveAccount }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Unsubscribe From Patient'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {PermissionCheck({ feature: 'Patient', action: 'DELETE' }) ? (
            <UnsubscribedForm
              showNotificationRemoveAccount={showNotificationRemoveAccount}
              close={() => {
                localStorage.removeItem('selectedPatient')
                history.push('/facility/patients/allPatients')
              }}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
