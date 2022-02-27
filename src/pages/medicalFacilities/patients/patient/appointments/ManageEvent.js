import React, { useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import 'styled-components/macro'
import {
  Layout,
  Core,
  Colours,
  FormControl,
  Loading,
  Content,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { Formik } from 'formik'
import { createPatientSchema } from './createEvent/forms/initialValues'
import { Details } from './updateEvent'
import { UPDATE_APPOINTMENT } from '../../../appointment/mutations'
import { LIST_PATIENTS_APPOINTMENTS } from './queries'
import { useMutation } from '@apollo/react-hooks'
import { AddFiveHours } from 'utils'
import { LIST_AVAILABILITY } from 'pages/settings/account/queries'

export default function ManageEvent() {
  const history = useHistory()
  const {
    params: { eventId, patientId },
  } = useRouteMatch()
  const updatePermission = PermissionCheck({
    feature: 'Appointment',
    action: 'UPDATE',
  })
  const appointmentDetails =
    JSON.parse(localStorage.getItem('selectedAppointment')) || {}
  const {
    title: Title,
    reason: reasonForVisit,
    startTime,
    endTime,
    doctor,
    updated,
    availabilityId,
  } = appointmentDetails || {}
  const { id: doctorId } = doctor || {}

  const [selectedDay, setSelectedDay] = useState(
    updated
      ? new Date(startTime).toISOString()
      : new Date(parseInt(startTime)).toISOString()
  )
  const [selectedtime, setSelectedTime] = useState({
    time: updated
      ? new Date(startTime).toISOString()
      : AddFiveHours(new Date(parseInt(startTime))).toISOString(),
    endTime: updated
      ? new Date(endTime).toISOString()
      : AddFiveHours(new Date(parseInt(endTime))).toISOString(),
    status: false,
    availabilityId: availabilityId,
  })

  //Mutation
  const [updateAppointment, { loading, error }] = useMutation(
    UPDATE_APPOINTMENT,
    {
      refetchQueries: () => [
        {
          query: LIST_PATIENTS_APPOINTMENTS,
          variables: { patientId: parseInt(patientId) },
        },
        {
          query: LIST_AVAILABILITY,
          variables: { doctorId: parseInt(doctorId), selectedDay },
        },
      ],
      onCompleted({ updateAppointment }) {
        localStorage.setItem(
          'selectedAppointment',
          JSON.stringify({ updated: true, ...updateAppointment })
        )
        history.goBack()
      },
    }
  )

  return (
    <Layout.Container>
      {' '}
      {updatePermission ? (
        <div
          css={`
            height: 100%;
            display: grid;
            grid-template-rows: max-content 1fr;
            grid-gap: 20px;
            overflow-y: auto;
          `}
        >
          <Layout.TopPanel title="Manage Appointment">
            <Core.Button form="update" type="submit" bgColour={Colours.green}>
              Save
            </Core.Button>
          </Layout.TopPanel>
          {loading && <Loading />}
          {error && (
            <Content.Alert
              type="error"
              message="Failed up update appointment details."
            />
          )}
          <Formik
            initialValues={{ title: Title, reasonForVisit: reasonForVisit }}
            validationSchema={createPatientSchema({
              patientCreated: false,
            })}
            onSubmit={async (values, actions) => {
              //Constructing Date by merging day and time together
              const startYear = parseInt(selectedDay.split('-')[0])
              const startMonth = parseInt(selectedDay.split('-')[1])
              const startDay = parseInt(selectedDay.split('-')[2])
              const startHour = parseInt(
                selectedtime.time.split('T')[1].split(':')[0]
              )
              if (updated) {
              }
              const startMin = parseInt(
                selectedtime.time.split('T')[1].split(':')[1]
              )

              const endYear = parseInt(selectedDay.split('-')[0])
              const endMonth = parseInt(selectedDay.split('-')[1])
              const endDay = parseInt(selectedDay.split('-')[2])
              const endtHour = parseInt(
                selectedtime.endTime.split('T')[1].split(':')[0]
              )
              const endtMin = parseInt(
                selectedtime.endTime.split('T')[1].split(':')[1]
              )

              let startTime = new Date(
                startYear,
                startMonth - 1,
                startDay,
                startHour - 10,
                startMin
              ).toISOString()

              if (updated) {
                startTime = new Date(
                  startYear,
                  startMonth - 1,
                  startDay,
                  startHour - 5,
                  startMin
                ).toISOString()
              }

              const endTime = new Date(
                endYear,
                endMonth - 1,
                endDay,
                endtHour - 10,
                endtMin
              ).toISOString()

              await updateAppointment({
                variables: {
                  appointment: {
                    id: parseInt(eventId),
                    title: values.title,
                    reason: values.reasonForVisit,
                    startTime,
                    endTime,
                    availabilityId: selectedtime.availabilityId,
                  },
                },
              }).catch((e) => console.log(e))
            }}
          >
            {(props) => {
              const {
                handleSubmit,
                values,
                touched,
                handleBlur,
                handleChange,
                errors,
              } = props
              const { title } = values
              return (
                <form onSubmit={handleSubmit} id="update">
                  <div
                    css={`
                      display: grid;
                      grid-template-rows: repeat(1, max-content) 1fr;
                      grid-gap: 10px;
                    `}
                  >
                    <FormControl.Section>
                      <FormControl.Input
                        label="Title"
                        id="title"
                        type="text"
                        value={title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Title"
                        data-testid="create-Patient-title"
                        error={errors.title && touched.title}
                      />
                      <FormControl.Error
                        name="trn"
                        show={errors.title && touched.title}
                        message={errors.title}
                      />
                    </FormControl.Section>
                    {/* <MenuNavigation.EventNavigation update /> */}
                    <Details
                      selectedDoctor={parseInt(doctorId)}
                      mark={AddFiveHours(new Date(parseInt(startTime)))}
                      props={props}
                      selectedDay={selectedDay}
                      setSelectedDay={setSelectedDay}
                      selectedtime={selectedtime}
                      setSelectedTime={setSelectedTime}
                      updated={updated}
                    />
                  </div>
                </form>
              )
            }}
          </Formik>
        </div>
      ) : (
        <RestrictedAccess small />
      )}
    </Layout.Container>
  )
}
