import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, Colours, Icons, Core } from 'components'
import { useHistory } from 'react-router-dom'

export default function ViewFacility() {
  const { Dialog } = useDialog()
  const history = useHistory()

  const Organisation = JSON.parse(localStorage.getItem('selectedOrg'))

  const {
    name = '',
    logoUrl,
    organizationId,
    organisationEmail,
    taxId,
    location: { streetNumber, streetName, province, city, country } = {},
    adminContact = {},
    billingContact = {},
    technicalContact = {},
  } = Organisation || {}

  return (
    <Layout.Container>
      <Dialog open={true}>
        <Content.CustomCard
          title="View Facility"
          close={() => {
            history.goBack()
            localStorage.removeItem('selectedOrg')
          }}
          minWidth="500px"
        >
          <ViewContainer>
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
            <CardContainer>
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
            </CardContainer>
          </ViewContainer>
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}

const ViewContainer = ({ children }) => (
  <div
    css={`
      display: grid;
      grid-template-rows: repeat(2, max-content);
      grid-row-gap: 20px;
    `}
  >
    {children}
  </div>
)

const CardContainer = ({ children }) => (
  <div
    css={`
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 20px;
    `}
  >
    {children}
  </div>
)

const UserCard = ({ name, phone, position, email }) => {
  return (
    <div
      css={`
        height: 100%;
        width: 100%;
        border: 1px solid ${Colours.border};
        border-radius: 5px;
        display: grid;
        justify-items: center;
        grid-template-rows: 1fr 40px;
        grid-row-gap: 10px;
      `}
    >
      <div
        css={`
          display: grid;
          justify-items: center;
          width: calc(100% - 20px);
          padding: 10px;
          grid-gap: 5px;
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
          width: 100%;
          border-top: 1px solid ${Colours.border};
          display: grid;
          place-items: center;
          background: rgb(255, 255, 255);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(245, 242, 255, 1) 100%
          );
        `}
      >
        <Core.Text color={Colours.purple}>{position}</Core.Text>
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
}) => (
  <div
    css={`
      display: grid;
      grid-template-columns: max-content 1fr;
      grid-column-gap: 20px;
      padding: 10px;
      border: 1px solid ${Colours.border};
      border-radius: 5px;
    `}
  >
    <Content.Avatar
      src={logoUrl}
      size="bbw"
      firstName={name}
      lastName={name ? name.split(' ')[1] || name.split('')[1] : 'M'}
    />
    <div
      css={`
        display: grid;
        grid-template-rows: repeat(4, max-content);
        grid-row-gap: 10px;
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
  </div>
)
