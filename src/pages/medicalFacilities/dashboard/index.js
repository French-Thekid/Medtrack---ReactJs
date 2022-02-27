import React, { useContext, useEffect } from 'react'
import 'styled-components/macro'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { useHistory, useLocation } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { Colours, Icons, Layout, Content, Loading } from 'components'
import Widget from './WidgetCard'
import PatientTable from './PatientTable'
import UsersTable from './UsersTable'
import { LIST_USERS, SEARCH_USERS } from 'pages/settings/users/queries'
import { LIST_PATIENTS, SEARCH_PATIENTS } from '../patients/queries'
import { LIST_APPOINTMENTS } from '../appointment/queries'
import AppointmentWidgetCard, {
  AppointmentWidgetCardSecondary,
} from './AppointmentWidgetContainer'
import moment from 'moment'
import { CancelAppointment } from '../appointment/createEvent/modal'
import { AuthContext, OrganisationContext, UserContext } from 'context'
import { ServiceSuspended } from './modals'
import { LIST_ROLES } from 'pages/settings/roles/queries'
import { LIST_REPORT } from '../report/queries'

const queryString = require('query-string')

export default function Dashboard() {
  const { setShowMultipleAccess } = useContext(AuthContext) || {}
  const userType = JSON.parse(localStorage.getItem('session'))
  const {
    user: { role },
  } = userType

  useEffect(() => {
    setShowMultipleAccess(false)
    // eslint-disable-next-line
  }, [])

  return role === 'AdminUser' ? <AdminDash /> : <MedicalUserDash />
}

