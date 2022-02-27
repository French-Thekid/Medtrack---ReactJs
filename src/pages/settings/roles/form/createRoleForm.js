import React from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import 'styled-components/macro'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_ROLE, ADD_USER_TO_ROLE } from '../mutations'
import { LIST_ROLES } from '../queries'
import { FormControl, Loading, Content } from 'components'
import { useHistory } from 'react-router'

export default function CreateRoleForm({
  formId,
  selectedUsers,
  showNotification,
}) {
  const history = useHistory()
  //Mutations
  const [createRole, { loading, error: createRoleError }] = useMutation(
    CREATE_ROLE,
    {
      refetchQueries: () => [
        {
          query: LIST_ROLES,
        },
      ],
      onCompleted({ createRole }) {
        const { id } = createRole || {}
        //Adding created user to role if exist
        if (selectedUsers.length > 0)
          addUsersToRole({
            variables: {
              params: {
                roleId: id,
                userIds: selectedUsers,
              },
            },
          }).catch((e) => {
            console.log(e)
          })

        showNotification()
        history.push(`/facility/settings/roles`)
      },
    }
  )

  const [addUsersToRole, { loading: loading1, error: addUsersToRoleError }] =
    useMutation(ADD_USER_TO_ROLE, {
      refetchQueries: () => [
        {
          query: LIST_ROLES,
        },
      ],
    })

  return (
    <Formik
      initialValues={{ name: '', description: '' }}
      validationSchema={object().shape({
        name: string().required('Name is required!'),
        description: string(),
      })}
      onSubmit={async (values, actions) => {
        await createRole({
          variables: {
            role: {
              ...values,
            },
          },
        }).catch((e) => {
          console.log(e)
        })
      }}
    >
      {(props) => {
        const {
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          handleSubmit,
        } = props
        const { name, description } = values
        return (
          <form onSubmit={handleSubmit} id={formId}>
            {(loading || loading1) && <Loading small />}
            {createRoleError && (
              <Content.Alert type="error" message={'Failed to create role'} />
            )}
            {addUsersToRoleError && (
              <Content.Alert
                type="error"
                message={'Failed to add user to role'}
              />
            )}
            <FormControl.Section>
              <FormControl.Input
                label="Name"
                id="name"
                type="text"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="eg. Role A"
                data-testid="create-role-name"
                error={errors.name && touched.name}
              />
              <FormControl.Error
                name="name"
                show={errors.name && touched.name}
                message={errors.name}
              />
            </FormControl.Section>
            <FormControl.Section marginTop="15px">
              <FormControl.Input
                label="Description"
                id="description"
                type="text"
                value={description}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Role Description"
                data-testid="create-role-description"
                error={errors.description && touched.description}
                multiline
                rows={14}
              />
              <FormControl.Error
                description="description"
                show={errors.description && touched.description}
                message={errors.description}
              />
            </FormControl.Section>
          </form>
        )
      }}
    </Formik>
  )
}
