import React, { useContext } from 'react'
import { Formik } from 'formik'
import { AuthContext } from '../../../context'
import * as Yup from 'yup'
import 'styled-components/macro'
import { FormControl, Core, Colours } from 'components'
import { useHistory } from 'react-router'
import { getParameterByName } from '../../../utils/'

export default function ForgetPasswordConfirmationForm({
  user = { code: '', password: '', passwordConfirmation: '' },
  email,
  force,
  needSpace,
}) {
  const { resetPassword, resendCode, setForcePasswordResetReq } =
    useContext(AuthContext)
  const history = useHistory()
  const code = getParameterByName('code')
  const token = getParameterByName('token')
  return (
    <Formik
      initialValues={{ token, code, password: '', passwordConfirmation: '' }}
      validationSchema={Yup.object().shape({
        password: Yup.string().required('Password is required'),
        passwordConfirmation: Yup.string()
          .required('Password Confirmation is required')
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      })}
      onSubmit={async ({ code, password, token }, actions) => {
        setForcePasswordResetReq({
          status: false,
          username: '',
        })
        await resetPassword({
          confirmationCode: code,
          password: password,
          token: token,
          history,
          email,
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
                  grid-row-gap: 10px;
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
                    data-testid="forgetpassword-password"
                    error={errors.password && touched.password}
                  />
                  <FormControl.Error
                    show={errors.password && touched.password}
                    message={errors.password}
                    data-testid="forgetpassword-password-error"
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
                    data-testid="forgetpassword-passwordConfirmation"
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
                    data-testid="forgetpassword-passwordConfirmation-error"
                  />
                </section>
                {!force ? (
                  <div
                    css={`
                      text-align: right;
                    `}
                  >
                    <label
                      css={`
                        font-size: 12px;
                        color: #747474;
                        background-color: white;
                        border: none;
                        &:hover {
                          cursor: pointer;
                        }
                      `}
                      onClick={() => resendCode(email)}
                    >
                      <u>Resend Code</u>
                    </label>
                  </div>
                ) : (
                  <div />
                )}
                <div
                  css={`
                    margin-top: ${needSpace ? '15px' : '20px'};
                    display: grid;
                    grid-template-columns: 150px 1fr 150px;
                    /* Tablet Portrait */
                    @media only screen and (max-height: 1025px) {
                      @media only screen and (max-width: 769px) {
                        @media (orientation: portrait) {
                          grid-template-columns: 100px 1fr 100px;
                        }
                      }
                    }
                  `}
                >
                  <Core.Button
                    id="forgetpassword-back"
                    type="button"
                    fontColour={Colours.purple}
                    bgColour={Colours.foreground}
                    disabled={isSubmitting}
                    data-testid="forgetpassword-back"
                    border={`1px solid ${Colours.purple}`}
                    onClick={() => {
                      if (force) {
                        setForcePasswordResetReq({
                          status: false,
                          username: '',
                        })
                        history.push('/')
                      } else history.push('/forget-password')
                    }}
                  >
                    Back
                  </Core.Button>
                  <div />
                  <Core.Button
                    id="forgetpassword-submit"
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="forgetpassword-submit"
                  >
                    Continue
                  </Core.Button>
                </div>
              </div>
            </form>
          </>
        )
      }}
    </Formik>
  )
}
