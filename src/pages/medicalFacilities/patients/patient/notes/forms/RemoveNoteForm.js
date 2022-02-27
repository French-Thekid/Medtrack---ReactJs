import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_NOTE } from '../mutations'
import { LIST_NOTES } from '../queries'

import { Colours, Core, Loading, Content } from 'components'
import { useRouteMatch, useLocation } from 'react-router-dom'

const queryString = require('query-string')

export default function RemoveNoteForm({ close }) {
  const { search } = useLocation()
  const { id } = queryString.parse(search)
  const {
    params: { patientId },
  } = useRouteMatch()

  //Mutation
  const [deleteNote, { loading, error }] = useMutation(DELETE_NOTE, {
    refetchQueries: () => [
      {
        query: LIST_NOTES,
        variables: { patientId: parseInt(patientId) },
      },
    ],
  })

  return (
    <Formik
      initialValues={{}}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true)
        let ids = []
        ids.push(parseInt(id))
        await deleteNote({
          variables: {
            id: ids,
          },
        }).catch((e) => console.log(e))
        close()
      }}
    >
      {(props) => {
        const { isSubmitting, handleSubmit } = props
        return (
          <form onSubmit={handleSubmit}>
            {loading && <Loading small />}
            {error && <Content.Alert type="error" message={error.message} />}

            <Core.Text>
              Are your sure you want to permanently remove this note?
            </Core.Text>

            <br />
            <div
              css={`
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: 20px;
              `}
            >
              <Core.Button
                bgColour={Colours.purple}
                type="button"
                disabled={isSubmitting}
                style={{ marginTop: '20px' }}
                onClick={() => close()}
              >
                No, Cancel
              </Core.Button>
              <Core.Button
                bgColour={Colours.red}
                type="submit"
                disabled={isSubmitting}
                style={{ marginTop: '20px' }}
              >
                Yes, Remove
              </Core.Button>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
