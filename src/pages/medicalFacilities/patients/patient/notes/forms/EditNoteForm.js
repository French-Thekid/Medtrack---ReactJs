import { Formik } from 'formik'
import { object, string } from 'yup'
import 'styled-components/macro'

import { Sections } from './initialValues'
import { Core, FormControl, Content, Loading } from 'components'
import { UPDATE_NOTE } from '../mutations'
import { LIST_NOTES } from '../queries'
import { useRouteMatch } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

export default function EditNoteForm({ close }) {
  const { title, section, details, id } =
    JSON.parse(localStorage.getItem('selectedNote')) || {}

  const {
    params: { patientId },
  } = useRouteMatch()
  //Mutation
  const [updateNote, { loading, error }] = useMutation(UPDATE_NOTE, {
    refetchQueries: () => [
      {
        query: LIST_NOTES,
        variables: { patientId: parseInt(patientId) },
      },
    ],
  })

  return (
    <Formik
      initialValues={{ title, section, details }}
      validationSchema={object().shape({
        title: string().required('Name is required!'),
        section: string().required('Section is required!'),
        details: string().required('Details is required!'),
      })}
      onSubmit={async (values, actions) => {
        updateNote({
          variables: {
            note: {
              id: parseInt(id),
              title: values.title,
              section: values.section,
              details: values.details,
              patientId: parseInt(patientId),
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
        const { title, details, section } = values
        return (
          <form onSubmit={handleSubmit}>
            {loading && <Loading />}
            {error && <Content.Alert type="error" message={error.message} />}
            <FormControl.ResponsiveSection col="2fr 1fr">
              <FormControl.Section>
                <FormControl.Input
                  label="Title"
                  id="title"
                  type="text"
                  value={title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Title"
                  data-testid="create-role-title"
                  error={errors.title && touched.title}
                />
                <FormControl.Error
                  name="title"
                  show={errors.title && touched.title}
                  message={errors.title}
                />
              </FormControl.Section>

              <FormControl.Section>
                <FormControl.Select
                  value={section}
                  groups={Sections}
                  label="Sections"
                  name="section"
                  handlechange={handleChange}
                  handleblur={handleBlur}
                  error={errors.section && touched.section}
                />
                <FormControl.Error
                  name="section"
                  show={errors.section && touched.section}
                  message={errors.section}
                />
              </FormControl.Section>
            </FormControl.ResponsiveSection>

            <FormControl.Section marginTop="15px">
              <FormControl.Input
                label="Details"
                id="details"
                type="text"
                value={details}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Details"
                data-testid="create-Note-details"
                error={errors.details && touched.details}
                multiline
                rows={10}
              />
              <FormControl.Error
                name="details"
                show={errors.details && touched.details}
                message={errors.details}
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
                Update
              </Core.Button>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
