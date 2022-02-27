import React, { useState } from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_USER } from '../mutations'
import { ADD_USER_TO_ROLE } from '../../roles/mutations'
import { LIST_USERS } from '../queries'
import { Content, FormControl, Loading } from 'components'
import { UserSchema, initialUser, types } from './intialValues'
import { useHistory } from 'react-router-dom'

export default function CreateUserForm({
  formId,
  selectedRole,
  showNotification,
}) {
  const [type, setType] = useState('')
  const history = useHistory()

  const [createUser, { loading, error: createUserError }] = useMutation(
    CREATE_USER,
    {
      refetchQueries: () => [
        {
          query: LIST_USERS,
        },
      ],
      onCompleted({ createUser }) {
        //Bug- User id being returned is incorrect hence the following failing
        if (selectedRole !== '') {
          const { id } = createUser || {}
          let ids = []
          ids.push(id)
          console.log({ ids })
          addUsersToRole({
            variables: {
              params: {
                roleId: parseInt(selectedRole),
                userIds: ids,
              },
            },
          }).catch((e) => {
            console.log(e)
          })
        }

        showNotification()
        history.push('/facility/settings/users/tables/allUsers')
      },
    }
  )

  const [addUsersToRole, { loading: loading1, error: addUsersToRoleError }] =
    useMutation(ADD_USER_TO_ROLE)

  return (
    <Formik
      initialValues={initialUser}
      validationSchema={UserSchema(type)}
      onSubmit={async (values, actions) => {
        values.type = type
        if (values.avatar !== null) values.avatar = values.avatar.split(',')[1]
        if (type === 'Secretary') values.registrationNumber = ''

        await createUser({
          variables: {
            user: {
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
          setFieldValue,
          errors,
          touched,
          handleSubmit,
        } = props
        const {
          avatar,
          firstName,
          lastName,
          email,
          registrationNumber,
          phone,
        } = values
        return (
          <form onSubmit={handleSubmit} id={formId}>
            {(loading || loading1) && <Loading small />}
            {createUserError && (
              <Content.Alert
                type="error"
                message={
                  createUserError &&
                  createUserError.message ===
                    'The Provided registration number already exist'
                    ? 'That registration number already exist'
                    : 'Failed to create user'
                }
              />
            )}
            {addUsersToRoleError && (
              <Content.Alert
                type="error"
                message={'Failed to assign user to role'}
              />
            )}
            <div
              css={`
                display: grid;
                justify-items: center;
                grid-gap: 10px;
              `}
            >
              <FormControl.Avatar
                src={avatar}
                onDone={({ base64 }) => setFieldValue('avatar', base64)}
                error={errors.avatar}
              />
              <FormControl.Error
                name="avatar"
                show={errors.avatar}
                message={errors.avatar}
              />
            </div>
            <FormControl.ResponsiveSection>
              <FormControl.Section marginTop="20px" marginBottom="0px">
                <FormControl.Input
                  label="First Name"
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="eg. John"
                  data-testid="create-user-firstName"
                  error={errors.firstName && touched.firstName}
                />
                <FormControl.Error
                  name="firstName"
                  show={errors.firstName && touched.firstName}
                  message={errors.firstName}
                />
              </FormControl.Section>

              <FormControl.Section marginTop="20px" marginBottom="0px">
                <FormControl.Input
                  label="Last Name"
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="eg. Brown"
                  data-testid="create-user-lastName"
                  error={errors.lastName && touched.lastName}
                />
                <FormControl.Error
                  name="lastName"
                  show={errors.lastName && touched.lastName}
                  message={errors.lastName}
                />
              </FormControl.Section>
            </FormControl.ResponsiveSection>
            <FormControl.Section marginTop="20px" marginBottom="0px">
              <FormControl.Input
                label="Email Address"
                id="email"
                type="text"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="eg. Brown"
                data-testid="create-user-email"
                error={errors.email && touched.email}
              />
              <FormControl.Error
                name="email"
                show={errors.email && touched.email}
                message={errors.email}
              />
            </FormControl.Section>
            <FormControl.Section marginTop="20px" marginBottom="0px">
              <FormControl.Input
                label="Contact Number"
                id="phone"
                type="text"
                value={phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="eg. (876) 287-8121"
                data-testid="create-userl-contact-phone"
                mask="(999) 999-9999"
                error={errors.phone && touched.phone}
              />
              <FormControl.Error
                name="phone"
                show={errors.phone && touched.phone}
                message={errors.phone}
              />
            </FormControl.Section>
            <FormControl.Section marginTop="20px" marginBottom="0px">
              <FormControl.Select
                value={type}
                groups={types}
                label="User Type"
                name="type"
                handlechange={(e) => {
                  setType(e.target.value)
                  setFieldValue('type', e.target.value)
                }}
                handleblur={handleBlur}
                error={errors.type && touched.type}
              />
              <FormControl.Error
                name="type"
                show={errors.type && touched.type}
                message={errors.type}
              />
            </FormControl.Section>
            <FormControl.Section
              visibility={type === 'Doctor'}
              marginTop="20px"
            >
              <FormControl.Input
                id="registrationNumber"
                value={registrationNumber}
                onChange={handleChange}
                placeholder="Registration Number"
                data-testid="create-User-registrationNumber"
                label="Registration Number"
                onBlur={handleBlur}
                error={errors.registrationNumber && touched.registrationNumber}
              />
              <FormControl.Error
                name="registrationNumber"
                show={errors.registrationNumber && touched.registrationNumber}
                message={errors.registrationNumber}
              />
            </FormControl.Section>
          </form>
        )
      }}
    </Formik>
  )
}
