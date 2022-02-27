import React, { useEffect, useState } from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import {
  Layout,
  Content,
  FormControl,
  Core,
  Colours,
  Loading,
} from 'components'
import { useHistory, useLocation } from 'react-router-dom'
import { TimeSlots, getDay } from './AddAvailability'
import { areIntervalsOverlapping } from 'date-fns'
import { AddFiveHours } from 'utils'

import { LIST_AVAILABILITY } from '../queries'
import { UPDATE_AVAILABILITY } from '../mutations'
import { useMutation } from '@apollo/react-hooks'

const queryString = require('query-string')

export default function EditAppointmentTime({ availableTime, doctorId }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const { search } = useLocation()
  const { id } = queryString.parse(search)

  //Mutations
  const [updateAvailability, { loading: updating, error: updateFailed }] =
    useMutation(UPDATE_AVAILABILITY, {
      refetchQueries: () => [
        {
          query: LIST_AVAILABILITY,
          variables: { doctorId: parseInt(doctorId) },
        },
      ],
    })

  const selectedTime = JSON.parse(localStorage.getItem('SelectedTime'))

  const start = new Intl.DateTimeFormat('en', {
    timeStyle: 'short',
    hour12: false,
  })
    .format(Date.parse(selectedTime.start))
    .toLowerCase()
    .split(' ')
    .join('')
  const end = new Intl.DateTimeFormat('en', {
    timeStyle: 'short',
    hour12: false,
  })
    .format(Date.parse(selectedTime.end))
    .toLowerCase()
    .split(' ')
    .join('')
  const mainStartHr = parseInt(start.split(':')[0])
  const mainStartMin = parseInt(start.split(':')[1])

  const mainEndHr = parseInt(end.split(':')[0])
  const mainEndMin = parseInt(end.split(':')[1])

  const [startTime, setStartTime] = useState(
    `${mainStartHr.toString().length === 1 ? `0${mainStartHr}` : mainStartHr}:${
      mainStartMin === 0
        ? '00'
        : mainStartMin.toString().length === 1
        ? `0${mainStartMin}`
        : mainStartMin
    }`
  )
  const [endTime, setEndTime] = useState(
    `${mainEndHr.toString().length === 1 ? `0${mainEndHr}` : mainEndHr}:${
      mainEndMin === 0
        ? '00'
        : mainEndMin.toString().length === 1
        ? `0${mainEndMin}`
        : mainEndMin
    }`
  )

  const [invalidTime, setInvalidTime] = useState(false)
  const [timeAdded, setTimeAdded] = useState({ times: [] })
  //Submission Function
  const handleSubmission = async () => {
    const startHr = parseInt(startTime.split(':')[0])
    const startMin = parseInt(startTime.split(':')[1])

    const endHr = parseInt(endTime.split(':')[0])
    const endMin = parseInt(endTime.split(':')[1])

    if (
      mainStartHr === startHr &&
      mainStartMin === startMin &&
      mainEndHr === endHr &&
      mainEndMin === endMin
    ) {
      console.log('No changes')
      localStorage.removeItem('SelectedTime')
      history.goBack()
    } else {
      let flag = true

      timeAdded.times.map(({ start, end }, index) => {
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
          flag = false
        }
        return null
      })

      if (flag) {
        const year = new Date().toISOString().split('-')[0]
        const formattedDate = {
          id: parseInt(id),
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
        }

        let submittableArray = []
        submittableArray.push(formattedDate)

        await updateAvailability({
          variables: {
            availability: submittableArray,
          },
        }).catch((e) => console.log(e))

        localStorage.removeItem('SelectedTime')
        history.goBack()
      } else setInvalidTime(true)
    }
  }

  /* eslint-disable */
  useEffect(() => {
    if (availableTime[getDay(selectedTime.day)]) {
      availableTime[getDay(selectedTime.day)].map(({ start, end }) => {
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
        }

        if (
          startTime !==
            `${startHr.toString().length === 1 ? `0${startHr}` : startHr}:${
              startMin === 0 ? '00' : startMin
            }` &&
          endTime !==
            `${endHr.toString().length === 1 ? `0${endHr}` : endHr}:${
              endMin === 0 ? '00' : endMin
            }`
        )
          setTimeAdded((prevState) => {
            const times = prevState.times.concat(pair)
            return { times }
          })
        return null
      })
    }
  }, [])

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="300px">
        <Content.CustomCard
          title={'Edit Availability Time'}
          close={() => {
            localStorage.removeItem('SelectedTime')
            history.goBack()
          }}
          minWidth="600px"
        >
          {updating && <Loading />}
          {updateFailed && (
            <Content.Alert type="error" message="Failed To update Time" />
          )}
          <Core.Text>
            Please keep in mind the list of unavailable times shown below when
            choosing new time
          </Core.Text>
          <div
            css={`
              display: grid;
              grid-template-rows: 1fr max-content max-content;
              grid-gap: 20px;
              margin-top: 5px;
              height: 450px;
              border-top: 1px solid ${Colours.border};
              padding-top: 10px;
            `}
          >
            <div
              css={`
                border-radius: 5px;
                background: #f9f9f9;
                margin-bottom: 10px;
                padding: 10px;
                overflow-y: auto;
              `}
            >
              {timeAdded.times.map(({ start, end }, index) => {
                return (
                  <div
                    css={`
                      display: grid;
                      grid-template-columns: 1fr;
                      grid-column-gap: 10px;
                      align-items: center;
                      margin-bottom: 10px;
                    `}
                    key={index}
                  >
                    <TimeSlots start={start} end={end} />
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
