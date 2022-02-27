import React from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { createInsuranceSchema } from './initialValues'
import { Core, FormControl, Loading, Content } from 'components'
import { useRouteMatch } from 'react-router-dom'
import { LIST_INSURANCES } from '../queries'
import { UPDATE_INSURANCE } from '../mutations'
import { useMutation } from '@apollo/react-hooks'

export default function EditInsuranceForm({
  close,
  showNotificationInsuranceEdit,
}) {
  const {
    params: { patientId },
  } = useRouteMatch()

  const initialInsurance =
    JSON.parse(localStorage.getItem('selectedInsurance')) || {}

  //Mutation
  const [updateMedicalInsurance, { loading, error }] = useMutation(
    UPDATE_INSURANCE,
    {
      refetchQueries: () => [
        {
          query: LIST_INSURANCES,
          variables: { patientId: parseInt(patientId) },
        },
      ],
      onCompleted(updateMedicalInsurance) {
        showNotificationInsuranceEdit()
      },
    }
  )

  return (
    <Formik
      initialValues={initialInsurance}
      validationSchema={createInsuranceSchema}
      onSubmit={async (values, actions) => {
        await updateMedicalInsurance({
          variables: {
            medicalInsurance: {
              id: parseInt(initialInsurance.id),
              name: values.name,
              policyNumber: values.policyNumber,
              issueDate: values.issueDate,
              expiryDate: values.expDate,
              status: values.status === true ? 'Active' : 'Past',
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
        const { name, policyNumber, issueDate, expDate, status } = values
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
                message="Fail to update medical insurance"
              />
            )}
            <Core.Text customSize="20px">
              Please enter insurance details below
            </Core.Text>
            <br />
            <div
              css={`
                display: grid;
                justify-items: end;
              `}
            >
              <div
                css={`
                  display: grid;
                  grid-template-columns: max-content max-content;
                  grid-gap: 5px;
                  align-items: center;
                `}
              >
                <Core.Text>Active Insurance</Core.Text>
                <FormControl.Toggle
                  value={status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="status"
                  name="status"
                  startwithoff={status === false}
                />
              </div>
            </div>
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
                <FormControl.Input
                  label="Policy Number"
                  id="policyNumber"
                  type="text"
                  value={policyNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Policy Number"
                  data-testid="create-bill-policyNumber"
                  error={errors.policyNumber && touched.policyNumber}
                />
                <FormControl.Error
                  name="policyNumber"
                  show={errors.policyNumber && touched.policyNumber}
                  message={errors.policyNumber}
                />
              </FormControl.Section>
            </FormControl.ResponsiveSection>
            <FormControl.ResponsiveSection>
              <FormControl.Section>
                <FormControl.Input
                  label="Issue Date"
                  id="issueDate"
                  type="date"
                  value={issueDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Issue Date"
                  data-testid="create-bill-issueDate"
                  error={errors.issueDate && touched.issueDate}
                />
                <FormControl.Error
                  name="issueDate"
                  show={errors.issueDate && touched.issueDate}
                  message={errors.issueDate}
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
