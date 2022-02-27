import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content } from 'components'
import { useHistory } from 'react-router-dom'
import { EditPharmacyForm } from '../forms'

export default function EditPharmacy() {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true}>
        <Content.CustomCard
          title="Edit Pharmacy"
          close={() => {
            history.goBack()
          }}
          minWidth="500px"
        >
          <EditPharmacyForm
            close={() => {
              history.goBack()
            }}
          />
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
