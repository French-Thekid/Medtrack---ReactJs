import React from 'react'
import 'styled-components/macro'
import { Core, Colours, Content, Loading } from 'components'
import { AppointmentCard } from '../../../../dashboard/AppointmentWidgetContainer'
import { useQuery } from '@apollo/react-hooks'
import { LIST_PATIENTS_APPOINTMENTS } from '../../appointments/queries'
import { TimeExtrator, AddFiveHours } from 'utils'
import { useRouteMatch } from 'react-router-dom'
import moment from 'moment'

export default function Appointment() {
  const {
    params: { patientId },
  } = useRouteMatch()

  //Query
  const {
    loading: loadingAppointments,
    error: listAppointmentError,
    data: appointments,
  } = useQuery(LIST_PATIENTS_APPOINTMENTS, {
    variables: { patientId: parseInt(patientId) },
  })

  if (loadingAppointments) return <Loading Contained />
  if (listAppointmentError)
    return (
      <Content.Alert
        type="error"
        message={'Failed to load Upcoming Appointments'}
      />
    )

  let appointment = {}
  let flag = false

  appointment = appointments.listPatientAppointments.data
    .map((appointment, index) => {
      let date = new Date(parseInt(appointment.startTime))
      date = AddFiveHours(date)
      if (date >= new Date() && flag === false) {
        flag = true
        return appointment
      }
      return null
    })
    .filter((item, index) => item !== null)

  const {
    id,
    checkedIn,
    patient,
    doctor,
    title,
    startTime = '',
    ...rest
  } = appointment[0] || {}

  const { person: patientPerson } = patient || {}
  const { firstName, lastName, avatar } = patientPerson || {}
  const { user } = doctor || {}
  const { firstName: DFirstName, lastName: DLastName, person } = user || {}
  const { title: DTitle } = person || {}
  let date = new Date(parseInt(startTime)) || new Date()
  let day = ''
  let time = ''
  let dateCheck = moment(date).isValid()

  if (dateCheck) {
    date = AddFiveHours(date)
    day = `${date.toString().split(' ')[1]} ${date.toString().split(' ')[2]}`
    time = TimeExtrator.format(Date.parse(date))
      .toLowerCase()
      .split(' ')
      .join('')
  }

  const allData = {
    id,
    checkedIn,
    patient,
    doctor,
    title,
    startTime,
    ...rest,
  }

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 10px;
        overflow-y: auto;
      `}
    >
      <div
        css={`
          border-bottom: 1px solid ${Colours.border};
          padding: 4px 0px;
        `}
      >
        <Core.Text
          customSize="25px"
          overrideCustomSize="20px"
          screen="1400px"
          color={Colours.teal}
        >
          Upcoming Appointment
        </Core.Text>
      </div>
      <div
        css={`
          height: calc(100% - 20px);
          overflow-y: auto;
          border-radius: 5px;
          padding: 10px 0px;
        `}
      >
        {appointment.length === 0 ? (
          <div
            css={`
              border-radius: 5px;
              background: #fdf8ff;
              padding: 10px;
              height: calc(100% - 20px);
              width: calc(100% - 20px);
              display: grid;
              place-items: Center;
            `}
          >
            <Core.Text color={Colours.purple}>
              No Upcoming Appointment
            </Core.Text>
          </div>
        ) : (
          <AppointmentCard
            avatar={avatar}
            firstName={firstName}
            lastName={lastName}
            doctorName={`${DTitle || ''} ${DFirstName} ${DLastName}`}
            time={time}
            title={title}
            date={day}
            active={checkedIn}
            allData={allData}
            old={false}
            to={`/facility/patient/appointments/${patientId}?action=view&id=${id}`}
            update={`/facility/patient/appointments/${patientId}/updateAppointment/${id}`}
          />
        )}
      </div>
    </div>
  )
}