function MedicalUserDash() {
  const history = useHistory()
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const { status } = useContext(OrganisationContext) || {}
  const { loggedInUser } = useContext(UserContext) || {}
  const { type, doctor = [] } = loggedInUser || {}
  const { id = '' } = (doctor.length > 0 && doctor[0]) || {}

  const doctorIds = [type === 'Doctor' ? parseInt(id) : ''].filter(
    (item, index) => item !== ''
  )

  //Query
  let { loading, error, data: patients } = useQuery(LIST_PATIENTS)
  const [
    searchPatient,
    { loading: loading1, error: error1, data: searchResult },
  ] = useLazyQuery(SEARCH_PATIENTS)
  const {
    loading: loadingAppointments,
    error: listAppointmentError,
    data: appointments,
  } = useQuery(LIST_APPOINTMENTS, {
    variables: {
      doctorIds,
    },
  })

  const topStyle = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, -20rem, 0)' },
    config: { duration: 500 },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })

  if (loading1) console.log('Searching')
  if (loading) return <Loading small />
  if (error || error1)
    return (
      <Content.Alert type="error" message={'Failed to load Recent Patients'} />
    )

  const FiveDaysBeforeToday = new Date(moment().subtract(5, 'days'))

  const { listPatients: searchListPatients } = searchResult || {}
  const { total: searchTotal } = searchListPatients || {}

  if (searchTotal > 0) patients = searchResult

  const { listPatients } = patients || {}
  const { data = [] } = listPatients || {}
  const recentPatients = data
    .map((patient, index) => {
      if (new Date(parseInt(patient.createdAt)) >= FiveDaysBeforeToday)
        return patient
      return null
    })
    .filter((item, index) => item !== null)

  //Counting Active Users
  let activePatients = 0
  data.map(
    (
      {
        person: {
          user: { enabled },
        },
      },
      index
    ) => {
      if (enabled) activePatients++
      return null
    }
  )

  if (loadingAppointments) return <Loading small />
  if (listAppointmentError)
    return (
      <Content.Alert type="error" message={'Failed to load Appointments'} />
    )

  let arrayToSort = [...appointments.listAppointments.data]
  arrayToSort.sort(
    (a, b) => new Date(parseInt(a.startTime)) - new Date(parseInt(b.startTime))
  )

  let completed = 0
  let total = 0
  appointments.listAppointments.data.map((app, index) => {
    const { appointmentStatus } = app || {}
    const { name: status } = appointmentStatus || {}
    const { doctor } = app || {}
    const { id: doctorId } = doctor || {}
    if (parseInt(id) === parseInt(doctorId)) {
      total++
      if (status === 'Completed') completed++
    }
    return null
  })

  return (
    <>
      <div
        css={`
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-column-gap: 20px;
          overflow-y: auto;
          @media only screen and (max-width: 1025px) {
            grid-template-columns: 1fr;
            grid-row-gap: 50px;
            overflow: auto;
          }
          @media only screen and (max-height: 769px) {
            @media only screen and (max-width: 1025px) {
              @media (orientation: landscape) {
                grid-template-columns: 1fr;
                grid-row-gap: 50px;
                overflow: auto;
              }
            }
          }
          @media only screen and (max-height: 1024px) {
            @media only screen and (max-width: 769px) {
              @media (orientation: portrait) {
                grid-template-columns: 1fr;
                grid-row-gap: 50px;
                overflow: auto;
              }
            }
          }

          /* ipad pro */
          @media (width: 1024px) {
            @media (height: 1366px) {
              @media (orientation: portrait) {
                grid-template-columns: 1fr;
                grid-row-gap: 50px;
                overflow: auto;
              }
            }
          }
        `}
      >
        <div
          css={`
            min-height: 300px;
            height: 100%;
            display: grid;
            grid-template-rows: max-content 1fr;
            grid-row-gap: 20px;
            @media only screen and (max-width: 1025px) {
              @media (orientation: landscape) {
                grid-template-rows: 1fr 2fr max-content;
              }
            }
            overflow-y: auto;
          `}
        >
          {/* widgets */}
          <div
            css={`
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              grid-column-gap: 20px;
            `}
          >
            <Layout.Container top>
              <Widget
                title="Appointments"
                colour={Colours.green}
                firstTitle="Total"
                firstCount={total}
                secondTitle="Completed"
                secondCount={completed}
              />
            </Layout.Container>
            <Layout.Container top>
              <Widget
                title="Patients"
                colour={Colours.blue}
                firstTitle="Registered"
                firstCount={patients.listPatients.total}
                secondTitle="Active"
                secondCount={activePatients}
              />
            </Layout.Container>
            <animated.div
              style={topStyle}
              css={`
                display: grid;
                grid-template-rows: 60px 1fr;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 10px;
              `}
            >
              <div
                css={`
                  display: grid;
                  place-items: center;
                  background: ${Colours.foreground};
                  border-radius: 10px;
                  box-shadow: -1px 6px 9px 3px rgba(213, 213, 213, 0.7);
                `}
              >
                <CustomLabel color={Colours.purple}>Quick Actions</CustomLabel>
              </div>

              <div
                css={`
                  height: calc(100% - 20px);
                  width: calc(100% - 20px);
                  display: grid;
                  grid-template-rows: repeat(2, max-content);
                  grid-row-gap: 20px;
                  padding: 10px;
                  justify-items: center;
                  margin-top: 20px;
                `}
              >
                <SpecialButton
                  purpose="major"
                  action={() =>
                    history.push(
                      `/facility/patients/allPatients?action=createPatient`
                    )
                  }
                >
                  <section
                    css={`
                      font-size: 25px;
                      @media only screen and (min-width: 1440px) {
                        font-size: 35px;
                      }
                    `}
                  >
                    <Icons.PersonRoundedIcon
                      style={{
                        fontSize: 'inherit',
                        color: Colours.foreground,
                      }}
                    />
                  </section>
                  <Label
                    colour={Colours.foreground}
                    fontMax="15px"
                    marginBottom="8px"
                  >
                    New Patient
                  </Label>
                </SpecialButton>
                <SpecialButton
                  purpose="major"
                  action={() =>
                    history.push(
                      `/facility/appointments/?action=create&mark=${new Date()}`
                    )
                  }
                >
                  <section
                    css={`
                      font-size: 25px;
                      @media only screen and (min-width: 1440px) {
                        font-size: 35px;
                      }
                    `}
                  >
                    <Icons.TodayRoundedIcon
                      style={{
                        fontSize: 'inherit',
                        color: Colours.foreground,
                      }}
                    />
                  </section>
                  <Label
                    colour={Colours.foreground}
                    fontMax="15px"
                    marginBottom="8px"
                  >
                    New Appointment
                  </Label>
                </SpecialButton>
              </div>
            </animated.div>
          </div>
          {action === 'cancelAppointment' && <CancelAppointment />}
          <PatientTable
            patients={recentPatients}
            searchHandler={searchPatient}
            loading={loading1}
          />
          {/* Appointments for tablets*/}

          <AppointmentWidgetCardSecondary
            total={appointments.listAppointments.total}
            appointments={appointments.listAppointments.data}
          />
        </div>
        {/* Appointments Main*/}
        {/* <Fade right> */}
        <AppointmentWidgetCard
          total={appointments.listAppointments.total}
          appointments={appointments.listAppointments.data}
        />
        {/* </Fade> */}
      </div>
      {(localStorage.getItem('WarningDisplayed') === null ||
        localStorage.getItem('WarningDisplayed') === undefined) &&
        status === 'SUSPENDED' && <ServiceSuspended type="regular" />}
    </>
  )
}

