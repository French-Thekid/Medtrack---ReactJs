import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { CreatePatientForm } from '../forms'

export default function CreatePatient({ showNotificationCreate }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'New Patient'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {PermissionCheck({ feature: 'Patient', action: 'CREATE' }) ? (
            <CreatePatientForm
              close={() => {
                history.goBack()
              }}
              showNotificationCreate={showNotificationCreate}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
