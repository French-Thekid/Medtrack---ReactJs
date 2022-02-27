import React from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, Core, Loading, FormControl } from 'components'
import { useHistory } from 'react-router-dom'
import { TOGGLE_LIFE_STATUS } from '../../mutations'
import { LIST_PATIENTS } from '../../queries'
import { useMutation } from '@apollo/react-hooks'

export default function LifeStatus() {
  const { Dialog } = useDialog()
  const history = useHistory()

  const { life, id } = JSON.parse(localStorage.getItem('selectedPatient')) || {}

  //Mutation
  const [
    togglePatientLifeStatus,
    { loading, error: togglePatientLifeStatusFailed },
  ] = useMutation(TOGGLE_LIFE_STATUS, {
    refetchQueries: () => [
      {
        query: LIST_PATIENTS,
      },
    ],
    onCompleted({ togglePatientLifeStatus }) {
      const { person, life, medicalCondition, id } = togglePatientLifeStatus
      const { dob, id: patientPersonId } = person || {}
      localStorage.setItem(
        'selectedPatient',
        JSON.stringify({
          togglePatientLifeStatus,
          ...person,
          life,
          medicalCondition,
          id,
          patientPersonId,
          dateOfBirth: dob ? new Date(parseInt(dob)).toDateString() : '',
        })
      )
    },
  })

  const statuses = [
    { label: 'Alive', value: 'Alive' },
    { label: 'Decease', value: 'Decease' },
  ]

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={`Life Status`}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          <Formik
            initialValues={{
              status: life,
            }}
            validationSchema={object().shape({
              status: string().required('Life Status is required.'),
            })}
            onSubmit={async ({ status }, action) => {
              action.setSubmitting(true)
              await togglePatientLifeStatus({
                variables: {
                  id: parseInt(id),
                  lifeStatus: status,
                },
              }).catch((e) => console.log(e))
              history.goBack()
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
                isSubmitting,
              } = props

              const { status } = values

              return (
                <form onSubmit={handleSubmit}>
                  {loading && <Loading small />}
                  {togglePatientLifeStatusFailed && (
                    <Content.Alert
                      type="error"
                      message={'Failed to update patient'}
                    />
                  )}
                  <Core.Text>
                    Please select from the dropdown below the current life
                    <br />
                    status of this patient
                  </Core.Text>
                  <br />
                  <FormControl.Select
                    value={status}
                    groups={statuses}
                    label="Life Status"
                    name="status"
                    handlechange={handleChange}
                    handleblur={handleBlur}
                    error={errors.status && touched.status}
                  />
                  <FormControl.Error
                    name="status"
                    show={errors.status && touched.status}
                    message={errors.status}
                  />
                  <br />
                  <br />
                  <Core.Button
                    type="submit"
                    action="READ"
                    disabled={isSubmitting}
                    style={{ marginTop: '20px' }}
                  >
                    Submit
                  </Core.Button>
                </form>
              )
            }}
          </Formik>
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
