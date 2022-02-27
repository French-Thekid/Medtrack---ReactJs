import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useHistory } from 'react-router-dom'

import { useMutation } from '@apollo/react-hooks'
import { DISASSOCIATE_USER, DISABLE_USER } from '../mutations'
import { LIST_USERS } from '../queries'

import { Colours, FormControl, Core, Content, Loading } from 'components'

export default function DisableUserForm({
  type,
  userId,
  firstName,
  lastName,
  showNotificationSuspend,
}) {
  const history = useHistory()

  const [disassociateUser, { loading, error: disassociateUserFailed }] =
    useMutation(DISASSOCIATE_USER, {
      refetchQueries: () => [
        {
          query: LIST_USERS,
        },
      ],
      onCompleted(disassociateUser) {
        showNotificationSuspend()
      },
    })

  const [disableUser, { loading: loading1, error: disasbleUserFailed }] =
    useMutation(DISABLE_USER, {
      refetchQueries: () => [
        {
          query: LIST_USERS,
        },
      ],
      onCompleted(disableUser) {
        showNotificationSuspend()
      },
    })

  return (
    <Formik
      initialValues={{
        resetConfirmation: '',
      }}
      validationSchema={object().shape({
        resetConfirmation: string()
          .test(
            'match',
            `Please type the User's ID to confirm.`,
            function (resetConfirmation) {
              return resetConfirmation === userId.toString()
            }
          )
          .required(`Please type the user's ID to confirm.`),
      })}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true)
        //Execute function here
        console.log('Disabling User: ', userId)
        if (type === 'Doctor') {
          await disassociateUser({
            variables: {
              id: new Array(userId),
            },
          }).catch((e) => console.log(e))
        } else {
          await disableUser({
            variables: {
              id: new Array(userId),
            },
          }).catch((e) => console.log(e))
        }
        history.goBack()
      }}
    >
      {(props) => {
        const {
          values,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
        } = props
        return (
          <form onSubmit={handleSubmit}>
            {loading || (loading1 && <Loading small />)}
            {disassociateUserFailed ||
              (disasbleUserFailed && (
                <Content.Alert
                  type="error"
                  message="Fail to disassociate Doctor"
                />
              ))}
            <Core.Text>
              Are your sure you want to{' '}
              {type === 'Doctor' ? 'disassociate ' : 'disable '}
              <b
                css={`
                  color: ${Colours.purple};
                `}
              >
                {firstName} {lastName}'s
              </b>{' '}
              account?
              <br />
              Type the user's ID{' '}
              <b
                css={`
                  color: ${Colours.purple};
                `}
              >
                {userId}
              </b>{' '}
              <br />
              in the field below to proceed.
            </Core.Text>

            <br />
            <FormControl.Input
              label="User ID"
              id="resetConfirmation"
              type="text"
              placeholder="User ID"
              value={values.deleteConfirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ marginBottom: '0' }}
              error={errors.resetConfirmation && touched.resetConfirmation}
            />
            <FormControl.Error
              name="resetConfirmation"
              show={errors.resetConfirmation && touched.resetConfirmation}
              message={errors.resetConfirmation}
            />
            <Core.Button
              bgColour={Colours.red}
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: '20px' }}
            >
              {type === 'Doctor' ? 'Disassociate ' : 'Disable '} User
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
