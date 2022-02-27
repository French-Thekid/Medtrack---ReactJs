import React, { useState } from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Formik } from 'formik'
import { LIST_AVAILABILITY } from 'pages/settings/account/queries'
import {
  Layout,
  Content,
  FormControl,
  MenuNavigation,
  Core,
  Colours,
  Loading,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { DoctorSelection, Details } from '../index'
import { BOOK_APPOINTMENT } from '../../../../../appointment/mutations'
import { LIST_PATIENTS_APPOINTMENTS } from '../../queries'
import { useMutation } from '@apollo/react-hooks'

import { initialPatient, createPatientSchema } from '../forms/initialValues'

const queryString = require('query-string')

export default function BookAppointment({ showNotificationBook }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const {
    params: { patientId },
  } = useRouteMatch()
  const { search } = useLocation()
  const { mark } = queryString.parse(search)
  const createPermission = PermissionCheck({
    feature: 'Appointment',
    action: 'CREATE',
  })
  const [page, setPage] = useState({
    active: 'Doctor Attendee',
    main: true,
    patientCreated: false,
  })
  const [selectedDoctor, setSelectedDoctor] = useState()
  const [selectedDay, setSelectedDay] = useState(new Date(mark).toISOString())
  const [selectedtime, setSelectedTime] = useState({
    time: new Date(mark).toISOString(),
    endTime: new Date(mark).toISOString(),
    status: false,
    availabilityId: '',
  })

  //Mutation to Create Appointment
  const [
    createAppointment,
    { loading: booking, error: createAppointmentFailed },
  ] = useMutation(BOOK_APPOINTMENT, {
    refetchQueries: () => [
      {
        query: LIST_PATIENTS_APPOINTMENTS,
        variables: { patientId: parseInt(patientId) },
      },
      {
        query: LIST_AVAILABILITY,
        variables: { doctorId: parseInt(selectedDoctor), selectedDay },
      },
    ],
    onCompleted({ createAppointment }) {
      history.goBack()
      showNotificationBook()
    },
  })

  const validation = () => {
    if (selectedDoctor === undefined || !selectedtime.status) return true
    else return false
  }

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Book Appointment'}
          close={() => {
            history.goBack()
          }}
          minWidth="750px"
        >
          {' '}
          {createPermission ? (
            <Formik
              initialValues={initialPatient}
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

                const startTime = new Date(
                  startYear,
                  startMonth - 1,
                  startDay,
                  startHour - 10,
                  startMin
                ).toISOString()

                const endTime = new Date(
                  endYear,
                  endMonth - 1,
                  endDay,
                  endtHour - 10,
                  endtMin
                ).toISOString()

                createAppointment({
                  variables: {
                    appointment: {
                      doctorId: parseInt(selectedDoctor),
                      patientId: parseInt(patientId),
                      title: values.title,
                      reason: values.reasonForVisit,
                      startTime,
                      endTime,
                      availabilityId: selectedtime.availabilityId,
                    },
                  },
                }).catch((e) => console.log(e))

                // history.goBack()
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
                  <form onSubmit={handleSubmit}>
                    {booking && <Loading />}
                    {createAppointmentFailed && (
                      <Content.Alert
                        type="error"
                        message="Creating Appointment Failed"
                      />
                    )}
                    <div
                      css={`
                        display: grid;
                        grid-template-rows: repeat(2, max-content) 1fr max-content;
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
                      <MenuNavigation.EventNavigation
                        page={page}
                        setPage={setPage}
                        special
                      />
                      {page.active === 'Doctor Attendee' && page.main ? (
                        <DoctorSelection
                          selectedDoctor={selectedDoctor}
                          setSelectedDoctor={setSelectedDoctor}
                        />
                      ) : page.active === `Details & Time` && page.main ? (
                        <Details
                          selectedDoctor={selectedDoctor}
                          mark={mark}
                          props={props}
                          selectedDay={selectedDay}
                          setSelectedDay={setSelectedDay}
                          selectedtime={selectedtime}
                          setSelectedTime={setSelectedTime}
                        />
                      ) : (
                        <div />
                      )}
                      <div
                        css={`
                          display: grid;
                          justify-items: right;
                        `}
                      >
                        <Core.Button
                          width="150px"
                          bgColour={Colours.green}
                          type="submit"
                          disabled={validation(errors)}
                        >
                          Book
                        </Core.Button>
                      </div>
                    </div>
                  </form>
                )
              }}
            </Formik>
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
