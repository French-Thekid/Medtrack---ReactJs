import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { EditAllergyForm } from '../forms'

export default function CreateAllergy({ showNotificationAllergyEdit }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const Permission = PermissionCheck({
    feature: 'Patient Allergy',
    action: 'UPDATE',
  })
  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Edit Allergy'}
          close={() => {
            history.goBack()
            localStorage.removeItem('selectedAllergy')
          }}
          minWidth="450px"
        >
          {Permission ? (
            <EditAllergyForm
              close={() => {
                history.goBack()
                localStorage.removeItem('selectedAllergy')
              }}
              showNotificationAllergyEdit={showNotificationAllergyEdit}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
