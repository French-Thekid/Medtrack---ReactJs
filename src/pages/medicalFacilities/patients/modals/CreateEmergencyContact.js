import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { CreateEmergencycontactForm } from '../forms'

export default function CreateEmergencyContact({ showNotificationCreate }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const permission = PermissionCheck({
    feature: 'Patient Emergency Contact',
    action: 'CREATE',
  })

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'New Emergency Contact'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {permission ? (
            <CreateEmergencycontactForm
              close={() => {
                history.goBack()
              }}
              showNotificationCreate={showNotificationCreate}
            />
          ) : (
            <RestrictedAccess />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
