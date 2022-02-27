import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { UNSUBSCRIBE } from '../mutations'
import { LIST_PATIENTS } from '../queries'

import { Colours, FormControl, Core, Content, Loading } from 'components'

const queryString = require('query-string')

function UnsubscribedForm({ close, showNotificationRemoveAccount }) {
  const { search } = useLocation()
  const { patientId } = queryString.parse(search)

  const [deletePatient, { loading, error: deletePatientFailed }] = useMutation(
    UNSUBSCRIBE,
    {
      refetchQueries: () => [
        {
          query: LIST_PATIENTS,
        },
      ],
      onCompleted(deletePatient) {
        showNotificationRemoveAccount()
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
            `Please type the Patient's ID to confirm.`,
            function (resetConfirmation) {
              return resetConfirmation === patientId.toString()
            }
          )
          .required(`Please type the user's ID to confirm.`),
      })}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true)
        //Execute function here
        let Ids = []
        Ids.push(parseInt(patientId))

        await deletePatient({
          variables: {
            id: Ids,
          },
        }).catch((e) => console.log(e))
        close()
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
            {deletePatientFailed && (
              <Content.Alert
                type="error"
                message="Fail to unsubscribe from patient account"
              />
            )}

            <Core.Text>
              Are your sure you want to unsubscribe your sevices offered to this
              patient? <br />
              Please note that proceeding with this action will disassociate all
              active access <br />
              you have with this patient, however all previous resources will
              remain
              <br />
              Access can be granted in the future by simply requesting it.
              <br />
              <br />
              <br /> Type the patient's ID{' '}
              <b
                css={`
                  color: ${Colours.purple};
                `}
              >
                {patientId}
              </b>{' '}
              in the field below to proceed.
            </Core.Text>

            <br />
            <FormControl.Input
              label="Patient ID"
              id="resetConfirmation"
              type="text"
              placeholder="Patient ID"
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
              {isSubmitting ? 'Unsubscribing' : 'Unsubscribe'}
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}

export default UnsubscribedForm
