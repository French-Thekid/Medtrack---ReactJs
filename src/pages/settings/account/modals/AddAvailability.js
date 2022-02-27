import React, { useState } from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import {
  Layout,
  Content,
  Core,
  FormControl,
  Colours,
  Loading,
  Icons,
} from 'components'
import { useHistory } from 'react-router-dom'
import { ActionButton } from '../Availability'
import { twentyFourToTwelve, AddFiveHours } from 'utils'
import { areIntervalsOverlapping } from 'date-fns'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_AVAILABILITY } from '../mutations'
import { LIST_AVAILABILITY } from '../queries'

export default function AddAvailability({ availableTime, doctorId }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [day, setDay] = useState('')
  const [startTime, setStartTime] = useState('08:00')
  const [endTime, setEndTime] = useState('09:00')
  const [timeAdded, setTimeAdded] = useState({ times: [] })
  const [invalidTime, setInvalidTime] = useState(false)
  const [invalidDay, setInvalidDay] = useState(false)

  const days = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
  ]

  const [createAvailability, { loading, error }] = useMutation(
    CREATE_AVAILABILITY,
    {
      refetchQueries: () => [
        {
          query: LIST_AVAILABILITY,
          variables: { doctorId: parseInt(doctorId) },
        },
      ],
    }
  )

  const handleSubmission = async () => {
    if (day === '') {
      setInvalidDay(true)
    } else {
      const SubmitableFormat = timeAdded.times
        .map(({ start, end, editable }, index) => {
          if (editable) {
            const year = new Date().toISOString().split('-')[0]
            const startHr = parseInt(start.split(':')[0])
            const startMin = parseInt(start.split(':')[1])

            const endHr = parseInt(end.split(':')[0])
            const endMin = parseInt(end.split(':')[1])

            return {
              start: new Date(
                year,
                1,
                1,
                startHr - 5,
                startMin,
                0,
                0
              ).toISOString(),
              end: new Date(year, 1, 1, endHr - 5, endMin, 0, 0).toISOString(),
              weekday: day,
            }
          }
          return null
        })
        .filter((item, index) => item !== null)

      await createAvailability({
        variables: {
          availability: SubmitableFormat,
          doctorId,
        },
      }).catch((e) => {
        console.log(e)
        return (
          <FormControl.Error name="failed" show={true} message={e.message} />
        )
      })
      history.goBack()
    }
  }

  const handleTimeAddition = () => {
    setTimeAdded((prevState) => {
      const startHr = parseInt(startTime.split(':')[0])
      const startMin = parseInt(startTime.split(':')[1])

      const endHr = parseInt(endTime.split(':')[0])
      const endMin = parseInt(endTime.split(':')[1])

      let flag = true
      let times = prevState.times

      //Checking if time enteredis overall valid
      if (endHr - startHr < 0) {
        console.log('Overall invalid')
        flag = false
        setInvalidTime(true)
      }
      if (endHr - startHr === 0) {
        if (endMin - startMin === 0) {
          console.log('Overall invalid')
          flag = false
          setInvalidTime(true)
        }
      }

      flag &&
        prevState.times.map(({ start, end, day }, index) => {
          //Checking if time overlaps
          const prevStartHr = parseInt(start.split(':')[0])
          const prevStartMin = parseInt(start.split(':')[1])

          const prevEndHr = parseInt(end.split(':')[0])
          const prevEndMin = parseInt(end.split(':')[1])

          if (
            areIntervalsOverlapping(
              {
                start: new Date(2021, 1, 17, startHr, startMin),
                end: new Date(2021, 1, 17, endHr, endMin),
              },
              {
                start: new Date(2021, 1, 17, prevStartHr, prevStartMin),
                end: new Date(2021, 1, 17, prevEndHr, prevEndMin),
              }
            )
          ) {
            console.log('Invalid Time')
            setInvalidTime(true)
            flag = false
          }

          return null
        })

      const newTime = {
        start: startTime,
        end: endTime,
        editable: true,
        day,
      }
      if (flag) {
        setInvalidTime(false)
        times = prevState.times.concat(newTime)
      } else {
      }

      return { times }
    })

    return null
  }

  const handleDaySelection = (day) => {
    setDay(day)
    if (availableTime[getDay(day)]) {
      availableTime[getDay(day)].map(({ start, end }) => {
        start = AddFiveHours(start)
        end = AddFiveHours(end)

        let formatedStart = new Intl.DateTimeFormat('en', {
          timeStyle: 'short',
          hour12: false,
        })
          .format(Date.parse(start))
          .toLowerCase()
          .split(' ')
          .join('')
        let formatedEnd = new Intl.DateTimeFormat('en', {
          timeStyle: 'short',
          hour12: false,
        })
          .format(Date.parse(end))
          .toLowerCase()
          .split(' ')
          .join('')

        const startHr = parseInt(formatedStart.split(':')[0])
        const startMin = parseInt(formatedStart.split(':')[1])

        const endHr = parseInt(formatedEnd.split(':')[0])
        const endMin = parseInt(formatedEnd.split(':')[1])

        const pair = {
          start: `${startHr}:${startMin === 0 ? '00' : startMin}`,
          end: `${endHr}:${endMin === 0 ? '00' : endMin}`,
          editable: false,
          day,
        }

        //Clearing state of previously selected day available times while keeping any added time by end user to check for compatability/overlap below
        setTimeAdded((state) => {
          const times = state.times
            .map((item, index) => {
              if (!item.editable && item.day !== day) return null
              else return item
            })
            .filter((item, j) => item !== null)

          return {
            times,
          }
        })

        try {
          //Auto Removing duplicates if end user added time that alredy exist on newly selected day
          timeAdded.times.map(({ start, end, editable, day }, index) => {
            if (start && end && editable) {
              const prevStartHr = parseInt(start.split(':')[0])
              const prevStartMin = parseInt(start.split(':')[1])

              const prevEndHr = parseInt(end.split(':')[0])
              const prevEndMin = parseInt(end.split(':')[1])

              if (
                areIntervalsOverlapping(
                  {
                    start: new Date(2021, 1, 17, startHr, startMin),
                    end: new Date(2021, 1, 17, endHr, endMin),
                  },
                  {
                    start: new Date(2021, 1, 17, prevStartHr, prevStartMin),
                    end: new Date(2021, 1, 17, prevEndHr, prevEndMin),
                  }
                )
              ) {
                console.log('Removing Editable version')
                setTimeAdded((state) => {
                  const searchTime = {
                    start,
                    end,
                    editable: true,
                    day,
                  }
                  const times = state.times.filter(
                    (item, j) =>
                      JSON.stringify(item) !== JSON.stringify(searchTime)
                  )

                  return {
                    times,
                  }
                })
              }

              return null
            }
            return null
          })
        } catch (e) {
          console.log('Error', e)
        }
        setTimeAdded((prevState) => {
          const times = prevState.times.concat(pair)
          return { times }
        })
        return null
      })
    } else {
      setTimeAdded((prevState) => {
        const times = prevState.times
          .map(({ editable, start, end }, index) => {
            if (editable) return { start, end, editable }
            return null
          })
          .filter((item, j) => item !== null)
        return { times }
      })
    }
  }

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="300px">
        <Content.CustomCard
          title={'Add Availability Time'}
          close={() => {
            history.goBack()
          }}
          minWidth="600px"
        >
          {loading && <Loading />}
          {error && <Content.Alert type="error" message="Failed to add Time" />}
          <div
            css={`
              display: grid;
              grid-template-rows: max-content 1fr max-content max-content;
              grid-gap: 10px;
              height: 550px;
            `}
          >
            <FormControl.Section>
              <FormControl.Select
                value={day}
                groups={days}
                label="Day"
                name="day"
                handlechange={(e) => {
                  handleDaySelection(e.target.value)
                  setInvalidDay(false)
                }}
                error={invalidDay}
              />
            </FormControl.Section>
            <div
              css={`
                border-radius: 5px;
                background: #f9f9f9;
                margin-bottom: 10px;
                padding: 10px;
                overflow-y: auto;
              `}
            >
              {timeAdded.times.map(({ start, end, editable, day }, index) => {
                return (
                  <div
                    css={`
                      display: grid;
                      grid-template-columns: 1fr max-content;
                      grid-column-gap: 10px;
                      align-items: center;
                      margin-bottom: 10px;
                    `}
                    key={index}
                  >
                    <TimeSlots start={start} end={end} />

                    <ActionButton
                      special
                      disabled={!editable}
                      type="delete"
                      action={() => {
                        const searchTime = {
                          start,
                          end,
                          editable: true,
                          day,
                        }

                        setTimeAdded((state) => {
                          console.log(state.times)
                          const times = state.times.filter(
                            (item, j) =>
                              JSON.stringify(item) !==
                              JSON.stringify(searchTime)
                          )
                          return {
                            times,
                          }
                        })
                      }}
                    />
                  </div>
                )
              })}
            </div>
            <div
              css={`
                display: grid;
                grid-template-columns: 1fr 10px 1fr max-content;
                grid-gap: 10px;
                border-top: 1px solid ${Colours.border};
                border-bottom: 1px solid ${Colours.border};
                padding: 20px 0px;
                align-items: center;
              `}
            >
              <FormControl.Input
                type="time"
                label="Start Time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                error={invalidTime}
              />
              <div
                css={`
                  height: 2px;
                  background: ${Colours.purple};
                `}
              />
              <FormControl.Input
                type="time"
                label="End Time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                error={invalidTime}
              />
              <div
                css={`
                  padding: 10px;
                  border-radius: 5px;
                  background: ${Colours.purple};
                  &:hover {
                    cursor: pointer;
                    box-shadow: 0px 8px 20px -2px rgba(196, 196, 196, 1);
                    transition: ease-out 0.2s;
                    transform: translateY(-1px);
                  }
                `}
                onClick={() => handleTimeAddition()}
              >
                <Icons.AddRoundedIcon
                  style={{ color: '#fff', fontSize: '30px' }}
                />
              </div>
            </div>
            <div
              css={`
                display: grid;
                justify-items: right;
              `}
            >
              <Core.Button
                width="150px"
                bgColour={Colours.green}
                onClick={() => handleSubmission()}
                disabled={timeAdded.times.length === 0}
              >
                Submit
              </Core.Button>
            </div>
          </div>
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}

export function TimeSlots({ start, end }) {
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
        {`${twentyFourToTwelve(parseInt(start.split(':')[0]))}:${
          start.split(':')[1]
        }
        ${parseInt(start.split(':')[0]) >= 12 ? 'pm' : 'am'}`}
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
        {`${twentyFourToTwelve(parseInt(end.split(':')[0]))}:${
          end.split(':')[1]
        }
        ${parseInt(end.split(':')[0]) >= 12 ? 'pm' : 'am'}`}
      </div>
    </div>
  )
}

export function getDay(day) {
  switch (day) {
    case 'Monday':
      return 'monday'
    case 'Tuesday':
      return 'tuesday'
    case 'Wednesday':
      return 'wednesday'
    case 'Thursday':
      return 'thursday'
    case 'Friday':
      return 'friday'
    case 'Saturday':
      return 'saturday'
    case 'Sunday':
      return 'sunday'
    default:
      return 'Invalid Date'
  }
}
