import React, { useContext } from 'react'
import { UserContext } from 'context'
import 'styled-components/macro'
import { Core, Colours, Loading, Content } from 'components'
import { useHistory, useLocation } from 'react-router-dom'
import { EditAccount, ManageSignature } from './modals'
import { useQuery } from '@apollo/react-hooks'
import { GET_PATIENTS } from './queries'

const queryString = require('query-string')

export default function AccountBiography({
  user,
  type,
  showNotificationSignature,
  showNotificationProfile,
}) {
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const history = useHistory()
  const { loggedInUser: { doctor = [] } = {} } = useContext(UserContext) || {}
  const { id: doctorId = 0 } = doctor.length > 0 ? doctor[0] : {}
  const userType = JSON.parse(localStorage.getItem('session'))
  const {
    user: { role },
  } = userType

  const {
    firstName,
    title,
    lastName,
    gender,
    dateOfBirth,
    phone,
    regNumber,
    email,
    roleAssigned,
    qualification,
    specifications,
    aboutMe,
    experience,
  } = user || {}

  //Query
  const { loading, error, data } = useQuery(GET_PATIENTS, {
    variables: { id: parseInt(doctorId) },
  })

  if (loading) return <Loading Contained />
  if (error)
    return (
      <Content.Alert
        type="error"
        message={'Failed to retrieve total patients'}
      />
    )

  const { getTotalPatients } = data || {}
  const { totalInternal } = getTotalPatients || {}

  return (
    <div
      css={`
        width: 100%;
        height: calc(100% - 2px);
        display: grid;
        grid-template-rows: 50px 1fr;
        grid-row-gap: 10px;
      `}
    >
      {action === 'editAccount' && (
        <EditAccount showNotificationProfile={showNotificationProfile} />
      )}
      {action === 'uploadSignature' && (
        <ManageSignature
          doctorId={user.id}
          showNotificationSignature={showNotificationSignature}
        />
      )}
      <div
        css={`
          display: grid;
          grid-template-columns: ${type === 'Doctor'
            ? '1fr max-content max-content'
            : '1fr max-content'};
          align-items: center;
          grid-gap: 10px;
        `}
      >
        <Core.Text customSize="25px">User Profile</Core.Text>
        {type === 'Doctor' && (
          <Core.Button
            purpose="major"
            float={gender === null || gender === ''}
            width="150px"
            onClick={() => history.push(`?action=uploadSignature`)}
          >
            Manage Signature
          </Core.Button>
        )}
        <Core.Button
          purpose="major"
          float={gender === null || gender === ''}
          width="150px"
          onClick={() => history.push(`?action=editAccount`)}
        >
          Edit My Profile
        </Core.Button>
      </div>
      <div
        css={`
          background: rgb(255, 255, 255);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(245, 242, 255, 1) 100%
          );
          box-shadow: 0px 8px 20px -10px rgba(210, 210, 210, 1);
          border: 1px solid ${Colours.border};
          border-radius: 5px;
          display: grid;
          grid-template-rows: repeat(3, max-content) 1fr max-content;
          padding: 10px;
          height: calc(100% - 20px);
          overflow-y: auto;
        `}
      >
        {role === 'AdminUser' ? (
          <Container cols={3} bottom="30px">
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Title
              </Core.Text>
              <Core.Text customSize="18px">{title}</Core.Text>
            </TextPair>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                First Name
              </Core.Text>
              <Core.Text customSize="18px">{firstName}</Core.Text>
            </TextPair>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Last Name
              </Core.Text>
              <Core.Text customSize="18px">{lastName}</Core.Text>
            </TextPair>
          </Container>
        ) : (
          <Container cols={3}>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Name
              </Core.Text>
              <Core.Text customSize="18px">{`${
                title || ''
              } ${firstName} ${lastName}`}</Core.Text>
            </TextPair>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Date Of Birth
              </Core.Text>
              <Core.Text customSize="18px">{dateOfBirth}</Core.Text>
            </TextPair>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Gender
              </Core.Text>
              <Core.Text customSize="18px">{gender}</Core.Text>
            </TextPair>
          </Container>
        )}
        {role === 'AdminUser' ? (
          <Container cols={3} bottom="30px">
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Date Of Birth
              </Core.Text>
              <Core.Text customSize="18px">{dateOfBirth}</Core.Text>
            </TextPair>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Gender
              </Core.Text>
              <Core.Text customSize="18px">{gender}</Core.Text>
            </TextPair>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Phone
              </Core.Text>
              <Core.Text customSize="18px">{phone}</Core.Text>
            </TextPair>
          </Container>
        ) : (
          <Container cols={3}>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Phone
              </Core.Text>
              <Core.Text customSize="18px">{phone}</Core.Text>
            </TextPair>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Registration ID
              </Core.Text>
              <Core.Text customSize="18px" color={Colours.purple}>
                {regNumber}
              </Core.Text>
            </TextPair>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Email Address
              </Core.Text>
              <Core.Text customSize="18px">{email}</Core.Text>
            </TextPair>
          </Container>
        )}
        {role === 'AdminUser' ? (
          <Container cols={3}>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Email Address
              </Core.Text>
              <Core.Text customSize="18px">{email}</Core.Text>
            </TextPair>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Role Assigned
              </Core.Text>
              <Core.Text customSize="18px">{roleAssigned}</Core.Text>
            </TextPair>
          </Container>
        ) : (
          <Container cols={3}>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Role Assigned
              </Core.Text>
              <Core.Text customSize="18px">{roleAssigned}</Core.Text>
            </TextPair>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Qualifications
              </Core.Text>
              <Core.Text customSize="18px">{qualification}</Core.Text>
            </TextPair>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                Specifications
              </Core.Text>
              <Core.Text customSize="18px">{specifications}</Core.Text>
            </TextPair>
          </Container>
        )}
        {role !== 'AdminUser' && (
          <Container cols={1} constraintHeight>
            <TextPair>
              <Core.Text customSize="18px" color={Colours.textGrey}>
                About Me
              </Core.Text>
              <div
                css={`
                  height: 100%;
                  overflow: auto;
                `}
              >
                <Core.Text customSize="18px">{aboutMe}</Core.Text>
              </div>
            </TextPair>
          </Container>
        )}
        {role !== 'AdminUser' && (
          <div
            css={`
              display: grid;
              grid-template-columns: repeat(2, max-content);
              grid-column-gap: 30px;
              margin-top: 10px;
            `}
          >
            <Card
              title="Patients"
              value={totalInternal}
              color={Colours.green}
            />
            <Card
              title="Experience"
              value={experience || experience !== null ? experience : '0'}
              color={Colours.orange}
            />
          </div>
        )}
      </div>
    </div>
  )
}

