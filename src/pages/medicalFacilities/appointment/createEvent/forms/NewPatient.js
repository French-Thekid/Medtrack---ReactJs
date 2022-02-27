import React from 'react'
import 'styled-components/macro'

import { FormControl } from 'components'
import { Genders } from './initialValues'

export default function CreatePatientForm({ props }) {
  const { values, handleChange, handleBlur, setFieldValue, errors, touched } =
    props
  let {
    avatar,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    gender,
    email,
    trn,
    phone,
    emergencyContactName,
    emergencyContactNumber,
    medicalCondition,
  } = values || {}
  return (
    <div
      css={`
        display: grid;
        grid-template-rows: repeat(3, max-content);
        grid-row-gap: 10px;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: max-content 1fr;
          grid-gap: 30px;
          align-items: center;
        `}
      >
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
            height="70px"
          />
          <FormControl.Error
            name="avatar"
            show={errors.avatar}
            message={errors.avatar}
          />
        </div>
        <div
          css={`
            display: grid;
            grid-template-columns: 1fr max-content 1fr;
            grid-column-gap: 30px;
            grid-row-gap: 10px;
          `}
        >
          <FormControl.Section>
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
          <FormControl.Section>
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
              placeholder="Date of Birth"
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
        </div>
      </div>
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 30px;
          grid-row-gap: 10px;
        `}
      >
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
            label="Phone Number"
            id="phone"
            mask="(999) 999-9999"
            type="text"
            value={phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Phone Number"
            data-testid="create-Patient-phone"
            error={errors.phone && touched.phone}
          />
          <FormControl.Error
            name="trn"
            show={errors.phone && touched.phone}
            message={errors.phone}
          />
        </FormControl.Section>
      </div>
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 30px;
          grid-row-gap: 10px;
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-rows: 1fr 1fr;
          `}
        >
          <FormControl.Section>
            <FormControl.Input
              label="Emergency Contact Full Name"
              id="emergencyContactName"
              type="text"
              value={emergencyContactName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Emergency Contact Full Name"
              data-testid="create-Patient-emergencyContactName"
              error={
                errors.emergencyContactName && touched.emergencyContactName
              }
            />
            <FormControl.Error
              name="emergencyContactName"
              show={errors.emergencyContactName && touched.emergencyContactName}
              message={errors.emergencyContactName}
            />
          </FormControl.Section>
          <FormControl.Section>
            <FormControl.Input
              label="Emergency Contact Phone"
              id="emergencyContactNumber"
              mask="(999) 999-9999"
              type="text"
              value={emergencyContactNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Emergency Contact Phone"
              data-testid="create-Patient-emergencyContactNumber"
              error={
                errors.emergencyContactNumber && touched.emergencyContactNumber
              }
            />
            <FormControl.Error
              name="trn"
              show={
                errors.emergencyContactNumber && touched.emergencyContactNumber
              }
              message={errors.emergencyContactNumber}
            />
          </FormControl.Section>
        </div>
        <FormControl.Section>
          <FormControl.Input
            label="Medical Condition"
            id="medicalCondition"
            type="text"
            value={medicalCondition}
            onChange={handleChange}
            onBlur={handleBlur}
            multiline
            rows={5}
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
      </div>
    </div>
  )
}
