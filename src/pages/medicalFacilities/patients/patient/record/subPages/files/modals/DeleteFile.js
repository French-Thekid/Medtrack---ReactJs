import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { LIST_FILES } from '../queries'
import { DELETE_FILE } from '../mutations'
import { useMutation } from '@apollo/react-hooks'
import {
  Layout,
  Content,
  Core,
  Colours,
  Loading,
  PermissionCheck,
  RestrictedAccess,
} from 'components'

const queryString = require('query-string')

export default function DeleteFile() {
  const { Dialog } = useDialog()
  const history = useHistory()
  const {
    params: { patientId },
  } = useRouteMatch()
  const { search } = useLocation()
  const { id } = queryString.parse(search)
  const Permission = PermissionCheck({
    feature: 'Patient Document',
    action: 'DELETE',
  })
  //Mutation
  const [deletePatientDocument, { loading, error }] = useMutation(DELETE_FILE, {
    refetchQueries: () => [
      {
        query: LIST_FILES,
        variables: { patientId: parseInt(patientId) },
      },
    ],
  })

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Delete File'}
          close={async () => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {Permission ? (
            <>
              {loading && <Loading />}
              {error && (
                <Content.Alert type="error" message="Fail to delete document" />
              )}
              <Core.Text>
                Are you sure you want to permanently delete this file?
              </Core.Text>
              <br />
              <Core.Button
                bgColour={Colours.red}
                onClick={async () => {
                  const ids = []
                  ids.push(parseInt(id))
                  await deletePatientDocument({
                    variables: {
                      id: ids,
                    },
                  }).catch((e) => console.log(e))
                  history.goBack()
                }}
              >
                Yes, Delete
              </Core.Button>
            </>
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