const Card = ({ title, value, color }) => (
  <div
    css={`
      background: #fff;
      border-radius: 5px;
      padding: 5px 10px;
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      display: grid;
      place-items: center;
      box-shadow: 0px 8px 20px -9px rgba(186, 186, 186, 1);
      @media screen and (min-width: 1440px) {
        padding: 20px;
        width: calc(100% - 40px);
        height: calc(100% - 40px);
      }
      /* Ipod Pro */
      @media (width: 1366px) {
        @media (height: 1024px) {
          @media (orientation: landscape) {
            padding: 20px;
            width: calc(100% - 40px);
            height: calc(100% - 40px);
          }
        }
      }
      @media (width: 1024px) {
        @media (height: 1366px) {
          @media (orientation: portrait) {
            padding: 20px;
            width: calc(100% - 40px);
            height: calc(100% - 40px);
          }
        }
      }
    `}
  >
    <Font initSize={14}>{title}</Font>
    <Font initSize={18} color={color}>
      {value}
    </Font>
  </div>
)

const Container = ({
  bottom = 0,
  custom,
  cols,
  constraintHeight,
  children,
}) => (
  <div
    css={`
      margin-bottom: ${bottom};
      display: grid;
      grid-template-columns: ${custom ? custom : `repeat(${cols}, 1fr)`};
      grid-column-gap: 10px;
      border-bottom: 1px solid ${Colours.border};
      padding: 15px;
      width: calc(100% - 30px);
      height: calc(100% - 30px);
      overflow-y: ${constraintHeight ? 'auto' : 'inherit'};
    `}
  >
    {children}
  </div>
)

const TextPair = ({ children }) => (
  <div
    css={`
      display: grid;
      grid-template-rows: max-content 1fr;
      grid-row-gap: 10px;
      height: 100%;
      overflow: auto;
    `}
  >
    {children}
  </div>
)

const Font = ({ initSize = 12, color = Colours.text, children }) => (
  <p
    css={`
      margin: 0px;
      padding: 0px;
      font-size: ${initSize}px;
      color: ${color};
      @media screen and (min-width: 1440px) {
        font-size: ${initSize === 18 ? initSize + 20 : initSize + 10}px;
      }
      /* Ipod Pro */
      @media (width: 1366px) {
        @media (height: 1024px) {
          @media (orientation: landscape) {
            font-size: ${initSize === 18 ? initSize + 20 : initSize + 10}px;
          }
        }
      }
      @media (width: 1024px) {
        @media (height: 1366px) {
          @media (orientation: portrait) {
            font-size: ${initSize === 18 ? initSize + 20 : initSize + 10}px;
          }
        }
      }
    `}
  >
    {children}
  </p>
)
