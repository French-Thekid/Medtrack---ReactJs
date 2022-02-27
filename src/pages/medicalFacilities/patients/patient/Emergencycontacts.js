import React from 'react'
import 'styled-components/macro'
import { LIST_EMERGENCY_CONTACT } from '../queries'
import { useQuery } from '@apollo/react-hooks'
import {
  Core,
  Colours,
  Content,
  Loading,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { useHistory } from 'react-router-dom'

export default function EmergencContacts() {
  const { patientPersonId } =
    JSON.parse(localStorage.getItem('selectedPatient')) || {}

  const history = useHistory()
  const permission = PermissionCheck({
    feature: 'Patient Emergency Contact',
    action: 'READ',
  })
  //Query
  const { loading, error, data } = useQuery(LIST_EMERGENCY_CONTACT, {
    variables: { patientPersonId: parseInt(patientPersonId) },
  })
  if (loading) return <Loading Contained small />
  if (error)
    return (
      <Content.Alert type="error" message={'Failed to load EmergencyContact'} />
    )

  const { listEmergencyContacts } = data || {}
  const { data: result } = listEmergencyContacts || {}
  const Contacts = result || []

  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content 1fr;
        min-height: 300px;
        grid-gap: 20px;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 150px;
          padding-bottom: 5px;
          align-items: center;
          border-bottom: 1px solid ${Colours.border};
        `}
      >
        <Core.Text customSize="18px" weight="400">
          Emergency Contact
        </Core.Text>
        <Core.Button
          purpose="major"
          onClick={() => history.push(`?action=newEmergencyContact`)}
        >
          Add New
        </Core.Button>
      </div>
      {permission ? (
        <div
          css={`
            min-height: 300px;
            height: 300px;
            overflow-y: auto;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 20px;
            @media (max-width: 769px) {
              grid-template-columns: repeat(2, 1fr);
            }
            @media only screen and (max-height: 769px) {
              @media only screen and (max-width: 1025px) {
                @media (orientation: landscape) {
                  grid-template-columns: repeat(2, 1fr);
                }
              }
            }
            /* Ipod pro */
            @media (width: 1024px) {
              @media (height: 1366px) {
                @media (orientation: portrait) {
                  grid-template-columns: repeat(2, 1fr);
                }
              }
            }
          `}
        >
          {Contacts.map((Contact, index) => {
            return (
              <Content.EmergencycontactCard key={index} Contact={Contact} />
            )
          })}
        </div>
      ) : (
        <RestrictedAccess small tiny />
      )}
    </div>
  )
}
