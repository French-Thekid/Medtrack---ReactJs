import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { LIST_VACCINES } from '../queries'
import { DELETE_IMMUNIZATION } from '../mutations'
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

export default function DeleteImmunization() {
  const { Dialog } = useDialog()
  const history = useHistory()
  const { search } = useLocation()
  const { Id } = queryString.parse(search)
  const Permission = PermissionCheck({
    feature: 'Patient Immunization Vaccination',
    action: 'DELETE',
  })
  const {
    params: { patientId },
  } = useRouteMatch()

  //Mutation
  const [deleteImmunizationsVaccination, { loading, error }] = useMutation(
    DELETE_IMMUNIZATION,
    {
      refetchQueries: () => [
        {
          query: LIST_VACCINES,
          variables: { patientId: parseInt(patientId) },
        },
      ],
    }
  )

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Delete Immunization/Vaccines'}
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
                  message="Fail to delete immunization/vaccine"
                />
              )}
              <Core.Text>
                Are you sure you want to delete this immunization/vaccine?
              </Core.Text>
              <br />
              <Core.Button
                bgColour={Colours.red}
                onClick={async () => {
                  let ids = []
                  ids.push(parseInt(Id))
                  await deleteImmunizationsVaccination({
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
