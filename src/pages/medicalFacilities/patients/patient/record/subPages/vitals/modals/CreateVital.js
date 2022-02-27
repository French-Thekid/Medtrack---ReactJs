import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { CreateVitalform } from '../forms'

export default function CreateVital({ showNotificationVitalCreate }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const createPermission = PermissionCheck({
    feature: 'Patient Vital',
    action: 'CREATE',
  })
  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'New Vital'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {createPermission ? (
            <CreateVitalform
              close={() => {
                history.goBack()
              }}
              showNotificationVitalCreate={showNotificationVitalCreate}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
