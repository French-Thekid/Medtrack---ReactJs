import React, { useContext, useState } from 'react'
import 'styled-components/macro'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { Core, Icons, ImageWithStatus } from 'components'
import Colours from 'components/Colours'
import Navigation from './Navigation'
import {
  Menu,
  Items,
} from '../../pages/medicalFacilities/patients/patient/record/subComponents'
import { OrganisationContext } from 'context'

export default function Panel() {
  const history = useHistory()
  const {
    params: { patientId },
  } = useRouteMatch()
  const [showOptions, setShowOption] = useState(false)

  const { avatar, firstName, lastName, life, email, status } =
    JSON.parse(localStorage.getItem('selectedPatient')) || {}

  const { status: facilityStatus } = useContext(OrganisationContext)

  return (
    <div
      css={`
        display: grid;
        grid-template-rows: repeat(2, max-content);
        grid-gap: 5px;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: repeat(2, max-content) 1fr repeat(
              5,
              max-content
            );
          grid-column-gap: 20px;
          align-items: center;
          border-bottom: 1px solid ${Colours.border};
          padding: 0px 0px 10px 0px;
        `}
      >
        <Core.BackButton
          cleanUp={() => localStorage.removeItem('selectedPatient')}
          to="/facility/patients/myPatient"
        />

        <ImageWithStatus
          active={status}
          size="largee"
          src={avatar}
          alt="user avatar"
          firstName={firstName}
          lastName={lastName}
          borderColor={Colours.purple}
        />
        <div
          css={`
            display: grid;
            grid-gap: 0px;
          `}
        >
          <Core.Text
            customSize="25px"
            color={Colours.purple}
          >{`${firstName} ${lastName}`}</Core.Text>
          <Core.Text customSize="15px" color={Colours.textGrey}>
            {email}
          </Core.Text>
          <div
            css={`
              background: ${life === 'Decease' ? Colours.red : Colours.purple};
              border-radius: 5px;
              padding: 0px 10px;
              width: max-content;
              height: max-content;
              color: #fff;
              margin-top: 5px;
              transition: ease-out 0.2s;
              &:hover {
                cursor: pointer;
                transition: ease-out 0.2s;
                transform: translateY(-1px);
              }
            `}
            onClick={() => history.push('?action=LifeStatus')}
          >
            {life}
          </div>
        </div>
        <div
          css={`
            border-radius: 5px;
            border: 1px solid ${Colours.border};
            padding: 5px 10px;
            color: ${Colours.textGrey};
            transition: ease-out 0.2s;
            &:hover {
              cursor: ${facilityStatus === 'SUSPENDED'
                ? 'not-allowed'
                : 'pointer'};
              border: 1px solid ${Colours.purple};
              color: ${Colours.purple};
              transition: ease-out 0.2s;
              transform: translateY(-1px);
            }
          `}
          onClick={() => {
            if (facilityStatus !== 'SUSPENDED')
              history.push(`?action=unSubscribed&patientId=${patientId}`)
          }}
        >
          Subscribed
        </div>

        <div
          css={`
            width: 2px;
            height: 40px;
            background: ${Colours.border};
          `}
        />

        <div
          css={`
            border-radius: 5px;
            border: 1px solid ${Colours.orange};
            padding: 5px 10px;
            color: ${Colours.foreground};
            background: ${Colours.orange};
            display: grid;
            place-items: center;
            font-size: 20px;
            transition: ease-out 0.2s;
            &:hover {
              cursor: ${facilityStatus === 'SUSPENDED'
                ? 'not-allowed'
                : 'pointer'};
              box-shadow: 0px 8px 20px -2px rgba(186, 186, 186, 1);
              transition: ease-out 0.2s;
              transform: translateY(-1px);
            }
          `}
          onClick={() => {
            if (facilityStatus !== 'SUSPENDED')
              history.push('?action=attachNote')
          }}
        >
          <Icons.ChatRoundedIcon style={{ fontSize: 'inherit' }} />
        </div>

        <Core.Button
          purpose="major"
          onClick={() => history.push(`?action=editPatient&id=${patientId}`)}
        >
          Edit Account Details
        </Core.Button>

        <div
          css={`
            padding-top: 5px;
            height: max-content;
            width: max-content;
            color: ${Colours.textGrey};
            font-size: 30px;
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
          <Icons.MoreVertIcon style={{ fontSize: 'inherit' }} />
        </div>
      </div>
      {showOptions && (
        <Menu
          setShowOption={setShowOption}
          top="70px"
          width="max-content"
          mr="25px"
        >
          <Items
            to={`/facility/patient/record/${patientId}/?action=addVital`}
            Icon={Icons.AddRoundedIcon}
            label="Add Vital"
            setShowOption={setShowOption}
          />
          <Items
            to={`/facility/patient/record/${patientId}/?action=addMedicine`}
            Icon={Icons.AddRoundedIcon}
            label="Add Medicine"
            setShowOption={setShowOption}
          />
          <Items
            to={`/facility/patient/record/${patientId}/?action=addAllergy`}
            Icon={Icons.AddRoundedIcon}
            label="Add Allergy"
            setShowOption={setShowOption}
          />
          <Items
            to={`/facility/patient/record/${patientId}/?action=addDiagnosis`}
            Icon={Icons.AddRoundedIcon}
            label="Add Diagnosis"
            setShowOption={setShowOption}
          />
          <Items
            to={`/facility/patient/record/${patientId}/?action=addFile`}
            Icon={Icons.AddRoundedIcon}
            label="Add Files"
            setShowOption={setShowOption}
          />
          <Items
            to={`/facility/patient/record/${patientId}/?action=addImmunization`}
            Icon={Icons.AddRoundedIcon}
            label="Add Immunization"
            setShowOption={setShowOption}
          />
          <Items
            to={`/facility/patient/record/${patientId}/?action=addInsurance`}
            Icon={Icons.AddRoundedIcon}
            label="Add Insurance"
            setShowOption={setShowOption}
          />
          <Items
            to={`/facility/patient/record/${patientId}/?action=addEmergencyContact`}
            Icon={Icons.AddRoundedIcon}
            label="Add Emergency Contact"
            setShowOption={setShowOption}
          />
        </Menu>
      )}
      <Navigation />
    </div>
  )
}
