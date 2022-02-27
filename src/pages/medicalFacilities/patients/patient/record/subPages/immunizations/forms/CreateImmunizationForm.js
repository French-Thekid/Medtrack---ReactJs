import React from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { LIST_VACCINES } from '../queries'
import { CREATE_IMMUNIZATION } from '../mutations'
import { useMutation } from '@apollo/react-hooks'
import {
  initialImmunization,
  createImmunizationSchema,
  Types,
} from './initialValues'
import { Core, FormControl, Loading, Content } from 'components'
import { useRouteMatch } from 'react-router-dom'

export default function CreateImmunizationForm({
  close,
  showNotificationVaccineCreate,
}) {
  const {
    params: { patientId },
  } = useRouteMatch()

  //Mutation
  const [createImmunizationsVaccination, { loading, error }] = useMutation(
    CREATE_IMMUNIZATION,
    {
      refetchQueries: () => [
        {
          query: LIST_VACCINES,
          variables: { patientId: parseInt(patientId) },
        },
      ],
      onCompleted(createImmunizationsVaccination) {
        showNotificationVaccineCreate()
      },
    }
  )

  return (
    <Formik
      initialValues={initialImmunization}
      validationSchema={createImmunizationSchema}
      onSubmit={async (values, actions) => {
        await createImmunizationsVaccination({
          variables: {
            immunizationsVaccination: {
              patientId: parseInt(patientId),
              name: values.name,
              type: values.type,
              dateTaken: values.dateTaken,
              expiryDate: values.expDate,
            },
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
          errors,
          touched,
          handleSubmit,
        } = props
        const { name, type, dateTaken, expDate } = values
        return (
          <form
            onSubmit={handleSubmit}
            css={`
              width: 600px;
            `}
          >
            {loading && <Loading />}
            {error && (
              <Content.Alert
                type="error"
                message="Fail to add immunization/vaccine"
              />
            )}
            <Core.Text customSize="20px">
              Please enter Immunization/Vaccination details below
            </Core.Text>
            <br />

            <FormControl.ResponsiveSection>
              <FormControl.Section>
                <FormControl.Input
                  label="Name"
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Name"
                  data-testid="create-bill-name"
                  error={errors.name && touched.name}
                />
                <FormControl.Error
                  name="name"
                  show={errors.name && touched.name}
                  message={errors.name}
                />
              </FormControl.Section>
              <FormControl.Section>
                <FormControl.Select
                  value={type}
                  groups={Types}
                  label="Type"
                  name="type"
                  handlechange={handleChange}
                  handleblur={handleBlur}
                  error={errors.type && touched.type}
                />
                <FormControl.Error
                  name="type"
                  show={errors.type && touched.type}
                  message={errors.type}
                />
              </FormControl.Section>
            </FormControl.ResponsiveSection>
            <br />
            <FormControl.ResponsiveSection>
              <FormControl.Section>
                <FormControl.Input
                  label="Date Taken"
                  id="dateTaken"
                  type="date"
                  value={dateTaken}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Date Taken"
                  data-testid="create-bill-dateTaken"
                  error={errors.dateTaken && touched.dateTaken}
                />
                <FormControl.Error
                  name="dateTaken"
                  show={errors.dateTaken && touched.dateTaken}
                  message={errors.dateTaken}
                />
              </FormControl.Section>
              <FormControl.Section>
                <FormControl.Input
                  label="Exp. Date"
                  id="expDate"
                  type="date"
                  value={expDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Exp. Date"
                  data-testid="create-bill-expDate"
                  error={errors.expDate && touched.expDate}
                />
                <FormControl.Error
                  name="expDate"
                  show={errors.expDate && touched.expDate}
                  message={errors.expDate}
                />
              </FormControl.Section>
            </FormControl.ResponsiveSection>
            <br />
            <div
              css={`
                display: grid;
                float: right;
              `}
            >
              <Core.Button width="150px" type="submit">
                Submit
              </Core.Button>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
