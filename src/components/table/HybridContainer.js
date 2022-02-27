import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import { OrganisationContext } from 'context'
import { Core, Icons, Colours, Content, ImageWithStatus } from 'components'
import user from 'assets/user.png'
import Checkbox from './Checkbox'
import RowActionCard from './RowActionCard'
import ActionItemsContainer from './ActionItemContainer'

export default function HybridContainer({
  rowData = [],
  headerData = [],
  deleteAction = false,
  suspendAction = false,
  enableAction = false,
  editAction = false,
  permissionAction = false,
  hasAvatar = false,
  imageStatusNeeded = false,
  requestAction = false,
  rowClick,
  breakingPoint,
  title = 'LOL',
  selectedRows,
  checkBoxNeeded,
  selectedAllRow,
  setSelectedRow,
  altTitle,
  symptomsAction,
}) {
  const id = rowData.id
  const status = rowData.enabled || false
  const userType = rowData.type || ''
  const OrganisationStatus = rowData.status
  const [showActions, setshowActions] = useState({ id: 0, state: false })
  const userType1 = JSON.parse(localStorage.getItem('session'))
  const { status: facilityStatus } = useContext(OrganisationContext)
  const {
    user: { role },
  } = userType1

  const ArrayConvert = Object.keys(rowData).map((key) => {
    return rowData[key]
  })

  let restricted = false
  if (altTitle === 'Roles' && (id === 1 || id === 2 || id === 3))
    restricted = true

  let hide = false
  if (altTitle === 'GlobalPatients' && rowData.access === 'Locked') hide = true

  return (
    <div
      id="Parent"
      css={`
        @media (min-width: ${breakingPoint}) {
          display: none;
        }
        @media (max-width: ${breakingPoint}) {
          display: visible;
        }
        display: grid;
        grid-template-columns: 1fr max-content;
        grid-column-gap: 10px;
        width: calc(100% - 20px);
        padding: 10px;
        margin-bottom: 10px;
        height: max-content;
        border: ${selectedRows.rows.includes(rowData.id)
          ? `1px solid ${Colours.purple}`
          : `0.5px solid ${Colours.border}`};
        transform: ${selectedRows.rows.includes(rowData.id)
          ? 'translateY(-1px)'
          : 'none'};
        border-radius: 5px;
        &:hover {
          border: 1px solid ${Colours.purple};
          cursor: pointer;
          transition: ease-out 0.2s;
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
        }
        box-shadow: 0px 0px 5px 0px rgba(207, 226, 255, 1);
      `}
      onClick={(event) => {
        if (event.target.id === 'Parent' || event.target.id === 'data') {
          if (rowClick !== null || rowClick !== undefined) {
            if (
              title === 'Showing All Medical Facilities' ||
              title === 'Showing All Pharmacies' ||
              altTitle === 'Referrals' ||
              altTitle === 'Reports' ||
              altTitle === 'Users' ||
              altTitle === 'Diagnosis' ||
              altTitle === 'Roles' ||
              altTitle === 'Patients' ||
              altTitle === 'GlobalPatients'
            )
              rowClick(id, rowData)
            else rowClick(id)
          } else console.log('No action Present')
        }
      }}
    >
      <div
        id="data"
        css={`
          width: calc(100% - 20px);
          display: grid;
          grid-template-columns: max-content 1fr;
          grid-column-gap: 40px;
          grid-row-gap: 15px;
          align-items: ${hasAvatar ? 'center' : 'start'};
          padding: 10px 0px;
        `}
      >
        {checkBoxNeeded ? (
          <>
            <Core.Text color={Colours.purple} weight="500" id="data">
              Select
            </Core.Text>
            <Checkbox
              id="except"
              whiteborder={selectedRows.rows.includes(rowData.id)}
              state={selectedAllRow || selectedRows.rows.indexOf(id) !== -1}
              actions={(checked) => {
                if (checked) {
                  setSelectedRow((state) => {
                    const rows = state.rows.concat(id)
                    return {
                      rows,
                    }
                  })
                } else {
                  setSelectedRow((state) => {
                    const rows = state.rows.filter((item, j) => item !== id)
                    return {
                      rows,
                    }
                  })
                }
              }}
            />
          </>
        ) : null}

        {ArrayConvert.map((value, index) => {
          if (index < headerData.length) {
            //Only used for image with status
            let enabled
            if (imageStatusNeeded) {
              enabled = rowData.enabled
            }

            if (hasAvatar && index === 0) {
              if (
                headerData[index] === 'Avatar' ||
                headerData[index] === 'Image' ||
                headerData[index] === 'Logo'
              ) {
                return (
                  <React.Fragment key={index}>
                    <Core.Text weight="500" id="data">
                      {headerData[index]}
                    </Core.Text>
                    {imageStatusNeeded ? (
                      <ImageWithStatus
                        id="data"
                        src={value ? value : user}
                        alt="user avatar"
                        active={imageStatusNeeded ? enabled : null}
                      />
                    ) : (
                      <Content.Avatar
                        key={index}
                        size="medium"
                        src={value}
                        firstName={ArrayConvert[1]}
                        lastName={
                          ArrayConvert[1] ? ArrayConvert[1].split(' ')[1] : 'M'
                        }
                      />
                    )}
                  </React.Fragment>
                )
              }
            } else if (
              (title === 'Showing All Medical Facilities' ||
                title === 'Showing All Pharmacies') &&
              index === 1
            ) {
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>
                  <div
                    css={`
                      width: max-content;
                      @media (max-width: 376px) {
                        width: 150px;
                      }
                    `}
                  >
                    <Core.Text
                      Contained
                      key={index}
                      size="sm"
                      id="data"
                      color={
                        value === 'ACTIVE' || value === 'SUSPENDED'
                          ? '#fff'
                          : Colours.text
                      }
                    >
                      {value}
                    </Core.Text>
                  </div>
                </React.Fragment>
              )
            } else if (
              (title === 'Showing All Medical Facilities' ||
                title === 'Showing All Pharmacies') &&
              index === 2
            ) {
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>
                  <div
                    css={`
                      background: ${value === 'ACTIVE'
                        ? Colours.green
                        : value === 'SUSPENDED'
                        ? Colours.orange
                        : value === 'CREATE_IN_PROGRESS'
                        ? Colours.purple
                        : 'inherit'};
                      width: max-content;
                      padding: 2px 5px;
                      border-radius: 25px;
                    `}
                  >
                    <Core.Text
                      key={index}
                      size="sm"
                      id="data"
                      color={
                        value === 'ACTIVE' ||
                        value === 'SUSPENDED' ||
                        value === 'CREATE_IN_PROGRESS'
                          ? '#fff'
                          : Colours.text
                      }
                    >
                      {value}
                    </Core.Text>
                  </div>{' '}
                </React.Fragment>
              )
            } else if (
              (title === 'Showing All Medical Facilities' ||
                title === 'Showing All Pharmacies') &&
              index === 3
            ) {
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>
                  <Core.Text
                    key={index}
                    customSize="16px"
                    id="data"
                    color={Colours.purple}
                  >
                    {value}
                  </Core.Text>
                </React.Fragment>
              )
            } else if (
              (title === 'Showing All Medical Facilities' ||
                title === 'Showing All Pharmacies') &&
              index === 4
            ) {
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>
                  <div
                    css={`
                      background: RGBA(38, 153, 251, 0.1);
                      padding: 5px;
                      border-radius: 25px;
                      width: max-content;
                      @media (max-width: 376px) {
                        width: 150px;
                      }
                    `}
                  >
                    <Core.Text
                      Contained
                      key={index}
                      size="sm"
                      id="data"
                      color={
                        selectedRows.rows.includes(rowData.id)
                          ? Colours.purple
                          : value === 'ACTIVE' || value === 'SUSPENDED'
                          ? '#fff'
                          : Colours.text
                      }
                    >
                      {value.substring(0, value.length - 16)}
                    </Core.Text>
                  </div>
                </React.Fragment>
              )
            } else if (
              (altTitle === 'Patients' && index === 3) ||
              (altTitle === 'GlobalPatients' && index === 2)
            ) {
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>
                  <div
                    css={`
                      height: max-content;
                      width: 80px;
                      padding: 5px;
                      border-radius: 25px;
                      background: ${value === 'Male' ? '#E2EDFF' : '#FFEFFE'};
                      display: grid;
                      place-items: center;
                    `}
                  >
                    <Core.Text
                      color={value === 'Male' ? Colours.blue : Colours.pink}
                    >
                      {value}
                    </Core.Text>
                  </div>
                </React.Fragment>
              )
            } else if (
              (altTitle === 'Patients' && index === 5) ||
              (altTitle === 'GlobalPatients' && index === 5) ||
              (altTitle === 'Doctors' && index === 4)
            ) {
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>
                  <div
                    css={`
                      height: 25px;
                      width: 25px;
                      border-radius: 50%;
                      font-size: 18px;
                      background: ${value ? Colours.green : Colours.red};
                      float: right;
                      border: 2px solid white;
                      color: white;
                      display: grid;
                      place-items: center;
                      box-shadow: 0px 8px 20px -10px rgba(113, 113, 138, 1);
                    `}
                  >
                    {value ? (
                      <Icons.CheckRoundedIcon
                        style={{
                          fontWeight: '600',
                          fontSize: 'inherit',
                        }}
                      />
                    ) : (
                      <Icons.CloseRoundedIcon
                        style={{
                          fontWeight: '600',
                          fontSize: 'inherit',
                        }}
                      />
                    )}
                  </div>
                </React.Fragment>
              )
            } else if (
              (altTitle === 'Patients' && index === 6) ||
              (altTitle === 'GlobalPatients' && index === 6) ||
              (altTitle === 'Referrals' && index === 5) ||
              (altTitle === 'Reports' && index === 3) ||
              (altTitle === 'Doctors' && index === 5) ||
              (altTitle === 'Medicines' && index === 4) ||
              (altTitle === 'Allergies' && index === 3) ||
              (altTitle === 'Diagnosis' && index === 3)
            ) {
              const creator = JSON.parse(value)
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>
                  <div
                    css={`
                      display: grid;
                      justify-items: start;
                    `}
                  >
                    <Core.Text
                      color={
                        selectedRows.rows.includes(rowData.id)
                          ? Colours.purple
                          : Colours.text
                      }
                      key={index}
                      customSize="16px"
                      id="data"
                    >
                      {`${creator.title || ''} ${creator.firstName} ${
                        creator.lastName
                      }`}
                    </Core.Text>
                    <div
                      css={`
                        height: max-content;
                        padding: 0px 10px;
                        border-radius: 15px;
                        font-size: 10px;
                        background: ${creator.type === 'Doctor'
                          ? Colours.purple
                          : Colours.orange};
                        float: right;
                        border: 2px solid white;
                        color: white;
                        display: grid;
                        place-items: center;
                        box-shadow: 0px 8px 20px -10px rgba(113, 113, 138, 1);
                      `}
                    >
                      {creator.type}
                    </div>
                  </div>
                </React.Fragment>
              )
            } else if (
              (altTitle === 'Medicines' && index === 5) ||
              (altTitle === 'Allergies' && index === 4) ||
              (altTitle === 'Diagnosis' && index === 4)
            ) {
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>
                  <Core.Text color={Colours.purple}>
                    {new Date(parseInt(value)).toDateString()}
                  </Core.Text>
                </React.Fragment>
              )
            } else if (altTitle === 'Users' && index === 3) {
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>
                  <div
                    css={`
                      padding: 2px 10px;
                      background-color: ${value === 'Doctor'
                        ? Colours.purple
                        : Colours.orange};
                      border-radius: 25px;
                      width: 80px;
                      display: grid;
                      justify-items: center;
                    `}
                  >
                    <Core.Text
                      color={Colours.foreground}
                      key={index}
                      customSize="15px"
                      id="data"
                    >
                      {value}
                    </Core.Text>
                  </div>
                </React.Fragment>
              )
            } else if (altTitle === 'Billing' && index === 1) {
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>
                  <Core.Text id="data" color={Colours.purple}>
                    ${value}.00
                  </Core.Text>
                </React.Fragment>
              )
            } else if (altTitle === 'Billing' && index === 3) {
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>
                  <Core.Text
                    id="data"
                    color={value > 0 ? Colours.red : Colours.purple}
                  >
                    ${value}.00
                  </Core.Text>
                </React.Fragment>
              )
            } else if (altTitle === 'Billing' && index === 3) {
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>
                  <div
                    css={`
                      padding: 5px;
                      width: 100px;
                      border: 1px solid
                        ${value === 'Paid' ? Colours.green : Colours.purple};
                      border-radius: 5px;
                      display: grid;
                      place-items: center;
                    `}
                  >
                    <Core.Text
                      id="data"
                      color={value === 'Paid' ? Colours.green : Colours.purple}
                    >
                      {value}
                    </Core.Text>
                  </div>
                </React.Fragment>
              )
            } else if (altTitle === 'GlobalPatients' && index === 4) {
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>{' '}
                  <div
                    css={`
                      border: 1px solid
                        ${value === 'Granted' ? Colours.blue : Colours.red};
                      border-radius: 5px;
                      padding: 5px;
                      width: 80px;
                      display: grid;
                      place-items: center;
                    `}
                  >
                    <Core.Text
                      color={value === 'Granted' ? Colours.blue : Colours.red}
                    >
                      {value}
                    </Core.Text>
                  </div>
                </React.Fragment>
              )
            } else {
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>
                  <Core.Text id="data">{value}</Core.Text>
                </React.Fragment>
              )
            }
            return null
          }
          return null
        })}
      </div>
      {/* Action  */}
      <div
        css={`
          width: 100%;
          display: flex;
          align-content: center;
        `}
      >
        {OrganisationStatus !== 'CREATE_IN_PROGRESS' ? (
          <Wrapper
            role={role}
            facilityStatus={facilityStatus}
            numOfRows={selectedRows.rows.length}
            id={id}
            setshowActions={setshowActions}
            show={showActions.state}
            actions={(checked) => {
              if (checked) {
                setSelectedRow((state) => {
                  let preRow = state.rows.concat(id)
                  const rows = preRow.filter(
                    (value, index) => preRow.indexOf(value) === index
                  )
                  return {
                    rows,
                  }
                })
              } else {
                setSelectedRow((state) => {
                  const rows = state.rows.filter((item, j) => item !== id)
                  return {
                    rows,
                  }
                })
              }
            }}
          >
            <Icons.MoreVertIcon
              style={{
                color: selectedRows.rows.includes(rowData.id)
                  ? Colours.purple
                  : Colours.textGrey,
                zIndex: 0,
                fontSize: '20px',
              }}
            />
            <RowActionCard
              setshowActions={setshowActions}
              show={showActions.state}
              validID={showActions.id}
              id={id}
              right="20px;"
              actions={(checked) => {
                if (checked) {
                  setSelectedRow((state) => {
                    const rows = state.rows.concat(id)
                    return {
                      rows,
                    }
                  })
                } else {
                  setSelectedRow((state) => {
                    const rows = state.rows.filter((item, j) => item !== id)
                    return {
                      rows,
                    }
                  })
                }
              }}
            >
              {OrganisationStatus !== 'CREATE_IN_PROGRESS' &&
              OrganisationStatus !== 'CREATE_FAILED' &&
              !restricted &&
              !hide &&
              editAction ? (
                <ActionItemsContainer
                  title="Edit"
                  Icon={Icons.EditRoundedIcon}
                  action={editAction}
                  dataSetId={id}
                  id="edit"
                  data={rowData}
                />
              ) : null}
              {(enableAction && OrganisationStatus === 'SUSPENDED') ||
              (altTitle === 'Users' && status === 0) ? (
                <ActionItemsContainer
                  title="Enable"
                  Icon={Icons.PlayCircleOutlineRoundedIcon}
                  action={enableAction}
                  dataSetId={id}
                  data={rowData}
                  id="enable"
                />
              ) : (suspendAction && OrganisationStatus === 'ACTIVE') ||
                (altTitle === 'Users' && status === 1) ? (
                <ActionItemsContainer
                  title={
                    altTitle === 'Users' && userType === 'Doctor'
                      ? 'Disassociate'
                      : altTitle === 'Users' && userType === 'Secretary'
                      ? 'Disable'
                      : 'Suspend'
                  }
                  Icon={Icons.PauseCircleOutlineRoundedIcon}
                  action={suspendAction}
                  dataSetId={id}
                  data={rowData}
                  id="suspend"
                />
              ) : null}
              {deleteAction && !restricted && (
                <ActionItemsContainer
                  title="Delete"
                  Icon={Icons.DeleteRoundedIcon}
                  action={deleteAction}
                  dataSetId={id}
                  data={rowData}
                />
              )}
              {permissionAction && !restricted && (
                <ActionItemsContainer
                  title="Permissions"
                  Icon={Icons.GavelRoundedIcon}
                  action={permissionAction}
                  id="permissions"
                  dataSetId={id}
                  data={rowData}
                />
              )}
              {symptomsAction && (
                <ActionItemsContainer
                  title="Symptoms"
                  Icon={Icons.LaunchIcon}
                  action={symptomsAction}
                  id="symptoms"
                  dataSetId={id}
                  data={rowData}
                />
              )}
              {requestAction && altTitle === 'GlobalPatients' && hide && (
                <ActionItemsContainer
                  title="Request Access"
                  Icon={Icons.VerifiedUserRoundedIcon}
                  action={requestAction}
                  id="request"
                  dataSetId={id}
                  data={rowData}
                />
              )}
            </RowActionCard>
          </Wrapper>
        ) : null}
      </div>
    </div>
  )
}

const Wrapper = ({
  numOfRows,
  setshowActions,
  id,
  children,
  actions,
  show,
  facilityStatus,
  role,
}) => (
  <section
    css={`
      &:hover {
        cursor: pointer;
      }
    `}
    onClick={() => {
      if (
        facilityStatus === 'SUSPENDED' &&
        (role === 'RegularUser' || role === 'adminUser')
      ) {
      } else {
        if (numOfRows <= 1) {
          actions(!show)
          setshowActions((prevState) => {
            return { id: id, state: !prevState.state }
          })
        }
      }
    }}
  >
    {children}
  </section>
)
