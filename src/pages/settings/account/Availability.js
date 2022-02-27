import React, { useContext } from 'react'
import { UserContext, OrganisationContext } from 'context'
import 'styled-components/macro'
import { Core, Colours, Icons, Content, Loading } from 'components'

import { AddFiveHours, TimeExtrator } from 'utils'
import { useHistory, useLocation } from 'react-router-dom'
import { AddAppointmentTime, EditAppointmentTime } from './modals'

import { LIST_AVAILABILITY } from './queries'
import { DELETE_AVAILABILITY } from './mutations'
import { useQuery, useMutation } from '@apollo/react-hooks'

const queryString = require('query-string')

export default function AccountAvailability() {
  const history = useHistory()
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  const { loggedInUser: { doctor = [] } = {} } = useContext(UserContext) || {}
  const { id: doctorId = 0 } = doctor.length > 0 ? doctor[0] : {}

  //Query
  const { loading, error, data } = useQuery(LIST_AVAILABILITY, {
    variables: { doctorId: parseInt(doctorId) },
  })

  //Mutation
  const [deleteAvailability, { loading: removing, error: deleteFailed }] =
    useMutation(DELETE_AVAILABILITY, {
      refetchQueries: () => [
        {
          query: LIST_AVAILABILITY,
          variables: { doctorId: parseInt(doctorId) },
        },
      ],
    })

  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert type="error" message={'Failed to load Available times'} />
    )

  const availableTime = data.listAvailability.data

  return (
    <div
      css={`
        height: 100%;
        width: 100%;
      `}
    >
      <div
        css={`
          height: 100%;
          width: 100%;
          display: grid;
          grid-template-rows: 50px 1fr;
          grid-row-gap: 10px;
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: 1fr max-content;
            align-items: center;
          `}
        >
          <Core.Text customSize="25px">Availability</Core.Text>
          <Core.Button
            purpose="major"
            width="150px"
            onClick={() => history.push(`?action=addNew`)}
          >
            Add New
          </Core.Button>
        </div>
        <div
          css={`
          height:calc(100% - 20px)
          display: grid;
          grid-template-rows: 1fr;
          grid-row-gap: 20px;
          overflow-y: auto;
          border: 1px solid blue;
          padding: 10px; 
          box-shadow: 0px 8px 20px -10px rgba(210, 210, 210, 1);
          border: 1px solid ${Colours.border};
          border-radius: 5px;
        `}
        >
          {removing && <Loading />}
          {deleteFailed && (
            <Content.Alert
              type="error"
              message={'Failed to remove Available time'}
            />
          )}
          <Rows>
            <TimeCard
              deleteAvailability={deleteAvailability}
              title="Monday"
              times={availableTime.monday}
            />
            <TimeCard
              deleteAvailability={deleteAvailability}
              title="Tuesday"
              times={availableTime.tuesday}
            />
          </Rows>
          <Rows>
            <TimeCard
              deleteAvailability={deleteAvailability}
              title="Wednesday"
              times={availableTime.wednesday}
            />
            <TimeCard
              deleteAvailability={deleteAvailability}
              title="Thursday"
              times={availableTime.thursday}
            />
          </Rows>
          <Rows last>
            <TimeCard
              deleteAvailability={deleteAvailability}
              title="Friday"
              times={availableTime.friday}
            />
            <TimeCard
              deleteAvailability={deleteAvailability}
              title="Saturday"
              times={availableTime.saturday}
            />
          </Rows>
        </div>
      </div>
      {action === 'addNew' && (
        <AddAppointmentTime
          availableTime={availableTime}
          doctorId={parseInt(doctorId)}
        />
      )}
      {action === 'edit' && (
        <EditAppointmentTime
          availableTime={availableTime}
          doctorId={parseInt(doctorId)}
        />
      )}
    </div>
  )
}

const Rows = ({ children, last }) => (
  <div
    css={`
      height: max-content;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 60px;
      margin-bottom: ${last ? '10px' : '40px'};
      @media screen and (min-width: 1440px) {
        grid-column-gap: 150px;
      }
      @media screen and (max-width: 769px) {
        @media screen and (max-height: 1025px) {
          @media screen and (orientation: portrait) {
            grid-column-gap: 40px;
          }
        }
      }
    `}
  >
    {children}
  </div>
)

