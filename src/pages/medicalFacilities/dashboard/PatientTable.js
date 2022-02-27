import React, { useState } from 'react'
import 'styled-components/macro'
import { useHistory } from 'react-router'

import { Layout, Colours, Content, FormControl, Loading } from 'components'
import { Label } from './index'

export default function PatientTable({
  loading,
  patients = {},
  searchHandler,
}) {
  const history = useHistory()
  const [query, setQuery] = useState('')

  if (loading) return <Loading Contained />

  const Gender = ({ children }) => (
    <div
      css={`
        height: max-content;
        width: 80px;
        padding: 5px;
        border-radius: 25px;
        background: ${children === 'Male' ? '#E2EDFF' : '#FFE6FE'};
        display: grid;
        place-items: center;
      `}
    >
      <Label
        colour={children === 'Male' ? Colours.blue : Colours.pink}
        fontMax="15px"
      >
        {children}
      </Label>
    </div>
  )

  return (
    <Layout.Container minheight="300px">
      <div
        css={`
          min-height: 300px;
          height: calc(100% - 10px);
          display: grid;
          grid-template-rows: 50px 50px 1fr;
          grid-row-gap: 5px;
          @media screen and (max-width: 1440px) {
            grid-template-rows: 50px 40px 1fr;
          }
          overflow-y: auto;
        `}
      >
        {/* top */}
        <div
          css={`
            height: 100%;
            display: grid;
            grid-template-columns: max-content 1fr max-content;
            grid-column-gap: 10px;
            align-items: center;
          `}
        >
          <Label weight="400" fontMax="20px">
            Patients Recently Added
          </Label>
          <FormControl.InputWithImage
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={'Search recent patients'}
            action={() => {
              searchHandler({ variables: { query } })
            }}
          />
          <Label
            colour={Colours.purple}
            onClick={() => history.push('/facility/patients/recentPatients')}
            clickable
            fontMax="15px"
          >
            see more
          </Label>
        </div>
        {/* headers*/}
        <div
          css={`
            display: grid;
            width: calc(100% - 20px);
            padding: 0px 10px;
            height: 40px;
            background: #f9f9fb;
            grid-template-columns: 150px 250px repeat(3, 1fr);
            @media screen and (max-width: 1440px) {
              grid-template-columns: 60px repeat(4, 1fr);
            }

            @media only screen and (max-height: 769px) {
              @media only screen and (max-width: 1025px) {
                @media (orientation: landscape) {
                  grid-template-columns: 100px 200px repeat(3, 1fr);
                }
              }
            }
            /* ipad pro */
            @media (width: 1024px) {
              @media (height: 1366px) {
                @media (orientation: portrait) {
                  grid-template-columns: 150px 250px repeat(3, 1fr);
                }
              }
            }
            place-items: center;
          `}
        >
          <Label colour="#7462AB" fontMax="15px">
            Avatar
          </Label>
          <Label colour="#7462AB" fontMax="15px">
            Name
          </Label>
          <Label colour="#7462AB" fontMax="15px">
            Gender
          </Label>
          <Label colour="#7462AB" fontMax="15px">
            D.O.B
          </Label>
          <Label colour="#7462AB" fontMax="15px">
            Created On
          </Label>
        </div>
        {/* content */}
        <div
          css={`
            height: 100%;
            overflow-y: auto;
          `}
        >
          {patients.map(
            (
              {
                id,
                person: {
                  id: patientPersonId,
                  avatar,
                  firstName,
                  lastName,
                  dob,
                  gender,
                  trn,
                  user: { status },
                  ...restOfPerson
                },
                createdAt,
                createdByUser,
                ...restofPatient
              },
              index
            ) => {
              const neededObject = {
                avatar,
                name: `${firstName} ${lastName}`,
                trn,
                gender,
                dateOfBirth: dob ? new Date(parseInt(dob)).toDateString() : '',
                status: status === 'CONFIRMED' ? true : false,
                id,
                firstName,
                lastName,
                createdByUser,
                dob,
                patientPersonId,
                ...restOfPerson,
                ...restofPatient,
              }

              return (
                <div
                  key={index}
                  css={`
                    display: grid;
                    grid-template-columns: 150px 250px repeat(3, 1fr);
                    @media screen and (max-width: 1440px) {
                      grid-template-columns: 60px repeat(4, 1fr);
                    }

                    @media only screen and (max-height: 769px) {
                      @media only screen and (max-width: 1025px) {
                        @media (orientation: landscape) {
                          grid-template-columns: 100px 200px repeat(3, 1fr);
                        }
                      }
                    } /* ipad pro */
                    @media (width: 1024px) {
                      @media (height: 1366px) {
                        @media (orientation: portrait) {
                          grid-template-columns: 150px 250px repeat(3, 1fr);
                        }
                      }
                    }
                    place-items: center;
                    border-bottom: 0.5px solid #f1f1ff;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    &:hover {
                      box-shadow: 0px 0px 5px 0px rgba(207, 226, 255, 1);
                      background: #f8f6ff;
                      cursor: pointer;
                      border-left: 1px solid ${Colours.border};
                      border-right: 1px solid ${Colours.border};
                      transition: ease-out 0.2s;
                    }
                  `}
                  onClick={() => {
                    localStorage.setItem(
                      'selectedPatient',
                      JSON.stringify(neededObject)
                    )
                    history.push(`/facility/patient/overview/${id}`)
                  }}
                >
                  <Content.Avatar
                    size="medium"
                    src={avatar}
                    firstName={firstName}
                    lastName={lastName}
                  />
                  <Label fontMax="15px">{`${firstName} ${lastName}`}</Label>
                  <Gender>{gender}</Gender>
                  <Label fontMax="15px">
                    {dob ? new Date(parseInt(dob)).toDateString() : ''}
                  </Label>
                  <Label fontMax="15px">
                    {createdAt
                      ? new Date(parseInt(createdAt)).toDateString()
                      : ''}
                  </Label>
                </div>
              )
            }
          )}
        </div>
      </div>
    </Layout.Container>
  )
}
