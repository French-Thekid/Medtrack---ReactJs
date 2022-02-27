import React, { useState, useContext } from 'react'
import Calendar from 'react-calendar'
import 'styled-components/macro'
import 'react-calendar/dist/Calendar.css'
import './style/override.css'
import { useSpring, animated } from 'react-spring'

import { Colours, Icons, Core, ImageWithStatus } from 'components'
import { TimeExtrator, AddFiveHours } from 'utils'
import { useHistory } from 'react-router-dom'
import { OrganisationContext } from 'context'

export default function AppointmentWidgetCard({ appointments }) {
  const [value, onChange] = useState(new Date())
  let totalValue = 0

  appointments.map(({ startTime }, index) => {
    let date = new Date(parseInt(startTime))
    date = AddFiveHours(date)
    if (date >= new Date()) totalValue++
    return null
  })

  const rightStyle = useSpring({
    from: { opacity: 0, transform: 'translate3d(20rem, 0, 0)' },
    config: { duration: 500 },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })

  return (
    <animated.div
      style={rightStyle}
      css={`
        @media only screen and (max-width: 1025px) {
          display: none;
        }
        /* hiding for tablet mode */
        @media only screen and (max-height: 769px) {
          @media only screen and (max-width: 1025px) {
            @media (orientation: landscape) {
              display: none;
            }
          }
        }
        @media only screen and (max-height: 1025px) {
          @media only screen and (max-width: 769px) {
            @media (orientation: portrait) {
              display: none;
            }
          }
        }
        /* ipad pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              display: none;
            }
          }
        }

        background: rgb(235, 227, 255);
        background: linear-gradient(
          180deg,
          rgba(235, 227, 255, 1) 0%,
          rgba(249, 246, 255, 1) 37%,
          rgba(254, 254, 254, 1) 52%,
          rgba(255, 255, 255, 1) 100%
        );
        box-shadow: 0px 10px 26px 4px rgba(213, 213, 213, 0.7);
        border-radius: 10px;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        padding: 10px;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-row-gap: 80px;
        overflow-y: auto;
      `}
    >
      <div
        css={`
          min-height: 260px;
          border-radius: 5px;
        `}
      >
        <Calendar onChange={onChange} value={value} />
      </div>
      <div
        css={`
          display: grid;
          grid-template-rows: 40px 1fr;
          grid-row-gap: 10px;
          overflow-y: auto;
        `}
      >
        <div
          css={`
            height: 100%;
            border-bottom: 2px solid ${Colours.border};
            display: grid;
            grid-template-columns: 1fr max-content;
            align-items: center;
          `}
        >
          <Core.Text color={Colours.purple} customSize="20px">
            Upcoming Appointments
          </Core.Text>
          <div
            css={`
              background: ${Colours.purple};
              padding: 2px 5px;
              border-radius: 5px;
              color: #fff;
              width: 35px;
              height: max-content;
              display: grid;
              place-items: center;
            `}
          >
            {totalValue}
          </div>
        </div>
        <div
          css={`
            height: 100%;
            overflow-y: auto;
          `}
        >
          {appointments.map(
            (
              {
                id,
                checkedIn,
                patient,
                doctor,
                title,
                startTime,
                appointmentStatus,
                ...rest
              },
              index
            ) => {
              if (startTime === null) startTime = ''

              const { name: Completed } = appointmentStatus || {}

              // console.log(startTime)
              const { person: patientPerson } = patient || {}
              const { firstName, lastName, avatar } = patientPerson || {}
              const { user } = doctor || {}
              const {
                firstName: DFirstName,
                lastName: DLastName,
                person,
              } = user || {}
              const { title: DTitle } = person || {}
              let date = new Date(parseInt(startTime))
              date = AddFiveHours(date)
              let day = `${date.toString().split(' ')[1]} ${
                date.toString().split(' ')[2]
              }`

              const time = TimeExtrator.format(Date.parse(date))
                .toLowerCase()
                .split(' ')
                .join('')

              const allData = {
                id,
                checkedIn,
                patient,
                doctor,
                title,
                startTime,
                ...rest,
              }
              let old = false
              if (date >= value) {
                if (date < new Date()) old = true
                return (
                  <AppointmentCard
                    key={index}
                    avatar={avatar}
                    firstName={firstName}
                    lastName={lastName}
                    doctorName={`${DTitle || ''} ${DFirstName} ${DLastName}`}
                    time={time}
                    title={title}
                    date={day}
                    active={checkedIn}
                    id={id}
                    allData={allData}
                    old={old}
                    Completed={Completed}
                  />
                )
              }
              return null
            }
          )}
        </div>
      </div>
    </animated.div>
  )
}

