import React from 'react'
import 'styled-components/macro'
import { Background, Card, FormCard } from 'components'
import { ForgetPasswordForm } from './forms'

export default function ForgetPassword() {
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
          special
          message={
            "Please enter your email address in the field below, and we will send you an email with a link to reset your password"
          }
        >
          <ForgetPasswordForm />
        </FormCard>
      </Card>
    </div>
  )
}
