import React from 'react'
import { FormControl } from 'components'

export default function Location(props) {
  const { values, errors, handleBlur, touched, handleChange } = props
  const { fullName, relationship, contactNumber, email, address } =
    values.emergencyContact || {}

  return (
    <FormControl.FieldSet>
      <FormControl.Legend>Emergency Contact Information</FormControl.Legend>
      <FormControl.ResponsiveSection cols={3}>
        <FormControl.Section>
          <FormControl.Input
            label="Full Name"
            id="emergencyContact.fullName"
            type="text"
            value={fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Full Name"
            data-testid="create-Patient-fullName"
            error={
              errors.emergencyContact && touched.emergencyContact
                ? errors.emergencyContact.fullName &&
                  touched.emergencyContact.fullName
                : false
            }
          />
          <FormControl.Error
            name="trn"
            show={
              errors.emergencyContact && touched.emergencyContact
                ? errors.emergencyContact.fullName &&
                  touched.emergencyContact.fullName
                : false
            }
            message={
              errors.emergencyContact ? errors.emergencyContact.fullName : ''
            }
          />
        </FormControl.Section>
        <FormControl.Section>
          <FormControl.Input
            label="Relationship"
            id="emergencyContact.relationship"
            type="text"
            value={relationship}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Relationship"
            data-testid="create-Patient-relationship"
            error={
              errors.emergencyContact && touched.emergencyContact
                ? errors.emergencyContact.relationship &&
                  touched.emergencyContact.relationship
                : false
            }
          />
          <FormControl.Error
            name="trn"
            show={
              errors.emergencyContact && touched.emergencyContact
                ? errors.emergencyContact.relationship &&
                  touched.emergencyContact.relationship
                : false
            }
            message={
              errors.emergencyContact
                ? errors.emergencyContact.relationship
                : ''
            }
          />
        </FormControl.Section>
        <FormControl.Section>
          <FormControl.Input
            label="Contact Number"
            id="emergencyContact.contactNumber"
            type="text"
            mask="(999) 999-9999"
            value={contactNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Phone Carrier"
            data-testid="create-Patient-contactNumber"
            error={
              errors.emergencyContact && touched.emergencyContact
                ? errors.emergencyContact.contactNumber &&
                  touched.emergencyContact.contactNumber
                : false
            }
          />
          <FormControl.Error
            name="trn"
            show={
              errors.emergencyContact && touched.emergencyContact
                ? errors.emergencyContact.contactNumber &&
                  touched.emergencyContact.contactNumber
                : false
            }
            message={
              errors.emergencyContact
                ? errors.emergencyContact.contactNumber
                : ''
            }
          />
        </FormControl.Section>
      </FormControl.ResponsiveSection>

      <FormControl.ResponsiveSection col="1fr 2fr">
        <FormControl.Section>
          <FormControl.Input
            label="Email Address"
            id="emergencyContact.email"
            type="text"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Street Number"
            data-testid="create-Patient-email"
            error={
              errors.emergencyContact && touched.emergencyContact
                ? errors.emergencyContact.email &&
                  touched.emergencyContact.email
                : false
            }
          />
          <FormControl.Error
            name="email"
            show={
              errors.emergencyContact && touched.emergencyContact
                ? errors.emergencyContact.email &&
                  touched.emergencyContact.email
                : false
            }
            message={
              errors.emergencyContact ? errors.emergencyContact.email : ''
            }
          />
        </FormControl.Section>
        <FormControl.Section>
          <FormControl.Input
            label="Address"
            id="emergencyContact.address"
            type="text"
            value={address}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Address"
            data-testid="create-Patient-address"
            error={
              errors.emergencyContact && touched.emergencyContact
                ? errors.emergencyContact.address &&
                  touched.emergencyContact.address
                : false
            }
          />
          <FormControl.Error
            name="trn"
            show={
              errors.emergencyContact && touched.emergencyContact
                ? errors.emergencyContact.address &&
                  touched.emergencyContact.address
                : false
            }
            message={
              errors.emergencyContact ? errors.emergencyContact.address : ''
            }
          />
        </FormControl.Section>
      </FormControl.ResponsiveSection>
    </FormControl.FieldSet>
  )
}
