import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import 'styled-components/macro'
import moment from 'moment'
import { useLocation, useHistory } from 'react-router-dom'
import {
  NavigationTypes,
  Icons,
  Colours,
  Content,
  SignOutCard,
} from 'components'
import { MultipleMedicalFacilityModal } from 'pages/auth/modals'

const queryString = require('query-string')

function MainContainer({ children, type }) {
  const { pathname, search } = useLocation()
  const { action } = queryString.parse(search)
  const history = useHistory()

  const userType = JSON.parse(localStorage.getItem('session'))
  const { loggedInUser } = useContext(UserContext) || {}
  const {
    user: { role },
  } = userType

  const [open, setOpen] = useState(false)
  const [showSignOutCard, setShowSignOutCard] = useState(false)

  const {
    firstName = 'Loading',
    lastName = 'User..',
    avatar,
  } = loggedInUser || {}

  const ShowTitle = () => {
    if (pathname.includes('support/facilities')) return 'Facilities'
    else if (pathname.includes('support/pharmacies')) return 'Pharmacies'
    else if (pathname.includes('support/settings/account'))
      return 'Settings - Account Management'
    else if (pathname.includes('facility/dashboard'))
      return `Hi ${firstName}! Here's your overview`
    else if (
      pathname.includes('facility/patients') ||
      pathname.includes('/facility/patient')
    )
      return `Patients`
    else if (pathname.includes('facility/appointments')) return `Appointments`
    else if (pathname.includes('facility/referrals')) return `Referrals`
    else if (pathname.includes('facility/reports')) return `Reports`
    else if (pathname.includes('facility/settings/account'))
      return `Settings - Account Management`
    else if (pathname.includes('facility/settings/facility'))
      return `Settings - Facility Management`
    else if (pathname.includes('facility/settings/users'))
      return `Settings - User Management`
    else if (pathname.includes('facility/settings/roles'))
      return `Settings - Role Management`
    else if (pathname.includes('facility/settings/e-referral-template'))
      return `Settings - E-Referral Template`
    else if (pathname.includes('facility/settings/e-prescription-template'))
      return `Settings - E-Prescription Template`
    return 'Title'
  }

  return (
    <div
      css={`
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-columns: max-content 1fr;
        @media (max-width: 1025px) {
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
          height: 100%;
          @media (max-width: 1025px) {
            display: none;
          }
          @media only screen and (max-height: 769px) {
            @media only screen and (max-width: 1025px) {
              @media (orientation: landscape) {
                display: none;
              }
            }
          }

          @media (min-width: 1025px) {
            display: visible;
          }
          @media only screen and (min-height: 769px) {
            @media only screen and (min-width: 1025px) {
              @media (orientation: landscape) {
                display: visible;
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
        {type === 'support' && role === 'SupportAdmin' ? (
          <NavigationTypes.SupportNav />
        ) : type === 'facility' && role === 'AdminUser' ? (
          <NavigationTypes.FacilityAdminNav />
        ) : type === 'facility' && role === 'RegularUser' ? (
          <NavigationTypes.FacilityNav />
        ) : (
          <div
            css={`
              height: 300px;
              width: 200px;
              margin: 20px;
              padding: 10px;
              border-radius: 5%;
              display: grid;
              place-items: center;
              background: ${Colours.red};
              box-shadow: 1px -3px 73px -42px rgba(184, 184, 184, 1);
              color: white;
              font-weight: 600;
            `}
          >
            Good Try My Guy, Please return to the proper URL
          </div>
        )}
      </div>

      <div
        css={`
          background: rgb(249, 249, 255);
          background: linear-gradient(
            180deg,
            rgba(249, 249, 255, 1) 0%,
            rgba(234, 235, 255, 1) 100%
          );
          height: calc(100% - 20px);
          width: calc(100% - 30px);
          padding: 10px;
          overflow-y: auto;
          display: grid;
          grid-template-rows: 60px 1fr;
          grid-row-gap: 20px;
          padding-left: 20px;
          @media only screen and (max-height: 769px) {
            @media only screen and (max-width: 1025px) {
              @media (orientation: landscape) {
                padding-left: 10px;
                width: calc(100% - 20px);
              }
            }
          }
          /* Ipod pro */
          @media (width: 1024px) {
            @media (height: 1366px) {
              @media (orientation: portrait) {
                padding-left: 10px;
                width: calc(100% - 20px);
              }
            }
          }
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: 1fr max-content max-content max-content;
            align-items: center;
            grid-column-gap: 20px;
            @media (max-width: 1025px) {
              grid-template-columns: 50px 1fr max-content max-content max-content;
            }
            @media only screen and (max-height: 769px) {
              @media only screen and (max-width: 1025px) {
                @media (orientation: landscape) {
                  grid-template-columns: 50px 1fr max-content max-content max-content;
                }
              }
            }
            /* Ipod pro */
            @media (width: 1024px) {
              @media (height: 1366px) {
                @media (orientation: portrait) {
                  grid-template-columns: 50px 1fr max-content max-content max-content;
                }
              }
            }
          `}
        >
          <div
            css={`
              @media (max-width: 1025px) {
                display: visible;
              }
              @media only screen and (max-height: 769px) {
                @media only screen and (max-width: 1025px) {
                  @media (orientation: landscape) {
                    display: visible;
                  }
                }
              }

              @media only screen and (min-height: 769px) {
                @media only screen and (min-width: 1025px) {
                  @media (orientation: landscape) {
                    display: none;
                  }
                }
              }

              /* Ipod pro */
              @media (width: 1024px) {
                @media (height: 1366px) {
                  @media (orientation: portrait) {
                    display: visible;
                  }
                }
              }
              @media (min-width: 1025px) {
                display: none;
              }

              /* @media only screen and (min-height: 769px) and (min-width: 769px) and (max-width: 1024px) {
                display: none;
              } */
            `}
          >
            {type === 'support' && role === 'SupportAdmin' ? (
              <NavigationTypes.SupportNav />
            ) : type === 'facility' && role === 'AdminUser' ? (
              <NavigationTypes.FacilityAdminNav />
            ) : type === 'facility' && role === 'RegularUser' ? (
              <NavigationTypes.FacilityNav />
            ) : (
              <div />
            )}
          </div>
          <CustomLabel>{ShowTitle()}</CustomLabel>
          {/* Time Card */}
          <TopContainer>
            <TimeCard />
          </TopContainer>
          {/* Notification */}
          <div
            onClick={() => {
              setOpen(true)
            }}
          >
            <TopContainer>
              <Notification active />
              <Content.NotificationCenter
                open={open}
                close={() => setOpen(false)}
                x="-145px"
                y="235px"
              />
            </TopContainer>
          </div>
          {/* Avatar */}
          <TopContainer
            hover
            onClick={() => {
              setShowSignOutCard(!showSignOutCard)
            }}
          >
            <div
              css={`
                position: relative;
              `}
            >
              <section
                css={`
                  display: grid;
                  grid-template-columns: 72px 1fr 40px;
                  place-items: center;
                  &:hover {
                    cursor: pointer;
                  }
                `}
              >
                <Content.Avatar
                  src={avatar}
                  size="medium"
                  firstName={firstName}
                  lastName={lastName}
                />
                <Label customSize="20px">{`${firstName} ${lastName}`}</Label>
                <Icons.ExpandMoreRoundedIcon style={{ color: '#8471BE' }} />
              </section>
              {showSignOutCard && (
                <SignOutCard
                  showSignOutCard={showSignOutCard}
                  setShowSignOutCard={setShowSignOutCard}
                />
              )}
            </div>
          </TopContainer>
        </div>
        {children}
        {action === 'switchFacility' ? (
          <MultipleMedicalFacilityModal
            close={() => {
              history.goBack()
              setTimeout(() => window.location.reload(), 1000)
            }}
          />
        ) : null}
      </div>
    </div>
  )
}

export default MainContainer

const TopContainer = ({ children, hover, ...rest }) => (
  <div
    css={`
      background: #fbfbff;
      box-shadow: 0px 10px 22px -3px rgba(213, 213, 213, 0.7);
      width: max-content;
      height: 40px;
      padding: 10px;
      border-radius: 10px;
      display: grid;
      place-items: center;
      &:hover {
        cursor: ${hover ? 'pointer' : 'arrow'};
      }
    `}
    {...rest}
  >
    {children}
  </div>
)

function TimeCard() {
  let [time, setTime] = useState(moment().format('D.ddd.MMM.YYYY HH:mm:ss'))
  setInterval(function () {
    setTime(moment().format('D.ddd.MMM.YYYY HH:mm:ss'))
  }, 1000)

  function regTime(time) {
    switch (parseInt(time)) {
      case 13:
        return 1
      case 14:
        return 2
      case 15:
        return 3
      case 16:
        return 4
      case 17:
        return 5
      case 18:
        return 6
      case 19:
        return 7
      case 20:
        return 8
      case 21:
        return 9
      case 22:
        return 10
      case 23:
        return 11
      case 24:
        return 12
      default:
        return time
    }
  }

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-column-gap: 10px;
        width: 100%;
        place-items: center;
      `}
    >
      <Icons.QueryBuilderRoundedIcon
        style={{
          fontSize: '30px',
          color: Colours.purple,
          paddingBottom: '3px',
        }}
      />
      <Label customSize="25px" weight="450">
        {`${regTime(time.split(' ')[1].split(':')[0])}:${
          time.split(' ')[1].split(':')[1]
        } ${parseInt(time.split(' ')[1].split(':')[0]) >= 12 ? 'pm' : 'am'}`}
      </Label>
    </div>
  )
}

