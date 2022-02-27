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
import { useRouteMatch } from 'react-router-dom'
import { LIST_INSURANCES } from '../subPages/insurance/queries'
import { useQuery } from '@apollo/react-hooks'
import EmptyTablePlaceHolder from 'assets/empty.png'
import { OrganisationContext } from 'context'

export default function MedicalInsurance() {
  const [active, setActive] = useState('Active')
  const { status: facilityStatus } = useContext(OrganisationContext)
  const ReadPermission = PermissionCheck({
    feature: 'Patient Medical Insurance',
    action: 'READ',
  })
  const {
    params: { patientId },
  } = useRouteMatch()

  //Query
  const { loading, error, data } = useQuery(LIST_INSURANCES, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading Contained />
  if (error)
    return (
      <Content.Alert
        type="error"
        message={'Failed to load medical insurances'}
      />
    )

  const insurances = data.listMedicalInsurances.data

  const activeInsurance = insurances
    .map((insuranceMain, index) => {
      const { insuranceStatus } = insuranceMain || {}
      const { name: status } = insuranceStatus || {}
      if (status === 'Active') return insuranceMain
      return null
    })
    .filter((item, index) => item !== null)

  const pastInsurance = insurances
    .map((insuranceMain, index) => {
      const { insuranceStatus } = insuranceMain || {}
      const { name: status } = insuranceStatus || {}
      if (status === 'Past') return insuranceMain
      return null
    })
    .filter((item, index) => item !== null)

  let InsuranceData = insurances
  if (active === 'Active') InsuranceData = activeInsurance
  else InsuranceData = pastInsurance

  return (
    <Content.RecordCard
      title="Medical Insurance"
      active={active}
      setActive={setActive}
      toggle
      button
      to={'?action=addInsurance'}
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
            <Font.Header>Policy Number</Font.Header>
            <Font.Header>Issue Date</Font.Header>
            <Font.Header>Exp. Date</Font.Header>
          </div>
          <div
            css={`
              overflow-y: auto;
              height: 100%;
            `}
          >
            {InsuranceData.length === 0 ? (
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
              InsuranceData.map(
                (
                  {
                    id,
                    name,
                    policyNumber,
                    issueDate,
                    expiryDate,
                    insuranceStatus,
                  },
                  index
                ) => {
                  const { name: status } = insuranceStatus || {}
                  return (
                    <Row
                      key={index}
                      id={id}
                      policyNumber={policyNumber}
                      name={name}
                      issueDate={issueDate}
                      expDate={expiryDate}
                      status={status}
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
  name,
  policyNumber,
  issueDate,
  expDate,
  status,
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
      <Font.Value color={Colours.purple}>{policyNumber}</Font.Value>
      <Font.Value>{new Date(parseInt(issueDate)).toDateString()}</Font.Value>
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
            to={`?action=editInsurance&id=${id}`}
            Icon={Icons.EditRoundedIcon}
            label="Edit"
            setShowOption={setShowOption}
            action={() => {
              console.log('Status: ', status)
              status = status === 'Active' ? true : false
              localStorage.setItem(
                'selectedInsurance',
                JSON.stringify({
                  id,
                  name,
                  policyNumber,
                  issueDate: issueDate
                    ? new Date(parseInt(issueDate)).toISOString().split('T')[0]
                    : '',
                  expDate: expDate
                    ? new Date(parseInt(expDate)).toISOString().split('T')[0]
                    : '',
                  status,
                })
              )
            }}
          />
          <Items
            to={`?action=deleteInsurance&Id=${id}`}
            Icon={Icons.DeleteRoundedIcon}
            label="Remove"
            setShowOption={setShowOption}
          />
        </Menu>
      )}
    </div>
  )
}
