import React, { useState } from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Formik } from 'formik'
import { useHistory, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { LIST_AVAILABILITY } from 'pages/settings/account/queries'
import { CREATE_PATIENT } from '../../../patients/mutations'
import { BOOK_APPOINTMENT } from '../../mutations'
import { LIST_APPOINTMENTS } from '../../queries'
import { LIST_PATIENTS } from '../../../patients/queries'
import { initialPatient, createPatientSchema } from '../forms/initialValues'
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
import {
  PatientSelection,
  NewPatientSelection,
  DoctorSelection,
  Details,
} from '../index'

const queryString = require('query-string')

export default function BookAppointment({
  showNotificationBook,
  doctorIds = [],
}) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const createPermission = PermissionCheck({
    feature: 'Appointment',
    action: 'CREATE',
  })
  const { search } = useLocation()
  const { mark } = queryString.parse(search)

  const [page, setPage] = useState({
    active: 'Patient Attendee',
    main: true,
    patientCreated: false,
  })
  const [selectedPatient, setSelectedPatient] = useState()
  const [selectedDoctor, setSelectedDoctor] = useState()
  const [selectedDay, setSelectedDay] = useState(new Date(mark).toISOString())
  const [selectedtime, setSelectedTime] = useState({
    time: new Date(mark).toISOString(),
    endTime: new Date(mark).toISOString(),
    status: false,
    availabilityId: '',
  })
  const [details, setDetail] = useState()

  //Mutation to Create Patient
  const [createPatient, { loading, error: createPatientFailed }] = useMutation(
    CREATE_PATIENT,
    {
      refetchQueries: () => [
        {
          query: LIST_PATIENTS,
        },
        {
          query: LIST_AVAILABILITY,
          variables: { doctorId: parseInt(selectedDoctor), selectedDay },
        },
      ],
      onCompleted({ createPatient }) {
        console.log('Received: ', createPatient)
        //Calling endpoint to add patient to Appointment
        createAppointment({
          variables: {
            appointment: {
              doctorId: parseInt(selectedDoctor),
              patientId: parseInt(createPatient.id),
              title: details.title,
              reason: details.reasonForVisit,
              startTime: details.startTime,
              endTime: details.endTime,
              availabilityId: selectedtime.availabilityId,
            },
          },
        }).catch((e) => console.log(e))
      },
    }
  )

  //Mutation to Create Appointment
  const [
    createAppointment,
    { loading: booking, error: createAppointmentFailed },
  ] = useMutation(BOOK_APPOINTMENT, {
    refetchQueries: () => [
      {
        query: LIST_APPOINTMENTS,
        variables: { doctorIds },
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

  const validation = (errors) => {
    if (
      selectedDoctor === undefined ||
      (!page.patientCreated && selectedPatient === undefined) ||
      (page.patientCreated && JSON.stringify(errors) !== JSON.stringify({})) ||
      !selectedtime.status
    )
      return true
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
          {createPermission ? (
            <Formik
              initialValues={initialPatient}
              validationSchema={createPatientSchema({
                patientCreated: page.patientCreated,
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

                if (page.patientCreated) {
                  //Constructing object for Emergency Contact
                  values.emergencyContact.firstName =
                    values.emergencyContactName
                      ? values.emergencyContactName.split(' ')[0]
                      : ''

                  values.emergencyContact.lastName = values.emergencyContactName
                    ? values.emergencyContactName.split(' ')[1]
                    : ''

                  //Constructing object for Contact
                  values.contact.number = values.phone

                  setDetail({
                    title: values.title,
                    reasonForVisit: values.reasonForVisit,
                    startTime,
                    endTime,
                  })

                  delete values['emergencyContactName']
                  delete values['emergencyContactNumber']
                  delete values['phone']
                  delete values['title']
                  delete values['reasonForVisit']
                  delete values.emergencyContact['fullName']

                  console.log(values)
                  if (values.avatar !== null)
                    values.avatar = values.avatar.split(',')[1]
                  createPatient({
                    variables: {
                      patient: values,
                    },
                  }).catch((e) => console.log(e))

                  //Will be executed when appointment is completed in order to get appointment ID
                } else {
                  createAppointment({
                    variables: {
                      appointment: {
                        doctorId: parseInt(selectedDoctor),
                        patientId: parseInt(selectedPatient),
                        title: values.title,
                        reason: values.reasonForVisit,
                        startTime,
                        endTime,
                        availabilityId: selectedtime.availabilityId,
                      },
                    },
                  }).catch((e) => console.log(e))
                }
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
                    <div
                      css={`
                        display: grid;
                        grid-template-rows: repeat(2, max-content) 1fr max-content;
                        grid-gap: 10px;
                      `}
                    >
                      {loading && <Loading />}
                      {booking && <Loading />}
                      {createAppointmentFailed && (
                        <Content.Alert
                          type="error"
                          message="Creating Appointment Failed"
                        />
                      )}
                      {createPatientFailed && (
                        <Content.Alert
                          type="error"
                          message="Creating Patient Failed"
                        />
                      )}
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
                      />
                      {page.active === 'Patient Attendee' && page.main ? (
                        <PatientSelection
                          setPage={setPage}
                          selectedPatient={selectedPatient}
                          setSelectedPatient={setSelectedPatient}
                        />
                      ) : page.active === 'Patient Attendee' && !page.main ? (
                        <NewPatientSelection
                          props={props}
                          setPage={setPage}
                          formId="bookAppointment"
                          selectedPatient={selectedPatient}
                          setSelectedPatient={setSelectedPatient}
                        />
                      ) : page.active === 'Doctor Attendee' && page.main ? (
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
