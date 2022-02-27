import React, { useEffect } from 'react'
import 'styled-components/macro'
import { TimeExtrator, AddFiveHours } from 'utils'

import { Icons, FormControl, Core, Colours, Loading, Content } from 'components'
import { LIST_AVAILABILITY } from 'pages/settings/account/queries'
import { useQuery } from '@apollo/react-hooks'

export default function Details({
  selectedDay,
  setSelectedDay,
  selectedtime,
  setSelectedTime,
  props,
  selectedDoctor,
}) {
  const { values, handleChange, handleBlur, errors, touched } = props
  let { reasonForVisit } = values || {}

  let availableTime = {}
  if (selectedDoctor !== undefined) {
    availableTime = GetDoctorAvailability(selectedDoctor, selectedtime.time)
  }

  return (
    <div
      css={`
        height: 469px;
        width: 908px;
        display: grid;
        grid-template-rows: repeat(2, max-content) 1fr;
        grid-gap: 30px;
        @media screen and (max-width: 910px) {
          width: 730px;
        }
      `}
    >
      <Container>
        <Icons.TodayRoundedIcon
          style={{ color: Colours.purple, fontSize: '30px' }}
        />
        <FormControl.Input
          type="date"
          placeholder="Date"
          label="Date"
          value={new Date(selectedDay).toISOString().split('T')[0]}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
      </Container>
      <Container>
        <Icons.AccessTimeRoundedIcon
          style={{ color: Colours.purple, fontSize: '30px' }}
        />
        {selectedDoctor === undefined ? (
          <Core.Text>
            Please select a doctor in order to view associated available times
          </Core.Text>
        ) : (
          <div
            css={`
              height: max-content;
              display: grid;
              grid-template-columns: repeat(8, max-content);
              grid-gap: 15px;
            `}
          >
            {availableTime[getDay(selectedDay)] ? (
              availableTime[getDay(selectedDay)].map(
                ({ start, end, available, id }, index) => {
                  return (
                    <TimeCard
                      available={available}
                      key={index}
                      time={AddFiveHours(start).toISOString()}
                      endTime={AddFiveHours(end).toISOString()}
                      selectedtime={selectedtime}
                      setSelectedTime={setSelectedTime}
                      id={id}
                    />
                  )
                }
              )
            ) : (
              <Core.Text color={Colours.red}>
                It seems the selected doctor has no time available on the day
                selected
              </Core.Text>
            )}
          </div>
        )}
      </Container>
      <div
        css={`
          display: grid;
          grid-template-rows: max-content 1fr;
          align-items: start;
          grid-gap: 20px;
          margin-top: 10px;
        `}
      >
        <div
          css={`
            padding-bottom: 5px;
            border-bottom: 1px solid ${Colours.border};
          `}
        >
          <Core.Text>Reason for visit</Core.Text>
        </div>
        <Container>
          <Icons.SubjectRoundedIcon
            style={{ color: Colours.purple, fontSize: '30px' }}
          />
          <FormControl.Section>
            <FormControl.Input
              label="Reason For Visit"
              id="reasonForVisit"
              type="text"
              value={reasonForVisit}
              onChange={handleChange}
              onBlur={handleBlur}
              multiline
              rows={5}
              placeholder="Reason For Visit"
              data-testid="create-Patient-reasonForVisit"
              error={errors.reasonForVisit && touched.reasonForVisit}
            />
            <FormControl.Error
              name="reasonForVisit"
              show={errors.reasonForVisit && touched.reasonForVisit}
              message={errors.reasonForVisit}
            />
          </FormControl.Section>
        </Container>
      </div>
    </div>
  )
}

export function getDay(date) {
  const year = new Date(date).toISOString().split('-')[0]
  const month = new Date(date).toISOString().split('-')[1]
  const day = new Date(date).toISOString().split('-')[2].split('T')[0]

  const newDate = new Date(year, month - 1, day, 0, 0, 0, 0)
    .toDateString()
    .split(' ')[0]

  switch (newDate) {
    case 'Mon':
      return 'monday'
    case 'Tue':
      return 'tuesday'
    case 'Wed':
      return 'wednesday'
    case 'Thu':
      return 'thursday'
    case 'Fri':
      return 'friday'
    case 'Sat':
      return 'saturday'
    case 'Sun':
      return 'sunday'
    default:
      return 'Invalid Date'
  }
}

const Container = ({ children }) => {
  return (
    <div
      css={`
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-gap: 40px;
        align-items: start;
      `}
    >
      {children}
    </div>
  )
}

const TimeCard = ({
  available,
  time,
  endTime,
  selectedtime,
  setSelectedTime,
  id,
  ...rest
}) => {
  /* eslint-disable */
  useEffect(() => {
    if (selectedtime.time.split('T')[1] === time.split('T')[1] && available)
      setSelectedTime((prevState) => {
        return {
          time: prevState.time,
          endTime,
          status: true,
          availabilityId: id,
        }
      })
  }, [])

  let toolTip = {
    'aria-label':
      'The patient currently scheduled will be reassigned to the next available slot if this unavailable slot is booked.',
    'data-balloon-pos': 'down',
    'data-balloon-length': 'large',
  }

  if (available) toolTip = {}

  return (
    <div
      {...toolTip}
      {...rest}
      css={`
        display: grid;
        place-items: Center;
        border: 25px;
        padding: 5px 10px;
        width: 70px;
        color: ${selectedtime.time.split('T')[1] === time.split('T')[1]
          ? Colours.foreground
          : Colours.purple};
        border: 1px solid ${Colours.purple};
        border-radius: 25px;
        background: ${selectedtime.time.split('T')[1] === time.split('T')[1]
          ? Colours.purple
          : Colours.foreground};
        box-shadow: ${selectedtime.time.split('T')[1] === time.split('T')[1]
          ? '0px 8px 20px -2px rgba(196, 196, 196, 1)'
          : 'none'};
        &:hover {
          cursor: pointer;
          box-shadow: ${available
            ? '0px 8px 20px -2px rgba(196, 196, 196, 1)'
            : 'none'};
          transition: ${available ? 'ease-out 0.2s' : 'none'};
          transform: ${available ? 'translateY(-1px)' : 'none'};
          opacity: 1;
        }
        opacity: ${available ? 1 : 0.5};
      `}
      onClick={() => {
        if (selectedtime.time.split('T')[1] !== time.split('T')[1])
          setSelectedTime({ time, endTime, status: true, availabilityId: id })
      }}
    >
      {TimeExtrator.format(Date.parse(time)).toLowerCase().split(' ').join('')}
    </div>
  )
}

function GetDoctorAvailability(id, date) {
  //Query
  const { loading, error, data } = useQuery(LIST_AVAILABILITY, {
    variables: { doctorId: parseInt(id), date },
  })
  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert type="error" message={'Failed to load Available times'} />
    )

  const availableTime = data.listAvailability.data
  return availableTime
}