function AdminDash() {
  const history = useHistory()
  const { status } = useContext(OrganisationContext) || {}
  //Query
  let { loading, error, data: users } = useQuery(LIST_USERS)
  const [
    searchUsers,
    { loading: loading0, error: error0, data: searchResult },
  ] = useLazyQuery(SEARCH_USERS)
  const { loading: loading1, error: error1, data } = useQuery(LIST_ROLES)
  const {
    loading: loading2,
    error: error2,
    data: reports,
  } = useQuery(LIST_REPORT)
  if (loading0) console.log('Searching')
  if (loading || loading1 || loading2) return <Loading Contained />
  if (error || error0)
    return (
      <Content.Alert type="error" message={'Failed to load Recent Users'} />
    )
  if (error1)
    return <Content.Alert type="error" message={'Failed to load Roles'} />

  if (error2)
    return <Content.Alert type="error" message={'Failed to load Reports'} />

  //Handling Seaarch Results
  const { listUsers: searchListUsers } = searchResult || {}
  const { total: searchTotal } = searchListUsers || {}

  if (searchTotal > 0) users = searchResult

  //Counting Active Users
  let activeUsers = 0
  users.listUsers.data.map(({ enabled }, index) => {
    if (enabled) activeUsers++
    return null
  })

  const { total, data: roleData } = data.listRoles || {}
  let activeCount = 0
  roleData.map(({ activeUserCount }, index) => {
    if (activeUserCount > 0) activeCount++
    return null
  })

  const { listReports } = reports || {}
  const { data: Data, total: totalReports } = listReports || {}
  let recent = 0
  const FiveDaysBeforeToday = new Date(moment().subtract(5, 'days'))
  Data.map(({ createdAt }, index) => {
    if (new Date(parseInt(createdAt)) >= FiveDaysBeforeToday) recent++
    return null
  })

  return (
    <>
      <div
        css={`
          display: grid;
          grid-template-rows: max-content 1fr;
          grid-gap: 20px;
          overflow-y: auto;
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-gap: 20px;
            /* tablet landscape */
            /* @media only screen and (max-height: 1025px) { */
            @media only screen and (max-width: 1025px) {
              /* @media (orientation: portrait) { */
              grid-template-columns: 1fr 1fr 1fr;
              /* } */
              /* } */
            }
          `}
        >
          <Layout.Container>
            <Widget
              admin
              title="Users"
              colour={Colours.green}
              firstTitle="Created"
              firstCount={users.listUsers.total}
              secondTitle="Active"
              secondCount={activeUsers}
            />
          </Layout.Container>
          <Layout.Container>
            <Widget
              admin
              title="Roles"
              colour={Colours.blue}
              firstTitle="Created"
              firstCount={total || 0}
              secondTitle="In-Use"
              secondCount={activeCount || 0}
            />
          </Layout.Container>
          <div
            css={`
              /* tablet landscape */
              /* @media only screen and (max-height: 1025px) { */
              @media only screen and (max-width: 1025px) {
                /* @media (orientation: portrait) { */
                display: none;
                /* } */
                /* } */
              }
            `}
          >
            <Layout.Container>
              <Widget
                admin
                title="Reports"
                colour={Colours.orange}
                firstTitle="Total"
                firstCount={totalReports}
                secondTitle="Recent"
                secondCount={recent}
              />
            </Layout.Container>
          </div>
          <div
            css={`
              display: grid;
              grid-template-rows: 60px 1fr;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 10px;
            `}
          >
            <div
              css={`
                display: grid;
                place-items: center;
                background: ${Colours.foreground};
                border-radius: 10px;
                box-shadow: -1px 6px 9px 3px rgba(213, 213, 213, 0.7);
              `}
            >
              <CustomLabel color={Colours.purple}>Quick Actions</CustomLabel>
            </div>

            <div
              css={`
                height: calc(100% - 20px);
                width: calc(100% - 20px);
                display: grid;
                grid-template-rows: repeat(2, max-content);
                grid-row-gap: 20px;
                padding: 10px;
                justify-items: center;
                margin-top: 20px;
              `}
            >
              <SpecialButton
                purpose="major"
                action={() =>
                  history.push(`/facility/settings/users/create-user`)
                }
              >
                <section
                  css={`
                    font-size: 25px;
                    @media only screen and (min-width: 1440px) {
                      font-size: 35px;
                    }
                  `}
                >
                  <Icons.PersonRoundedIcon
                    style={{
                      fontSize: 'inherit',
                      color: Colours.foreground,
                    }}
                  />
                </section>
                <Label
                  colour={Colours.foreground}
                  fontMax="15px"
                  marginBottom="8px"
                >
                  New User
                </Label>
              </SpecialButton>
              <SpecialButton
                purpose="major"
                action={() =>
                  history.push(`/facility/settings/roles/create-role`)
                }
              >
                <section
                  css={`
                    font-size: 25px;
                    @media only screen and (min-width: 1440px) {
                      font-size: 35px;
                    }
                  `}
                >
                  <Icons.GavelRoundedIcon
                    style={{
                      fontSize: 'inherit',
                      color: Colours.foreground,
                    }}
                  />
                </section>
                <Label
                  colour={Colours.foreground}
                  fontMax="15px"
                  marginBottom="8px"
                >
                  New Role
                </Label>
              </SpecialButton>
              <SpecialButton
                purpose="major"
                action={() =>
                  history.push(`/facility/reports?action=createReport`)
                }
              >
                <section
                  css={`
                    font-size: 25px;
                    @media only screen and (min-width: 1440px) {
                      font-size: 35px;
                    }
                  `}
                >
                  <Icons.AssessmentRoundedIcon
                    style={{
                      fontSize: 'inherit',
                      color: Colours.foreground,
                    }}
                  />
                </section>
                <Label
                  colour={Colours.foreground}
                  fontMax="15px"
                  marginBottom="8px"
                >
                  New Report
                </Label>
              </SpecialButton>
            </div>
          </div>
        </div>
        <UsersTable
          users={users}
          searchHandler={searchUsers}
          loading={loading0}
        />
      </div>

      {(localStorage.getItem('WarningDisplayed') === null ||
        localStorage.getItem('WarningDisplayed') === undefined) &&
        status === 'SUSPENDED' && <ServiceSuspended type="admin" />}
    </>
  )
}

