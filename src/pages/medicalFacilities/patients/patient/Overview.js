import React, { useState } from 'react'
import 'styled-components/macro'
import { findCountry, findProvince } from 'utils'
import { Core, Colours, Content, Layout, Notification } from 'components'
import EmergencyContacts from './Emergencycontacts'
import { useLocation } from 'react-router-dom'
import {
  CreateEmergencyContact,
  RemoveEmergencyContact,
  UpdateEmergencyContact,
} from '../modals'
import { ActiveAllergies, ActiveDiagnosis, ActiveMedicines } from './widgets'

const queryString = require('query-string')

export default function Overview() {
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const {
    avatar,
    title,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    gender,
    medicalCondition: condition,
    trn,
    email,
    contact,
    address,
  } = JSON.parse(localStorage.getItem('selectedPatient')) || {}
  const [completedCreate, setcompletedCreate] = useState(false)

  const { contact_number: phone = '' } = contact || {}
  const { streetNumber, streetName, city, province, country } = address || {}

  const showNotificationCreate = () => {
    setcompletedCreate(true)
    setTimeout(() => {
      setcompletedCreate(false)
    }, 8000)
  }

  return (
    <div
      css={`
        display: grid;
        overflow-y: auto;
        height: 100%;
        @media (max-width: 769px) {
          margin-top: 10px;
        }
        @media only screen and (max-height: 769px) {
          @media only screen and (max-width: 1025px) {
            @media (orientation: landscape) {
              margin-top: 10px;
            }
          }
        }
        /* Ipod pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              margin-top: 10px;
            }
          }
        }
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-rows: max-content 300px 1fr;
          overflow-y: auto;
          grid-gap: 50px;
        `}
      >
        {/* Details */}
        <div
          css={`
            display: grid;
            grid-template-rows: max-content 1fr;
            grid-gap: 5px;
          `}
        >
          <Core.Text customSize="18px" weight="400">
            Details
          </Core.Text>
          <div
            css={`
              border-radius: 5px;
              border: 1px solid ${Colours.border};
              display: grid;
              grid-template-columns: 300px 1fr;
              grid-gap: 30px;
              padding: 10px;
              @media only screen and (max-width: 769px) {
                grid-template-columns: 1fr;
                grid-template-rows: 300px 1fr;
              }
              @media only screen and (max-height: 1025px) {
                @media only screen and (max-width: 769px) {
                  @media (orientation: portrait) {
                    grid-template-columns: 1fr;
                    grid-template-rows: 300px 1fr;
                  }
                }
              }
            `}
          >
            <Notification
              setcompleted={setcompletedCreate}
              message="Emergency Contact successfully added."
              notification={completedCreate}
            />
            <Content.Avatar
              square
              size="square"
              borderColor={Colours.purple}
              shadow
              src={avatar}
              firstName={firstName}
              lastName={lastName}
            />
            <div
              css={`
                display: grid;
                grid-template-rows: 1fr max-content;
                grid-gap: 20px;
              `}
            >
              <div
                css={`
                  display: grid;
                  grid-template-columns: max-content 1fr;
                  grid-gap: 10px;
                  @media (max-width: 1440px) {
                    grid-template-columns: 1fr;
                  }
                  @media only screen and (max-height: 769px) {
                    @media only screen and (max-width: 1025px) {
                      @media (orientation: landscape) {
                        grid-template-columns: 1fr;
                      }
                    }
                  }
                  /* Ipod pro */
                  @media (width: 1024px) {
                    @media (height: 1366px) {
                      @media (orientation: portrait) {
                        grid-template-columns: 1fr;
                      }
                    }
                  }
                `}
              >
                <div
                  css={`
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-gap: 20px;
                  `}
                >
                  <Layout.DataDisplay
                    noLine
                    Contained
                    label="Title"
                    value={title}
                  />
                  <Layout.DataDisplay
                    noLine
                    Contained
                    label="First Name"
                    value={firstName}
                  />
                  <Layout.DataDisplay
                    noLine
                    Contained
                    label="Middle Name"
                    value={middleName}
                  />

                  <Layout.DataDisplay
                    noLine
                    Contained
                    label="Last Name"
                    value={lastName}
                  />
                  <Layout.DataDisplay
                    noLine
                    Contained
                    label="Date of Birth"
                    value={dateOfBirth}
                  />
                  <Layout.DataDisplay
                    noLine
                    Contained
                    label="Gender"
                    value={gender}
                  />

                  <Layout.DataDisplay
                    noLine
                    Contained
                    highlight
                    label="TRN"
                    value={trn}
                  />
                  <Layout.DataDisplay
                    noLine
                    Contained
                    highlight
                    label="Contact Number"
                    value={phone}
                  />
                  <Layout.DataDisplay
                    noLine
                    highlight
                    Contained
                    label="Email Address"
                    value={email}
                  />
                </div>
                <div
                  css={`
                    @media (max-width: 1400px) {
                      display: none;
                    }
                    @media only screen and (max-height: 769px) {
                      @media only screen and (max-width: 1025px) {
                        @media (orientation: landscape) {
                          display: none;
                        }
                      }
                    }
                    /* Ipod pro */
                    @media (width: 1024px) {
                      @media (height: 1366px) {
                        @media (orientation: portrait) {
                          display: none;
                        }
                      }
                    }
                  `}
                >
                  <Layout.DataDisplay
                    noLine
                    overflow
                    label="Condition"
                    value={condition}
                  />
                </div>
              </div>
              <div
                css={`
                  border-top: 1px solid ${Colours.border};
                `}
              >
                <Layout.DataDisplay
                  noLine
                  Contained
                  label="Address"
                  highlight
                  value={`${streetNumber || ''} ${streetName || '-'}, ${
                    city || '-'
                  }, ${findProvince(province, country) || '-'}, ${
                    findCountry(country) || '-'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Allergies ETC */}
        <div
          css={`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 20px;
            @media (max-width: 1024px) {
              grid-template-columns: repeat(2, 1fr);
            }
            @media only screen and (max-height: 769px) {
              @media only screen and (max-width: 1025px) {
                @media (orientation: landscape) {
                  grid-template-columns: repeat(2, 1fr);
                }
              }
            }
            /* Ipod pro */
            @media (width: 1024px) {
              @media (height: 1366px) {
                @media (orientation: portrait) {
                  grid-template-columns: repeat(2, 1fr);
                }
              }
            }
          `}
        >
          <div
            css={`
              display: grid;
              grid-template-rows: max-content 1fr;
              grid-gap: 5px;
              overflow-y: auto;
            `}
          >
            <Core.Text customSize="18px" weight="400">
              Active Diagnosis
            </Core.Text>
            <ActiveDiagnosis />
          </div>
          <div
            css={`
              display: grid;
              grid-template-rows: max-content 1fr;
              grid-gap: 5px;
              overflow-y: auto;
              @media (max-width: 1024px) {
                display: none;
              }
              @media only screen and (max-height: 769px) {
                @media only screen and (max-width: 1025px) {
                  @media (orientation: landscape) {
                    display: none;
                  }
                }
              }
              /* Ipod pro */
              @media (width: 1024px) {
                @media (height: 1366px) {
                  @media (orientation: portrait) {
                    display: none;
                  }
                }
              }
            `}
          >
            <Core.Text customSize="18px" weight="400">
              Active Allergies
            </Core.Text>
            <ActiveAllergies />
          </div>
          <div
            css={`
              display: grid;
              grid-template-rows: max-content 1fr;
              grid-gap: 5px;
              overflow-y: auto;
            `}
          >
            <Core.Text customSize="18px" weight="400">
              Active Medicines
            </Core.Text>
            <ActiveMedicines />
          </div>
        </div>
        {/* Emergency Contact */}

        <EmergencyContacts />
      </div>
      {action === 'newEmergencyContact' && (
        <CreateEmergencyContact
          showNotificationCreate={showNotificationCreate}
        />
      )}
      {action === 'updateEmergencyContact' && <UpdateEmergencyContact />}
      {action === 'deleteEmergencyContact' && <RemoveEmergencyContact />}
    </div>
  )
}
