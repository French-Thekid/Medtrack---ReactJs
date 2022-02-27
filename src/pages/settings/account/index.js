import React, { useContext, useState } from 'react'
import { UserContext } from 'context'
import 'styled-components/macro'
import { useLocation } from 'react-router-dom'
import { Notification } from 'components'
import UserMenuPanel from './UserMenuPanel'
import UserBioGraphyPanel from './BiographyDisplay'
import UserChangePassword from './ChangePassword'
import UserAvailability from './Availability'
import moment from 'moment'

export default function Account() {
  const { pathname } = useLocation()
  const userType = JSON.parse(localStorage.getItem('session'))
  const {
    user: { role },
  } = userType

  const {
    loggedInUser: {
      id,
      firstName = '',
      lastName = '',
      avatar,
      email = '',
      type,
      person,
      doctor = [],
      qualifications = [],
    } = {},
  } = useContext(UserContext) || {}
  const [completedSignature, setcompletedSignature] = useState(false)
  const [completedProfile, setcompletedProfile] = useState(false)
  const [completedPassword, setcompletedPassword] = useState(false)

  const { registrationNumber, yearsOfExperience = 0 } =
    doctor.length > 0 ? doctor[0] : {}

  const { name: qualification, specification } =
    qualifications.length > 0 ? qualifications[0] : {}

  const { dob, aboutMe, gender, title = '', contact } = person || {}

  const { contact_number: phone } = contact || {}

  const user = {
    id,
    avatar,
    title,
    firstName,
    lastName,
    gender,
    dateOfBirth: dob
      ? new Date(moment(parseInt(dob)).add(5, 'hours')).toDateString()
      : '',
    phone,
    regNumber: registrationNumber,
    email,
    roleAssigned: role === 'AdminUser' ? 'Supreme Administrator' : 'Doctor A',
    qualification,
    specifications: specification,
    numOfPatients: '0',
    experience: `${yearsOfExperience === null ? '0' : yearsOfExperience}Yrs`,
    aboutMe,
    type,
    appointments: { assigned: 50, completed: 40 },
  }

  const showNotificationSignature = () => {
    setcompletedSignature(true)
    setTimeout(() => {
      setcompletedSignature(false)
    }, 8000)
  }

  const showNotificationProfile = () => {
    setcompletedProfile(true)
    setTimeout(() => {
      setcompletedProfile(false)
    }, 8000)
  }
  const showNotificationPassword = () => {
    setcompletedPassword(true)
    setTimeout(() => {
      setcompletedPassword(false)
    }, 8000)
  }

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 300px 1fr;
        grid-column-gap: 30px;
        padding: 10px;
        height: calc(100% - 20px);
        @media screen and (max-width: 1025px) {
          grid-template-columns: 1fr;
          overflow-y: auto;
          @media screen and (min-height: 1025px) {
            grid-template-rows: max-content 1fr;
            grid-row-gap: 30px;
          }
        }
        /* Tablets */
        @media screen and (max-width: 1025px) {
          @media screen and (max-height: 769px) {
            @media screen and (orientation: landscape) {
              grid-template-columns: 1fr;
              overflow-y: auto;
            }
          }
        }
        @media screen and (max-width: 769px) {
          @media screen and (max-height: 1025px) {
            @media screen and (orientation: portrait) {
              grid-template-columns: 1fr;
              overflow-y: auto;
            }
          }
        }
        /* Ipod pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              grid-template-columns: 1fr;
              overflow-y: auto;
              grid-template-rows: max-content 1fr;
              grid-row-gap: 30px;
            }
          }
        }
      `}
    >
      <UserMenuPanel user={user} />
      <Notification
        setcompleted={setcompletedSignature}
        message="Your signature has been successfully updated."
        notification={completedSignature}
      />
      <Notification
        setcompleted={setcompletedProfile}
        message="Your profile has been successfully updated."
        notification={completedProfile}
      />
      <Notification
        setcompleted={setcompletedPassword}
        message="Your Password has been successfully updated."
        notification={completedPassword}
      />
      <div
        css={`
          height: 100%;
          overflow: auto;
          /* Tablets */
          @media screen and (max-width: 1025px) {
            @media screen and (max-height: 769px) {
              @media screen and (orientation: landscape) {
                height: ${pathname.includes('changePassword')
                  ? 'calc(100% - 40px)'
                  : '600px'};
                margin-top: 40px;
              }
            }
          }
          @media screen and (max-width: 769px) {
            @media screen and (max-height: 1025px) {
              @media screen and (orientation: portrait) {
                height: 650px;
                margin-top: 40px;
              }
            }
          }
          /* Ipod pro */
          @media (width: 1024px) {
            @media (height: 1366px) {
              @media (orientation: portrait) {
                height: 950px;
                margin-top: 40px;
              }
            }
          }
        `}
      >
        {pathname.includes('profile') && (
          <UserBioGraphyPanel
            user={user}
            type={type}
            showNotificationSignature={showNotificationSignature}
            showNotificationProfile={showNotificationProfile}
          />
        )}
        {pathname.includes('changePassword') && (
          <UserChangePassword
            showNotificationPassword={showNotificationPassword}
          />
        )}
        {pathname.includes('availability') && <UserAvailability />}
      </div>
    </div>
  )
}
