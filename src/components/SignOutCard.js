import React, { useContext, useRef } from 'react'
import {
  AuthContext,
  UserContext,
  OrganisationContext,
  SessionContext,
} from 'context'
import { useOnClickOutside } from 'hooks'
import { useHistory, useLocation } from 'react-router-dom'
import 'styled-components/macro'
import { Colours, Core, Content } from 'components'
import Rotate from 'react-reveal/Rotate'

function SignOutCard({
  isShowing,
  title = 'Card',
  close = () => {},
  small,
  setShowSignOutCard,
  ...rest
}) {
  const ref = useRef()
  useOnClickOutside(ref, () => {
    setShowSignOutCard(false)
    return null
  })
  const { logout: signout } = useContext(AuthContext)
  const { clearSession } = useContext(SessionContext)
  const { organizations } = JSON.parse(localStorage.getItem('session')) || {}
  //Remove Defaults in the after backend connection
  const {
    loggedInUser: {
      firstName = 'Unknown',
      lastName = 'User',
      avatar = '',
      email = '',
      type = 'Administrator',
    } = {},
  } = useContext(UserContext) || {}
  const { orgName = 'ABC Medical Center' } = useContext(OrganisationContext)

  const { pathname } = useLocation()
  const history = useHistory()

  const path = pathname.split('/')[1].split('/')[0]

  return (
    <div
      css={`
        position: absolute;
        margin-top: 5px;
        right: 0;
        z-index: 1000;
      `}
    >
      <Rotate top right>
        <div
          ref={ref}
          css={`
            position: absolute;
            margin-top: 10px;
            right: 0;
            z-index: 1000;
            display: grid;
            grid-template-rows: repeat(7, max-content);
            justify-items: Center;
            width: 300px;
            padding: 10px;
            grid-row-gap: 5px;
            background: ${Colours.foreground};
            box-shadow: 0px 8px 20px -2px rgba(196, 196, 196, 1);
            border-radius: 5px;
          `}
        >
          <div
            css={`
              width: 100%;
              border-bottom: 1px solid ${Colours.border};
              padding: 0px 0px 10px 0px;
              display: grid;
              justify-items: Center;
            `}
          >
            <Core.Text color={Colours.purple}>{orgName}</Core.Text>
          </div>
          <div
            css={`
              padding: 10px;
              &:hover {
                cursor: pointer;
              }
            `}
            onClick={() => {
              setShowSignOutCard(false)
              history.push(`/${path}/settings/account/profile`)
            }}
          >
            <Content.Avatar
              src={avatar}
              firstName={firstName}
              lastName={lastName}
              size="large+"
            />
          </div>
          <Core.Text
            customSize="14px"
            weight="600"
          >{`${firstName} ${lastName}`}</Core.Text>
          <Core.Text customSize="14px">{email}</Core.Text>
          <Core.Text customSize="14px" color={Colours.purple}>
            {type || 'Administrator'}
          </Core.Text>
          <div
            css={`
              width: calc(100% - 30px);
              padding: 15px;
              border-top: 1px solid ${Colours.border};
              border-bottom: 1px solid ${Colours.border};
              margin-top: 5px;
              margin-bottom: 5px;
              display: grid;
              grid-template-columns: ${organizations.length > 1
                ? '1fr 1fr'
                : '1fr'};
              grid-gap: ${organizations.length > 1 ? '10px' : '0px'};
            `}
          >
            {organizations.length > 1 && (
              <Core.Button
                bgColour={Colours.teal}
                onClick={() => {
                  setShowSignOutCard(false)
                  history.push('?action=switchFacility')
                }}
              >
                Switch Facilities
              </Core.Button>
            )}
            <Core.Button
              onClick={() => {
                setShowSignOutCard(false)
                localStorage.setItem('loggingOut', true)
                signout()
                clearSession()
                history.push('/')
              }}
            >
              Sign Out
            </Core.Button>
          </div>
          <div
            css={`
              width: 100%;
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-column-gap: 10px;
              place-items: center;
              margin-top: 5px;
            `}
          >
            <Core.Text customSize="12px" color={Colours.purple}>
              Privacy Policy
            </Core.Text>
            <Core.Text customSize="12px" color={Colours.purple}>
              Terms of Service
            </Core.Text>
          </div>
        </div>
      </Rotate>
    </div>
  )
}

export default SignOutCard
