import React from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { LIST_VITALS } from '../queries'
import { CREATE_VITALS } from '../mutations'
import { useMutation } from '@apollo/react-hooks'
import { initialVital, createVitalSchema } from './initialValues'
import { Core, FormControl, Content, Loading } from 'components'
import { useRouteMatch } from 'react-router-dom'

export default function CreateVitalForm({
  close,
  showNotificationVitalCreate,
}) {
  const {
    params: { patientId },
  } = useRouteMatch()

  //Mutation
  const [createVital, { loading, error }] = useMutation(CREATE_VITALS, {
    refetchQueries: () => [
      {
        query: LIST_VITALS,
        variables: { patientId: parseInt(patientId) },
      },
    ],
    onCompleted(createVital) {
      showNotificationVitalCreate()
    },
  })

  return (
    <Formik
      initialValues={initialVital}
      validationSchema={createVitalSchema}
      onSubmit={async (values, actions) => {
        const newWeight = 0.453592 * values.weight
        const BMI = (newWeight / values.height / values.height) * 10000
        values.BMI = BMI.toFixed(1)
        await createVital({
          variables: {
            vital: {
              patientId: parseInt(patientId),
              height: values.height.toString(),
              weight: values.weight.toString(),
              bloodPressure: values.bloodPressure,
              temperature: values.temperature.toString(),
              BMI: values.BMI,
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
        const { height, weight, bloodPressure, temperature } = values
        return (
          <form
            onSubmit={handleSubmit}
            css={`
              width: 600px;
            `}
          >
            {loading && <Loading />}
            {error && (
              <Content.Alert type="error" message="Fail to add vital" />
            )}
            <Core.Text>Please enter vital details below</Core.Text>
            <br />
            <FormControl.ResponsiveSection>
              <FormControl.Section>
                <FormControl.Input
                  label="Height (cm)"
                  id="height"
                  type="number"
                  value={height}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Height (cm)"
                  data-testid="create-bill-height"
                  error={errors.height && touched.height}
                />
                <FormControl.Error
                  name="height"
                  show={errors.height && touched.height}
                  message={errors.height}
                />
              </FormControl.Section>
              <FormControl.Section>
                <FormControl.Input
                  label="Weight (lbs)"
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Weight (lbs)"
                  data-testid="create-bill-weight"
                  error={errors.weight && touched.weight}
                />
                <FormControl.Error
                  name="weight"
                  show={errors.weight && touched.weight}
                  message={errors.weight}
                />
              </FormControl.Section>
            </FormControl.ResponsiveSection>

            <FormControl.ResponsiveSection>
              <FormControl.Section>
                <FormControl.Input
                  label="Blood Pressure"
                  id="bloodPressure"
                  type="text"
                  mask="999/99"
                  value={bloodPressure}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Blood Pressure"
                  data-testid="create-bill-bloodPressure"
                  error={errors.bloodPressure && touched.bloodPressure}
                />
                <FormControl.Error
                  name="bloodPressure"
                  show={errors.bloodPressure && touched.bloodPressure}
                  message={errors.bloodPressure}
                />
              </FormControl.Section>
              <FormControl.Section>
                <FormControl.Input
                  label="Temperature"
                  id="temperature"
                  type="number"
                  value={temperature}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Temperature"
                  data-testid="create-bill-temperature"
                  error={errors.temperature && touched.temperature}
                />
                <FormControl.Error
                  name="temperature"
                  show={errors.temperature && touched.temperature}
                  message={errors.temperature}
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
