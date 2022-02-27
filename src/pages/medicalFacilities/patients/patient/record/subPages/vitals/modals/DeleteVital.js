import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { LIST_VITALS } from '../queries'
import { DELETE_VITALS } from '../mutations'
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

export default function DeleteBill() {
  const { Dialog } = useDialog()
  const history = useHistory()
  const { search } = useLocation()
  const { Id } = queryString.parse(search)
  const deletePermission = PermissionCheck({
    feature: 'Patient Vital',
    action: 'DELETE',
  })
  const {
    params: { patientId },
  } = useRouteMatch()

  //Mutation
  const [deleteVital, { loading, error }] = useMutation(DELETE_VITALS, {
    refetchQueries: () => [
      {
        query: LIST_VITALS,
        variables: { patientId: parseInt(patientId) },
      },
    ],
  })

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Delete Vital'}
          close={async () => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {deletePermission ? (
            <>
              {loading && <Loading />}
              {error && (
                <Content.Alert type="error" message="Fail to delete vital" />
              )}
              <Core.Text>Are you sure you want to delete this vital?</Core.Text>
              <br />
              <Core.Button
                bgColour={Colours.red}
                onClick={async () => {
                  let ids = []
                  ids.push(parseInt(Id))
                  await deleteVital({
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
