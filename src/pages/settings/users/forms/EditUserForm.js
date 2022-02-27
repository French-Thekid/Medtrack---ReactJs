import React, { useState } from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { useMutation } from '@apollo/react-hooks'
import { ADD_USER_TO_ROLE } from '../../roles/mutations'
import { LIST_ROLES } from '../../roles/queries'
import { UPDATE_USER } from '../mutations'
import { LIST_USERS } from '../queries'
import { FormControl, Content, Loading } from 'components'
import { UserSchema, types } from './intialValues'
import { useHistory, useRouteMatch } from 'react-router-dom'

export default function EditUserForm({
  formId,
  selectedRole,
  showNotification,
  initialId,
}) {
  const initialUser = JSON.parse(localStorage.getItem('selectedUser'))
  const [type, setType] = useState(initialUser.type)

  const history = useHistory()
  const {
    params: { userId },
  } = useRouteMatch()

  //Mutations
  const [
    addUsersToRole,
    { loading: loadingUsers, error: updateRoleUsersError },
  ] = useMutation(ADD_USER_TO_ROLE, {
    refetchQueries: () => [
      {
        query: LIST_USERS,
      },
      {
        query: LIST_ROLES,
      },
    ],
    onCompleted({ addUsersToRole }) {
      const { id, name, description } = addUsersToRole || {}
      const role = { id, name, description }
      const user = JSON.parse(localStorage.getItem('selectedUser'))
      user.role = role
      localStorage.setItem('selectedUser', JSON.stringify(user))
      history.push(`/facility/settings/users/view-user/${initialUser.id}`)
    },
  })

  const [updateUser, { loading, error: updateUserError }] = useMutation(
    UPDATE_USER,
    {
      refetchQueries: () => [
        {
          query: LIST_USERS,
        },
      ],
      onCompleted({ updateUser }) {
        if (selectedRole !== initialId) {
          const id = []
          id.push(userId)
          addUsersToRole({
            variables: {
              params: {
                roleId: parseInt(selectedRole),
                userIds: id,
              },
            },
          }).catch((e) => {
            console.log(e)
          })
        }
        showNotification()
        localStorage.setItem('selectedUser', JSON.stringify(updateUser))
        if (selectedRole === initialId)
          history.push(`/facility/settings/users/view-user/${initialUser.id}`)
      },
    }
  )
  // initialUser.phone = initialUser.person.contact.contact_number || ''
  const { person } = initialUser || {}
  const { contact } = person || {}
  const { contact_number = '' } = contact || {}
  initialUser.phone = contact_number || ''
  const { doctor = [] } = initialUser

  const Initial = {
    id: initialUser.id,
    avatar: initialUser.avatar,
    firstName: initialUser.firstName,
    lastName: initialUser.lastName,
    email: initialUser.email,
    registrationNumber: doctor.length > 0 ? doctor[0].registrationNumber : '',
    phone: contact_number || '',
    type: initialUser.type,
  }

  return (
    <Formik
      initialValues={Initial}
      validationSchema={UserSchema(type)}
      onSubmit={async (values, actions) => {
        values.type = type
        values.id = userId
        delete values['newID']
        delete values['name']
        delete values['enabled']
        delete values['__typename']
        delete values['roleAssigned']
        delete values['person']

        if (values.avatar !== initialUser.avatar) {
          values.base64Avatar = values.avatar.split(',')[1]
          delete values['avatar']
        } else {
          delete values['avatar']
        }
        if (type === 'Secretary') values.registrationNumber = ''

        await updateUser({
          variables: {
            user: {
              ...values,
            },
          },
        }).catch((e) => {
          console.log(e)
          return (
            <FormControl.Error
              name="failed"
              show={true}
              message={updateUserError.message}
            />
          )
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
            {(loading || loadingUsers) && <Loading small />}
            {updateUserError && (
              <Content.Alert type="error" message={updateUserError.message} />
            )}
            {updateRoleUsersError && (
              <Content.Alert
                type="error"
                message={'Failed to update user role'}
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
                disabled
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
                message={'User Type is required'}
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
