import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { CreateImmunizationForm } from '../forms'

export default function CreateImmunization({ showNotificationVaccineCreate }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const Permission = PermissionCheck({
    feature: 'Patient Immunization Vaccination',
    action: 'CREATE',
  })
  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'New Immunization'}
          close={() => {
            history.goBack()
          }}
          minWidth="250px"
        >
          {Permission ? (
            <CreateImmunizationForm
              close={() => {
                history.goBack()
              }}
              showNotificationVaccineCreate={showNotificationVaccineCreate}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
