import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import {
  Content,
  Colours,
  Icons,
  Loading,
  Core,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { Menu, Items, Font } from '../subComponents'
import { LIST_EMERGENCY_CONTACT } from '../../../queries'
import { useQuery } from '@apollo/react-hooks'
import EmptyTablePlaceHolder from 'assets/empty.png'
import { OrganisationContext } from 'context'

export default function EmergencyContacts() {
  const { patientPersonId } = JSON.parse(
    localStorage.getItem('selectedPatient')
  )
  const { status: facilityStatus } = useContext(OrganisationContext)

  const ReadPermission = PermissionCheck({
    feature: 'Patient Emergency Contact',
    action: 'READ',
  })
  //Query
  const { loading, error, data } = useQuery(LIST_EMERGENCY_CONTACT, {
    variables: { patientPersonId: parseInt(patientPersonId) },
  })
  if (loading) return <Loading Contained />
  if (error)
    return (
      <Content.Alert type="error" message={'Failed to load EmergencyContact'} />
    )

  const Contacts = data.listEmergencyContacts.data

  return (
    <Content.RecordCard
      title="Emergency Contacts"
      button
      to={'?action=addEmergencyContact'}
    >
      {ReadPermission ? (
        <div
          css={`
            display: grid;
            grid-template-rows: max-content 1fr;
            grid-gap: 20px;
            height: 100%;
          `}
        >
          <div
            css={`
              display: grid;
              grid-template-columns: 1fr 1fr 1fr 2fr 60px;
              grid-gap: 10px;
              justify-items: start;
              padding-bottom: 5px;
              border-bottom: 2px solid ${Colours.border};
            `}
          >
            <Font.Header>Name</Font.Header>
            <Font.Header>Relationship</Font.Header>
            <Font.Header>Contact</Font.Header>
            <Font.Header>Address</Font.Header>
          </div>
          <div
            css={`
              overflow-y: auto;
              height: 100%;
            `}
          >
            {Contacts.length === 0 ? (
              <div
                css={`
                  width: 100%;
                  height: 100%;
                  display: grid;
                  place-items: Center;
                `}
              >
                <div
                  css={`
                    display: grid;
                    grid-template-rows: max-content max-content;
                    width: max-content;
                    height: max-content;
                    justify-items: Center;
                  `}
                >
                  <img
                    src={EmptyTablePlaceHolder}
                    alt="placeholder"
                    height="120px"
                    css={`
                      @media (min-width: 767px) {
                        height: 150px;
                      }
                    `}
                  />
                  <Core.Text
                    weight="600"
                    customSize="20px"
                    color={Colours.purple}
                  >
                    No Emergency Contacts Yet
                  </Core.Text>
                </div>
              </div>
            ) : (
              Contacts.map(({ id, relationship, emergencyPerson }, index) => {
                const { firstName, lastName, email, contact, address } =
                  emergencyPerson || {}
                const { contact_number: phone } = contact || {}
                const { streetName } = address || {}
                return (
                  <Row
                    key={index}
                    id={id}
                    relationship={relationship}
                    name={`${firstName} ${lastName}`}
                    Contact={phone}
                    Address={streetName}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    facilityStatus={facilityStatus}
                  />
                )
              })
            )}
          </div>
        </div>
      ) : (
        <RestrictedAccess small tiny />
      )}
    </Content.RecordCard>
  )
}

const Row = ({
  id,
  name,
  relationship,
  Contact,
  Address,
  firstName,
  lastName,
  email,
  facilityStatus,
  ...rest
}) => {
  const [showOptions, setShowOption] = useState(false)

  return (
    <div
      {...rest}
      css={`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 2fr 60px;
        grid-gap: 10px;
        padding: 10px 0px;
        justify-items: start;
        border-bottom: 1px solid ${Colours.border};
        &:hover {
          background: ${Colours.menuHover};
        }
        position: relative;
      `}
    >
      <Font.Value>{name}</Font.Value>
      <Font.Value>{relationship}</Font.Value>
      <Font.Value>{Contact}</Font.Value>
      <Font.Value>{Address}</Font.Value>
      <div
        css={`
          color: ${Colours.icon};
          &:hover {
            cursor: ${facilityStatus === 'SUSPENDED'
              ? 'not-allowed'
              : 'pointer'};
            color: ${Colours.purple};
          }
        `}
        onClick={() => {
          if (facilityStatus !== 'SUSPENDED') setShowOption(!showOptions)
        }}
      >
        <Icons.MoreHorizRoundedIcon
          style={{ color: 'inherit', fontSize: '25px' }}
        />
      </div>
      {showOptions && (
        <Menu setShowOption={setShowOption}>
          <Items
            to={`?action=updateEmergencyContact&id=${id}`}
            Icon={Icons.EditRoundedIcon}
            label="Edit"
            setShowOption={setShowOption}
            action={() =>
              localStorage.setItem(
                'selectedContact',
                JSON.stringify({
                  relationship,
                  id,
                  firstName,
                  lastName,
                  email,
                  streetName: Address,
                  contact_number: Contact,
                })
              )
            }
          />
          <Items
            to={`?action=deleteEmergencyContact&id=${id}`}
            Icon={Icons.DeleteRoundedIcon}
            label="Delete"
            setShowOption={setShowOption}
          />
        </Menu>
      )}
    </div>
  )
}
