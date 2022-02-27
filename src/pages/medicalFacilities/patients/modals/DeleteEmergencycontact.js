import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import {
  Layout,
  Content,
  Loading,
  Core,
  Colours,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { useHistory, useLocation } from 'react-router-dom'

import { useMutation } from '@apollo/react-hooks'
import { DELETE_EMERGENCY_CONTACT } from '../mutations'
import { LIST_EMERGENCY_CONTACT } from '../queries'

const queryString = require('query-string')

export default function RemoveEmergencyContact() {
  const { Dialog } = useDialog()
  const history = useHistory()
  const permission = PermissionCheck({
    feature: 'Patient Emergency Contact',
    action: 'DELETE',
  })
  const { search } = useLocation()
  const { id } = queryString.parse(search)

  const { patientPersonId } = JSON.parse(
    localStorage.getItem('selectedPatient')
  )

  const [deleteEmergencyContact, { loading, error: deleteFailed }] =
    useMutation(DELETE_EMERGENCY_CONTACT, {
      refetchQueries: () => [
        {
          query: LIST_EMERGENCY_CONTACT,
          variables: { patientPersonId: parseInt(patientPersonId) },
        },
      ],
    })

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Remove Emergency Contact'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {permission ? (
            <>
              {loading && <Loading />}
              {deleteFailed && (
                <Content.Alert
                  type="error"
                  message="Failed to remove Emergency Contact"
                />
              )}
              <Core.Text>
                Are you sure you want to remove this emergency contact?
              </Core.Text>
              <br />
              <Core.Button
                bgColour={Colours.red}
                onClick={async () => {
                  let Ids = []
                  Ids.push(parseInt(id))
                  await deleteEmergencyContact({
                    variables: {
                      id: Ids,
                    },
                  }).catch((e) => console.log(e))
                  history.goBack()
                }}
              >
                Yes, Remove
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
