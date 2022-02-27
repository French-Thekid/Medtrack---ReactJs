import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { EditPatientForm } from '../forms'

export default function EditPatient({ showNotificationEdit }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Edit Patient'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {PermissionCheck({ feature: 'Patient', action: 'UPDATE' }) ? (
            <EditPatientForm
              close={() => {
                history.goBack()
              }}
              showNotificationEdit={showNotificationEdit}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
