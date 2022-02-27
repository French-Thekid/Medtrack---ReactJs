import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { EditDiagnosisForm } from '../forms'

export default function EditDiagnosis({ showNotificationDiagnosisEdit }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const Permission = PermissionCheck({
    feature: 'Patient Diagnosis',
    action: 'UPDATE',
  })
  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Edit Diagnosis'}
          close={() => {
            history.goBack()
            localStorage.removeItem('selectedDiagnosis')
          }}
          minWidth="650px"
        >
          {Permission ? (
            <EditDiagnosisForm
              close={() => {
                history.goBack()
                localStorage.removeItem('selectedDiagnosis')
              }}
              showNotificationDiagnosisEdit={showNotificationDiagnosisEdit}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
