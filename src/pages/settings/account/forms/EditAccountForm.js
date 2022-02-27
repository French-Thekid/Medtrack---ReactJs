import React from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { LOGGED_IN_USER } from 'context/query'
import { FormControl, Form, Loading, Content } from 'components'
import { UserSchema, Genders, titles } from './intialValues'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { UPDATE_USER } from '../../users/mutations'

export default function EditUserForm({ close, showNotificationProfile }) {
  const userType = JSON.parse(localStorage.getItem('session'))
  const {
    user: { role },
  } = userType

  //Query
  const { loading, error, data } = useQuery(LOGGED_IN_USER)

  //mutations
  const [updateUser, { loading: updating, error: updateUserError }] =
    useMutation(UPDATE_USER, {
      refetchQueries: () => [
        {
          query: LOGGED_IN_USER,
        },
      ],
      onCompleted(updateUser) {
        showNotificationProfile()
      },
    })

  if (loading || updating) return <Loading />
  if (error)
    return <Content.Alert type="error" message={'Fail to List Details'} />
  if (updateUserError)
    return <Content.Alert type="error" message={'Fail to Update Account'} />

  const { loggedInUser } = data || {}

  const {
    id,
    firstName,
    lastName,
    avatar,
    email,
    type,
    doctor = [],
    qualifications = [],
    person,
  } = loggedInUser || {}
  const { registrationNumber, yearsOfExperience } =
    doctor.length > 0 ? doctor[0] : {}

  const { name: qualification, specification } =
    qualifications.length > 0 ? qualifications[0] : {}

  const { dob, gender, aboutMe, title = '', contact } = person || {}

  const { contact_number: phone } = contact || {}

  let initialUser = {}

  if (role === 'RegularUser') {
    initialUser = {
      id,
      avatar,
      firstName,
      lastName,
      registrationNumber,
      yearsOfExperience,
      email,
      phone,
      dateOfBirth: dob
        ? new Date(parseInt(dob)).toISOString().split('T')[0]
        : '',
      gender,
      title,
      type,
      aboutMe,
      qualifications: qualification,
      specifications: specification,
    }
  }
  if (role === 'AdminUser') {
    initialUser = {
      id,
      avatar,
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth: dob
        ? new Date(parseInt(dob)).toISOString().split('T')[0]
        : '',
      gender,
      title,
      type,
      aboutMe,
    }
  }

  return (
    <Formik
      initialValues={initialUser}
      validationSchema={UserSchema(type, role)}
      onSubmit={async (values, actions) => {
        if (values.avatar !== initialUser.avatar) {
          values.base64Avatar = values.avatar.split(',')[1]
          delete values['avatar']
        } else {
          delete values['avatar']
        }

        if (role === 'RegularUser')
          values.yearsOfExperience = values.yearsOfExperience.toString()

        if (role === 'AdminUser') values.type = 'Administrator'

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

        close()
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
        } = props
        const {
          avatar,
          firstName,
          lastName,
          email,
          registrationNumber,
          phone,
          title,
          gender,
          dateOfBirth,
          qualifications,
          specifications,
          aboutMe,
          yearsOfExperience,
        } = values
        return (
          <Form.StepForm {...props} edit>
            <Form.Step justify="center">
              <div
                css={`
                  display: grid;
                  justify-items: center;
                  grid-gap: 10px;
                `}
              >
                <FormControl.Avatar
                  src={avatar}
                  onDone={({ base64 }) => {
                    console.log(base64)
                    setFieldValue('avatar', base64)
                  }}
                  error={errors.avatar}
                />
                <FormControl.Error
                  name="avatar"
                  show={errors.avatar}
                  message={errors.avatar}
                />
              </div>
              <FormControl.ResponsiveSection cols={3}>
                <FormControl.Section>
                  <FormControl.Select
                    value={title}
                    groups={titles}
                    label="Title"
                    name="title"
                    handlechange={handleChange}
                    handleblur={handleBlur}
                    error={errors.title && touched.title}
                  />
                  <FormControl.Error
                    name="title"
                    show={errors.title && touched.title}
                    message={errors.title}
                  />
                </FormControl.Section>
                <FormControl.Section>
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
                <FormControl.Section>
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

                <FormControl.Section>
                  <FormControl.Input
                    label="Date Of Birth"
                    id="dateOfBirth"
                    type="date"
                    value={dateOfBirth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="First Name"
                    data-testid="create-Patient-dateOfBirth"
                    error={errors.dateOfBirth && touched.dateOfBirth}
                  />
                  <FormControl.Error
                    name="dateOfBirth"
                    show={errors.dateOfBirth && touched.dateOfBirth}
                    message={errors.dateOfBirth}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Select
                    value={gender}
                    groups={Genders}
                    label="Gender"
                    name="gender"
                    handlechange={handleChange}
                    handleblur={handleBlur}
                    error={errors.gender && touched.gender}
                  />
                  <FormControl.Error
                    name="gender"
                    show={errors.gender && touched.gender}
                    message={errors.gender}
                  />
                </FormControl.Section>
                <FormControl.Section>
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

                <FormControl.Section>
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
                <FormControl.Section visibility={type === 'Doctor'}>
                  <FormControl.Input
                    id="registrationNumber"
                    value={registrationNumber}
                    onChange={handleChange}
                    placeholder="Registration Number"
                    data-testid="create-User-registrationNumber"
                    label="Registration Number"
                    onBlur={handleBlur}
                    error={
                      errors.registrationNumber && touched.registrationNumber
                    }
                  />
                  <FormControl.Error
                    name="registrationNumber"
                    show={
                      errors.registrationNumber && touched.registrationNumber
                    }
                    message={errors.registrationNumber}
                  />
                </FormControl.Section>
              </FormControl.ResponsiveSection>
            </Form.Step>
            {role === 'RegularUser' && (
              <Form.Step>
                <FormControl.ResponsiveSection cols={2}>
                  <FormControl.Section>
                    <FormControl.Input
                      label="Years of Experience"
                      id="yearsOfExperience"
                      type="number"
                      value={yearsOfExperience}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="eg. 5"
                      data-testid="create-userl-contact-yearsOfExperience"
                      error={
                        errors.yearsOfExperience && touched.yearsOfExperience
                      }
                    />
                    <FormControl.Error
                      name="yearsOfExperience"
                      show={
                        errors.yearsOfExperience && touched.yearsOfExperience
                      }
                      message={errors.yearsOfExperience}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      label="Qualifications"
                      id="qualifications"
                      type="text"
                      value={qualifications}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="eg. MBBA"
                      data-testid="create-userl-contact-qualifications"
                      error={errors.qualifications && touched.qualifications}
                    />
                    <FormControl.Error
                      name="qualifications"
                      show={errors.qualifications && touched.qualifications}
                      message={errors.qualifications}
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
                <FormControl.Section>
                  <FormControl.Input
                    label="Specifications"
                    id="specifications"
                    type="text"
                    value={specifications}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="eg. Dermotology"
                    data-testid="create-userl-contact-specifications"
                    error={errors.specifications && touched.specifications}
                  />
                  <FormControl.Error
                    name="specifications"
                    show={errors.specifications && touched.specifications}
                    message={errors.specifications}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    label="About Me"
                    id="aboutMe"
                    type="text"
                    value={aboutMe}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    multiline
                    rows={6}
                    placeholder="About Me"
                    data-testid="update-account-aboutMe"
                    error={errors.aboutMe && touched.aboutMe}
                  />
                  <FormControl.Error
                    name="aboutMe"
                    show={errors.aboutMe && touched.aboutMe}
                    message={errors.aboutMe}
                  />
                </FormControl.Section>
              </Form.Step>
            )}
          </Form.StepForm>
        )
      }}
    </Formik>
  )
}
