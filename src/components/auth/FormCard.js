import React from 'react'
import 'styled-components/macro'
import { Colours, Core } from 'components'

export default function FormCard({
  children,
  message = ' Welcome, please login to your account.',
}) {
  const LogoText = () => (
    <section
      css={`
        display: grid;
        grid-template-columns: repeat(2, max-content);
      `}
    >
      <Core.Text size="xl" color={Colours.grey} weight="600">
        Med
      </Core.Text>
      <Core.Text size="xl" color={Colours.purple} weight="600">
        Track
      </Core.Text>
    </section>
  )
  return (
    <div
      css={`
        margin: 0 auto;
        width: calc(85% - 80px);
        height: calc(90% - 40px);
        max-width: 400px;
        min-width: 300px;
        max-height: 600px;
        border-radius: 10px;
        background: ${Colours.foreground};
        box-shadow: 0px 7px 15px 0px rgba(217, 208, 243, 1);
        padding: 20px 40px;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-rows: 130px 40px 1fr;
        @media only screen and (min-height: 1025px) {
          grid-template-rows: 120px 40px 1fr;
          width: calc(60% - 80px);
          height: calc(80% - 40px);
        }
        /* Ipod Pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              width: calc(100% - 80px);
              height: calc(70% - 40px);
            }
          }
        }
        /* half screen */
        @media only screen and (max-width: 690px) {
          grid-template-rows: 80px 40px 1fr;
        }
      `}
    >
      <div>
        <LogoText />
      </div>
      <div>
        <Core.Text align="Center" weight="550" customSize="16px">
          {message}
        </Core.Text>
      </div>
      <div
        css={`
          width: 100%;
        `}
      >
        {children}
      </div>
    </div>
  )
}
