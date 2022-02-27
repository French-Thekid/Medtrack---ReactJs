import React from 'react'
import 'styled-components/macro'
import { useQuery } from '@apollo/react-hooks'

import { LIST_DOCTORS } from '../queries'
import { Colours, Core, Content, FormControl, Loading } from 'components'

export default function DoctorSelection({ selectedDoctor, setSelectedDoctor }) {
  //Query
  const { loading, error, data: doctors } = useQuery(LIST_DOCTORS)
  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Failed to load Patients'} />

  const DoctorList = doctors.listDoctors.data

  window.history.forward(1)

  return (
    <div
      css={`
        min-height: 400px;
        max-height: 480px;
        overflow-y: auto;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 10px;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: max-content 1fr;
          grid-gap: 10px;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid ${Colours.border};
        `}
      >
        <Core.Text>Please select a Doctor for this appointment</Core.Text>
        <FormControl.SearchInput placeholder="Search Doctors" />
      </div>
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          overflow-y: auto;
          margin-top: 10px;
          grid-gap: 20px;
          max-height: 500px;
          padding-top: 2px;
          @media screen and (max-width: 1025px) {
            grid-template-columns: 1fr 1fr 1fr;
          }
        `}
      >
        {DoctorList.map(
          (
            {
              id,
              user: {
                avatar,
                firstName,
                lastName,
                person,
                qualifications = [],
              },
            },
            index
          ) => {
            const { title } = person || {}
            const { specification } =
              qualifications.length > 0 ? qualifications[0] : {}

            return (
              <Content.UserCard
                single
                key={index}
                id={id}
                avatar={avatar}
                firstName={firstName}
                lastName={lastName}
                title={title}
                extra={specification || 'Not Specified'}
                selectedUsers={selectedDoctor}
                setSelectedUsers={setSelectedDoctor}
              />
            )
          }
        )}
      </div>
    </div>
  )
}
