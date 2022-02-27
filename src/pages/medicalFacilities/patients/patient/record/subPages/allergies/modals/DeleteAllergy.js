import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { LIST_ALLERGIES } from '../queries'
import { DELETE_ALLERGY } from '../mutations'
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

export default function DeleteAllergy() {
  const { Dialog } = useDialog()
  const history = useHistory()
  const { search } = useLocation()
  const { Id } = queryString.parse(search)
  const Permission = PermissionCheck({
    feature: 'Patient Allergy',
    action: 'DELETE',
  })
  const {
    params: { patientId },
  } = useRouteMatch()

  //Mutation
  const [deleteAllergies, { loading, error }] = useMutation(DELETE_ALLERGY, {
    refetchQueries: () => [
      {
        query: LIST_ALLERGIES,
        variables: { patientId: parseInt(patientId) },
      },
    ],
  })

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Delete Allergy'}
          close={async () => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {Permission ? (
            <>
              {loading && <Loading />}
              {error && (
                <Content.Alert type="error" message="Fail to delete allergy" />
              )}
              <Core.Text>
                Are you sure you want to delete this allergy?
              </Core.Text>
              <br />
              <Core.Button
                bgColour={Colours.red}
                onClick={async () => {
                  let ids = []
                  ids.push(parseInt(Id))
                  await deleteAllergies({
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
