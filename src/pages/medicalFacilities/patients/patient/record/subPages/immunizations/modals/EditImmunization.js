import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { EditImmunizationForm } from '../forms'

export default function CreateImmunization({ showNotificationVaccineEdit }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const Permission = PermissionCheck({
    feature: 'Patient Immunization Vaccination',
    action: 'UPDATE',
  })
  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Edit Immunization'}
          close={() => {
            history.goBack()
            localStorage.removeItem('selectedImmunization')
          }}
          minWidth="250px"
        >
          {Permission ? (
            <EditImmunizationForm
              close={() => {
                history.goBack()
                localStorage.removeItem('selectedImmunization')
              }}
              showNotificationVaccineEdit={showNotificationVaccineEdit}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
