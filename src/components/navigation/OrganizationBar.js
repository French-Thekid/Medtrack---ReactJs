import React, { useContext } from 'react'
import { OrganisationContext } from 'context'
import 'styled-components/macro'
import { Content, Core } from 'components'
import Colours from 'components/Colours'

export default function OrganisationBar() {
  const userType = JSON.parse(localStorage.getItem('session'))
  const { user: { role = null } = {} } = userType || {}

  const {
    logoUrl,
    status,
    orgName = 'ABC Medical Center',
  } = useContext(OrganisationContext)

  return (
    <div
      css={`
        display: grid;
        place-items: center;
        height: 156px;
        padding: ${role === 'AdminUser' ? '5px 10px' : '10px'};
        width: calc(100% - 20px);
        background: rgb(253, 252, 255);
        background: linear-gradient(
          180deg,
          rgba(253, 252, 255, 1) 0%,
          rgba(225, 216, 254, 1) 100%
        );
        box-shadow: 0px 4px 14px -8px rgba(0, 0, 0, 1);
        border-radius: 26px;
        grid-template-rows: repeat(2, max-content);
        grid-row-gap: 10px;
        @media screen and (max-width: 1440px) {
          height: ${role === 'AdminUser' ? '100px' : '130px'};
          grid-template-rows: ${role === 'AdminUser'
            ? '1fr'
            : 'repeat(2, max-content)'};
          grid-template-columns: ${role === 'AdminUser'
            ? 'max-content 1fr'
            : '1fr'};
        }
      `}
    >
      <Content.Avatar
        size="medium+"
        src={logoUrl}
        firstName={orgName || 'Loading'}
        lastName={orgName ? orgName.split(' ')[1] || orgName.split('')[1] : 'M'}
        responsiveLogo
      />
      <div
        css={`
          width: 100%;
          display: grid;
          place-items: Center;
        `}
      >
        <div
          css={`
            width: 180px;
            @media screen and (max-width: 1440px) {
              width: ${role === 'AdminUser' ? '125px' : '140px'};
            }
          `}
        >
          <Core.Text Contained align="center">
            {orgName}
          </Core.Text>
        </div>
        <StatusContainer status={status === null ? 'ACTIVE' : status} />
      </div>
    </div>
  )
}

const StatusContainer = ({ status }) => (
  <div
    css={`
      height: 30px;
      width: 100%;
      background: ${status === 'ACTIVE' ? Colours.green : Colours.red};
      border-radius: 25px;
      display: grid;
      place-items: center;
      margin-top: 5px;
      @media screen and (max-width: 1440px) {
        height: max-content;
        padding: 0px 10px;
        width: 80%;
      }
    `}
  >
    <Core.Text
      color={Colours.foreground}
      overrideCustomSize="15px"
      screen="1440px"
      customSize="15px"
    >
      {status}
    </Core.Text>
  </div>
)
