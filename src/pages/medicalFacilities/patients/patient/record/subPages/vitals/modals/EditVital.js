import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { EditVitalform } from '../forms'

export default function EditVital({ showNotificationVitalEdit }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const updatePermission = PermissionCheck({
    feature: 'Patient Vital',
    action: 'UPDATE',
  })

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Edit Vital'}
          close={() => {
            history.goBack()
            localStorage.removeItem('selectedVital')
          }}
          minWidth="450px"
        >
          {updatePermission ? (
            <EditVitalform
              close={() => {
                history.goBack()
                localStorage.removeItem('selectedVital')
              }}
              showNotificationVitalEdit={showNotificationVitalEdit}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
