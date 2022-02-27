import React from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { Core, Loading, Content, FormControl } from 'components'
import { useLocation } from 'react-router'

import { useMutation } from '@apollo/react-hooks'
import { UPDATE_MEDICAL_FACILITY } from './mutations'
import { LIST_MEDICAL_FACILITY } from './queries'

const queryString = require('query-string')

export default function EnableFacilityForm({ close }) {
  const { search } = useLocation()
  const { facilityId, status } = queryString.parse(search)

  //Setting up mutation
  const [updateFacility, { loading, error: updateFacilityFailed }] =
    useMutation(UPDATE_MEDICAL_FACILITY, {
      refetchQueries: () => [
        {
          query: LIST_MEDICAL_FACILITY,
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
              organizationId: facilityId,
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
        const { handleSubmit, isSubmitting } = props

        return (
          <form onSubmit={handleSubmit}>
            {loading && <Loading small />}
            {updateFacilityFailed && (
              <Content.Alert
                type="error"
                message={updateFacilityFailed.message}
              />
            )}
            <Core.Text>
              Are you sure you want to enable this Medial Facilty?
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