export function AppointmentWidgetCardSecondary({ total, appointments }) {
  const [value, onChange] = useState(new Date())
  let totalValue = 0

  appointments.map(({ startTime }, index) => {
    let date = new Date(parseInt(startTime))
    date = AddFiveHours(date)
    if (date >= new Date()) totalValue++
    return null
  })

  const bottomStyle = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 20rem, 0)' },
    config: { duration: 500 },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })

  return (
    <animated.div
      style={bottomStyle}
      css={`
        @media only screen and (max-height: 769px) {
          @media only screen and (max-width: 1025px) {
            @media (orientation: landscape) {
              display: visible;
            }
          }
        }
        /* ipad pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              display: visible;
            }
          }
        }

        /* hiding for desktop mode */
        @media only screen and (min-width: 1300px) {
          @media (orientation: landscape) {
            display: none;
          }
        }
        @media only screen and (min-width: 1025px) {
          display: none;
        }
        background: rgb(235, 227, 255);
        background: linear-gradient(
          180deg,
          rgba(235, 227, 255, 1) 0%,
          rgba(249, 246, 255, 1) 37%,
          rgba(254, 254, 254, 1) 52%,
          rgba(255, 255, 255, 1) 100%
        );
        box-shadow: 0px 10px 26px 4px rgba(213, 213, 213, 0.7);
        border-radius: 10px;
        min-height: 400px;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 20px;
      `}
    >
      <div
        css={`
          border-radius: 5px;
        `}
      >
        <Calendar onChange={onChange} value={value} />
      </div>
      <div
        css={`
          display: grid;
          grid-template-rows: 40px 1fr;
          grid-row-gap: 10px;
        `}
      >
        <div
          css={`
            height: 100%;
            border-bottom: 2px solid ${Colours.border};
            display: grid;
            grid-template-columns: 1fr max-content;
            align-items: center;
          `}
        >
          <Core.Text color={Colours.purple} customSize="20px">
            Upcoming Appointments
          </Core.Text>
          <div
            css={`
              background: ${Colours.purple};
              padding: 2px 5px;
              border-radius: 5px;
              color: #fff;
              width: 35px;
              height: max-content;
              display: grid;
              place-items: center;
            `}
          >
            {totalValue}
          </div>
        </div>
        <div
          css={`
            height: 340px;
            @media screen and (min-width: 1440px) {
              height: 500px;
            }
            overflow: auto;
          `}
        >
          {appointments.map(
            (
              {
                id,
                checkedIn,
                patient,
                doctor,
                title,
                appointmentStatus,
                startTime,
                ...rest
              },
              index
            ) => {
              const { person: patientPerson } = patient || {}
              const { name: Completed } = appointmentStatus || {}
              const { firstName, lastName, avatar } = patientPerson || {}
              const { user } = doctor || {}
              const {
                firstName: DFirstName,
                lastName: DLastName,
                person,
              } = user || {}
              const { title: DTitle } = person || {}
              let date = new Date(parseInt(startTime))
              date = AddFiveHours(date)
              let day = `${date.toString().split(' ')[1]} ${
                date.toString().split(' ')[2]
              }`

              const time = TimeExtrator.format(Date.parse(date))
                .toLowerCase()
                .split(' ')
                .join('')

              const allData = {
                id,
                checkedIn,
                patient,
                doctor,
                title,
                startTime,
                ...rest,
              }
              let old = false
              if (date >= value) {
                if (date < new Date()) old = true
                return (
                  <AppointmentCard
                    key={index}
                    avatar={avatar}
                    firstName={firstName}
                    lastName={lastName}
                    doctorName={`${DTitle || ''} ${DFirstName} ${DLastName}`}
                    time={time}
                    title={title}
                    date={day}
                    active={checkedIn}
                    allData={allData}
                    old={old}
                    Completed={Completed}
                  />
                )
              }
              return null
            }
          )}
        </div>
      </div>
    </animated.div>
  )
}

