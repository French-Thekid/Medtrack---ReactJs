import React, { useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { FormControl, Core, Content, Loading } from 'components'
import { usePostFetch } from 'hooks'
import { useCookies } from 'react-cookie'
import { SessionContext, AuthContext } from 'context'

export default function SignInform() {
  const history = useHistory()
  const { createAuthSession } = useContext(SessionContext)
  const [, setCookie] = useCookies(['isNewUser'])
  const {
    setShowForcePasswordResetModal,
    setShowDisassociatedModal,
    // setForcePasswordResetReq,
    // isForcePasswordResetReq: { status },
  } = useContext(AuthContext)

  const {
    errorCode = {},
    // bodyData = {},
    postData: login,
    error: loginErrors,
    loading,
    data,
  } = usePostFetch({
    method: 'POST',
    url: `/v1/auth/signin`,
    useTokens: false,
  })

  const setNewUserType = (data) => {
    const {
      ChallengeParameters: { userAttributes },
    } = data
    setCookie('isNewUser', true, { path: '/' })
    setCookie('newUserToken', data.Session, { path: '/' })
    setCookie('newUserAttributes', userAttributes, { path: '/' })
  }

  //Checking if user has to forcibly change password
  if (errorCode && errorCode.code === 'PasswordResetRequiredException') {
    setShowForcePasswordResetModal(true)
  }
  if (errorCode && errorCode.code === 'User_Disassociated') {
    setShowDisassociatedModal(true)
  }

  if (data) {
    //If Session present, then user is new
    if (data.Session) {
      setNewUserType(data)
    } else {
      createAuthSession(data)
    }
  }
  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Email must be valid!')
            .required('Email is a required field'),
          password: Yup.string().required('Password is a required field'),
        })}
        onSubmit={async ({ email, password }, actions) => {
          await login({
            username: email,
            password: password.trim(),
          })
          actions.setSubmitting(false)
        }}
      >
        {(props) => {
          const {
            errors,
            touched,
            handleBlur,
            values: { email, password },
            handleChange,
            handleSubmit,
            isSubmitting,
          } = props

          return (
            <>
              {loading && <Loading />}
              <form onSubmit={handleSubmit} data-testid="sign-in-form">
                <div
                  css={`
                    display: grid;
                    grid-row-gap: 20px;
                  `}
                >
                  <section>
                    <FormControl.Input
                      id="email"
                      placeholder="Email"
                      label="Email Address"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={email}
                      data-testid="sign-in-email"
                      error={errors.email && touched.email}
                    />
                    <FormControl.Error
                      show={errors.email && touched.email}
                      message={errors.email}
                      data-testid="sign-in-email-error"
                    />
                  </section>
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
                      data-testid="sign-in-password"
                      error={errors.password && touched.password}
                    />
                    <FormControl.Error
                      show={errors.password && touched.password}
                      message={errors.password}
                      data-testid="sign-in-password-error"
                    />
                    <section
                      css={`
                        display: grid;
                        grid-template-columns: 25px 1fr max-content;
                        align-items: center;
                        margin-top: 5px;
                      `}
                    >
                      <FormControl.Checkbox />

                      <Core.Text size="sm">Remember My Password</Core.Text>

                      <section
                        css={`
                          &:hover {
                            cursor: pointer;
                          }
                        `}
                        onClick={() => history.push('/forget-password')}
                      >
                        <Core.Text size="sm">Forget Password</Core.Text>
                      </section>
                    </section>
                  </section>
                  <div
                    css={`
                      margin-top: 20px;
                    `}
                  >
                    <Core.Button
                      id="signup-submit"
                      type="submit"
                      disabled={isSubmitting}
                      data-testid="sign-in-submit"
                    >
                      {isSubmitting ? 'Logging In' : 'Login'}
                    </Core.Button>
                  </div>
                  {errorCode &&
                  errorCode.code ===
                    'PasswordResetRequiredException' ? null : errorCode &&
                    errorCode.code === 'User_Suspended' ? (
                    <Content.Alert
                      type="error"
                      message={'Your Account has been suspended'}
                    />
                  ) : loginErrors ? (
                    <Content.Alert
                      type="error"
                      message={'Failed to Login, please try again'}
                    />
                  ) : null}
                </div>
              </form>
            </>
          )
        }}
      </Formik>
    </>
  )
}
