import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { CreateMedicineForm } from '../forms'

export default function CreateMedicine({ showNotificationMedicineCreate }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const createPermission = PermissionCheck({
    feature: 'Patient Medicine',
    action: 'CREATE',
  })
  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'New Medicine'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {createPermission ? (
            <CreateMedicineForm
              close={() => {
                history.goBack()
              }}
              showNotificationMedicineCreate={showNotificationMedicineCreate}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