export const AppointmentCard = ({
  avatar,
  firstName,
  lastName,
  title,
  date,
  time,
  doctorName,
  active,
  allData,
  old,
  to,
  update,
  Completed,
}) => {
  const history = useHistory()
  const { status } = useContext(OrganisationContext)
  let disabled = false
  let toolTip = {}
  if (status === 'SUSPENDED') {
    disabled = true
    toolTip = {
      'aria-label': 'Cannot operate while facility is suspended',
      'data-balloon-pos': 'bottom',
    }
  }

  if (Completed === 'Completed') old = true

  return (
    <div
      {...toolTip}
      css={`
        opacity: ${old ? 0.7 : 1};
        background: #fff;
        margin-bottom: 10px;
        display: grid;
        grid-template-columns: 40px 1fr max-content max-content;
        grid-column-gap: 10px;
        width: calc(100% - 22px);
        height: 70px;
        border-radius: 5px;
        border: 1px solid ${active ? Colours.green : Colours.border};
        box-shadow: 0px 3px 20px -10px rgba(186, 186, 255, 1);
        padding: 10px;
        align-items: center;
        @media screen and (min-width: 1440px) {
          height: 100px;
          grid-template-columns: 90px 1fr max-content max-content;
        }
        &:hover {
          cursor: pointer;
          box-shadow: 0 1.7px 3.5px rgba(0, 0, 0, 0.016),
            0 3.5px 12.6px rgba(0, 0, 0, 0.037), 0 10px 35px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }
      `}
    >
      <ImageWithStatus
        size={'medium'}
        src={avatar}
        firstName={firstName}
        lastName={lastName}
        active={active}
        borderColor="#EBEBEB"
        responsive
      />
      <div
        css={`
          display: grid;
          grid-template-rows: repeat(3, max-content);
          grid-row-gap: 3px;
        `}
      >
        <Font weight="500" color={Colours.purple} size="15px">
          {title}
        </Font>
        <Font>{`${firstName} ${lastName}`}</Font>
        <section
          css={`
            display: grid;
            grid-template-columns: repeat(2, max-content);
            grid-column-gap: 5px;
          `}
        >
          <Font>{`with ${doctorName} @`}</Font>
          <Font color={Colours.purple}>{time}</Font>
        </section>
      </div>
      <div
        css={`
          width: 25px;
          height: calc(100% - 10px);
          display: grid;
          place-items: center;
          border-radius: 15px;
          background: ${Colours.yellow};
          padding: 5px;
          @media screen and (min-width: 1440px) {
            width: 34px;
            border-radius: 18px;
          }
        `}
      >
        <section
          css={`
            display: grid;
            grid-template-rows: max-content max-content;
            place-items: center;
          `}
        >
          <Font size="15px" color="#fff">
            {date.split(' ')[0]}
          </Font>
          <Font Csize="20px" color="#fff">
            {date.split(' ')[1]}
          </Font>
        </section>
      </div>
      <div
        css={`
          border-left: 1px solid ${Colours.border};
          width: 30px;
          height: 100%;
          display: grid;
          grid-template-rows: repeat(3, max-content);
          grid-row-gap: 12px;
          align-items: space-between;
          justify-items: center;
          font-size: 16px;
          @media screen and (min-width: 1440px) {
            grid-row-gap: 18px;
            font-size: 22px;
            width: 40px;
          }
        `}
      >
        <Icons.LaunchIcon
          style={{ fontSize: 'inherit', color: '#56AAFF' }}
          onClick={() => {
            if (!disabled) {
              localStorage.setItem(
                'selectedAppointment',
                JSON.stringify(allData)
              )
              if (to) history.push(to)
              else
                history.push(
                  `/facility/appointments/?action=view&id=${allData.id}`
                )
            }
          }}
        />

        <Icons.AccessTimeRoundedIcon
          style={{ fontSize: 'inherit', color: Colours.orange }}
          onClick={() => {
            if (!disabled) {
              if (!old) {
                localStorage.setItem(
                  'selectedAppointment',
                  JSON.stringify(allData)
                )
                if (update) history.push(update)
                else
                  history.push(
                    `/facility/appointments/manage-event/${allData.id}`
                  )
              }
            }
          }}
        />

        <Icons.DeleteRoundedIcon
          style={{ fontSize: 'inherit', color: Colours.red }}
          onClick={() => {
            if (!disabled) {
              if (!old) {
                history.push(`?action=cancelAppointment&id=${allData.id}`)
              }
            }
          }}
        />
      </div>
    </div>
  )
}

const Font = ({ children, color, weight, size, Csize }) => (
  <p
    css={`
      padding: 0px;
      margin: 0px;
      font-weight: ${weight || 400};
      color: ${color || Colours.text};
      font-size: ${Csize ? '20px' : size || '12px'};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      @media screen and (min-width: 1440px) {
        font-size: ${Csize ? '30px' : size ? '22px' : '15px'};
      }
    `}
  >
    {children}
  </p>
)