const TimeCard = ({ title, times = [], deleteAvailability }) => {
  const history = useHistory()
  if (times === null) {
    times = []
  }
  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        min-height: 300px;
        display: grid;
        grid-template-rows: 32px 1fr;
        grid-row-gap: 10px;
      `}
    >
      <div
        css={`
          border-bottom: 1px solid ${Colours.border};
        `}
      >
        <Core.Text weight="600" customSize="20px">
          {title}
        </Core.Text>
      </div>
      <div
        css={`
          display: grid;
          grid-row-gap: 10px;
          grid-auto-rows: 40px;
        `}
      >
        {times.map(({ start, end, id, available }, index) => (
          <div
            key={index}
            css={`
              display: grid;
              grid-template-columns: 1fr repeat(2, max-content);
              grid-column-gap: 10px;
              align-items: center;
            `}
          >
            <TimeSlots start={start} end={end} />
            <ActionButton
              type="edit"
              action={() => {
                localStorage.setItem(
                  'SelectedTime',
                  JSON.stringify({
                    start: AddFiveHours(start),
                    end: AddFiveHours(end),
                    id,
                    available,
                    day: title,
                  })
                )
                history.push(`?action=edit&id=${id}`)
              }}
            />
            <ActionButton
              type="delete"
              action={async () => {
                console.log(id)
                let Ids = []
                Ids.push(parseInt(id))
                await deleteAvailability({
                  variables: {
                    id: Ids,
                  },
                }).catch((e) => console.log(e))
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function TimeSlots({ start, end }) {
  start = AddFiveHours(start)
  end = AddFiveHours(end)

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 1fr 30px 1fr;
        grid-column-gap: 10px;
        align-items: center;
      `}
    >
      <div
        css={`
          border-radius: 5px;
          border: 1px solid ${Colours.border};
          display: grid;
          place-items: center;
          height: max-content;
          padding: 5px 10px;
          color: ${Colours.text};
          background: ${Colours.foreground};
        `}
      >
        {TimeExtrator.format(Date.parse(start))
          .toLowerCase()
          .split(' ')
          .join('')}
      </div>
      <div
        css={`
          height: 2px;
          background: ${Colours.purple};
        `}
      />
      <div
        css={`
          border-radius: 5px;
          border: 1px solid ${Colours.border};
          display: grid;
          place-items: center;
          height: max-content;
          padding: 5px 10px;
          color: ${Colours.text};
          background: ${Colours.foreground};
        `}
      >
        {TimeExtrator.format(Date.parse(end)).toLowerCase().split(' ').join('')}
      </div>
    </div>
  )
}

export function ActionButton({ type, disabled, special, action }) {
  const { status } = useContext(OrganisationContext)
  let toolTip = {}
  if (status === 'SUSPENDED' && !special) {
    disabled = true
    toolTip = {
      'aria-label': 'Cannot operate while facility is suspended',
      'data-balloon-pos': 'bottom',
    }
  }

  return (
    <div
      {...toolTip}
      css={`
        display: grid;
        place-items: center;
        width: max-content;
        height: max-content;
        padding: 5px 10px;
        border-radius: 5px;
        background: ${type === 'edit' ? Colours.purple : Colours.red};
        color: white;
        font-size: 19px;
        box-shadow: 0px 8px 20px -9px rgba(186, 186, 186, 1);
        &:hover {
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          box-shadow: 0px 8px 20px -2px rgba(186, 186, 186, 1);
          transition: ease-out 0.2s;
          transform: translateY(-1px);
        }
        opacity: ${disabled ? 0.8 : 1};
      `}
      onClick={() => !disabled && action()}
    >
      {type === 'edit' && (
        <Icons.EditRoundedIcon style={{ fontSize: 'inherit' }} />
      )}
      {type === 'delete' && (
        <Icons.DeleteRoundedIcon style={{ fontSize: 'inherit' }} />
      )}
    </div>
  )
}
