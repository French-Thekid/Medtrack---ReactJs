import React, { useContext } from 'react'
import 'styled-components/macro'

import { Colours, Core, Icons, Layout } from 'components'
import { useHistory } from 'react-router-dom'
import { OrganisationContext } from 'context'

export default function EmergencycontactCard({ Contact, ...rest }) {
  let { relationship, emergencyPerson, id } = Contact || {}
  const { firstName, lastName, email, address, contact } = emergencyPerson || {}
  const { streetName } = address || {}
  const { contact_number } = contact || {}
  const { status } = useContext(OrganisationContext)

  const history = useHistory()

  return (
    <div
      {...rest}
      css={`
        border: 1px solid ${Colours.border};
        height: 280px;
        border-radius: 5px;
        display: grid;
        grid-template-rows: 50px 1fr;
        &:hover {
          box-shadow: 0px 8px 20px -2px rgba(196, 196, 196, 1);
          transition: ease-out 0.2s;
          transform: translateY(-1px);
        }
      `}
    >
      <div
        css={`
          background: #f8f8fc;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          border-bottom: 0.5px solid ${Colours.border};
          display: grid;
          grid-template-columns: 1fr max-content max-content;
          align-items: center;
          padding: 10px;
          grid-gap: 10px;
        `}
      >
        <Core.Text customSize="20px">
          {relationship || 'Relationship Not Specified'}
        </Core.Text>
        <div
          css={`
            border: 1px solid ${Colours.border};
            border-radius: 5px;
            padding: 3px 8px;
            &:hover {
              border: 1px solid ${Colours.purple};
              cursor: ${status === 'SUSPENDED' ? 'not-allowed' : 'pointer'};
              transition: ease-out 0.2s;
              transform: translateY(-1px);
            }
          `}
          onClick={async () => {
            if (status !== 'SUSPENDED') {
              localStorage.setItem(
                'selectedContact',
                JSON.stringify({
                  relationship,
                  id,
                  firstName,
                  lastName,
                  email,
                  streetName,
                  contact_number,
                })
              )
              history.push(`?action=updateEmergencyContact&id=${id}`)
            }
          }}
        >
          <Icons.EditRoundedIcon
            style={{
              fontSize: '20px',
              padding: '0px',
              margin: '0px',
              color: Colours.purple,
            }}
          />
        </div>
        <div
          css={`
            border: 1px solid ${Colours.border};
            border-radius: 5px;
            padding: 3px 8px;
            &:hover {
              border: 1px solid ${Colours.red};
              cursor: ${status === 'SUSPENDED' ? 'not-allowed' : 'pointer'};
              transition: ease-out 0.2s;
              transform: translateY(-1px);
            }
          `}
          onClick={async () => {
            if (status !== 'SUSPENDED')
              history.push(`?action=deleteEmergencyContact&id=${id}`)
          }}
        >
          <Icons.DeleteRoundedIcon
            style={{
              fontSize: '20px',
              padding: '0px',
              margin: '0px',
              color: Colours.red,
            }}
          />
        </div>
      </div>
      <div
        css={`
          padding: 10px;
          display: grid;
          grid-template-rows: max-content max-content;
        `}
      >
        <div
          css={`
            padding: 10px;
            display: grid;
            grid-template-rows: 1fr max-content;
            grid-gap: 10px;
            height: 130px;
          `}
        >
          <div
            css={`
              display: grid;
              grid-template-columns: 1fr 1fr;
            `}
          >
            <Layout.DataDisplay noLine label="First Name" value={firstName} />
            <Layout.DataDisplay noLine label="Last Name" value={lastName} />
          </div>
          <Layout.DataDisplay
            noLine
            overflow
            label="Address"
            value={streetName}
          />
        </div>
        <div
          css={`
            border-top: 1px solid ${Colours.border};
            padding: 10px;
            display: grid;
            grid-template-rows: 1fr 1fr;
          `}
        >
          <div
            css={`
              display: grid;
              grid-template-columns: 40px 1fr;
            `}
          >
            <Icons.PhoneRoundedIcon style={{ color: Colours.purple }} />
            <Core.Text color={Colours.purple}>
              {contact_number || 'None Provided'}
            </Core.Text>
          </div>
          <div
            css={`
              display: grid;
              grid-template-columns: 40px 1fr;
            `}
          >
            <Icons.EmailRoundedIcon style={{ color: Colours.purple }} />
            <Core.Text color={Colours.purple}>
              {email || 'None Provided'}
            </Core.Text>
          </div>
        </div>
      </div>
    </div>
  )
}
