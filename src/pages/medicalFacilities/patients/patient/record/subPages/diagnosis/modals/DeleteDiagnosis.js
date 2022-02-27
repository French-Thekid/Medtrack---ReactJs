import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { LIST_DIAGNOSIS } from '../queries'
import { DELETE_DIAGNOSIS } from '../mutations'
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

export default function DeletDiagnosis() {
  const { Dialog } = useDialog()
  const history = useHistory()
  const { search } = useLocation()
  const { Id } = queryString.parse(search)

  const {
    params: { patientId },
  } = useRouteMatch()

  //Mutation
  const [deleteDiagnosis, { loading, error }] = useMutation(DELETE_DIAGNOSIS, {
    refetchQueries: () => [
      {
        query: LIST_DIAGNOSIS,
        variables: { patientId: parseInt(patientId) },
      },
    ],
  })
  const Permission = PermissionCheck({
    feature: 'Patient Diagnosis',
    action: 'DELETE',
  })

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Delete Diagnosis'}
          close={async () => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {Permission ? (
            <>
              {loading && <Loading />}
              {error && (
                <Content.Alert
                  type="error"
                  message="Fail to delete diagnosis"
                />
              )}
              <Core.Text>
                Are you sure you want to delete this diagnosis?
              </Core.Text>
              <br />
              <Core.Button
                bgColour={Colours.red}
                onClick={async () => {
                  let ids = []
                  ids.push(parseInt(Id))
                  await deleteDiagnosis({
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
