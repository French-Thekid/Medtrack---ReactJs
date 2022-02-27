import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content } from 'components'
import { useHistory } from 'react-router-dom'
import { SuspendFacilityForm } from '../forms'

export default function SuspendFacility() {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true}>
        <Content.CustomCard
          title="Suspend Facility"
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          <SuspendFacilityForm
            close={() => {
              history.goBack()
            }}
          />
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
