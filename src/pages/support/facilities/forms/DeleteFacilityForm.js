import React from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import 'styled-components/macro'
import { useLocation } from 'react-router'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_MEDICAL_FACILITY } from './mutations'
import { LIST_MEDICAL_FACILITY } from './queries'

import { FormControl, Core, Colours, Loading, Content } from 'components'

const queryString = require('query-string')

export default function DeleteFacilityForm({ close }) {
  const { search } = useLocation()
  const { facilityId } = queryString.parse(search)

  const [deleteFacility, { loading, error: deleteFacilityFailed }] =
    useMutation(DELETE_MEDICAL_FACILITY, {
      refetchQueries: () => [
        {
          query: LIST_MEDICAL_FACILITY,
        },
      ],
    })

  return (
    <Formik
      initialValues={{
        deleteConfirmation: '',
      }}
      validationSchema={object().shape({
        deleteConfirmation: string()
          .matches(/Delete/, 'Please type suspend to confirm.')
          .required('Please type Delete to confirm.'),
      })}
      onSubmit={async (values, action) => {
        action.setSubmitting(true)
        console.log('Deleting: ', facilityId)
        await deleteFacility({
          variables: {
            id: new Array(facilityId),
          },
        }).catch((e) => console.log(e))
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
            {deleteFacilityFailed && (
              <Content.Alert
                type="error"
                message="Fail to delete Medical Facility"
              />
            )}
            <Core.Text>
              Are you sure you want to delete this Medial Facilty?
              <br />
              <br />
              Type{' '}
              <b
                css={`
                  color: ${Colours.purple};
                `}
              >
                Delete
              </b>{' '}
              below to confirm
            </Core.Text>
            <br />
            <FormControl.Input
              label="Type Delete Here"
              id="deleteConfirmation"
              value={values.deleteConfirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.deleteConfirmation && touched.deleteConfirmation}
              placeholder="Type Delete Here"
            />
            <FormControl.Error
              name="deleteConfirmation"
              show={errors.deleteConfirmation && touched.deleteConfirmation}
              message={errors.deleteConfirmation}
            />
            <Core.Button
              bgColour={Colours.red}
              type="submit"
              action="READ"
              disabled={isSubmitting}
              style={{ marginTop: '20px' }}
            >
              Delete
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
