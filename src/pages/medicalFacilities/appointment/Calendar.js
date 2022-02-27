import React, { useContext, useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useLocation, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { AddFiveHours } from 'utils'
import 'styled-components/macro'
import './style/Override.css'
import moment from 'moment'
import { OrganisationContext, UserContext } from 'context'
import { LIST_APPOINTMENTS } from './queries'
import { BookAppointment, ViewAppointment } from './createEvent/modal'
import {
  Layout,
  Content,
  Loading,
  Notification,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import DoctorFilter from './DoctorFilter'

const queryString = require('query-string')
const localizer = momentLocalizer(moment)

export default function Appointments() {
  const { loggedInUser } = useContext(UserContext) || {}
  const { type, doctor = [] } = loggedInUser || {}
  const { id = '' } = (doctor.length > 0 && doctor[0]) || {}
  const [completedBook, setcompletedBook] = useState(false)
  const ReadPermission = PermissionCheck({
    feature: 'Appointment',
    action: 'READ',
  })
  const history = useHistory()
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const { status } = useContext(OrganisationContext)
  const [Doctors, setDoctors] = useState({
    doctors: [
      {
        name: type === 'Doctor' ? 'My' : 'All',
        value: type === 'Doctor' ? parseInt(id) : '',
      },
    ],
  })

  useEffect(() => {
    setDoctors({
      doctors: [
        {
          name: type === 'Doctor' ? 'My' : 'All',
          value: type === 'Doctor' ? parseInt(id) : '',
        },
      ],
    })
    // eslint-disable-next-line
  }, [])

  const doctorIds = Doctors.doctors
    .map(({ value }) => value)
    .filter((item, index) => item !== '')

  //Query
  const {
    loading: loadingAppointments,
    error: listAppointmentError,
    data: appointments,
  } = useQuery(LIST_APPOINTMENTS, {
    variables: {
      doctorIds: doctorIds,
    },
  })

  if (loadingAppointments) return <Loading small />
  if (listAppointmentError)
    return (
      <Content.Alert type="error" message={'Failed to load Appointments'} />
    )

  const Events = appointments.listAppointments.data.map(
    ({ id, startTime, endTime, title, ...rest }, index) => {
      return {
        title,
        allDay: false,
        start: AddFiveHours(new Date(parseInt(startTime))),
        end: AddFiveHours(new Date(parseInt(endTime))),
        id,
        startTime,
        endTime,
        ...rest,
      }
    }
  )

  const eventStyleGetter = (e) => {
    const { start = '' } = e || {}
    const day = start.toString().split(' ')[0]
    let colorKey = 0
    switch (day) {
      case 'Mon':
        colorKey = 1
        break
      case 'Tue':
        colorKey = 2
        break
      case 'Wed':
        colorKey = 3
        break
      case 'Thu':
        colorKey = 4
        break
      case 'Fri':
        colorKey = 5
        break
      case 'Sat':
        colorKey = 6
        break
      case 'Sun':
        colorKey = 0
        break
      default:
        colorKey = 0
        break
    }

    const colors = [
      '#FF715B',
      '#ffcc29',
      '#0A2E36',
      '#F45B69',
      '#EE6055',
      '#AF3B6E',
      '#C44900',
    ]

    var style = {
      backgroundColor: colors[colorKey],
      color: 'white',
      padding: '3px',
      textAlign: 'center',
      fontSmoothing: 'antialiased',
      border: '0px',
      display: 'block',
      borderRadius: '10px',
    }
    return {
      style: style,
    }
  }

  let disabled = false
  if (status === 'SUSPENDED') {
    disabled = true
  }

  const showNotificationBook = () => {
    setcompletedBook(true)
    setTimeout(() => {
      setcompletedBook(false)
    }, 6000)
  }

  return (
    <Layout.Container>
      {ReadPermission ? (
        <>
          <Notification
            setcompleted={setcompletedBook}
            message="Appointment successfully booked."
            notification={completedBook}
          />
          <div
            css={`
              height: 100%;
              display: grid;
              grid-template-rows: 1fr max-content;
            `}
          >
            <Calendar
              events={Events}
              selectable={true}
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              startAccessor="start"
              endAccessor="end"
              onSelectSlot={(slot) => {
                if (!disabled) {
                  const { start } = slot
                  const query = queryString.stringify({
                    action: 'create',
                    mark: start,
                  })
                  history.push(`/facility/appointments/?${query}`)
                }
              }}
              onSelectEvent={(event) => {
                const query = queryString.stringify({
                  action: 'view',
                  id: event.id,
                })
                localStorage.setItem(
                  'selectedAppointment',
                  JSON.stringify(event)
                )
                history.push(`/facility/appointments/?${query}`)
              }}
              eventPropGetter={(e) => eventStyleGetter(e)}
            />
            <DoctorFilter Doctors={Doctors} setDoctors={setDoctors} />
          </div>
          {action === 'create' && (
            <BookAppointment
              showNotificationBook={showNotificationBook}
              doctorIds={doctorIds}
            />
          )}
          {action === 'view' && <ViewAppointment doctorIds={doctorIds} />}
        </>
      ) : (
        <RestrictedAccess small />
      )}
    </Layout.Container>
  )
}
