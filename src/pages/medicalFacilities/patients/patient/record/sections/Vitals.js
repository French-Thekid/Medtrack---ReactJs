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
import { LIST_VITALS } from '../subPages/vitals/queries'
import { useQuery } from '@apollo/react-hooks'
import EmptyTablePlaceHolder from 'assets/empty.png'
import { OrganisationContext } from 'context'

export default function Vitals() {
  const {
    params: { patientId },
  } = useRouteMatch()
  const { status: facilityStatus } = useContext(OrganisationContext)
  const ReadPermission = PermissionCheck({
    feature: 'Patient Vital',
    action: 'READ',
  })

  //Query
  const { loading, error, data } = useQuery(LIST_VITALS, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading Contained />
  if (error)
    return <Content.Alert type="error" message={'Failed to load vitals'} />

  const Vitals = data.listVitals.data

  return (
    <Content.RecordCard title="Vitals" button to="?action=addVital">
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
              grid-template-columns: repeat(6, 1fr) 60px;
              grid-gap: 10px;
              justify-items: center;
              padding-bottom: 5px;
              border-bottom: 2px solid ${Colours.border};
            `}
          >
            <Font.Header>Height</Font.Header>
            <Font.Header>Weight</Font.Header>
            <Font.Header>BMI</Font.Header>
            <Font.Header>BP</Font.Header>
            <Font.Header>Temperature</Font.Header>
            <Font.Header>Date</Font.Header>
          </div>
          <div
            css={`
              overflow-y: auto;
              height: 100%;
            `}
          >
            {Vitals.length === 0 ? (
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
                    No Vitals Yet
                  </Core.Text>
                </div>
              </div>
            ) : (
              Vitals.map(
                (
                  {
                    id,
                    height,
                    weight,
                    BMI,
                    bloodPressure,
                    temperature,
                    createdAt,
                  },
                  index
                ) => {
                  return (
                    <Row
                      key={index}
                      id={id}
                      height={height}
                      weight={weight}
                      BMI={BMI}
                      bloodPressure={bloodPressure}
                      temperature={temperature}
                      createdAt={createdAt}
                      facilityStatus={facilityStatus}
                    />
                  )
                }
              )
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
  height,
  weight,
  BMI,
  bloodPressure,
  temperature,
  createdAt,
  facilityStatus,
  ...rest
}) => {
  const [showOptions, setShowOption] = useState(false)

  return (
    <div
      {...rest}
      css={`
        display: grid;
        grid-template-columns: repeat(6, 1fr) 60px;
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
      <Font.Value>{height}cm</Font.Value>
      <Font.Value>{weight}lbs</Font.Value>
      <Font.Value
        color={
          BMI < 18.5 || BMI > 29.9
            ? Colours.red
            : BMI > 24.9 && BMI < 30
            ? Colours.orange
            : Colours.purple
        }
      >
        {BMI}
      </Font.Value>
      <Font.Value>{bloodPressure}</Font.Value>
      <Font.Value>{temperature}</Font.Value>
      <Font.Value>{new Date(parseInt(createdAt)).toDateString()}</Font.Value>
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
            to={`?action=editVital&id=${id}`}
            Icon={Icons.EditRoundedIcon}
            label="Edit"
            setShowOption={setShowOption}
            action={() =>
              localStorage.setItem(
                'selectedVital',
                JSON.stringify({
                  id,
                  height,
                  weight,
                  bloodPressure,
                  temperature,
                })
              )
            }
          />
          <Items
            to={`?action=deleteVital&Id=${id}`}
            Icon={Icons.DeleteRoundedIcon}
            label="Remove"
            setShowOption={setShowOption}
          />
        </Menu>
      )}
    </div>
  )
}
