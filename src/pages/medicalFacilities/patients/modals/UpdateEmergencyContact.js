import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { UpdateEmergencyContactForm } from '../forms'

export default function CreateEmergencyContact() {
  const { Dialog } = useDialog()
  const history = useHistory()
  const permission = PermissionCheck({
    feature: 'Patient Emergency Contact',
    action: 'UPDATE',
  })

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Update Emergency Contact'}
          close={() => {
            history.goBack()
            localStorage.removeItem('selectedContact')
          }}
          minWidth="450px"
        >
          {permission ? (
            <UpdateEmergencyContactForm
              close={() => {
                history.goBack()
                localStorage.removeItem('selectedContact')
              }}
            />
          ) : (
            <RestrictedAccess />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
