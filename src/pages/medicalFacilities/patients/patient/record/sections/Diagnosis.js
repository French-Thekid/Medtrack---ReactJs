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
import { useRouteMatch } from 'react-router-dom'
import { Menu, Items, Font } from '../subComponents'
import { LIST_DIAGNOSIS } from '../subPages/diagnosis/queries'
import { useQuery } from '@apollo/react-hooks'
import EmptyTablePlaceHolder from 'assets/empty.png'
import { OrganisationContext } from 'context'

export default function Diagnosis() {
  const [active, setActive] = useState('Active')
  const match = useRouteMatch()
  const { status: facilityStatus } = useContext(OrganisationContext)
  const ReadPermission = PermissionCheck({
    feature: 'Patient Diagnosis',
    action: 'READ',
  })
  const {
    params: { patientId },
  } = useRouteMatch()

  //Query
  const { loading, error, data } = useQuery(LIST_DIAGNOSIS, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading Contained />
  if (error)
    return <Content.Alert type="error" message={'Failed to load diagnosis'} />

  const diagnosis = data.listExternalDiagnosis.data || []

  const activeDiagnosis = diagnosis
    .map((diagnosisMain, index) => {
      const { id, diagnosisId, diagnosis, fromOrganizationObject } =
        diagnosisMain || {}
      const { diagnosisStatus } = diagnosis || {}
      const { name: status } = diagnosisStatus || {}
      if (status === 'Active')
        return { id, diagnosisId, diagnosis, fromOrganizationObject }
      return null
    })
    .filter((item, index) => item !== null)

  const pastDiagnosis = diagnosis
    .map((diagnosisMain, index) => {
      const { id, diagnosisId, diagnosis, fromOrganizationObject } =
        diagnosisMain || {}
      const { diagnosisStatus } = diagnosis || {}
      const { name: status } = diagnosisStatus || {}
      if (status === 'Past')
        return { id, diagnosisId, diagnosis, fromOrganizationObject }
      return null
    })
    .filter((item, index) => item !== null)

  let DiagnosisData = diagnosis
  if (active === 'Active') DiagnosisData = activeDiagnosis
  else DiagnosisData = pastDiagnosis

  return (
    <Content.RecordCard
      title="Diagnosis"
      options
      toggle
      active={active}
      setActive={setActive}
      to={'?action=addDiagnosis'}
      main={`${match.url}/diagnosis`}
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
              grid-template-columns: 1fr 2fr 1fr 1fr 60px;
              grid-gap: 10px;
              justify-items: start;
              padding-bottom: 5px;
              border-bottom: 2px solid ${Colours.border};
            `}
          >
            <Font.Header>Name</Font.Header>
            <Font.Header>Description</Font.Header>
            <Font.Header>Diagnose At</Font.Header>
            <Font.Header>Diagnose On</Font.Header>
          </div>
          <div
            css={`
              overflow-y: auto;
              height: 100%;
            `}
          >
            {DiagnosisData.length === 0 ? (
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
                    No Diagnosis Yet
                  </Core.Text>
                </div>
              </div>
            ) : (
              DiagnosisData.map(
                (
                  { id, diagnosisId, diagnosis, fromOrganizationObject },
                  index
                ) => {
                  let {
                    name,
                    description,
                    createdAt,
                    diagnosisStatus,
                    symptoms = [],
                  } = diagnosis
                  symptoms = symptoms === null ? [] : symptoms
                  const { name: status } = diagnosisStatus || {}
                  const { name: facilityName } = fromOrganizationObject || {}
                  return (
                    <Row
                      key={index}
                      id={id}
                      facilityName={facilityName}
                      name={name}
                      description={description}
                      createdAt={createdAt}
                      symptoms={symptoms}
                      status={status}
                      facilityStatus={facilityStatus}
                      diagnosisId={diagnosisId}
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
  facilityName,
  description,
  createdAt,
  symptoms,
  status,
  facilityStatus,
  diagnosisId,
  ...rest
}) => {
  const [showOptions, setShowOption] = useState(false)

  return (
    <div
      {...rest}
      css={`
        display: grid;
        grid-template-columns: 1fr 2fr 1fr 1fr 60px;
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
      <Font.Value>{description}</Font.Value>
      <Font.Value>{facilityName}</Font.Value>
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
            to={`?action=editDiagnosis&Id=${diagnosisId}`}
            Icon={Icons.EditRoundedIcon}
            label="Edit"
            setShowOption={setShowOption}
            action={() => {
              status = status === 'Active' ? true : false
              localStorage.setItem(
                'selectedDiagnosis',
                JSON.stringify({
                  id,
                  name,
                  facilityName,
                  description,
                  createdAt,
                  symptoms,
                  status,
                  diagnosisId,
                })
              )
            }}
          />
          <Items
            to={`?action=viewSymptoms&Id=${diagnosisId}`}
            Icon={Icons.LaunchIcon}
            label="Symptoms"
            setShowOption={setShowOption}
            action={() => {
              status = status === 'Active' ? true : false
              localStorage.setItem(
                'selectedDiagnosis',
                JSON.stringify({
                  id,
                  name,
                  facilityName,
                  description,
                  createdAt,
                  symptoms,
                  status,
                })
              )
            }}
          />
          <Items
            to={`?action=deleteDiagnosis&Id=${diagnosisId}`}
            Icon={Icons.DeleteRoundedIcon}
            label="Remove"
            setShowOption={setShowOption}
          />
        </Menu>
      )}
    </div>
  )
}
