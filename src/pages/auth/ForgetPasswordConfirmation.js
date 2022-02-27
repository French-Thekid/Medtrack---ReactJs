import React from 'react'
import 'styled-components/macro'
import { useLocation } from 'react-router-dom'
import { Background, Card, FormCard } from 'components'
import { ForgetPasswordConfirmationForm } from './forms'

export default function ForgetPasswordConfirmation() {
  const location = useLocation()
  const { state: { username, force = false } = {} } = location

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
        <FormCard
          message={
            'Please enter and confirm your new password in order to successfully reset your old password.'
          }
        >
          <ForgetPasswordConfirmationForm force={force} email={username} />
        </FormCard>
      </Card>
    </div>
  )
}
