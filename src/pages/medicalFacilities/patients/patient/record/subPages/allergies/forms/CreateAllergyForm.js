import React from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { LIST_ALLERGIES } from '../queries'
import { CREATE_ALLERGY } from '../mutations'
import { useMutation } from '@apollo/react-hooks'
import { initialAllergy, createAllergySchema } from './initialValues'
import { Core, FormControl, Content, Loading } from 'components'
import { useRouteMatch } from 'react-router-dom'

export default function CreateAllergyForm({
  close,
  showNotificationAllergyCreate,
}) {
  const {
    params: { patientId },
  } = useRouteMatch()

  //Mutation
  const [createAllergy, { loading, error }] = useMutation(CREATE_ALLERGY, {
    refetchQueries: () => [
      {
        query: LIST_ALLERGIES,
        variables: { patientId: parseInt(patientId) },
      },
    ],
    onCompleted(createAllergy) {
      showNotificationAllergyCreate()
    },
  })

  return (
    <Formik
      initialValues={initialAllergy}
      validationSchema={createAllergySchema}
      onSubmit={async (values, actions) => {
        await createAllergy({
          variables: {
            allergy: {
              patientId: parseInt(patientId),
              name: values.name,
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
        const { name, description, status } = values
        return (
          <form
            onSubmit={handleSubmit}
            css={`
              width: 600px;
            `}
          >
            {loading && <Loading />}
            {error && (
              <Content.Alert type="error" message="Fail to add allergy" />
            )}
            <Core.Text customSize="20px">
              Please enter allergy details below
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
                <Core.Text>Active Allergy</Core.Text>
                <FormControl.Toggle
                  value={status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="status"
                  name="status"
                />
              </div>
            </div>

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
            <div
              css={`
                height: 10px;
              `}
            />
            <FormControl.Section>
              <FormControl.Input
                label="Description"
                id="description"
                type="text"
                multiline
                rows={4}
                value={description}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Description"
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
