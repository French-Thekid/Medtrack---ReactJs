import React from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { LIST_MEDICINES } from '../queries'
import { CREATE_MEDICINE } from '../mutations'
import { useMutation } from '@apollo/react-hooks'
import { initialMedicine, createMedicineSchema } from './initialValues'
import { Core, FormControl, Content, Loading } from 'components'
import { useRouteMatch } from 'react-router-dom'

export default function CreateMedicineForm({
  close,
  showNotificationMedicineCreate,
}) {
  const {
    params: { patientId },
  } = useRouteMatch()

  //Mutation
  const [createMedicine, { loading, error }] = useMutation(CREATE_MEDICINE, {
    refetchQueries: () => [
      {
        query: LIST_MEDICINES,
        variables: { patientId: parseInt(patientId) },
      },
    ],
    onCompleted(createMedicine) {
      showNotificationMedicineCreate()
    },
  })

  return (
    <Formik
      initialValues={initialMedicine}
      validationSchema={createMedicineSchema}
      onSubmit={async (values, actions) => {
        await createMedicine({
          variables: {
            medicine: {
              patientId: parseInt(patientId),
              name: values.name,
              dosage: values.dosage,
              description: values.description,
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
        const { name, dosage, description, status } = values
        return (
          <form
            onSubmit={handleSubmit}
            css={`
              width: 600px;
            `}
          >
            {loading && <Loading />}
            {error && (
              <Content.Alert type="error" message="Fail to add medicine" />
            )}
            <Core.Text customSize="20px">
              Please enter medicine details below
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
                <Core.Text>Active Medicine</Core.Text>
                <FormControl.Toggle
                  value={status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="status"
                  name="status"
                />
              </div>
            </div>

            <FormControl.ResponsiveSection col="2fr 1fr">
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
                  label="Dosage"
                  id="dosage"
                  type="text"
                  value={dosage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Dosage"
                  data-testid="create-bill-dosage"
                  error={errors.dosage && touched.dosage}
                />
                <FormControl.Error
                  name="dosage"
                  show={errors.dosage && touched.dosage}
                  message={errors.dosage}
                />
              </FormControl.Section>
            </FormControl.ResponsiveSection>
            <FormControl.Section>
              <FormControl.Input
                label="Instructions"
                id="description"
                type="text"
                multiline
                rows={4}
                value={description}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Instructions"
                data-testid="create-bill-description"
                error={errors.description && touched.description}
              />
              <FormControl.Error
                name="description"
                show={errors.description && touched.description}
                message={errors.description}
              />
            </FormControl.Section>
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
