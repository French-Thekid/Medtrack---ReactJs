import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { EditMedicineForm } from '../forms'

export default function CreateMedicine({ showNotificationMedicineEdit }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const editPermission = PermissionCheck({
    feature: 'Patient Medicine',
    action: 'UPDATE',
  })
  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Edit Medicine'}
          close={() => {
            history.goBack()
            localStorage.removeItem('selectedMedicine')
          }}
          minWidth="450px"
        >
          {editPermission ? (
            <EditMedicineForm
              close={() => {
                history.goBack()
                localStorage.removeItem('selectedMedicine')
              }}
              showNotificationMedicineEdit={showNotificationMedicineEdit}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
