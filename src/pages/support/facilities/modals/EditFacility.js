import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content } from 'components'
import { useHistory } from 'react-router-dom'
import { EditFacilityForm } from '../forms'

export default function EditFacility() {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true}>
        <Content.CustomCard
          title="Edit Facility"
          close={() => {
            history.goBack()
          }}
          minWidth="500px"
        >
          <EditFacilityForm
            close={() => {
              history.goBack()
            }}
          />
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
