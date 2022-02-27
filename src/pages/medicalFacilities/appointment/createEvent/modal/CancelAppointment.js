import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import { LIST_APPOINTMENTS } from '../../queries'
import { DELETE_APPOINTMENT } from '../../mutations'
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

export default function BookAppointment() {
  const { Dialog } = useDialog()
  const history = useHistory()
  const { search } = useLocation()
  const { id: eventId } = queryString.parse(search)
  const cancelPermission = PermissionCheck({
    feature: 'Appointment',
    action: 'DELETE',
  })
  //Mutation to Cancel Appointment
  const [deleteAppointment, { loading: removing, error: deleteFailed }] =
    useMutation(DELETE_APPOINTMENT, {
      refetchQueries: () => [
        {
          query: LIST_APPOINTMENTS,
        },
      ],
    })

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Cancel Appointment'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {cancelPermission ? (
            <>
              {removing && <Loading />}
              {deleteFailed && (
                <Content.Alert
                  type="error"
                  message="Failed to cancel appointment"
                />
              )}
              <Core.Text>
                Are you sure you want to cancel this appointment? Cancelling
                this
                <br />
                appointment is a permanent process, once this action is executed
                <br />
                all parties involved will be notified of the cancellation
              </Core.Text>
              <br />
              <Core.Button
                bgColour={Colours.red}
                onClick={async () => {
                  let Ids = []
                  Ids.push(parseInt(eventId))
                  await deleteAppointment({
                    variables: {
                      id: Ids,
                    },
                  }).catch((e) => console.log(e))
                  history.goBack()
                }}
              >
                Cancel Appointment
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
