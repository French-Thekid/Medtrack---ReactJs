import React from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import 'styled-components/macro'
import { UPDATE_ROLE } from '../mutations'
import { LIST_ROLES } from '../queries'
import { FormControl, Core, Colours, Loading, Content } from 'components'
import { useMutation } from '@apollo/react-hooks'

export default function EditRoleForm({ showNotification, close }) {
  const { name, description, id } = JSON.parse(
    localStorage.getItem('selectedRole')
  )

  //Mutations
  const [updateRole, { loading, error }] = useMutation(UPDATE_ROLE, {
    refetchQueries: () => [
      {
        query: LIST_ROLES,
      },
    ],
    onCompleted() {
      showNotification()
      close()
    },
  })

  return (
    <Formik
      initialValues={{ name, description }}
      validationSchema={object().shape({
        name: string().required('Name is required!'),
        description: string(),
      })}
      onSubmit={async (values, actions) => {
        await updateRole({
          variables: {
            role: {
              id: parseInt(id),
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
          <form onSubmit={handleSubmit}>
            {loading && <Loading small />}
            {error && (
              <Content.Alert type="error" message={'Failed to update role'} />
            )}
            <div
              css={`
                border-bottom: 1px solid ${Colours.border};
                padding-bottom: 5px;
                margin-bottom: 30px;
                margin-top: 10px;
              `}
            >
              <Core.Text>Please edit the details below then save</Core.Text>
            </div>
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

            <FormControl.Section marginTop="25px">
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
                rows={10}
              />
              <FormControl.Error
                description="description"
                show={errors.description && touched.description}
                message={errors.description}
              />
            </FormControl.Section>
            <br />
            <Core.Button type="submit">Update</Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
