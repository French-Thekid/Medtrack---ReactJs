import React from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { Core, Loading, Content, FormControl } from 'components'
import { useLocation } from 'react-router-dom'

import { useMutation } from '@apollo/react-hooks'
import { UPDATE_PHARMACY } from './mutations'
import { LIST_PHARMACY } from './queries'

const queryString = require('query-string')

export default function EnablePharmacyForm({ close }) {
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
      initialValues={{}}
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
              message={'Failed to Enable'}
            />
          )
        })
        close()
      }}
    >
      {(props) => {
        const { handleSubmit, isSubmitting } = props

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
              Are you sure you want to enable this Pharmacy?
              <br />
              Press <b>Enable</b> below to proceed
            </Core.Text>
            <br />
            <Core.Button
              type="submit"
              action="READ"
              disabled={isSubmitting}
              style={{ marginTop: '20px' }}
            >
              Enable
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
