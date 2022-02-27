import React from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import 'styled-components/macro'
import { Loading, Content, FormControl, Core, Colours } from 'components'
import { useLocation } from 'react-router'

import { useMutation } from '@apollo/react-hooks'
import { UPDATE_PHARMACY } from './mutations'
import { LIST_PHARMACY } from './queries'

const queryString = require('query-string')

export default function SuspendFacilityForm({ close }) {
  const { search } = useLocation()
  const { pharmacyId, status } = queryString.parse(search)

  //Setting up mutation
  const [updateFacility, { loading, error: updatePharmacyFailed }] =
    useMutation(UPDATE_PHARMACY, {
      refetchQueries: () => [
        {
          query: LIST_PHARMACY,
        },
      ],
    })

  return (
    <Formik
      initialValues={{
        suspendConfirmation: '',
      }}
      validationSchema={object().shape({
        suspendConfirmation: string()
          .matches(/suspend/, 'Please type suspend to confirm.')
          .required('Please type suspend to confirm.'),
      })}
      onSubmit={async (values, action) => {
        action.setSubmitting(true)
        await updateFacility({
          variables: {
            facility: {
              organizationId: pharmacyId,
              status,
            },
          },
        }).catch((e) => {
          console.log(e)
          return (
            <FormControl.Error
              name="failed"
              show={true}
              message={'Failed to Suspend'}
            />
          )
        })
        close()
      }}
    >
      {(props) => {
        const {
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
        } = props

        return (
          <form onSubmit={handleSubmit}>
            {loading && <Loading small />}
            {updatePharmacyFailed && (
              <Content.Alert
                type="error"
                message={updatePharmacyFailed.message}
              />
            )}
            <Core.Text>
              Are you sure you want to suspend this Pharmacy?
              <br />
              <br />
              Type{' '}
              <b
                css={`
                  color: ${Colours.purple};
                `}
              >
                suspend
              </b>{' '}
              below to confirm
            </Core.Text>
            <br />
            <FormControl.Input
              label="Type Suspend Here"
              id="suspendConfirmation"
              value={values.suspendConfirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.suspendConfirmation && touched.suspendConfirmation}
              placeholder="Type Suspend Here"
            />
            <FormControl.Error
              name="suspendConfirmation"
              show={errors.suspendConfirmation && touched.suspendConfirmation}
              message={errors.suspendConfirmation}
            />
            <Core.Button
              type="submit"
              action="READ"
              disabled={isSubmitting}
              style={{ marginTop: '20px' }}
            >
              Suspend
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
