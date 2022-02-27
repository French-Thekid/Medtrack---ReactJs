import React from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'

import { Form, FormControl, Loading, Content } from 'components'
import { Contact, Address } from './sections'
import { createPatientSchema, Genders, Titles } from './initialValues'
import { UPDATE_PATIENT } from '../mutations'
import { LIST_PATIENTS } from '../queries'
import { useMutation } from '@apollo/react-hooks'

export default function EditPatientForm({ close, showNotificationEdit }) {
  const {
    avatar,
    title,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    medicalCondition,
    trn,
    email,
    contact,
    address,
    id,
  } = JSON.parse(localStorage.getItem('selectedPatient')) || {}

  const { contact_number, type, carrier, extension } = contact || {}
  const { streetNumber, streetName, city, province, country } = address || {}

  const initialPatient = {
    id,
    avatar,
    title,
    firstName,
    middleName,
    lastName,
    dateOfBirth: dob ? new Date(parseInt(dob)).toISOString().split('T')[0] : '',
    gender,
    email,
    trn,
    contact: {
      number: contact_number,
      type,
      carrier,
      extension,
    },
    address: {
      streetNumber,
      streetName,
      city,
      province,
      country,
    },
    medicalCondition,
  }

  const [updatePatient, { loading, error: updatePatientFailed }] = useMutation(
    UPDATE_PATIENT,
    {
      refetchQueries: () => [
        {
          query: LIST_PATIENTS,
        },
      ],
      onCompleted({ updatePatient }) {
        const { person, life, medicalCondition, id } = updatePatient
        const { dob, id: patientPersonId } = person || {}
        localStorage.setItem(
          'selectedPatient',
          JSON.stringify({
            updatePatient,
            ...person,
            life,
            medicalCondition,
            id,
            patientPersonId,
            dateOfBirth: dob ? new Date(parseInt(dob)).toDateString() : '',
          })
        )
        showNotificationEdit()
      },
    }
  )

  return (
    <Formik
      initialValues={initialPatient}
      validationSchema={createPatientSchema({ update: true })}
      onSubmit={async (values, actions) => {
        if (values.avatar !== initialPatient.avatar) {
          values.base64Avatar = values.avatar.split(',')[1]
          delete values['avatar']
        } else {
          delete values['avatar']
        }

        delete values['emergencyContact']

        console.log(values)
        await updatePatient({
          variables: {
            patient: values,
          },
        }).catch((e) => console.log(e))
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
        let {
          avatar,
          title,
          firstName,
          middleName,
          lastName,
          dateOfBirth,
          gender,
          email,
          trn,
          medicalCondition,
        } = values
        return (
          <Form.StepForm {...props} edit>
            <Form.Step justify="center">
              {loading && <Loading Contained />}
              <div
                css={`
                  display: grid;
                  justify-items: center;
                  grid-gap: 5px;
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
              <FormControl.ResponsiveSection cols={3}>
                <FormControl.Section marginTop="30px">
                  <FormControl.Select
                    value={title}
                    groups={Titles}
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
                <FormControl.Section marginTop="30px">
                  <FormControl.Input
                    label="First Name"
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="First Name"
                    data-testid="create-Patient-firstName"
                    error={errors.firstName && touched.firstName}
                  />
                  <FormControl.Error
                    name="firstName"
                    show={errors.firstName && touched.firstName}
                    message={errors.firstName}
                  />
                </FormControl.Section>
                <FormControl.Section marginTop="30px">
                  <FormControl.Input
                    label="Middle Name"
                    id="middleName"
                    type="text"
                    value={middleName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Middle Name"
                    data-testid="create-Patient-middleName"
                    error={errors.middleName && touched.middleName}
                  />
                  <FormControl.Error
                    name="middleName"
                    show={errors.middleName && touched.middleName}
                    message={errors.middleName}
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
                    placeholder="Last Name"
                    data-testid="create-Patient-lastName"
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
                    type="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email Address"
                    data-testid="create-Patient-email"
                    error={errors.email && touched.email}
                  />
                  <FormControl.Error
                    name="email"
                    show={errors.email && touched.email}
                    message={errors.email}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    label="TRN"
                    id="trn"
                    mask="999-999-999"
                    type="text"
                    value={trn}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="TRN"
                    data-testid="create-Patient-trn"
                    error={errors.trn && touched.trn}
                  />
                  <FormControl.Error
                    name="trn"
                    show={errors.trn && touched.trn}
                    message={errors.trn}
                  />
                </FormControl.Section>
              </FormControl.ResponsiveSection>
            </Form.Step>
            <Form.Step>
              <Contact {...props} />
              <br />
              <Address {...props} />
            </Form.Step>
            <Form.Step>
              {loading && <Loading small />}
              {updatePatientFailed && (
                <Content.Alert type="error" message="Fail to update patient" />
              )}
              <FormControl.Section>
                <FormControl.Input
                  label="Medical Condition"
                  id="medicalCondition"
                  type="text"
                  value={medicalCondition}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={10}
                  placeholder="Medical Condition"
                  data-testid="create-Patient-medicalCondition"
                  error={errors.medicalCondition && touched.medicalCondition}
                />
                <FormControl.Error
                  name="medicalCondition"
                  show={errors.medicalCondition && touched.medicalCondition}
                  message={errors.medicalCondition}
                />
              </FormControl.Section>
            </Form.Step>
          </Form.StepForm>
        )
      }}
    </Formik>
  )
}
