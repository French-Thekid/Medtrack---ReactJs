import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { FormControl, Core, Content } from 'components'
import { withCookies } from 'react-cookie'
import { usePostFetch } from 'hooks'

function NewPasswordForm({ cookies }) {
  const history = useHistory()
  const { newUserToken, newUserAttributes } = cookies.cookies
  const {
    postData: updatePassword,
    error: updateErrors,
    data,
  } = usePostFetch({
    method: 'POST',
    url: `/v1/auth/change-temporary-password`,
    useTokens: false,
  })
  let { email } = JSON.parse(newUserAttributes)
  if (data) {
    let {
      AuthenticationResult: { RefreshToken: UserRefreshToken },
    } = data
    // Remove old cookies
    cookies.remove('isNewUser', { path: '/' })
    cookies.remove('newUserToken', { path: '/' })

    localStorage.setItem('refreshToken', UserRefreshToken)
    history.push('/')
  }
  const passwordRegExp1 = /[a-z]/
  const passwordRegExp2 = /[A-Z]/
  const passwordRegExp3 = /[0-9]/
  return (
    <Formik
      initialValues={{ password: '', passwordConfirmation: '' }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .matches(passwordRegExp1, 'Lower Case value required')
          .matches(passwordRegExp2, 'Upper Case value required')
          .matches(passwordRegExp3, 'Numeric value required')
          .required('Password is required')
          .min(8, '8 characters required'),
        passwordConfirmation: Yup.string()
          .required('Password Confirmation is required')
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      })}
      onSubmit={async ({ password }, actions) => {
        updatePassword({
          username: email,
          password,
          sessionToken: newUserToken,
        })
        actions.setSubmitting(false)
      }}
    >
      {(props) => {
        const {
          values: { password, passwordConfirmation },
          handleChange,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
          handleBlur,
        } = props

        return (
          <>
            <form onSubmit={handleSubmit} data-testid="sign-in-form">
              <div
                css={`
                  display: grid;
                  grid-row-gap: 20px;
                `}
              >
                <section>
                  <FormControl.Input
                    id="password"
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={password}
                    data-testid="newPassword-password"
                    error={errors.password && touched.password}
                  />
                  <FormControl.Error
                    show={errors.password && touched.password}
                    message={errors.password}
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
                <FormControl.PasswordStrength password={password} responsive />
                <div
                  css={`
                    margin-top: 20px;
                  `}
                >
                  <Core.Button
                    id="newPassword-continue"
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="newPassword-continue"
                  >
                    Continue
                  </Core.Button>
                </div>
                {updateErrors ? (
                  <Content.Alert type="error" message={updateErrors} />
                ) : null}
              </div>
            </form>
          </>
        )
      }}
    </Formik>
  )
}
export default withCookies(NewPasswordForm)
