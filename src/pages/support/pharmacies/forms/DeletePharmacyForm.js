import React from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import 'styled-components/macro'
import { FormControl, Core, Colours, Content, Loading } from 'components'
import { useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_PHARMACY } from './mutations'
import { LIST_PHARMACY } from './queries'

const queryString = require('query-string')

export default function DeletePharmacyForm({ close }) {
  const { search } = useLocation()
  const { pharmacyId } = queryString.parse(search)

  const [deleteFacility, { loading, error: deleteFacilityFailed }] =
    useMutation(DELETE_PHARMACY, {
      refetchQueries: () => [
        {
          query: LIST_PHARMACY,
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
        console.log('Deleting: ', pharmacyId)
        await deleteFacility({
          variables: {
            id: new Array(pharmacyId),
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
              <Content.Alert type="error" message="Fail to Delete Pharmacy" />
            )}
            <Core.Text>
              Are you sure you want to delete this Pharmacy?
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
