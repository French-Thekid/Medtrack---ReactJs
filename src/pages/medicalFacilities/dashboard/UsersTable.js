import React, { useState } from 'react'
import 'styled-components/macro'
import { useHistory } from 'react-router'

import { Layout, Colours, Content, FormControl, Loading } from 'components'
import { Label } from './index'

export default function UsersTable({ loading, users = {}, searchHandler }) {
  const history = useHistory()
  const [query, setQuery] = useState('')
  if (loading) return <Loading Contained />

  const Type = ({ children }) => (
    <div
      css={`
        height: max-content;
        width: 150px;
        padding: 5px;
        border-radius: 5px;
        background: ${children === 'Doctor' ? '#E2EDFF' : '#FFF7E5'};
        display: grid;
        place-items: center;
        /* ipad pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              width: max-content;
            }
          }
        }
        @media only screen and (max-width: 1200px) {
          width: 85px;
        }
      `}
    >
      <Label
        colour={children === 'Doctor' ? Colours.blue : Colours.orange}
        fontMax="15px"
      >
        {children}
      </Label>
    </div>
  )

  return (
    <Layout.Container minheight="200px">
      <div
        css={`
          min-height: 200px;
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
            Users Recently Added
          </Label>
          <FormControl.InputWithImage
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={'Search Users'}
            action={() => {
              searchHandler({ variables: { query } })
            }}
          />
          <Label
            colour={Colours.purple}
            onClick={() =>
              history.push('/facility/settings/users/tables/allUsers')
            }
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
            grid-template-columns: 100px 200px 150px 1fr 150px;
            @media screen and (min-width: 1440px) {
              grid-template-columns: 150px 250px repeat(3, 1fr);
              place-items: Center;
            }

            @media only screen and (max-width: 1200px) {
              grid-template-columns: 80px 200px 100px 1fr 80px;
              justify-items: Start;
              align-items: center;
            }

            /* Landscape Tablet */
            @media only screen and (max-height: 769px) {
              @media only screen and (max-width: 1025px) {
                @media (orientation: landscape) {
                  grid-template-columns: 100px 200px repeat(3, 1fr);
                  place-items: Center;
                }
              }
            }
            justify-items: Start;
            align-items: center;
            @media only screen and (min-height: 1024px) {
              grid-template-columns: 80px 200px 100px 1fr 80px;
              justify-items: Start;
              align-items: center;
            }
          `}
        >
          <Label colour="#7462AB" fontMax="15px">
            Avatar
          </Label>
          <Label colour="#7462AB" fontMax="15px">
            Name
          </Label>
          <Label colour="#7462AB" fontMax="15px">
            ID
          </Label>
          <Label colour="#7462AB" fontMax="15px">
            Email
          </Label>
          <Label colour="#7462AB" fontMax="15px">
            Type
          </Label>
        </div>
        {/* content */}
        <div
          css={`
            height: 100%;
            overflow-y: auto;
          `}
        >
          {users.listUsers.data.map(
            (
              {
                avatar,
                firstName,
                lastName,
                id,
                email,
                type,
                roleAssigned,
                ...rest
              },
              index
            ) => {
              return (
                <div
                  onClick={() => {
                    localStorage.setItem(
                      'selectedUser',
                      JSON.stringify({
                        avatar,
                        firstName,
                        lastName,
                        id,
                        email,
                        type,
                        roleAssigned,
                        ...rest,
                      })
                    )
                    history.push(`/facility/settings/users/view-user/${id}`)
                  }}
                  key={index}
                  css={`
                    display: grid;
                    grid-template-columns: 100px 200px 150px 1fr max-content;
                    @media screen and (min-width: 1440px) {
                      grid-template-columns: 150px 250px repeat(3, 1fr);
                      place-items: Center;
                    }
                    @media only screen and (max-width: 1200px) {
                      grid-template-columns: 80px 200px 100px 1fr max-content;
                      justify-items: Start;
                      align-items: center;
                      width: calc(100% - 20px);
                      padding: 10px;
                    }

                    /* Landscape Tablet */
                    @media only screen and (max-height: 769px) {
                      @media only screen and (max-width: 1025px) {
                        @media (orientation: landscape) {
                          grid-template-columns: 100px 200px repeat(3, 1fr);
                          place-items: Center;
                        }
                      }
                    }

                    justify-items: Start;
                    align-items: center;
                    border-bottom: 0.5px solid #f1f1ff;
                    width: calc(100% - 20px);
                    padding: 10px;
                    &:hover {
                      box-shadow: 0px 0px 5px 0px rgba(207, 226, 255, 1);
                      background: #f8f6ff;
                      cursor: pointer;
                      border-left: 1px solid ${Colours.border};
                      border-right: 1px solid ${Colours.border};
                      transition: ease-out 0.2s;
                    }

                    /* tablet portrait */
                  `}
                >
                  <Content.Avatar
                    size="medium"
                    src={avatar}
                    firstName={firstName}
                    lastName={lastName}
                  />
                  <Label fontMax="15px">{`${firstName} ${lastName}`}</Label>
                  <Label fontMax="15px" colour={Colours.purple}>
                    {id.split('-')[0]}
                  </Label>
                  <div
                    css={`
                      /* ipad pro */
                      @media (width: 1024px) {
                        @media (height: 1366px) {
                          @media (orientation: portrait) {
                            width: 150px;
                          }
                        }
                      }
                    `}
                  >
                    <Label Contained fontMax="15px">
                      {email}
                    </Label>
                  </div>
                  <Type fontMax="15px">{type}</Type>
                </div>
              )
            }
          )}
        </div>
      </div>
    </Layout.Container>
  )
}
