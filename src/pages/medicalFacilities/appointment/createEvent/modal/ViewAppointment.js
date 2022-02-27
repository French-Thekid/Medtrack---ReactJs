import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import {
  Colours,
  Icons,
  Core,
  Content,
  Loading,
  PermissionCheck,
  Notification,
} from 'components'
import { useHistory, useLocation } from 'react-router-dom'
import eventBg from 'assets/eventBG.png'
import { getDay } from '../Details'
import { TimeExtrator, AddFiveHours } from 'utils'
import { LIST_APPOINTMENTS } from '../../queries'
import { DELETE_APPOINTMENT, COMPLETE_APPOINTMENT } from '../../mutations'
import { useMutation } from '@apollo/react-hooks'
import { OrganisationContext, UserContext } from 'context'

const queryString = require('query-string')

export default function ViewAppointment({ doctorIds = [] }) {
  const history = useHistory()
  const { search } = useLocation()
  const { id: eventId } = queryString.parse(search)
  const { status } = useContext(OrganisationContext)
  const { loggedInUser } = useContext(UserContext) || {}
  const { doctor: MyObject = [] } = loggedInUser || {}
  const { id: myId = '' } = (MyObject.length > 0 && MyObject[0]) || {}
  const [completedDelete, setcompleted] = useState(false)

  const appointmentDetails =
    JSON.parse(localStorage.getItem('selectedAppointment')) || {}

  const deletePermission = PermissionCheck({
    feature: 'Appointment',
    action: 'DELETE',
  })
  const {
    title: Title,
    reason: reasonForVisit,
    doctor,
    patient,
    startTime,
    endTime,
    updated,
    createdByUser,
    appointmentStatus,
  } = appointmentDetails || {}

  const { user, id } = doctor || {}
  const {
    firstName: doctorFirstName,
    lastName: doctorLastName,
    avatar: doctorAvatar,
    qualifications = [],
  } = user || {}

  const { specification = 'Not Specified' } =
    qualifications.length > 0 ? qualifications[0] : {}

  const { person } = patient || {}
  const {
    firstName: patientFirstName,
    lastName: patientLastName,
    avatar: patientAvatar,
    contact,
  } = person || {}
  const { contact_number: phone = 'Not Specified' } = contact || {}

  const { firstName, lastName, person: CPerson } = createdByUser || {}
  const { title = '' } = CPerson || {}

  let StartTime = AddFiveHours(new Date(parseInt(startTime)))
  let EndTime = AddFiveHours(new Date(parseInt(endTime)))

  let start = StartTime.toISOString()
  let end = EndTime.toISOString()

  if (updated) {
    StartTime = AddFiveHours(new Date(startTime))
    EndTime = AddFiveHours(new Date(endTime))
    start = StartTime
    end = EndTime
  }

  //Mutation
  const [deleteAppointment, { loading: removing, error: deleteFailed }] =
    useMutation(DELETE_APPOINTMENT, {
      refetchQueries: () => [
        {
          query: LIST_APPOINTMENTS,
          variables: { doctorIds },
        },
      ],
    })

  //Mutation
  const [completeAppointment, { loading: completing, error: completeFailed }] =
    useMutation(COMPLETE_APPOINTMENT, {
      refetchQueries: () => [
        {
          query: LIST_APPOINTMENTS,
          variables: { doctorIds },
        },
      ],
      onCompleted({ completeAppointment }) {
        let { startTime, endTime } = completeAppointment || {}
        startTime = new Date(parseInt(startTime))
        endTime = new Date(parseInt(endTime))

        localStorage.setItem(
          'selectedAppointment',
          JSON.stringify({
            updated: true,
            ...completeAppointment,
            startTime,
            endTime,
          })
        )
      },
    })

  const day = StartTime.toString().split(' ')[0]
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

  let toolTip = {
    'aria-label': 'Mark as Complete',
    'data-balloon-pos': 'down',
  }

  const { name } = appointmentStatus || {}

  let completed = false
  if (name === 'Completed') completed = true

  let disabled = false

  if (status === 'SUSPENDED') {
    disabled = true
  }

  const showNotification = () => {
    setcompleted(true)
    setTimeout(() => {
      setcompleted(false)
    }, 6000)
  }

  const myAppointment = () => myId === id

  return (
    <div
      css={`
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100% - 250px);
        height: 100%;
        background: rgb(0 0 0 / 55%);
        backdrop-filter: blur(6px);
        top: 0px;
        right: 0px;
        position: fixed;
        z-index: 80;
        @media only screen and (min-width: 1441px) {
          width: calc(100vw - 250px);
        }
        @media only screen and (width: 1366px) {
          width: calc(100vw - 220px);
        }
        /* Tablet */
        @media screen and (max-width: 769px) {
          width: 100%;
        }
        @media only screen and (max-width: 1025px) {
          @media only screen and (max-height: 769px) {
            @media (orientation: landscape) {
              width: 100%;
            }
          }
        }

        /* ipad pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              width: 100%;
            }
          }
        } ;
      `}
    >
      <Notification
        title="Permission Denied!"
        setcompleted={setcompleted}
        message="You lack permissions to carry out his action."
        notification={completedDelete}
        fail
      />
      <div
        css={`
          min-width: 650px;
          max-width: 650px;
          height: max-content;
          border-radius: 5px;
          background: ${Colours.foreground};
          display: grid;
          grid-template-rows: 120px 1fr;
        `}
      >
        <div
          css={`
            height: 100px;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            background-image: url(${eventBg});
            padding: 10px;
          `}
        >
          <ActionSection>
            <Icons.CloseRoundedIcon
              onClick={() => {
                history.goBack()
                localStorage.removeItem('selectedAppointment')
              }}
              style={{ color: 'inherit', fontSize: '25px' }}
            />
          </ActionSection>
          <ActionSection purpose="major">
            <Icons.DeleteRoundedIcon
              onClick={async () => {
                if (!disabled && deletePermission) {
                  let Ids = []
                  Ids.push(parseInt(eventId))
                  await deleteAppointment({
                    variables: {
                      id: Ids,
                    },
                  }).catch((e) => console.log(e))
                  history.goBack()
                }
                if (!deletePermission) {
                  showNotification()
                }
              }}
              style={{ color: 'inherit', fontSize: '20px' }}
            />
          </ActionSection>
          <ActionSection purpose="major">
            <Icons.EditRoundedIcon
              onClick={() => {
                if (!disabled) {
                  if (StartTime >= new Date()) {
                    history.push(
                      `/facility/appointments/manage-event/${eventId}`
                    )
                  }
                }
              }}
              style={{ color: 'inherit', fontSize: '20px' }}
            />
          </ActionSection>
          {!completed && myAppointment() && (
            <ActionSection {...toolTip}>
              <Icons.DoneOutlineRoundedIcon
                onClick={async () => {
                  if (!disabled) {
                    let Ids = []
                    Ids.push(parseInt(eventId))
                    await completeAppointment({
                      variables: {
                        id: Ids,
                      },
                    }).catch((e) => console.log(e))
                  }
                }}
                style={{ color: 'inherit', fontSize: '20px' }}
              />
            </ActionSection>
          )}
        </div>
        <div
          css={`
            height: calc(100% - 20px);
            display: grid;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
            padding: 10px;
            display: grid;
            grid-template-rows: repeat(4, max-content) auto;
            grid-row-gap: 25px;
          `}
        >
          {(removing || completing) && <Loading />}
          {deleteFailed && (
            <Content.Alert
              type="error"
              message="Failed to cancel appointment"
            />
          )}
          {completeFailed && (
            <Content.Alert
              type="error"
              message="Failed to mark appointment as complete"
            />
          )}
          <div
            css={`
              display: grid;
              grid-template-columns: 20px 1fr;
              grid-column-gap: 30px;
              align-items: center;
            `}
          >
            <div
              css={`
                height: 20px;
                width: 20px;
                border-radius: 5px;
                background: ${colors[colorKey]};
              `}
            />
            <Core.Text customSize="22px">{Title}</Core.Text>
          </div>
          <div
            css={`
              display: grid;
              grid-template-columns: 25px 1fr;
              grid-column-gap: 25px;
            `}
          >
            <Icons.AccessTimeRoundedIcon
              style={{ color: Colours.purple, fontSize: '25px' }}
            />
            <div>
              <Core.Text
                customSize="18px"
                color={StartTime >= new Date() ? Colours.text : Colours.red}
              >
                {getDay(start).charAt(0).toUpperCase() + getDay(start).slice(1)}
                {', '}
                {new Date(start).toDateString().slice(4)}
                {'.'}
              </Core.Text>
              <Core.Text
                color={StartTime >= new Date() ? Colours.purple : Colours.red}
              >
                {TimeExtrator.format(Date.parse(start))
                  .toLowerCase()
                  .split(' ')
                  .join('')}{' '}
                -{' '}
                {TimeExtrator.format(Date.parse(end))
                  .toLowerCase()
                  .split(' ')
                  .join('')}
              </Core.Text>
            </div>
          </div>
          <div
            css={`
              display: grid;
              grid-template-columns: 25px 1fr;
              grid-column-gap: 25px;
            `}
          >
            <Icons.SubjectRoundedIcon
              style={{ color: Colours.purple, fontSize: '25px' }}
            />
            <div
              css={`
                display: grid;
                grid-template-rows: max-content 1fr;
              `}
            >
              <div
                css={`
                  border-bottom: 1px solid ${Colours.border};
                  margin-bottom: 5px;
                `}
              >
                <Core.Text customSize="22px">Reason for visit</Core.Text>
              </div>
              <div
                css={`
                  height: 100px;
                  overflow-y: auto;
                `}
              >
                <Core.Text customSize="18px">{reasonForVisit}</Core.Text>
              </div>
            </div>
          </div>
          <div
            css={`
              display: grid;
              grid-template-columns: 25px 1fr;
              grid-column-gap: 25px;
            `}
          >
            <Icons.AccountCircleRoundedIcon
              style={{ color: Colours.purple, fontSize: '25px' }}
            />
            <div
              css={`
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-column-gap: 40px;
                grid-row-gap: 10px;
              `}
            >
              <div
                css={`
                  border-bottom: 1px solid ${Colours.border};
                  padding-bottom: 5px;
                `}
              >
                <Core.Text customSize="22px">Consultant</Core.Text>
              </div>
              <div
                css={`
                  border-bottom: 1px solid ${Colours.border};
                  padding-bottom: 5px;
                `}
              >
                <Core.Text customSize="22px">Patient</Core.Text>
              </div>
              <UserCard
                firstName={doctorFirstName}
                lastName={doctorLastName}
                avatar={doctorAvatar}
                extra={specification}
              />
              <UserCard
                firstName={patientFirstName}
                lastName={patientLastName}
                avatar={patientAvatar}
                extra={phone}
              />
            </div>
          </div>
          <div
            css={`
              display: grid;
              grid-template-columns: max-content 1fr max-content;
              place-items: center;
            `}
          >
            <div
              css={`
                border: ${completed
                  ? `1px solid ${Colours.green}`
                  : `1px solid ${Colours.purple}`};
                border-radius: 5px;
                padding: 5px;
                margin-left: 50px;
              `}
            >
              <Core.Text
                customSize="14px"
                color={completed ? Colours.green : Colours.purple}
              >
                {completed ? 'Completed' : 'Pending'}
              </Core.Text>
            </div>
            <div />
            <div
              css={`
                display: grid;
                grid-template-columns: repeat(2, max-content);
              `}
            >
              <Core.Text customSize="15px">Created By: &nbsp;</Core.Text>
              <Core.Text customSize="15px" weight="550" color={Colours.purple}>
                {`${title} ${firstName} ${lastName}`}
              </Core.Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const UserCard = ({ firstName, lastName, avatar, extra }) => {
  return (
    <div
      css={`
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-column-gap: 10px;
        border: 1px solid ${Colours.border};
        padding: 10px;
        border-radius: 5px;
      `}
    >
      <Content.Avatar
        size="medium"
        src={avatar}
        firstName={firstName}
        lastName={lastName}
        shadow
      />
      <div
        css={`
          display: grid;
          grid-template-rows: max-content 1fr;
          grid-gap: 2px;
        `}
      >
        <Core.Text customSize={'18px'}>{`${firstName} ${lastName}`}</Core.Text>
        <Core.Text customSize={'12px'} color={Colours.textGrey}>
          {extra}
        </Core.Text>
      </div>
    </div>
  )
}

const ActionSection = ({ onClick, children, purpose, ...rest }) => {
  const { status } = useContext(OrganisationContext)
  let disabled = false
  let toolTip = {}
  if (status === 'SUSPENDED' && purpose === 'major') {
    disabled = true
    toolTip = {
      'aria-label': 'Cannot operate while facility is suspended',
      'data-balloon-pos': 'bottom',
    }
  }

  return (
    <div
      {...rest}
      {...toolTip}
      onClick={onClick}
      css={`
        height: 35px;
        width: 35px;
        float: right;
        border-radius: 50%;
        margin-left: 10px;
        display: grid;
        align-items: center;
        justify-items: center;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
        &:hover {
          background: rgba(0, 0, 0, 0.5);
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          transition: ease-out 0.2s;
          transform: translateY(-1px);
        }
      `}
    >
      {children}
    </div>
  )
}
