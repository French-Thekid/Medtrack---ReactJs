import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { CreateDiagnosisForm } from '../forms'

export default function CreateDiagnosis({ showNotificationFileCreate }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const Permission = PermissionCheck({
    feature: 'Patient Diagnosis',
    action: 'CREATE',
  })
  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'New Diagnosis'}
          close={() => {
            history.goBack()
          }}
          minWidth="650px"
        >
          {Permission ? (
            <CreateDiagnosisForm
              close={() => {
                history.goBack()
              }}
              showNotificationFileCreate={showNotificationFileCreate}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
