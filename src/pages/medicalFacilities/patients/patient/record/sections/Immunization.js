import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import {
  Colours,
  Content,
  Icons,
  Loading,
  Core,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { Menu, Items, Font } from '../subComponents'
import { useRouteMatch } from 'react-router-dom'
import { LIST_VACCINES } from '../subPages/immunizations/queries'
import { useQuery } from '@apollo/react-hooks'
import EmptyTablePlaceHolder from 'assets/empty.png'
import { OrganisationContext } from 'context'

export default function Immunization() {
  const {
    params: { patientId },
  } = useRouteMatch()
  const { status: facilityStatus } = useContext(OrganisationContext)
  const ReadPermission = PermissionCheck({
    feature: 'Patient Immunization Vaccination',
    action: 'READ',
  })
  //Query
  const { loading, error, data } = useQuery(LIST_VACCINES, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading Contained />
  if (error)
    return (
      <Content.Alert
        type="error"
        message={'Failed to load immunizations/vaccines'}
      />
    )

  const immunizations = data.listExternalImmunizationsVaccinations.data || []

  return (
    <Content.RecordCard
      title="Immunizations/Vaccinations"
      button
      to={'?action=addImmunization'}
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
              grid-template-columns: repeat(4, 1fr) 60px;
              grid-gap: 10px;
              justify-items: center;
              padding-bottom: 5px;
              border-bottom: 2px solid ${Colours.border};
            `}
          >
            <Font.Header>Name</Font.Header>
            <Font.Header>Type</Font.Header>
            <Font.Header>Date Taken</Font.Header>
            <Font.Header>Exp. Date</Font.Header>
          </div>
          <div
            css={`
              overflow-y: auto;
              height: 100%;
            `}
          >
            {immunizations.length === 0 ? (
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
                    No Immunizations/Vaccinations Yet
                  </Core.Text>
                </div>
              </div>
            ) : (
              immunizations.map(({ immunizationsVaccination, id }, index) => {
                const {
                  name,
                  type,
                  dateTaken,
                  expiryDate: expDate,
                } = immunizationsVaccination
                return (
                  <Row
                    key={index}
                    id={id}
                    name={name}
                    type={type}
                    dateTaken={dateTaken}
                    expDate={expDate}
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
  type,
  dateTaken,
  expDate,
  facilityStatus,
  ...rest
}) => {
  const [showOptions, setShowOption] = useState(false)

  return (
    <div
      {...rest}
      css={`
        display: grid;
        grid-template-columns: repeat(4, 1fr) 60px;
        grid-gap: 10px;
        padding: 10px 0px;
        justify-items: center;
        border-bottom: 1px solid ${Colours.border};
        &:hover {
          background: ${Colours.menuHover};
        }
        position: relative;
      `}
    >
      <Font.Value>{name}</Font.Value>
      <Font.Value>{type}</Font.Value>
      <Font.Value>{new Date(parseInt(dateTaken)).toDateString()}</Font.Value>
      <Font.Value>{new Date(parseInt(expDate)).toDateString()}</Font.Value>
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
            to={`?action=editImmunization&id=${id}`}
            Icon={Icons.EditRoundedIcon}
            label="Edit"
            setShowOption={setShowOption}
            action={() =>
              localStorage.setItem(
                'selectedImmunization',
                JSON.stringify({
                  id,
                  name,
                  type,
                  dateTaken: dateTaken
                    ? new Date(parseInt(dateTaken)).toISOString().split('T')[0]
                    : '',
                  expDate: expDate
                    ? new Date(parseInt(expDate)).toISOString().split('T')[0]
                    : '',
                })
              )
            }
          />
          <Items
            to={`?action=deleteImmunization&Id=${id}`}
            Icon={Icons.DeleteRoundedIcon}
            label="Remove"
            setShowOption={setShowOption}
          />
        </Menu>
      )}
    </div>
  )
}
