import React from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { useLocation } from 'react-router-dom'
import { Form, FormControl, Loading, Content } from 'components'
import { createOrganisationSchema } from './initialValues'
import Location from './sections/Location'

import { useMutation } from '@apollo/react-hooks'
import { UPDATE_PHARMACY } from './mutations'
import { LIST_PHARMACY } from './queries'

const queryString = require('query-string')

export default function CreateOrganisationForm({ close }) {
  //Getting Organisation ID
  const { search } = useLocation()
  const { pharmacyId: organizationId } = queryString.parse(search)

  //Getting Initial Organisation
  const initialOrganisation =
    JSON.parse(localStorage.getItem('selectedOrg')) || {}

  //Setting up mutation
  const [updateFacility, { loading, error: updatePharmacyFailed }] =
    useMutation(UPDATE_PHARMACY, {
      refetchQueries: () => [
        {
          query: LIST_PHARMACY,
        },
      ],
    })
  return (
    <Formik
      initialValues={initialOrganisation}
      validationSchema={createOrganisationSchema}
      onSubmit={async (values, actions) => {
        let flag = true
        //Single Attribute Updates
        if (JSON.stringify(values) !== JSON.stringify(initialOrganisation)) {
          console.log('Change Detected')

          //Updating Organization Logo
          if (
            JSON.stringify(values.logoUrl) !==
            JSON.stringify(initialOrganisation.logoUrl)
          ) {
            console.log('Change Logo')
            if (values.logoUrl !== '')
              values.logoUrl = values.logoUrl.split(',')[1]
            await updateFacility({
              variables: {
                facility: {
                  organizationId,
                  base64Logo: values.logoUrl,
                },
              },
            }).catch((e) => {
              console.log(e)
              flag = false
              return (
                <FormControl.Error
                  name="failed"
                  show={true}
                  message={'Failed to Update Logo'}
                />
              )
            })
          }

          //Updating Organization Name
          if (
            JSON.stringify(values.name) !==
            JSON.stringify(initialOrganisation.name)
          ) {
            console.log('Name change ')
            await updateFacility({
              variables: {
                facility: {
                  organizationId,
                  name: values.name,
                },
              },
            }).catch((e) => {
              console.log(e)
              flag = false
              return (
                <FormControl.Error
                  name="failed"
                  show={true}
                  message={'Failed to Update Name'}
                />
              )
            })
          }

          //Updating Organization Email
          if (
            JSON.stringify(values.organisationEmail) !==
            JSON.stringify(initialOrganisation.organisationEmail)
          ) {
            console.log('Change email')
            await updateFacility({
              variables: {
                facility: {
                  organizationId,
                  organisationEmail: values.organisationEmail,
                },
              },
            }).catch((e) => {
              console.log(e)
              flag = false
              return (
                <FormControl.Error
                  name="failed"
                  show={true}
                  message={'Failed to Update Facility Email'}
                />
              )
            })
          }

          //Updating Organization TaxId
          if (
            JSON.stringify(values.taxId) !==
            JSON.stringify(initialOrganisation.taxId)
          ) {
            console.log('Change taxID')
            await updateFacility({
              variables: {
                facility: {
                  organizationId,
                  taxId: values.taxId,
                },
              },
            }).catch((e) => {
              console.log(e)
              flag = false
              return (
                <FormControl.Error
                  name="failed"
                  show={true}
                  message={'Failed to Update Facility Tax ID'}
                />
              )
            })
          }

          /* Object Updates */

          //Updating Location
          if (
            JSON.stringify(values.location) !==
            JSON.stringify(initialOrganisation.location)
          ) {
            console.log('Change Location')
            delete values.location['__typename']
            await updateFacility({
              variables: {
                facility: {
                  organizationId,
                  location: values.location,
                },
              },
            }).catch((e) => {
              console.log(e)
              flag = false
              return (
                <FormControl.Error
                  name="failed"
                  show={true}
                  message={'Failed to Update Facility Location'}
                />
              )
            })
          }

          //Updating Admin Contact
          if (
            JSON.stringify(values.adminContact) !==
            JSON.stringify(initialOrganisation.adminContact)
          ) {
            console.log('Change admin')
            delete values.adminContact['__typename']
            await updateFacility({
              variables: {
                facility: {
                  organizationId,
                  adminContact: values.adminContact,
                },
              },
            }).catch((e) => {
              console.log(e)
              flag = false
              return (
                <FormControl.Error
                  name="failed"
                  show={true}
                  message={'Failed to Update Facility Admin Details'}
                />
              )
            })
          }

          //Updating Billing Contact
          if (
            JSON.stringify(values.billingContact) !==
            JSON.stringify(initialOrganisation.billingContact)
          ) {
            console.log('Change biller')
            delete values.billingContact['__typename']
            await updateFacility({
              variables: {
                facility: {
                  organizationId,
                  billingContact: values.billingContact,
                },
              },
            }).catch((e) => {
              console.log(e)
              flag = false
              return (
                <FormControl.Error
                  name="failed"
                  show={true}
                  message={'Failed to Update Facility Billing Details'}
                />
              )
            })
          }

          //Updating Technical Contact
          if (
            JSON.stringify(values.technicalContact) !==
            JSON.stringify(initialOrganisation.technicalContact)
          ) {
            console.log('Change techy')
            delete values.technicalContact['__typename']
            await updateFacility({
              variables: {
                facility: {
                  organizationId,
                  technicalContact: values.technicalContact,
                },
              },
            }).catch((e) => {
              console.log(e)
              flag = false
              return (
                <FormControl.Error
                  name="failed"
                  show={true}
                  message={'Failed to Update Facility Technical Details'}
                />
              )
            })
          }
          if (flag) {
            localStorage.removeItem('selectedOrg')
            close()
          }
        } else {
          console.log('No Change detected')
          localStorage.removeItem('selectedOrg')
          close()
        }
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
          name,
          logoUrl,
          organisationEmail,
          taxId,
          adminContact: {
            firstName: adminFirstName,
            lastName: adminLastName,
            position,
            email: adminEmail,
            phone: adminPhone,
          } = {},
          billingContact: {
            firstName: billingFirstName,
            lastName: billingLastName,
            position: billingPosition,
            email: billingEmail,
            phone: billingPhone,
          } = {},
          technicalContact: {
            firstName: techincalFirstName,
            lastName: technicalLastName,
            position: technicalPosition,
            email: technicalEmail,
            phone: technicalPhone,
          } = {},
        } = values
        return (
          <Form.StepForm {...props} edit>
            <Form.Step justify="center">
              {loading && <Loading small />}
              {updatePharmacyFailed && (
                <Content.Alert
                  type="error"
                  message={updatePharmacyFailed.message}
                />
              )}
              <FormControl.Avatar
                src={logoUrl}
                onDone={({ base64 }) => setFieldValue('logoUrl', base64)}
              />
              <FormControl.Section marginTop="30px">
                <FormControl.Input
                  label="Name"
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="eg. Sagicor"
                  data-testid="create-organisation-name"
                  error={errors.name && touched.name}
                />
                <FormControl.Error
                  name="name"
                  show={errors.name && touched.name}
                  message={errors.name}
                />
              </FormControl.Section>
              <FormControl.Section>
                <FormControl.Input
                  label=" Organisation Email"
                  id="organisationEmail"
                  name="organisationEmail"
                  type="text"
                  value={organisationEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="eg. Sagicor"
                  data-testid="create-organisation-email"
                  error={errors.organisationEmail && touched.organisationEmail}
                />
                <FormControl.Error
                  name="organisationEmail"
                  show={errors.organisationEmail && touched.organisationEmail}
                  message={errors.organisationEmail}
                />
              </FormControl.Section>
              <FormControl.Section>
                <FormControl.Input
                  mask="999-999-999"
                  label="Tax ID"
                  id="taxId"
                  name="taxId"
                  type="text"
                  value={taxId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="eg. 123-125-139"
                  data-testid="create-organisation-tax-id"
                  error={errors.taxId && touched.taxId}
                />
                <FormControl.Error
                  name="taxId"
                  show={errors.taxId && touched.taxId}
                  message={errors.taxId}
                />
              </FormControl.Section>
            </Form.Step>

            <Form.Step>
              <Location {...props} />
            </Form.Step>
            <Form.Step>
              {' '}
              {loading && <Loading small />}
              {updatePharmacyFailed && (
                <Content.Alert
                  type="error"
                  message={updatePharmacyFailed.message}
                />
              )}
              <FormControl.FieldSet>
                <FormControl.Legend>
                  Pharmacy's Administrator
                </FormControl.Legend>
                <FormControl.ResponsiveSection>
                  <FormControl.Section>
                    <FormControl.Input
                      id="adminContact.firstName"
                      value={adminFirstName}
                      onChange={handleChange}
                      placeholder="eg. John"
                      data-testid="create-organisation-administrator-name"
                      label="First Name"
                      onBlur={handleBlur}
                      error={
                        errors.adminContact && touched.adminContact
                          ? errors.adminContact.firstName &&
                            touched.adminContact.firstName
                          : false
                      }
                    />
                    <FormControl.Error
                      name="adminFirstName"
                      show={
                        errors.adminContact && touched.adminContact
                          ? errors.adminContact.firstName &&
                            touched.adminContact.firstName
                          : false
                      }
                      message={
                        errors.adminContact ? errors.adminContact.firstName : ''
                      }
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="adminContact.lastName"
                      value={adminLastName}
                      onChange={handleChange}
                      placeholder="eg. Brown"
                      data-testid="create-organisation-administrator-name"
                      label="Last Name"
                      onBlur={handleBlur}
                      error={
                        errors.adminContact && touched.adminContact
                          ? errors.adminContact.lastName &&
                            touched.adminContact.lastName
                          : false
                      }
                    />
                    <FormControl.Error
                      name="adminLastName"
                      show={
                        errors.adminContact && touched.adminContact
                          ? errors.adminContact.lastName &&
                            touched.adminContact.lastName
                          : false
                      }
                      message={
                        errors.adminContact ? errors.adminContact.lastName : ''
                      }
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
                <FormControl.Section>
                  <FormControl.Input
                    id="adminContact.email"
                    value={adminEmail}
                    onChange={handleChange}
                    placeholder="abc@xmail.com"
                    data-testid="create-organisation-administrator-email"
                    label="Email"
                    onBlur={handleBlur}
                    disabled
                    error={
                      errors.adminContact && touched.adminContact
                        ? errors.adminContact.email &&
                          touched.adminContact.email
                        : false
                    }
                  />
                  <FormControl.Error
                    name="adminEmail"
                    show={
                      errors.adminContact && touched.adminContact
                        ? errors.adminContact.email &&
                          touched.adminContact.email
                        : false
                    }
                    message={
                      errors.adminContact ? errors.adminContact.email : ''
                    }
                  />
                </FormControl.Section>
                <FormControl.ResponsiveSection>
                  <FormControl.Section>
                    <FormControl.Input
                      id="adminContact.position"
                      value={position}
                      onChange={handleChange}
                      placeholder="Manager"
                      data-testid="create-organisation-administrator-position"
                      label="Position"
                      onBlur={handleBlur}
                      error={
                        errors.adminContact && touched.adminContact
                          ? errors.adminContact.position &&
                            touched.adminContact.position
                          : false
                      }
                    />
                    <FormControl.Error
                      name="position"
                      show={
                        errors.adminContact && touched.adminContact
                          ? errors.adminContact.position &&
                            touched.adminContact.position
                          : false
                      }
                      message={
                        errors.adminContact ? errors.adminContact.position : ''
                      }
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="adminContact.phone"
                      value={adminPhone}
                      onChange={handleChange}
                      placeholder="eg. (876) 213-2445"
                      data-testid="create-organisation-administrator-phone"
                      mask="(999) 999-9999"
                      label="Contact Number"
                      onBlur={handleBlur}
                      error={
                        errors.adminContact && touched.adminContact
                          ? errors.adminContact.phone &&
                            touched.adminContact.phone
                          : false
                      }
                    />
                    <FormControl.Error
                      name="phone"
                      show={
                        errors.adminContact && touched.adminContact
                          ? errors.adminContact.phone &&
                            touched.adminContact.phone
                          : false
                      }
                      message={
                        errors.adminContact ? errors.adminContact.phone : ''
                      }
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
              </FormControl.FieldSet>
            </Form.Step>
            <Form.Step>
              {' '}
              {loading && <Loading small />}
              {updatePharmacyFailed && (
                <Content.Alert
                  type="error"
                  message={updatePharmacyFailed.message}
                />
              )}
              <FormControl.FieldSet>
                <FormControl.Legend>Billing Contact</FormControl.Legend>
                <FormControl.ResponsiveSection>
                  <FormControl.Section>
                    <FormControl.Input
                      id="billingContact.firstName"
                      value={billingFirstName}
                      onChange={handleChange}
                      placeholder="eg. John"
                      data-testid="create-organisation-administrator-name"
                      label="First Name"
                      onBlur={handleBlur}
                      error={
                        errors.billingContact && touched.billingContact
                          ? errors.billingContact.firstName &&
                            touched.billingContact.firstName
                          : false
                      }
                    />
                    <FormControl.Error
                      name="billingFirstName"
                      show={
                        errors.billingContact && touched.billingContact
                          ? errors.billingContact.firstName &&
                            touched.billingContact.firstName
                          : false
                      }
                      message={
                        errors.billingContact
                          ? errors.billingContact.firstName
                          : ''
                      }
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="billingContact.lastName"
                      value={billingLastName}
                      onChange={handleChange}
                      placeholder="eg. Brown"
                      data-testid="create-organisation-administrator-name"
                      label="Last Name"
                      onBlur={handleBlur}
                      error={
                        errors.billingContact && touched.billingContact
                          ? errors.billingContact.lastName &&
                            touched.billingContact.lastName
                          : false
                      }
                    />
                    <FormControl.Error
                      name="billingLastName"
                      show={
                        errors.billingContact && touched.billingContact
                          ? errors.billingContact.lastName &&
                            touched.billingContact.lastName
                          : false
                      }
                      message={
                        errors.billingContact
                          ? errors.billingContact.lastName
                          : ''
                      }
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
                <FormControl.Section>
                  <FormControl.Input
                    id="billingContact.email"
                    value={billingEmail}
                    onChange={handleChange}
                    placeholder="jb@email.com"
                    data-testid="create-organisation-billing-email"
                    label="Email"
                    onBlur={handleBlur}
                    error={
                      errors.billingContact && touched.billingContact
                        ? errors.billingContact.email &&
                          touched.billingContact.email
                        : false
                    }
                  />
                  <FormControl.Error
                    name="billingEmail"
                    show={
                      errors.billingContact && touched.billingContact
                        ? errors.billingContact.email &&
                          touched.billingContact.email
                        : false
                    }
                    message={
                      errors.billingContact ? errors.billingContact.email : ''
                    }
                  />
                </FormControl.Section>
                <FormControl.ResponsiveSection>
                  <FormControl.Section>
                    <FormControl.Input
                      id="billingContact.position"
                      value={billingPosition}
                      onChange={handleChange}
                      placeholder="eg. Manager"
                      data-testid="create-organisation-billing-position"
                      label="Position"
                      onBlur={handleBlur}
                      error={
                        errors.billingContact && touched.billingContact
                          ? errors.billingContact.position &&
                            touched.billingContact.position
                          : false
                      }
                    />
                    <FormControl.Error
                      name="billingPosition"
                      show={
                        errors.billingContact && touched.billingContact
                          ? errors.billingContact.position &&
                            touched.billingContact.position
                          : false
                      }
                      message={
                        errors.billingContact
                          ? errors.billingContact.position
                          : ''
                      }
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="billingContact.phone"
                      value={billingPhone}
                      onChange={handleChange}
                      placeholder="eg. (876) 213-2445"
                      data-testid="create-organisation-billing-phone"
                      mask="(999) 999-9999"
                      label="Contact Number"
                      onBlur={handleBlur}
                      error={
                        errors.billingContact && touched.billingContact
                          ? errors.billingContact.phone &&
                            touched.billingContact.phone
                          : false
                      }
                    />
                    <FormControl.Error
                      name="billingPhone"
                      show={
                        errors.billingContact && touched.billingContact
                          ? errors.billingContact.phone &&
                            touched.billingContact.phone
                          : false
                      }
                      message={
                        errors.billingContact ? errors.billingContact.phone : ''
                      }
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
              </FormControl.FieldSet>
            </Form.Step>
            <Form.Step>
              {loading && <Loading small />}
              {updatePharmacyFailed && (
                <Content.Alert
                  type="error"
                  message={updatePharmacyFailed.message}
                />
              )}
              <FormControl.FieldSet>
                <FormControl.Legend>
                  Technical Support Contact
                </FormControl.Legend>
                <FormControl.ResponsiveSection>
                  <FormControl.Section>
                    <FormControl.Input
                      id="technicalContact.firstName"
                      value={techincalFirstName}
                      onChange={handleChange}
                      placeholder="eg. John"
                      data-testid="create-organisation-administrator-name"
                      label="First Name"
                      onBlur={handleBlur}
                      error={
                        errors.technicalContact && touched.technicalContact
                          ? errors.technicalContact.firstName &&
                            touched.technicalContact.firstName
                          : false
                      }
                    />
                    <FormControl.Error
                      name="technicalFirstName"
                      show={
                        errors.technicalContact && touched.technicalContact
                          ? errors.technicalContact.firstName &&
                            touched.technicalContact.firstName
                          : false
                      }
                      message={
                        errors.technicalContact
                          ? errors.technicalContact.firstName
                          : ''
                      }
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="technicalContact.lastName"
                      value={technicalLastName}
                      onChange={handleChange}
                      placeholder="eg. Brown"
                      data-testid="create-organisation-administrator-name"
                      label="Last Name"
                      onBlur={handleBlur}
                      error={
                        errors.technicalContact && touched.technicalContact
                          ? errors.technicalContact.lastName &&
                            touched.technicalContact.lastName
                          : false
                      }
                    />
                    <FormControl.Error
                      name="technicalLastName"
                      show={
                        errors.technicalContact && touched.technicalContact
                          ? errors.technicalContact.lastName &&
                            touched.technicalContact.lastName
                          : false
                      }
                      message={
                        errors.technicalContact
                          ? errors.technicalContact.lastName
                          : ''
                      }
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
                <FormControl.Section>
                  <FormControl.Input
                    id="technicalContact.email"
                    value={technicalEmail}
                    onChange={handleChange}
                    placeholder="eg. jb@email.com"
                    data-testid="create-organisation-technical-contact-email"
                    label="Email"
                    onBlur={handleBlur}
                    error={
                      errors.technicalContact && touched.technicalContact
                        ? errors.technicalContact.email &&
                          touched.technicalContact.email
                        : false
                    }
                  />
                  <FormControl.Error
                    name="technicalEmail"
                    show={
                      errors.technicalContact && touched.technicalContact
                        ? errors.technicalContact.email &&
                          touched.technicalContact.email
                        : false
                    }
                    message={
                      errors.technicalContact
                        ? errors.technicalContact.email
                        : ''
                    }
                  />
                </FormControl.Section>
                <FormControl.ResponsiveSection>
                  <FormControl.Section>
                    <FormControl.Input
                      id="technicalContact.position"
                      value={technicalPosition}
                      onChange={handleChange}
                      placeholder="eg. Manager"
                      data-testid="create-organisation-technical-contact-position"
                      label="Position"
                      onBlur={handleBlur}
                      error={
                        errors.technicalContact && touched.technicalContact
                          ? errors.technicalContact.position &&
                            touched.technicalContact.position
                          : false
                      }
                    />
                    <FormControl.Error
                      name="technicalPosition"
                      show={
                        errors.technicalContact && touched.technicalContact
                          ? errors.technicalContact.position &&
                            touched.technicalContact.position
                          : false
                      }
                      message={
                        errors.technicalContact
                          ? errors.technicalContact.position
                          : ''
                      }
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="technicalContact.phone"
                      value={technicalPhone}
                      onChange={handleChange}
                      placeholder="eg. (876) 287-8121"
                      data-testid="create-organisation-technical-contact-phone"
                      mask="(999) 999-9999"
                      label="Contact Number"
                      onBlur={handleBlur}
                      error={
                        errors.technicalContact && touched.technicalContact
                          ? errors.technicalContact.phone &&
                            touched.technicalContact.phone
                          : false
                      }
                    />
                    <FormControl.Error
                      name="technicalPhone"
                      show={
                        errors.technicalContact && touched.technicalContact
                          ? errors.technicalContact.phone &&
                            touched.technicalContact.phone
                          : false
                      }
                      message={
                        errors.technicalContact
                          ? errors.technicalContact.phone
                          : ''
                      }
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
              </FormControl.FieldSet>
            </Form.Step>
          </Form.StepForm>
        )
      }}
    </Formik>
  )
}
