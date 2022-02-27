import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { RemoveNoteForm } from '../forms'

export default function CreatePatient() {
  const { Dialog } = useDialog()
  const history = useHistory()
  const DeletePermission = PermissionCheck({
    feature: 'Note',
    action: 'DELETE',
  })

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Remove Note'}
          close={() => {
            localStorage.removeItem('selectedNote')
            history.goBack()
          }}
          minWidth="450px"
        >
          {DeletePermission ? (
            <RemoveNoteForm
              close={() => {
                localStorage.removeItem('selectedNote')
                history.goBack()
              }}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
