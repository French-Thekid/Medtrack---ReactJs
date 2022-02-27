import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_ROLE } from '../mutations'
import { LIST_ROLES } from '../queries'

import { Colours, FormControl, Core, Loading, Content } from 'components'

export default function DeleteRoleForm({ close, showNotificationDelete }) {
  const { id } = JSON.parse(localStorage.getItem('selectedRole')) || {}

  const [deleteRole, { loading, error: deleteRoleFailed }] = useMutation(
    DELETE_ROLE,
    {
      refetchQueries: () => [
        {
          query: LIST_ROLES,
        },
      ],
      onCompleted(deleteRole) {
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
            `Please type the Role's ID to confirm.`,
            function (deleteConfirmation) {
              return deleteConfirmation === id.toString()
            }
          )
          .required(`Please type the user's ID to confirm.`),
      })}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true)
        const ids = []
        ids.push(id)
        await deleteRole({
          variables: {
            ids: ids,
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
            {deleteRoleFailed && (
              <Content.Alert type="error" message="Fail to delete Role" />
            )}

            <Core.Text>
              Are your sure you want to delete this role?
              <br />
              Type the role's ID{' '}
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
              label="Role ID"
              id="deleteConfirmation"
              type="text"
              placeholder="Role ID"
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
              Delete Role
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
