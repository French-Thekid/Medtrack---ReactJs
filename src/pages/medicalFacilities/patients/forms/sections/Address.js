import React from 'react'
import { FormControl } from 'components'
import { Countries, Provinces } from '../initialValues'

export default function Address(props) {
  const { values, errors, handleBlur, touched, handleChange } = props
  const { streetNumber, streetName, province, city, country } =
    values.address || {}



  return (
    <FormControl.FieldSet>
      <FormControl.Legend>Address Information</FormControl.Legend>
      <FormControl.ResponsiveSection col="1fr 2fr">
        <FormControl.Section>
          <FormControl.Input
            label="Street Number"
            id="address.streetNumber"
            type="text"
            value={streetNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Street Number"
            data-testid="create-Patient-streetNumber"
            error={
              errors.address && touched.address
                ? errors.address.streetNumber && touched.address.streetNumber
                : false
            }
          />
        </FormControl.Section>
        <FormControl.Section>
          <FormControl.Input
            label="Street Name"
            id="address.streetName"
            type="text"
            value={streetName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Street Name"
            data-testid="create-Patient-streetName"
            error={
              errors.address && touched.address
                ? errors.address.streetName && touched.address.streetName
                : false
            }
          />
          <FormControl.Error
            name="streetName"
            show={
              errors.address && touched.address
                ? errors.address.streetName && touched.address.streetName
                : false
            }
            message={errors.address ? errors.address.streetName : ''}
          />
        </FormControl.Section>
      </FormControl.ResponsiveSection>

      <FormControl.ResponsiveSection cols={3}>
        <FormControl.Section>
          <FormControl.Input
            label="City"
            id="address.city"
            value={city}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="City"
            data-testid="create-organisation-city"
            error={
              errors.address && touched.address
                ? errors.address.city && touched.address.city
                : false
            }
          />
          <FormControl.Error
            name="province"
            show={
              errors.address && touched.address
                ? errors.address.city && touched.address.city
                : false
            }
            message={errors.address ? errors.address.city : ''}
          />
        </FormControl.Section>
        <FormControl.Section>
          <FormControl.Select
            value={province}
            groups={Provinces(country)}
            label="Province"
            name="address.province"
            handlechange={handleChange}
            handleblur={handleBlur}
            error={
              errors.address && touched.address
                ? errors.address.province && touched.address.province
                : false
            }
          />
          <FormControl.Error
            name="province"
            show={
              errors.address && touched.address
                ? errors.address.province && touched.address.province
                : false
            }
            message={errors.address ? errors.address.province : ''}
          />
        </FormControl.Section>
        <FormControl.Section>
          <FormControl.Select
            value={country}
            groups={Countries()}
            name="address.country"
            label="Country"
            onBlur={handleBlur}
            handlechange={handleChange}
            error={
              errors.address && touched.address
                ? errors.address.country && touched.address.country
                : false
            }
          />
          <FormControl.Error
            name="country"
            show={
              errors.address && touched.address
                ? errors.address.country && touched.address.country
                : false
            }
            message={errors.address ? errors.address.country : ''}
          />
        </FormControl.Section>
      </FormControl.ResponsiveSection>
    </FormControl.FieldSet>
  )
}
