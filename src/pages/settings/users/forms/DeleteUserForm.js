import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_USER } from '../mutations'
import { LIST_USERS } from '../queries'

import { Colours, FormControl, Core, Loading, Content } from 'components'

export default function DeleteUserForm({ close, showNotificationDelete }) {
  const { id, firstName, lastName } =
    JSON.parse(localStorage.getItem('selectedUser')) || {}

  const [deleteUser, { loading, error: deleteUserFailed }] = useMutation(
    DELETE_USER,
    {
      refetchQueries: () => [
        {
          query: LIST_USERS,
        },
      ],
      onCompleted(deleteUser) {
        showNotificationDelete()
      },
    }
  )

  return (
    <Formik
      initialValues={{
        DeleteConfirmation: '',
      }}
      validationSchema={object().shape({
        deleteConfirmation: string()
          .test(
            'match',
            `Please type the User's ID to confirm.`,
            function (deleteConfirmation) {
              return deleteConfirmation === id.toString()
            }
          )
          .required(`Please type the user's ID to confirm.`),
      })}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true)
        console.log('Deleting User: ', id)
        await deleteUser({
          variables: {
            id: new Array(id),
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
            {deleteUserFailed && (
              <Content.Alert type="error" message="Fail to delete User" />
            )}

            <Core.Text>
              Are your sure you want to delete{' '}
              <b
                css={`
                  color: ${Colours.purple};
                `}
              >
                {firstName} {lastName}'s
              </b>{' '}
              account?
              <br />
              Type the user's ID{' '}
              <b
                css={`
                  color: ${Colours.purple};
                `}
              >
                {id}
              </b>
              <br />
              in the fiels below to proceed.
            </Core.Text>

            <br />
            <FormControl.Input
              label="User ID"
              id="deleteConfirmation"
              type="text"
              placeholder="User ID"
              value={values.deleteConfirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ marginBottom: '0' }}
              error={errors.deleteConfirmation && touched.resetConfirmation}
            />
            <FormControl.Error
              name="deleteConfirmation"
              show={errors.deleteConfirmation && touched.deleteConfirmation}
              message={errors.deleteConfirmation}
            />
            <Core.Button
              bgColour={Colours.red}
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: '20px' }}
            >
              Delete User
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
