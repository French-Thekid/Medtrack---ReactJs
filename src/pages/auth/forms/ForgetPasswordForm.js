import React, { useContext } from 'react'
import { Formik } from 'formik'
import { AuthContext } from '../../../context'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { FormControl, Core, Colours, Content } from 'components'
import 'styled-components/macro'

export default function ForgetPasswordForm() {
  const history = useHistory()
  const { forgetPassword, setEmailErrors, emailErrors } =
    useContext(AuthContext)

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email must be valid!')
          .required('Email is a required field'),
      })}
      onSubmit={async ({ email }, actions) => {
        forgetPassword({
          username: email,
          history,
        })
        actions.setSubmitting(false)
      }}
    >
      {(props) => {
        const {
          values: { email },
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
                    id="email"
                    label="Email Address"
                    placeholder="Email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={email}
                    data-testid="forgetpassword-email"
                    error={errors.email && touched.email}
                  />
                  <FormControl.Error
                    show={errors.email && touched.email}
                    message={errors.email}
                    data-testid="forgetpassword-email-error"
                  />
                </section>
                <div
                  css={`
                    margin-top: 20px;
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
                      setEmailErrors(null)
                      history.push('/')
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
                    {isSubmitting ? 'Submitting' : 'Submit'}
                  </Core.Button>
                </div>
                {emailErrors ? (
                  <Content.Alert
                    type="error"
                    message={'Failed to submit, please try again.'}
                    data-testid="error-message"
                  />
                ) : null}
              </div>
            </form>
          </>
        )
      }}
    </Formik>
  )
}
