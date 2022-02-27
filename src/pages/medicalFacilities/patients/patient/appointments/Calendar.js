import React, { useContext, useState /* ,useEffect*/ } from 'react'
import 'styled-components/macro'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'pages/medicalFacilities/appointment/style/Override.css'
import { BookAppointment, ViewAppointment } from './createEvent/modal'
import { useQuery } from '@apollo/react-hooks'
import { OrganisationContext /*UserContext*/ } from 'context'

import {
  Layout,
  Loading,
  Content,
  Notification,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { useHistory, useRouteMatch, useLocation } from 'react-router'
import { LIST_PATIENTS_APPOINTMENTS } from './queries'
import { AddFiveHours } from 'utils'

const queryString = require('query-string')
const localizer = momentLocalizer(moment)

export default function Appointments() {
  const history = useHistory()
  const {
    params: { patientId },
  } = useRouteMatch()
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const { status } = useContext(OrganisationContext)
  const [completedBook, setcompletedBook] = useState(false)

  const ReadPermission = PermissionCheck({
    feature: 'Appointment',
    action: 'READ',
  })
  const showNotificationBook = () => {
    setcompletedBook(true)
    setTimeout(() => {
      setcompletedBook(false)
    }, 6000)
  }

  // const { loggedInUser } = useContext(UserContext) || {}
  // const { type, doctor = [] } = loggedInUser || {}
  // const { id = '' } = (doctor.length > 0 && doctor[0]) || {}

  // const [Doctors, setDoctors] = useState({
  //   doctors: [
  //     {
  //       name: type === 'Doctor' ? 'My' : 'All',
  //       value: type === 'Doctor' ? parseInt(id) : '',
  //     },
  //   ],
  // })

  // useEffect(() => {
  //   setDoctors({
  //     doctors: [
  //       {
  //         name: type === 'Doctor' ? 'My' : 'All',
  //         value: type === 'Doctor' ? parseInt(id) : '',
  //       },
  //     ],
  //   })
  //   // eslint-disable-next-line
  // }, [])

  //Query
  const {
    loading: loadingAppointments,
    error: listAppointmentError,
    data: appointments,
  } = useQuery(LIST_PATIENTS_APPOINTMENTS, {
    variables: { patientId: parseInt(patientId) },
  })

  if (loadingAppointments) return <Loading small />
  if (listAppointmentError)
    return (
      <Content.Alert type="error" message={'Failed to load Appointments'} />
    )

  const Events = appointments.listPatientAppointments.data.map(
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
      '#2F52E0',
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
      // textShadow: `#000 0px 0px 1px`,
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

  return (
    <Layout.Container>
      {ReadPermission ? (
        <>
          <Notification
            setcompleted={setcompletedBook}
            message="Appointment successfully booked."
            notification={completedBook}
          />
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
                history.push(`?${query}`)
              }
            }}
            onSelectEvent={(event) => {
              const query = queryString.stringify({
                action: 'view',
                id: event.id,
              })
              localStorage.setItem('selectedAppointment', JSON.stringify(event))
              history.push(`?${query}`)
            }}
            eventPropGetter={(e) => eventStyleGetter(e)}
          />
          {action === 'create' && (
            <BookAppointment showNotificationBook={showNotificationBook} />
          )}
          {action === 'view' && <ViewAppointment />}
        </>
      ) : (
        <RestrictedAccess small />
      )}
    </Layout.Container>
  )
}
