import React from 'react'
import { FormControl } from 'components'

import { ContactTypes, ContactCarriers } from '../initialValues'

export default function Location(props) {
  const { values, errors, handleBlur, touched, handleChange } = props
  const { number, type, carrier, extension } = values.contact || {}

  return (
    <FormControl.FieldSet>
      <FormControl.Legend>Contact Information</FormControl.Legend>
      <FormControl.ResponsiveSection cols={3}>
        <FormControl.Section>
          <FormControl.Input
            label="Phone Number"
            id="contact.number"
            mask="(999) 999-9999"
            type="text"
            value={number}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Phone Number"
            data-testid="create-Patient-number"
            error={
              errors.contact && touched.contact
                ? errors.contact.number && touched.contact.number
                : false
            }
          />
          <FormControl.Error
            name="trn"
            show={
              errors.contact && touched.contact
                ? errors.contact.number && touched.contact.number
                : false
            }
            message={errors.contact ? errors.contact.number : ''}
          />
        </FormControl.Section>
        <FormControl.Section>
          <FormControl.Select
            value={type}
            groups={ContactTypes}
            label="Phone Type"
            name="contact.type"
            handlechange={handleChange}
            handleblur={handleBlur}
            error={
              errors.contact && touched.contact
                ? errors.contact.type && touched.contact.type
                : false
            }
          />
          <FormControl.Error
            name="trn"
            show={
              errors.contact && touched.contact
                ? errors.contact.type && touched.contact.type
                : false
            }
            message={errors.contact ? errors.contact.type : ''}
          />
        </FormControl.Section>
        <FormControl.Section>
          <FormControl.Select
            value={carrier}
            groups={ContactCarriers}
            label="Phone Carrier"
            name="contact.carrier"
            handlechange={handleChange}
            handleblur={handleBlur}
            error={
              errors.contact && touched.contact
                ? errors.contact.carrier && touched.contact.carrier
                : false
            }
          />

          <FormControl.Error
            name="carriers"
            show={
              errors.contact && touched.contact
                ? errors.contact.carrier && touched.contact.carrier
                : false
            }
            message={errors.contact ? errors.contact.carrier : ''}
          />
        </FormControl.Section>
        <FormControl.Section>
          <FormControl.Input
            label="Phone Extrension"
            id="contact.extension"
            type="text"
            value={extension}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Phone Extension"
            data-testid="create-Patient-extension"
            error={
              errors.contact && touched.contact
                ? errors.contact.extension && touched.contact.extension
                : false
            }
          />
          <FormControl.Error
            name="trn"
            show={
              errors.contact && touched.contact
                ? errors.contact.extension && touched.contact.extension
                : false
            }
            message={errors.contact ? errors.contact.extension : ''}
          />
        </FormControl.Section>
      </FormControl.ResponsiveSection>
    </FormControl.FieldSet>
  )
}
