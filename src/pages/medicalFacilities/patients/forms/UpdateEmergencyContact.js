import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_EMERGENCY_CONTACT } from '../mutations'
import { LIST_EMERGENCY_CONTACT } from '../queries'

import { FormControl, Core, Content, Loading } from 'components'

export default function UpdateEmergencycontactForm({ close }) {
  const { patientPersonId } = JSON.parse(
    localStorage.getItem('selectedPatient')
  )

  const [
    updateEmergencyContact,
    { loading, error: updateEmergencyContactFailed },
  ] = useMutation(UPDATE_EMERGENCY_CONTACT, {
    refetchQueries: () => [
      {
        query: LIST_EMERGENCY_CONTACT,
        variables: { patientPersonId: parseInt(patientPersonId) },
      },
    ],
  })

  const {
    relationship,
    id,
    firstName,
    lastName,
    email,
    streetName,
    contact_number,
  } = JSON.parse(localStorage.getItem('selectedContact')) || {}

  return (
    <Formik
      initialValues={{
        fullName: `${firstName} ${lastName}` || '',
        relationship: relationship || '',
        contactNumber: contact_number || '',
        email: email || '',
        address: streetName || '',
      }}
      validationSchema={object().shape({
        fullName: string()
          .required('Full Name is required')
          .test('len', 'Full Name Required', (val = '') => {
            if (
              val.split(' ')[1] !== null &&
              val.split(' ')[1] !== undefined &&
              val.split(' ')[1] !== ''
            ) {
              return true
            } else return false
          }),
        relationship: string().required('Relationship is required'),
        contactNumber: string().required('Contact Number is required'),
        email: string().email('Invalid Email').nullable(),
        address: string().required('Address is required'),
      })}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true)
        const firstName = values.fullName.split(' ')[0]
        const lastName = values.fullName.split(' ')[1]

        await updateEmergencyContact({
          variables: {
            emergencyContact: {
              id,
              firstName,
              lastName,
              relationship: `${values.relationship[0].toUpperCase()}${values.relationship.slice(
                1
              )}`,
              contactNumber: values.contactNumber,
              email: values.email,
              address: values.address,
            },
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

        const { fullName, relationship, contactNumber, email, address } = values
        return (
          <form onSubmit={handleSubmit}>
            {loading && <Loading small />}
            {updateEmergencyContactFailed && (
              <Content.Alert
                type="error"
                message="Fail to update Emergency Contact"
              />
            )}

            <FormControl.FieldSet>
              <FormControl.Legend>
                Emergency Contact Information
              </FormControl.Legend>
              <FormControl.ResponsiveSection cols={3}>
                <FormControl.Section>
                  <FormControl.Input
                    label="Full Name"
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Full Name"
                    data-testid="create-Patient-fullName"
                    error={errors.fullName && touched.fullName}
                  />
                  <FormControl.Error
                    name="trn"
                    show={errors.fullName && touched.fullName}
                    message={errors.fullName}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    label="Relationship"
                    id="relationship"
                    type="text"
                    value={relationship}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Relationship"
                    data-testid="create-Patient-relationship"
                    error={errors.relationship && touched.relationship}
                  />
                  <FormControl.Error
                    name="trn"
                    show={errors.relationship && touched.relationship}
                    message={errors.relationship}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    label="Contact Number"
                    id="contactNumber"
                    type="text"
                    mask="(999) 999-9999"
                    value={contactNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Phone Carrier"
                    data-testid="create-Patient-contactNumber"
                    error={errors.contactNumber && touched.contactNumber}
                  />
                  <FormControl.Error
                    name="trn"
                    show={errors.contactNumber && touched.contactNumber}
                    message={errors.contactNumber}
                  />
                </FormControl.Section>
              </FormControl.ResponsiveSection>

              <FormControl.ResponsiveSection col="1fr 2fr">
                <FormControl.Section>
                  <FormControl.Input
                    label="Email Address"
                    id="email"
                    type="text"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Street Number"
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
                    label="Address"
                    id="address"
                    type="text"
                    value={address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Address"
                    data-testid="create-Patient-address"
                    error={errors.address && touched.address}
                  />
                  <FormControl.Error
                    name="trn"
                    show={errors.address && touched.address}
                    message={errors.address}
                  />
                </FormControl.Section>
              </FormControl.ResponsiveSection>
            </FormControl.FieldSet>
            <div
              css={`
                display: grid;
                justify-items: end;
              `}
            >
              <Core.Button
                type="submit"
                disabled={isSubmitting}
                style={{ marginTop: '20px', width: '150px' }}
              >
                {isSubmitting ? 'Submitting' : 'Submit'}
              </Core.Button>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
