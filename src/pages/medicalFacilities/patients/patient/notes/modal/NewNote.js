import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, PermissionCheck, RestrictedAccess } from 'components'
import { useHistory } from 'react-router-dom'
import { CreateNoteForm } from '../forms'

export default function CreateNote({ showNotificationNote }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const CreatePermission = PermissionCheck({
    feature: 'Note',
    action: 'CREATE',
  })
  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Attach Note'}
          close={() => {
            history.goBack()
          }}
          minWidth="550px"
        >
          {CreatePermission ? (
            <CreateNoteForm
              close={() => {
                history.goBack()
              }}
              showNotificationNote={showNotificationNote}
            />
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
