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
import { LIST_MEDICINES } from '../subPages/medicines/queries'
import { useQuery } from '@apollo/react-hooks'
import EmptyTablePlaceHolder from 'assets/empty.png'
import { OrganisationContext } from 'context'

export default function Medicines() {
  const [active, setActive] = useState('Active')
  const match = useRouteMatch()
  const { status: facilityStatus } = useContext(OrganisationContext)
  const ReadPermission = PermissionCheck({
    feature: 'Patient Medicine',
    action: 'READ',
  })
  const {
    params: { patientId },
  } = useRouteMatch()

  //Query
  const { loading, error, data } = useQuery(LIST_MEDICINES, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading Contained />
  if (error)
    return <Content.Alert type="error" message={'Failed to load medicines'} />

  const medicines = data.listExternalMedicines.data || []

  const activeMedicines = medicines
    .map((medicineMain, index) => {
      const { id, medicineId, medicine, fromOrganizationObject } =
        medicineMain || {}
      const { medicineStatus } = medicine || {}
      const { name: status } = medicineStatus || {}
      if (status === 'Active')
        return { id, medicineId, medicine, fromOrganizationObject }
      return null
    })
    .filter((item, index) => item !== null)

  const pastMedicines = medicines
    .map((medicineMain, index) => {
      const { id, medicineId, medicine, fromOrganizationObject } =
        medicineMain || {}
      const { medicineStatus } = medicine || {}
      const { name: status } = medicineStatus || {}
      if (status === 'Past')
        return { id, medicineId, medicine, fromOrganizationObject }
      return null
    })
    .filter((item, index) => item !== null)

  let MedicineData = medicines
  if (active === 'Active') MedicineData = activeMedicines
  else MedicineData = pastMedicines

  return (
    <Content.RecordCard
      title="Medicines"
      options
      toggle
      active={active}
      setActive={setActive}
      to={'?action=addMedicine'}
      main={`${match.url}/medicines`}
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
              justify-items: start;
              padding-bottom: 5px;
              border-bottom: 2px solid ${Colours.border};
            `}
          >
            <Font.Header>Name</Font.Header>
            <Font.Header>Dosage</Font.Header>
            <Font.Header>Prescribed Facility</Font.Header>
            <Font.Header>Prescribed On</Font.Header>
          </div>
          <div
            css={`
              overflow-y: auto;
              height: 100%;
            `}
          >
            {MedicineData.length === 0 ? (
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
                    No Medicines Yet
                  </Core.Text>
                </div>
              </div>
            ) : (
              MedicineData.map(
                (
                  { id, medicineId, medicine, fromOrganizationObject },
                  index
                ) => {
                  const {
                    name,
                    dosage,
                    createdAt,
                    description,
                    medicineStatus,
                    prescriptionId,
                  } = medicine || {}
                  const { name: facilityName } = fromOrganizationObject || {}
                  const { name: status } = medicineStatus || {}
                  return (
                    <Row
                      key={index}
                      id={id}
                      facilityName={facilityName}
                      name={name}
                      dosage={dosage}
                      createdAt={createdAt}
                      description={description}
                      status={status}
                      prescriptionId={prescriptionId}
                      facilityStatus={facilityStatus}
                      medicineId={medicineId}
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
  dosage,
  createdAt,
  description,
  status,
  prescriptionId,
  facilityStatus,
  medicineId,
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
        justify-items: start;
        border-bottom: 1px solid ${Colours.border};
        &:hover {
          background: ${Colours.menuHover};
        }
        position: relative;
      `}
    >
      <Font.Value>{name}</Font.Value>
      <Font.Value>{dosage}</Font.Value>
      <Font.Value>{facilityName}</Font.Value>
      <Font.Value>{new Date(parseInt(createdAt)).toDateString()}</Font.Value>
      {prescriptionId === null && (
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
      )}
      {showOptions && (
        <Menu setShowOption={setShowOption}>
          <Items
            to={`?action=editMedicine&id=${medicineId}`}
            Icon={Icons.EditRoundedIcon}
            label="Edit"
            setShowOption={setShowOption}
            action={() => {
              status = status === 'Active' ? true : false
              localStorage.setItem(
                'selectedMedicine',
                JSON.stringify({
                  id,
                  name,
                  dosage,
                  description,
                  status,
                  medicineId,
                })
              )
            }}
          />
          <Items
            to={`?action=deleteMedicine&Id=${medicineId}`}
            Icon={Icons.DeleteRoundedIcon}
            label="Remove"
            setShowOption={setShowOption}
          />
        </Menu>
      )}
    </div>
  )
}
