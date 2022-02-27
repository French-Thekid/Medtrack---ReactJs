import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import 'styled-components/macro'
import { Content, Core, FormControl, Loading } from 'components'
import { CHANGE_PASSWORD } from '../mutations'
import { useMutation } from '@apollo/react-hooks'

export default function ChangePasswordForm({ id, showNotificationPassword }) {
  const passwordRegExp1 = /[a-z]/
  const passwordRegExp2 = /[A-Z]/
  const passwordRegExp3 = /[0-9]/

  const userConfig = JSON.parse(localStorage.getItem('session'))
  const accessToken = userConfig.AuthenticationResult.AccessToken

  const [changeUserPassword, { loading, error }] = useMutation(
    CHANGE_PASSWORD,
    {
      onCompleted(changeUserPassword) {
        showNotificationPassword()
      },
    }
  )

  let { graphQLErrors } = error || {}
  let { code } = (graphQLErrors && graphQLErrors[0]) || {}
  if (code && code !== undefined) code = JSON.parse(code)
  const { extensions } = code || {}
  const { code: Actualcode } = extensions || {}

  return (
    <Formik
      initialValues={{
        previousPassword: '',
        proposedPassword: '',
        passwordConfirmation: '',
      }}
      validationSchema={Yup.object().shape({
        previousPassword: Yup.string().required('Current Password is required'),
        proposedPassword: Yup.string()
          .matches(passwordRegExp1, 'Lower Case value required')
          .matches(passwordRegExp2, 'Upper Case value required')
          .matches(passwordRegExp3, 'Numeric value required')
          .required('Password is required')
          .min(8, '8 characters required'),
        passwordConfirmation: Yup.string()
          .required('Password Confirmation is required')
          .oneOf([Yup.ref('proposedPassword'), null], 'Passwords must match'),
      })}
      onSubmit={async (
        { proposedPassword, previousPassword },
        { resetForm, setSubmitting }
      ) => {
        await changeUserPassword({
          variables: {
            params: {
              proposedPassword,
              previousPassword,
              accessToken,
            },
          },
        }).catch((e) => {
          console.log(e)
          return (
            <FormControl.Error
              name="failed"
              show={true}
              message={'Failed to change password'}
            />
          )
        })
        resetForm()
        setSubmitting(false)
      }}
    >
      {(props) => {
        const {
          values: { proposedPassword, previousPassword, passwordConfirmation },
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
        } = props

        return (
          <>
            <form onSubmit={handleSubmit} data-testid="sign-in-form" id={id}>
              {loading && <Loading Contained />}
              {Actualcode === 'Password_Already_Exists' ? (
                <Content.Alert
                  type="error"
                  message="New Password cannot be the same as previous passwords"
                />
              ) : (
                error && (
                  <Content.Alert
                    type="error"
                    message="Failed to change password"
                  />
                )
              )}
              <div
                css={`
                  width: 100%;
                  display: grid;
                  grid-row-gap: 20px;
                  @media screen and (min-width: 1440px) {
                    grid-row-gap: 30px;
                    margin-bottom: 20px;
                  }
                `}
              >
                <div
                  css={`
                    width: 100%;
                    display: grid;
                    justify-items: center;
                    margin-bottom: 10px;
                  `}
                >
                  <Core.Text customSize="20px">
                    Please enter your new password below
                  </Core.Text>
                </div>
                <section>
                  <FormControl.Input
                    id="previousPassword"
                    label="Current Password"
                    placeholder="Current Password"
                    name="previousPassword"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={previousPassword}
                    data-testid="newPassword-previousPassword"
                    error={errors.previousPassword && touched.previousPassword}
                  />
                  <FormControl.Error
                    show={errors.previousPassword && touched.previousPassword}
                    message={errors.previousPassword}
                  />
                </section>
                <section>
                  <FormControl.Input
                    id="proposedPassword"
                    label="Password"
                    placeholder="Password"
                    name="proposedPassword"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={proposedPassword}
                    data-testid="newPassword-proposedPassword"
                    error={errors.proposedPassword && touched.proposedPassword}
                  />
                  <FormControl.Error
                    show={errors.proposedPassword && touched.proposedPassword}
                    message={errors.proposedPassword}
                  />
                </section>
                <section>
                  <FormControl.Input
                    id="passwordConfirmation"
                    label="Password Confirmation"
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={passwordConfirmation}
                    data-testid="newPassword-passwordConfirmation"
                    error={
                      errors.passwordConfirmation &&
                      touched.passwordConfirmation
                    }
                  />
                  <FormControl.Error
                    show={
                      errors.passwordConfirmation &&
                      touched.passwordConfirmation
                    }
                    message={errors.passwordConfirmation}
                  />
                </section>
              </div>
              <FormControl.PasswordStrength password={proposedPassword} />
            </form>
          </>
        )
      }}
    </Formik>
  )
}