const Notification = ({ active }) => (
  <div
    css={`
      width: 30px;
      display: grid;
      grid-template-columns: ${active ? '17px max-content' : 'max-content'};
      &:hover {
        cursor: pointer;
      }
    `}
  >
    <Icons.NotificationsRoundedIcon
      style={{ fontSize: '30px', color: '#BFCBD6' }}
    />
    <section
      css={`
        display: ${active ? 'visible' : 'none'};
        margin-top: 3px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${Colours.purple};
      `}
    />
  </div>
)

const Label = ({ customSize, children }) => (
  <p
    css={`
      margin: 0px;
      padding: 0px;
      font-size: ${customSize || '30px'};
      color: ${Colours.text};
      /* tablet landscape */
      @media only screen and (max-height: 769px) {
        @media only screen and (max-width: 1025px) {
          @media (orientation: landscape) {
            font-size: 18px;
          }
        }
      }

      @media only screen and (max-width: 769px) {
        font-size: 16px;
      }
      /* Ipod pro */
      @media (width: 1024px) {
        @media (height: 1366px) {
          @media (orientation: portrait) {
            font-size: 16px;
          }
        }
      }
    `}
  >
    {children}
  </p>
)

const CustomLabel = ({ customSize, children }) => (
  <p
    css={`
      margin: 0px;
      padding: 0px;
      font-size: ${customSize || '30px'};
      color: ${Colours.text};
      /* tablet landscape */
      @media only screen and (max-height: 769px) {
        @media only screen and (max-width: 1025px) {
          @media (orientation: landscape) {
            font-size: 18px;
          }
        }
      }

      @media only screen and (max-width: 769px) {
        font-size: 16px;
      }
      /* Ipod pro */
      @media (width: 1024px) {
        @media (height: 1366px) {
          @media (orientation: portrait) {
            font-size: 16px;
          }
        }
      }
      @media only screen and (max-width: 1280px) {
        font-size: 25px;
      }
      @media only screen and (max-width: 1100px) {
        font-size: 15px;
      }
      @media only screen and (min-width: 769px) and (max-width: 896px) {
        font-size: 10px;
      }
    `}
  >
    {children}
  </p>
)
