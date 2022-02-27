import React, { useContext } from 'react'
import 'styled-components/macro'
import { Background, Card, FormCard } from 'components'
import { NewPasswordForm } from './forms'
import { useHistory } from 'react-router-dom'
import { SessionContext } from '../../context'

export default function NewPassword() {
  const history = useHistory()
  const { user, hasValidSesion } = useContext(SessionContext)
  if (
    hasValidSesion &&
    (user.role === 'AdminUser' || user.role === 'RegularUser')
  )
    history.push('/broker/home')
  else if (hasValidSesion && user.role === 'SupportAdmin')
    history.push('/support/organisation')
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
        <FormCard message={'Please create a new password to continue.'}>
          <NewPasswordForm />
        </FormCard>
      </Card>
    </div>
  )
}
