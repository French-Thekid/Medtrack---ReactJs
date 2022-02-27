import React, { useContext } from 'react'
import { UserContext } from 'context'
import 'styled-components/macro'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { LIST_APPOINTMENTS } from 'pages/medicalFacilities/appointment/queries'
import { Content, Colours, Icons, Core, Loading } from 'components'

export default function Account({ user }) {
  const { pathname } = useLocation()
  const match = useRouteMatch()
  const { loggedInUser: { doctor = [] } = {} } = useContext(UserContext) || {}
  const { id: doctorId = 0 } = doctor.length > 0 ? doctor[0] : {}
  const { avatar, firstName, title, lastName, type = 'Loading..' } = user || {}

  const userType = JSON.parse(localStorage.getItem('session'))
  const {
    user: { role },
  } = userType

  //Query
  const { loading, error, data } = useQuery(LIST_APPOINTMENTS, {
    variables: { doctorId: parseInt(doctorId) },
  })

  if (loading) return <Loading Contained />
  if (error)
    return (
      <Content.Alert type="error" message={'Failed to load Appointments'} />
    )

  let total = 0
  let completed = 0
  data.listAppointments.data.map((app, index) => {
    const { appointmentStatus } = app || {}
    const { name: status } = appointmentStatus || {}
    const { doctor } = app || {}
    const { id } = doctor || {}
    if (parseInt(id) === parseInt(doctorId)) {
      total++
      if (status === 'Completed') completed++
    }
    return null
  })

  let percentageCompleted = (completed / total) * 100
  if (isNaN(percentageCompleted)) percentageCompleted = 100
  const percentageCompletedString =
    percentageCompleted.toString().split('.')[0] + '%'

  return (
    <div
      css={`
        border-radius: 5px;
        padding: 10px;
        width: calc(100% - 22px);
        height: calc(100% - 22px);
        display: grid;
        grid-template-rows: 200px repeat(3, max-content) 1fr;
        grid-row-gap: 10px;
        border: 1px solid #e1d8fe;
        box-shadow: 0px 8px 20px -10px rgba(210, 210, 210, 1);
        place-items: center;
        @media screen and (max-width: 1025px) {
          grid-template-rows: 1fr;
          grid-template-columns: 180px 1fr max-content;
          justify-items: start;
          height: 150px;
        }
        /* Tablets */
        @media screen and (max-width: 1025px) {
          @media screen and (max-height: 769px) {
            @media screen and (orientation: landscape) {
              grid-template-rows: 1fr;
              grid-template-columns: 180px 1fr max-content;
              justify-items: start;
              height: 170px;
            }
          }
        }
        @media screen and (max-width: 769px) {
          @media screen and (max-height: 1025px) {
            @media screen and (orientation: portrait) {
              grid-template-rows: 1fr;
              grid-template-columns: 200px 1fr max-content;
              height: 170px;
            }
          }
        }
        /* Ipod pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              grid-template-rows: 1fr;
              grid-template-columns: 200px 1fr max-content;
              height: 170px;
            }
          }
        }
      `}
    >
      <div
        css={`
          @media screen and (max-width: 1025px) {
            display: none;
          }
          /* Tablets */
          @media screen and (max-width: 1025px) {
            @media screen and (max-height: 769px) {
              @media screen and (orientation: landscape) {
                display: none;
              }
            }
          }
          @media screen and (max-width: 769px) {
            @media screen and (max-height: 1025px) {
              @media screen and (orientation: portrait) {
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
        <Content.Avatar
          shadow
          size="bbw"
          src={avatar}
          firstName={firstName}
          lastName={lastName}
          borderColor="#6F42FF"
        />
      </div>
      <div
        css={`
          @media screen and (min-width: 1025px) {
            display: none;
          }
          /* Tablets */
          @media screen and (max-width: 1025px) {
            @media screen and (max-height: 769px) {
              @media screen and (orientation: landscape) {
                display: visible;
              }
            }
          }
          @media screen and (max-width: 769px) {
            @media screen and (max-height: 1025px) {
              @media screen and (orientation: portrait) {
                display: visible;
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
        `}
      >
        <Content.Avatar
          shadow
          size="huge+"
          src={avatar}
          firstName={firstName}
          lastName={lastName}
          borderColor="#6F42FF"
        />
      </div>
      <div
        css={`
          @media screen and (max-width: 1025px) {
            display: none;
          }
          /* Tablets */
          @media screen and (max-width: 1025px) {
            @media screen and (max-height: 769px) {
              @media screen and (orientation: landscape) {
                display: none;
              }
            }
          }
          @media screen and (max-width: 769px) {
            @media screen and (max-height: 1025px) {
              @media screen and (orientation: portrait) {
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
        <Core.Text customSize="20px">{`${
          title || ''
        } ${firstName} ${lastName}`}</Core.Text>
      </div>
      <div
        css={`
          @media screen and (min-width: 1025px) {
            display: none;
          }
          /* Tablets */
          @media screen and (max-width: 1025px) {
            @media screen and (max-height: 769px) {
              @media screen and (orientation: landscape) {
                display: visible;
              }
            }
          }
          @media screen and (max-width: 769px) {
            @media screen and (max-height: 1025px) {
              @media screen and (orientation: portrait) {
                display: visible;
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

          height: 100%;
          width: 100%;
          display: grid;
          grid-template-rows: max-content 1fr max-content;
          justify-items: start;
        `}
      >
        <Core.Text customSize="25px">{`${
          title || ''
        } ${firstName} ${lastName}`}</Core.Text>
        <div
          css={`
            height: max-content;
            width: 150px;
            padding: 2px 10px;
            border-radius: 25px;
            font-size: 20px;
            background: ${type === 'Doctor' ? Colours.purple : Colours.orange};
            float: right;
            color: white;
            display: grid;
            place-items: center;
            box-shadow: 0px 8px 20px -10px rgba(113, 113, 138, 1);
            /* Tablets */
            @media screen and (max-width: 769px) {
              @media screen and (max-height: 1025px) {
                @media screen and (orientation: portrait) {
                  font-size: 15px;
                  width: 100px;
                  margin-top: 5px;
                }
              }
            }
            /* Ipod pro */
            @media (width: 1024px) {
              @media (height: 1366px) {
                @media (orientation: portrait) {
                  font-size: 15px;
                  width: 100px;
                  margin-top: 5px;
                }
              }
            }
          `}
        >
          {type || role === 'AdminUser' ? 'Administrator' : 'Loading..'}
        </div>
        <div
          css={`
            display: grid;
            grid-template-rows: repeat(2, max-content);
            grid-column-gap: 5px;
            width: 100%;
            display: ${type === 'Doctor' ? 'visible' : 'none'};
          `}
        >
          <section
            css={`
              width: 100%;
              display: grid;
              justify-items: start;
              margin-bottom: 2px;
              display: grid;
              grid-template-columns: 1fr max-content;
            `}
          >
            <Core.Text customSize="13px" color={Colours.text}>
              Appointments Completed
            </Core.Text>
            <Core.Text customSize="13px" color={Colours.purple}>
              {percentageCompletedString}
            </Core.Text>
          </section>
          <div
            css={`
              width: 100%;
              height: 15px;
              border-radius: 25px;
              background: #e6deff;
              @media only screen and (max-width: 1440px) {
                height: 10px;
              }
            `}
          >
            <div
              css={`
                width: ${percentageCompletedString};
                height: 100%;
                border-radius: 25px;
                background: ${Colours.green};
              `}
            />
          </div>
        </div>
      </div>
      <div
        css={`
          height: max-content;
          width: 150px;
          padding: 2px 10px;
          border-radius: 25px;
          font-size: 20px;
          background: ${type === 'Doctor' ? Colours.purple : Colours.orange};
          float: right;
          color: white;
          display: grid;
          place-items: center;
          box-shadow: 0px 8px 20px -10px rgba(113, 113, 138, 1);
          @media screen and (max-width: 1025px) {
            display: none;
          }
          /* Tablets */
          @media screen and (max-width: 1025px) {
            @media screen and (max-height: 769px) {
              @media screen and (orientation: landscape) {
                display: none;
              }
            }
          }
          @media screen and (max-width: 769px) {
            @media screen and (max-height: 1025px) {
              @media screen and (orientation: portrait) {
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
        {type || 'Administrator'}
      </div>
      <div
        css={`
          display: grid;
          grid-template-rows: repeat(2, max-content);
          grid-column-gap: 5px;
          width: 100%;
          margin-top: 20px;
          @media screen and (max-width: 1025px) {
            display: none;
          }
          /* Tablets */
          @media screen and (max-width: 1025px) {
            @media screen and (max-height: 769px) {
              @media screen and (orientation: landscape) {
                display: none;
              }
            }
          }
          @media screen and (max-width: 769px) {
            @media screen and (max-height: 1025px) {
              @media screen and (orientation: portrait) {
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
          display: ${type === 'Doctor' ? 'visible' : 'none'};
        `}
      >
        <section
          css={`
            width: 100%;
            display: grid;
            justify-items: start;
            margin-bottom: 2px;
            display: grid;
            grid-template-columns: 1fr max-content;
          `}
        >
          <Core.Text customSize="13px" color={Colours.text}>
            Appointments Completed
          </Core.Text>
          <Core.Text customSize="13px" color={Colours.purple}>
            {percentageCompletedString}
          </Core.Text>
        </section>
        <div
          css={`
            width: 100%;
            height: 15px;
            border-radius: 25px;
            background: #e8ffeb;
            @media only screen and (max-width: 1440px) {
              height: 10px;
            }
          `}
        >
          <div
            css={`
              width: ${percentageCompletedString};
              height: 100%;
              border-radius: 25px;
              background: ${Colours.green};
            `}
          />
        </div>
      </div>
      <MenuOptions role={role} type={type}>
        <MenuItems
          Icon={Icons.AccountCircleRoundedIcon}
          title="Profile"
          active={pathname.includes('profile') ? true : false}
          to={`${match.url}/profile`}
        />
        <MenuItems
          Icon={Icons.LockRoundedIcon}
          title="Change Password"
          active={pathname.includes('changePassword') ? true : false}
          to={`${match.url}/changePassword`}
        />
        {role === 'RegularUser' && type === 'Doctor' && (
          <MenuItems
            Icon={Icons.TodayRoundedIcon}
            title="Availability"
            active={pathname.includes('availability') ? true : false}
            to={`${match.url}/availability`}
            last
          />
        )}
      </MenuOptions>
    </div>
  )
}

const MenuOptions = ({ children, role, type }) => {
  return (
    <div
      css={`
        margin-top: 10px;
        height: calc(100% - 22px);
        width: calc(100% - 22px);
        padding: ${role === 'RegularUser' && type === 'Doctor'
          ? '0px'
          : '10px'};
        border-top: 1px solid ${Colours.border};
        @media screen and (max-width: 1025px) {
          border-top: none;
          min-width: 200px;
          margin-left: 20px;
          margin-top: 0px;
          padding: 0px;
          width: calc(100% - 22px);
        }
        /* Tablets */
        @media screen and (max-width: 1025px) {
          @media screen and (max-height: 769px) {
            @media screen and (orientation: landscape) {
              border-top: none;
              min-width: 200px;
              margin-left: 20px;
              margin-top: 0px;
              padding: 0px;
              width: calc(100% - 22px);
            }
          }
        }
        @media screen and (max-width: 769px) {
          @media screen and (max-height: 1025px) {
            @media screen and (orientation: portrait) {
              border-top: none;
              min-width: 200px;
              margin-left: 20px;
              margin-top: 0px;
              padding: 0px;
              width: calc(100% - 22px);
            }
          }
        }
        /* Ipod pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              border-top: none;
              min-width: 200px;
              margin-left: 20px;
              margin-top: 0px;
              padding: 0px;
              width: calc(100% - 22px);
            }
          }
        }
      `}
    >
      {children}
    </div>
  )
}

const MenuItems = ({ to, Icon, title, active, last }) => {
  const history = useHistory()

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 30px 1fr max-content;
        grid-column-gap: 10px;
        color: ${active ? Colours.purple : Colours.textGrey};
        border-bottom: ${last ? 'none' : `1px solid ${Colours.border}`};
        padding: 10px;
        align-items: center;
        &:hover {
          cursor: pointer;
          color: ${Colours.purple};
        }
        @media screen and (max-width: 1025px) {
          grid-template-columns: 1fr;
          place-items: center;
          background: ${active ? '#ECEFFF' : 'none'};
          padding: 12px;
        }

        /* Tablets */
        @media screen and (max-width: 1025px) {
          @media screen and (max-height: 769px) {
            @media screen and (orientation: landscape) {
              grid-template-columns: 1fr;
              place-items: center;
              background: ${active ? '#ECEFFF' : 'none'};
              padding: 12px;
            }
          }
        }
        @media screen and (max-width: 769px) {
          @media screen and (max-height: 1025px) {
            @media screen and (orientation: portrait) {
              grid-template-columns: 1fr;
              place-items: center;
              background: ${active ? '#ECEFFF' : 'none'};
              padding: 15px;
            }
          }
        }
        /* Ipod pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              grid-template-columns: 1fr;
              place-items: center;
              background: ${active ? '#ECEFFF' : 'none'};
              padding: 15px;
            }
          }
        }
        @media (width: 1024px) {
          grid-template-columns: 1fr;
          place-items: center;
          background: ${active ? '#ECEFFF' : 'none'};
          padding: 15px;
        }
      `}
      onClick={() => history.push(to)}
    >
      <section
        css={`
          @media screen and (max-width: 1025px) {
            display: none;
          }
          /* Tablet */
          @media screen and (max-width: 1025px) {
            @media screen and (max-height: 769px) {
              @media screen and (orientation: landscape) {
                display: none;
              }
            }
          }
          @media screen and (max-width: 769px) {
            @media screen and (max-height: 1025px) {
              @media screen and (orientation: portrait) {
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
        <Icon />
      </section>
      <section
        css={`
          color: ${active ? Colours.purple : 'inherit'};
        `}
      >
        {title || ''}
      </section>
      <section
        css={`
          @media screen and (max-width: 1025px) {
            display: none;
          }
          /* Tablets */
          @media screen and (max-width: 1025px) {
            @media screen and (max-height: 769px) {
              @media screen and (orientation: landscape) {
                display: none;
              }
            }
          }
          @media screen and (max-width: 769px) {
            @media screen and (max-height: 1025px) {
              @media screen and (orientation: portrait) {
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
        {active && <Icons.ArrowForwardIosRoundedIcon />}
      </section>
    </div>
  )
}
