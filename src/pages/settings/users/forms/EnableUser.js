import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { ENABLE_USER } from '../mutations'
import { LIST_USERS } from '../queries'

import { Colours, Core, Loading, Content } from 'components'

export default function EnableUserForm({ close, showNotificationEnable }) {
  const { id, firstName, lastName } =
    JSON.parse(localStorage.getItem('selectedUser')) || {}

  const [enableSuspendedUser, { loading, error: enableSuspendedUserFailed }] =
    useMutation(ENABLE_USER, {
      refetchQueries: () => [
        {
          query: LIST_USERS,
        },
      ],
      onCompleted(enableSuspendedUser) {
        showNotificationEnable()
      },
    })

  return (
    <Formik
      initialValues={{
        EnableConfirmation: '',
      }}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true)
        console.log('Enabling User: ', id)
        await enableSuspendedUser({
          variables: {
            id: new Array(id),
          },
        }).catch((e) => console.log(e))
        close()
      }}
    >
      {(props) => {
        const { isSubmitting, handleSubmit } = props
        return (
          <form onSubmit={handleSubmit}>
            {loading && <Loading small />}
            {enableSuspendedUserFailed && (
              <Content.Alert type="error" message="Failed to enable User" />
            )}

            <Core.Text>
              Are your sure you want to enable{' '}
              <b
                css={`
                  color: ${Colours.purple};
                `}
              >
                {firstName} {lastName}'s
              </b>{' '}
              account?
              <br />
            </Core.Text>

            <br />
            <Core.Button
              bgColour={Colours.purple}
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: '20px' }}
            >
              {isSubmitting ? 'Enabling' : 'Yes, Enable'}
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
