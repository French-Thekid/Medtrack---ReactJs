import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { FORCE_RESET_PASSWORD } from '../mutations'
import { LIST_USERS } from '../queries'
import { Colours, FormControl, Core, Loading, Content } from 'components'

function ForcePasswordResetForm({
  email,
  userId,
  firstName,
  lastName,
  showNotificationReset,
}) {
  const history = useHistory()

  const [adminForceResetUserPassword, { loading, error }] = useMutation(
    FORCE_RESET_PASSWORD,
    {
      refetchQueries: () => [
        {
          query: LIST_USERS,
        },
      ],
      onCompleted(adminForceResetUserPassword) {
        showNotificationReset()
      },
    }
  )

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
        console.log('Resetting User: ', email)
        await adminForceResetUserPassword({
          variables: {
            email,
          },
        }).catch((e) => console.log(e))
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
            {loading && <Loading small />}
            {error && (
              <Content.Alert
                type="error"
                message="Fail to Force Reset User's Password"
              />
            )}
            <Core.Text>
              Are your sure you want to force reset{' '}
              <b
                css={`
                  color: ${Colours.purple};
                `}
              >
                {firstName} {lastName}'s
              </b>{' '}
              <br />
              password? Please note that proceeding with this action will force
              <br />
              the user to reset their password on their next login.
              <br />
              <br />
              <br /> Type the user's ID{' '}
              <b
                css={`
                  color: ${Colours.purple};
                `}
              >
                {userId}
              </b>
              <br />
              in the fields below to proceed.
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
              bgColour={Colours.orange}
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: '20px' }}
            >
              Force Reset Password
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}

export default ForcePasswordResetForm
