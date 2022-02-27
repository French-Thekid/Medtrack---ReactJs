import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { EditNoteForm } from '../forms'

export default function CreatePatient() {
  const { Dialog } = useDialog()
  const history = useHistory()

  const UpdatePermission = PermissionCheck({
    feature: 'Note',
    action: 'UPDATE',
  })

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Edit Note'}
          close={() => {
            localStorage.removeItem('selectedNote')
            history.goBack()
          }}
          minWidth="550px"
        >
          {UpdatePermission ? (
            <EditNoteForm
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