const CustomLabel = ({ customSize, color, children }) => (
  <p
    css={`
      margin: 0px;
      padding: 0px;
      font-size: ${customSize || '25px'};
      color: ${color || Colours.text};
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

      @media only screen and (max-width: 1100px) {
        font-size: 15px;
      }
    `}
  >
    {children}
  </p>
)

export const Label = ({
  children,
  colour,
  weight = 400,
  fontMax = '20px',
  fontMin = '25px',
  clickable,
  Contained,
  marginBottom = '0px',
  ...rest
}) => (
  <p
    {...rest}
    css={`
      margin: 0px;
      padding: 0px;
      font-weight: ${weight};
      font-size: ${fontMax};
      margin-bottom: ${marginBottom};
      /* @media only screen and (min-height: 1025px) {
        font-size: ${fontMin};
      } */

      &:hover {
        cursor: ${clickable ? 'pointer' : 'arror'};
      }
      color: ${colour || Colours.text};
      white-space: ${Contained ? 'nowrap' : 'inherit'};
      overflow: ${Contained ? 'hidden' : 'inherit'};
      text-overflow: ${Contained ? 'ellipsis' : 'inherit'};
    `}
  >
    {children}
  </p>
)

const SpecialButton = ({ action, children, purpose }) => {
  const { status } = useContext(OrganisationContext)
  let disabled = false
  let toolTip = {}
  if (status === 'SUSPENDED' && purpose === 'major') {
    disabled = true
    toolTip = {
      'aria-label': 'Cannot operate while facility is suspended',
      'data-balloon-pos': 'left',
    }
  }

  return (
    <div
      {...toolTip}
      css={`
        width: calc(90% - 20px);
        height: 40px;
        padding: 10px;
        @media only screen and (max-width: 1440px) {
          height: 40px;
          padding: 3px;
          width: calc(100% - 6px);
        }
        display: grid;
        background: ${Colours.purple};
        place-items: center;
        border-radius: 10px;
        box-shadow: 0px 6px 9px -1px rgba(213, 213, 213, 0.7);
        &:hover {
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          box-shadow: 0px 18px 37px -3px rgba(213, 213, 213, 0.7);
          transition: ease-out 0.2s;
          transform: translateY(-2px);
        }
      `}
      onClick={() => {
        if (!disabled) return action ? action() : null
      }}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: 30px max-content;
          grid-column-gap: 20px;
          place-items: Center;
          @media only screen and (max-width: 1440px) {
            grid-column-gap: 10px;
            place-items: Center;
          }
        `}
      >
        {children}
      </div>
    </div>
  )
}
