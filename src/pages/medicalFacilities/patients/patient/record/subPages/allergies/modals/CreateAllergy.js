import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { CreateAllergyForm } from '../forms'

export default function CreateAllergy({ showNotificationAllergyCreate }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const Permission = PermissionCheck({
    feature: 'Patient Allergy',
    action: 'CREATE',
  })
  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'New Allergy'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {Permission ? (
            <CreateAllergyForm
              close={() => {
                history.goBack()
              }}
              showNotificationAllergyCreate={showNotificationAllergyCreate}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
