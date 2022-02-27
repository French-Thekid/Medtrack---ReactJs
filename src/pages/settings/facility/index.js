import React from 'react'
import 'styled-components/macro'

import { EditFacilityModal } from './modal'
import { Colours, Content, Loading, Core, Icons } from 'components'
import { useLocation, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_ORGANIZATION } from 'context/query'

const queryString = require('query-string')

export default function Facility() {
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  //Query
  const { loading, error, data } = useQuery(GET_ORGANIZATION, {
    variables: { id: '' },
  })
  if (loading) return <Loading />
  if (error) return <Content.Alert type="error" message={error.message} />

  const {
    name,
    logoUrl,
    organizationId,
    organisationEmail,
    taxId,
    location: { streetNumber, streetName, province, city, country } = {},
    adminContact = {},
    billingContact = {},
    technicalContact = {},
  } = data.readFacility || {}

  return (
    <div
      css={`
        display: grid;
        place-items: Center;
      `}
    >
      {action === 'editFacility' && (
        <EditFacilityModal initialOrganisation={data.readFacility || {}} />
      )}
      <div
        css={`
          display: grid;
          grid-template-rows: 1fr max-content;
          grid-gap: 20px;
          height: 100%;
          width: 100%;
          max-width: 1300px;
        `}
      >
        <DetailContainer
          name={name}
          logoUrl={logoUrl}
          organisationId={organizationId}
          organisationEmail={organisationEmail}
          taxId={taxId}
          streetNumber={streetNumber}
          streetName={streetName}
          province={province}
          city={city}
          country={country}
        />
        <div
          css={`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 20px;

            @media only screen and (max-width: 940px) {
              grid-template-columns: repeat(2, 1fr);
            }
          `}
        >
          <UserCard
            name={`${adminContact.firstName} ${adminContact.lastName}`}
            email={adminContact.email}
            phone={adminContact.phone}
            position="Administrator Contact"
          />
          <UserCard
            name={`${billingContact.firstName} ${billingContact.lastName}`}
            email={billingContact.email}
            phone={billingContact.phone}
            position="Billing Contact"
          />
          <UserCard
            name={`${technicalContact.firstName} ${technicalContact.lastName}`}
            email={technicalContact.email}
            phone={technicalContact.phone}
            position="Technical Contact"
          />
        </div>
      </div>
    </div>
  )
}

const UserCard = ({ name, phone, position, email }) => {
  return (
    <div
      css={`
        border: 1px solid ${Colours.border};
        display: grid;
        align-items: center;
        border-radius: 5px;
        height: calc(100% - 2px);
        width: calc(100% - 2px);
      `}
    >
      <div
        css={`
          border-radius: 5px;
          display: grid;
          place-items: center;
          grid-template-rows: 1fr max-content;
          grid-row-gap: 0px;
          height: 100%;
        `}
      >
        <div
          css={`
            display: grid;
            justify-items: center;
            width: calc(100% - 20px);
            padding: 10px;
            grid-gap: 5px;

            align-items: Center;
            @media screen and (min-width: 1440px) {
              height: calc(70% - 20px);
            }
          `}
        >
          <div
            css={`
              height: 100px;
              width: 100px;
              border-radius: 50%;
              box-shadow: 0px 0px 30px 0px rgba(242, 242, 242, 1);
              background: rgb(149, 116, 240);
              background: linear-gradient(
                180deg,
                rgba(149, 116, 240, 1) 0%,
                rgba(138, 120, 199, 1) 47%,
                rgba(59, 37, 129, 1) 100%
              );
              color: #fff;
              display: grid;
              place-items: center;
              margin-bottom: 10px;
            `}
          >
            <Icons.PersonRoundedIcon style={{ fontSize: '70px' }} />
          </div>
          <Core.Text weight="500" size="md">
            {name}
          </Core.Text>
          <Core.Text color={Colours.textGrey}>{email}</Core.Text>
          <Core.Text color={Colours.teal}>{phone}</Core.Text>
        </div>
        <div
          css={`
            height: 40px;
            width: 100%;
            border-top: 1px solid ${Colours.border};
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            display: grid;
            place-items: center;
            background: rgb(255, 255, 255);
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 1) 0%,
              rgba(245, 242, 255, 1) 100%
            );
            @media screen and (min-width: 1440px) {
              height: 50px;
            }
          `}
        >
          <Core.Text color={Colours.purple}>{position}</Core.Text>
        </div>
      </div>
    </div>
  )
}

const DetailContainer = ({
  name,
  logoUrl,
  streetNumber,
  streetName,
  province,
  city,
  country,
  organisationId,
  organisationEmail,
  taxId,
}) => {
  const history = useHistory()
  return (
    <div
      css={`
        border: 1px solid ${Colours.border};
        display: grid;
        align-items: center;
        border-radius: 5px;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: max-content 1fr max-content;
          grid-column-gap: 20px;
          padding: 10px;
          align-items: center;
        `}
      >
        <div
          css={`
            @media only screen and (max-width: 940px) {
              display: none;
            }
          `}
        >
          <Content.Avatar
            src={logoUrl}
            size="xxl"
            firstName={name}
            lastName={name.split(' ')[1] || 'M'}
          />
        </div>
        <div
          css={`
            @media only screen and (min-width: 940px) {
              display: none;
            }
            @media only screen and (max-width: 940px) {
              display: visible;
            }
          `}
        >
          <Content.Avatar
            src={logoUrl}
            size="bbw"
            firstName={name}
            lastName={name.split(' ')[1] || 'M'}
          />
        </div>
        <div
          css={`
            display: grid;
            grid-template-rows: repeat(4, max-content);
            grid-row-gap: 10px;
            border-left: 1px solid ${Colours.border};
            padding-left: 20px;
            height: calc(100% - 30px);
            padding-top: 30px;
          `}
        >
          <Core.Text weight="500" customSize="40px">
            {name}
          </Core.Text>
          <div
            css={`
              display: grid;
              grid-template-columns: max-content 1fr;
              grid-gap: 10px;
            `}
          >
            <Core.Text color={Colours.textGrey}>Facility ID:</Core.Text>
            <Core.Text>{organisationId}</Core.Text>
            <Core.Text color={Colours.textGrey}>Facility Email:</Core.Text>
            <Core.Text>{organisationEmail}</Core.Text>
            <Core.Text color={Colours.textGrey}>Facility Tax-ID:</Core.Text>
            <Core.Text>{taxId}</Core.Text>
          </div>
          <Core.Text color={Colours.purple}>
            {`${
              streetNumber ? streetNumber : ''
            } ${streetName}, ${city}, ${province}, ${country}`}
          </Core.Text>
        </div>
        <div
          css={`
            height: 100%;
            display: grid;
            align-items: start;
            padding-top: 70px;
          `}
        >
          <div
            css={`
              @media only screen and (min-width: 940px) {
                display: none;
              }
              color: ${Colours.purple};
              border-radius: 5px;
              padding: 5px;
              border: 1px solid ${Colours.purple};
              width: max-content;
              &:hover {
                cursor: pointer;
              }
            `}
            onClick={() => history.push('?action=editFacility')}
          >
            <Icons.EditRoundedIcon style={{ color: 'inherit' }} />
          </div>
          <div
            css={`
              @media only screen and (max-width: 940px) {
                display: none;
              }
            `}
          >
            <Core.Button
              purpose="major"
              width="150px"
              onClick={() => history.push('?action=editFacility')}
            >
              Edit Details
            </Core.Button>
          </div>
        </div>
      </div>
    </div>
  )
}
