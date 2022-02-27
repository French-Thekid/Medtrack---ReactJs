import React, { useContext } from 'react'
import 'styled-components/macro'
import { Background, Card, FormCard } from 'components'
import { SignInForm } from './forms'
import { AuthContext, SessionContext } from '../../context'
import { useHistory, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import {
  ForcePasswordResetModal,
  MultipleMedicalFacilityModal,
  DisassociatedModal,
} from './modals'

export default function SignIn() {
  const {
    showForcePasswordResetModal,
    showMultipleAccess,
    setShowMultipleAccess,
    showDisassociatedModal,
  } = useContext(AuthContext)
  RoleRouting(setShowMultipleAccess)

  localStorage.removeItem('WarningDisplayed')


  return (
    <div
      css={`
        width: 100vw;
        height: 100vh;
        display: grid;
        place-items: center;
      `}
    >
      <Background />
      <Card>
        <FormCard>
          <SignInForm />
        </FormCard>
        {showDisassociatedModal && <DisassociatedModal />}
        {showForcePasswordResetModal && <ForcePasswordResetModal />}
        {showMultipleAccess && <MultipleMedicalFacilityModal />}
      </Card>
    </div>
  )
}

function RoleRouting(setShowMultipleAccess) {
  const history = useHistory()
  const { pathname } = useLocation()
  const { hasValidSession, user } = useContext(SessionContext)
  const {
    isForcePasswordResetReq: { status, username },
  } = useContext(AuthContext)
  const [{ isNewUser }] = useCookies(['isNewUser'])

  if (
    hasValidSession &&
    (user.role === 'RegularUser' || user.role === 'AdminUser')
  ) {
    const { organizations = [] } =
      JSON.parse(localStorage.getItem('session')) || {}
    if (
      organizations.length > 1 &&
      pathname === '/' &&
      (localStorage.getItem('loggingOut') === undefined ||
        localStorage.getItem('loggingOut') === null)
    ) {
      setShowMultipleAccess(true)
    } else {
      if (organizations[0] !== undefined)
        localStorage.setItem('ActiveOrg', JSON.stringify(organizations[0]))
      history.push('/facility/dashboard')
    }
  } else if (status === true)
    history.push('/forget-password-confirmation', { username, force: true })
  else if (isNewUser) history.push('/new-password')
  else if (hasValidSession && user.role === 'SupportAdmin')
    history.push('/support/facilities')
}
