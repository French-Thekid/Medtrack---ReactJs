import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content } from 'components'
import { useHistory } from 'react-router-dom'
import { DeleteFacilityForm } from '../forms'


export default function DeleteFacility() {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true}>
        <Content.CustomCard
          title="Delete Facility"
          close={() => {
            history.goBack()
          }}
          minWidth="500px"
        >
          <DeleteFacilityForm
            close={() => {
              history.goBack()
            }}
          />
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
