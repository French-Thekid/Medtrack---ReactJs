import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import { OrganisationContext } from 'context'
import { Core, Colours, Icons, ImageWithStatus, Content } from 'components'
import Checkbox from './Checkbox'
import RowActionCard from './RowActionCard'
import ActionItemsContainer from './ActionItemContainer'

export default function Row({
  data = [],
  Columns = '1fr',
  HeaderData = [],
  deleteAction = false,
  suspendAction = false,
  enableAction = false,
  editAction = false,
  permissionAction = false,
  requestAction = false,
  hasAvatar = false,
  imageStatusNeeded = false,
  checkBoxNeeded,
  selectedAllRow,
  setSelectedRow,
  rowClick,
  justify,
  alignment,
  selectedRows,
  breakingPoint,
  title,
  altTitle,
  noAction,
  symptomsAction,
}) {
  const userType1 = JSON.parse(localStorage.getItem('session'))
  const { status: facilityStatus } = useContext(OrganisationContext)
  const {
    user: { role },
  } = userType1

  if (checkBoxNeeded) {
    Columns = '45px ' + Columns
  }

  if (
    deleteAction ||
    enableAction ||
    suspendAction ||
    editAction ||
    requestAction
  ) {
    Columns = Columns + ' 90px'
  }

  const id = data.id
  const status = data.enabled || 0
  const userType = data.type || ''

  const ArrayConvert = Object.keys(data).map((key) => {
    return data[key]
  })

  const OrganisationStatus = data.status
  const [showActions, setshowActions] = useState({ id: 0, state: false })

  let restricted = false
  if (altTitle === 'Roles' && (id === 1 || id === 2 || id === 3))
    restricted = true

  let hide = false
  if (altTitle === 'GlobalPatients' && data.access === 'Locked') hide = true

  return (
    <div
      id="Parent"
      css={`
        width: 100%;
        height: max-content;
        @media (max-width: ${breakingPoint}) {
          display: none;
        }
        display: grid;
        grid-template-columns: ${Columns};
        border-bottom: 0.5px solid ${Colours.border};
        justify-items: ${justify};
        grid-column-gap: 10px;
        align-items: ${alignment};
        padding: 8px 0px;
        background: ${selectedRows.rows.includes(data.id) ? '#ECEFFF' : 'none'};
        transform: ${selectedRows.rows.includes(data.id)
          ? 'translateY(-1px)'
          : 'none'};
        &:hover {
          box-shadow: 2px 24px 12px -13px rgba(245, 245, 245, 1);
          background: ${selectedRows.rows.includes(data.id)
            ? '#ECEFFF'
            : Colours.hover};
          cursor: ${rowClick.toString() === '() => {}' ? 'arrow' : 'pointer'};
          border-left: 1px solid ${Colours.border};
          border-right: 1px solid ${Colours.border};
          transition: ease-out 0.2s;
        }
      `}
      onClick={(event) => {
        if (event.target.id === 'Parent' || event.target.id === 'data') {
          if (rowClick && !restricted) {
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
              rowClick(id, data)
            else rowClick(id)
          } else console.log('No action Present')
        }
      }}
    >
      {checkBoxNeeded ? (
        <Checkbox
          whiteborder={selectedRows.rows.includes(data.id)}
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
      ) : null}
      {ArrayConvert.map((value, index) => {
        if (index < HeaderData.length) {
          let avatarFound = false
          if (
            HeaderData[index] === 'Avatar' ||
            HeaderData[index] === 'Image' ||
            HeaderData[index] === 'Logo'
          )
            avatarFound = true

          const enabled = data.enabled
          if (hasAvatar && index === 0) {
            if (avatarFound) {
              return imageStatusNeeded ? (
                <ImageWithStatus
                  key={index}
                  src={value}
                  size="medium"
                  alt="user avatar"
                  active={imageStatusNeeded ? enabled : null}
                  id="data"
                  firstName={
                    altTitle === 'Users' ? ArrayConvert[1].split(' ')[0] : 'U'
                  }
                  lastName={
                    altTitle === 'Users' ? ArrayConvert[1].split(' ')[1] : 'D'
                  }
                />
              ) : (
                <Content.Avatar
                  key={index}
                  size="medium"
                  src={value}
                  firstName={ArrayConvert[1] || 'U'}
                  lastName={
                    altTitle === 'Medical Facilities'
                      ? ArrayConvert[1]
                        ? ArrayConvert[1].split(' ')[1] ||
                          ArrayConvert[1].split('')[1]
                        : 'M'
                      : ArrayConvert[1].split(' ')[1] ||
                        ArrayConvert[1].split('')[1]
                  }
                />
              )
            }
          } else if (
            ((title === 'Showing All Medical Facilities' ||
              title === 'Showing All Pharmacies') &&
              index === 3) ||
            (altTitle === 'Users' && index === 2) ||
            (altTitle === 'Users' && index === 5)
          ) {
            return (
              <Core.Text
                key={index}
                customSize="16px"
                id="data"
                color={Colours.purple}
              >
                {value}
              </Core.Text>
            )
          } else if (
            (title === 'Showing All Medical Facilities' ||
              title === 'Showing All Pharmacies') &&
            index === 2
          ) {
            return (
              <div
                key={index}
                css={`
                  background: ${value === 'ACTIVE'
                    ? Colours.green
                    : value === 'SUSPENDED'
                    ? Colours.orange
                    : value === 'CREATE_IN_PROGRESS'
                    ? Colours.purple
                    : value === 'CREATE_FAILED'
                    ? Colours.red
                    : 'inherit'};
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
                    value === 'CREATE_IN_PROGRESS' ||
                    value === 'CREATE_FAILED'
                      ? '#fff'
                      : Colours.text
                  }
                >
                  {value}
                </Core.Text>
              </div>
            )
          } else if (
            (title === 'Showing All Medical Facilities' ||
              title === 'Showing All Pharmacies') &&
            index === 4
          ) {
            return (
              <div
                key={index}
                css={`
                  background: RGBA(38, 153, 251, 0.1);
                  padding: 5px;
                  border-radius: 25px;
                `}
              >
                <Core.Text
                  key={index}
                  size="sm"
                  id="data"
                  color={
                    selectedRows.rows.includes(data.id)
                      ? Colours.purple
                      : value === 'ACTIVE' || value === 'SUSPENDED'
                      ? '#fff'
                      : Colours.text
                  }
                >
                  {value.substring(0, value.length - 16)}
                </Core.Text>
              </div>
            )
          } else if (
            (altTitle === 'Patients' && index === 3) ||
            (altTitle === 'GlobalPatients' && index === 2)
          ) {
            return (
              <div
                key={index}
                css={`
                  height: max-content;
                  width: 80px;
                  padding: 0px 5px;
                  border-radius: 25px;
                  background: ${value === 'Male' ? '#E2EDFF' : '#FFEFFE'};
                  display: grid;
                  place-items: center;
                `}
              >
                <Core.Text
                  id="data"
                  color={value === 'Male' ? Colours.blue : Colours.pink}
                >
                  {value}
                </Core.Text>
              </div>
            )
          } else if (
            (altTitle === 'Patients' && index === 5) ||
            (altTitle === 'GlobalPatients' && index === 5) ||
            (altTitle === 'Doctors' && index === 4)
          ) {
            return (
              <div
                key={index}
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
              <div
                key={index}
                css={`
                  display: grid;
                  justify-items: ${justify};
                `}
              >
                <Core.Text
                  color={
                    selectedRows.rows.includes(data.id)
                      ? Colours.purple
                      : Colours.text
                  }
                  key={index}
                  customSize="14px"
                  id="data"
                >
                  {`${
                    creator.title === null || creator.title === undefined
                      ? ''
                      : creator.title
                  } ${creator.firstName} ${creator.lastName}`}
                </Core.Text>
                <div
                  css={`
                    height: max-content;
                    width: max-content;
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
            )
          } else if (altTitle === 'Billing' && index === 1) {
            return (
              <Core.Text id="data" color={Colours.purple}>
                ${value}.00
              </Core.Text>
            )
          } else if (altTitle === 'Billing' && index === 3) {
            return (
              <Core.Text
                id="data"
                color={value > 0 ? Colours.red : Colours.purple}
              >
                ${value}.00
              </Core.Text>
            )
          } else if (altTitle === 'Billing' && index === 4) {
            return (
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
            )
          } else if (altTitle === 'GlobalPatients' && index === 4) {
            return (
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
                  id="data"
                  color={value === 'Granted' ? Colours.blue : Colours.red}
                >
                  {value}
                </Core.Text>
              </div>
            )
          } else if (
            (altTitle === 'Referrals' || altTitle === 'Reports') &&
            data.icon !== undefined &&
            index === 0
          ) {
            return (
              <Icons.DescriptionRoundedIcon
                style={{ fontSize: '40px', color: Colours.purple }}
                key={index}
              />
            )
          } else if (
            (altTitle === 'Referrals' && index === 2) ||
            (altTitle === 'Reports' && index === 2) ||
            (altTitle === 'Reports' && index === 4)
          ) {
            return (
              <Core.Text
                color={Colours.purple}
                key={index}
                customSize="16px"
                id="data"
              >
                {value}
              </Core.Text>
            )
          } else if (altTitle === 'Referrals' && index === 4) {
            return (
              <div
                key={index}
                css={`
                  height: 25px;
                  width: 25px;
                  border-radius: 50%;
                  font-size: 18px;
                  background: ${value === 'Accepted'
                    ? Colours.green
                    : value === 'Declined'
                    ? Colours.red
                    : Colours.foreground};
                  float: right;
                  border: 2px solid
                    ${value === 'Accepted'
                      ? Colours.green
                      : value === 'Declined'
                      ? Colours.red
                      : Colours.purple};
                  color: white;
                  display: grid;
                  place-items: center;
                  box-shadow: 0px 8px 20px -10px rgba(113, 113, 138, 1);
                `}
              >
                {value === 'Accepted' ? (
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
            )
          } else if (
            (altTitle === 'Medicines' && index === 5) ||
            (altTitle === 'Allergies' && index === 4) ||
            (altTitle === 'Diagnosis' && index === 4)
          ) {
            return (
              <Core.Text key={index} id="data">
                {new Date(parseInt(value)).toDateString()}
              </Core.Text>
            )
          } else if (altTitle === 'Users' && index === 3) {
            return (
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
            )
          } else if (altTitle === 'Roles' && index === 2) {
            return (
              <div
                css={`
                  width: 100%;
                  display: grid;
                  justify-items: center;
                `}
              >
                <Core.Text
                  color={Colours.purple}
                  key={index}
                  customSize="15px"
                  id="data"
                >
                  {value}
                </Core.Text>
              </div>
            )
          } else if (altTitle === 'Roles' && index === 3) {
            return (
              <div
                css={`
                  width: 100%;
                  display: grid;
                  justify-items: center;
                `}
              >
                <Core.Text
                  color={Colours.purple}
                  key={index}
                  customSize="15px"
                  id="data"
                >
                  {value}
                </Core.Text>
              </div>
            )
          } else {
            return (
              <Core.Text
                color={
                  selectedRows.rows.includes(data.id)
                    ? Colours.purple
                    : Colours.text
                }
                key={index}
                customSize="16px"
                id="data"
                Contained
                align={justify || 'center'}
                width="100%"
              >
                {value}
              </Core.Text>
            )
          }
        }
        return null
      })}
      {!noAction && !restricted && (
        <div
          css={`
            width: 100%;
            display: flex;
            align-content: center;
            justify-content: Center;
          `}
          id="ActionButtons"
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
              <Icons.MoreHorizRoundedIcon
                style={{
                  color: selectedRows.rows.includes(data.id)
                    ? Colours.purple
                    : Colours.textGrey,
                  cursor:
                    selectedRows.rows.length <= 1 ? 'pointer' : 'not-allowed',
                  zIndex: 0,
                  fontSize: '20px',
                }}
              />
              <RowActionCard
                setshowActions={setshowActions}
                show={showActions.state}
                validID={showActions.id}
                id={id}
                right="35px;"
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
                    data={data}
                    purpose="major"
                  />
                ) : null}
                {(enableAction && OrganisationStatus === 'SUSPENDED') ||
                (altTitle === 'Users' && status === 0) ? (
                  <ActionItemsContainer
                    title="Enable"
                    Icon={Icons.PlayCircleOutlineRoundedIcon}
                    action={enableAction}
                    dataSetId={id}
                    id="enable"
                    data={data}
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
                    data={data}
                    id="suspend"
                  />
                ) : null}
                {deleteAction && !restricted && (
                  <ActionItemsContainer
                    title="Delete"
                    Icon={Icons.DeleteRoundedIcon}
                    action={deleteAction}
                    dataSetId={id}
                    data={data}
                    purpose="major"
                  />
                )}
                {permissionAction && !restricted && (
                  <ActionItemsContainer
                    title="Permissions"
                    Icon={Icons.GavelRoundedIcon}
                    action={permissionAction}
                    id="permissions"
                    dataSetId={id}
                    data={data}
                  />
                )}
                {symptomsAction && (
                  <ActionItemsContainer
                    title="Symptoms"
                    Icon={Icons.LaunchIcon}
                    action={symptomsAction}
                    id="symptoms"
                    dataSetId={id}
                    data={data}
                  />
                )}
                {requestAction && altTitle === 'GlobalPatients' && hide && (
                  <ActionItemsContainer
                    title="Request Access"
                    Icon={Icons.VerifiedUserRoundedIcon}
                    action={requestAction}
                    id="request"
                    dataSetId={id}
                    data={data}
                  />
                )}
              </RowActionCard>
            </Wrapper>
          ) : null}
        </div>
      )}
    </div>
  )
}

const Wrapper = ({
  numOfRows,
  setshowActions,
  show,
  id,
  children,
  actions,
  facilityStatus,
  role,
}) => {
  let toolTip = {}
  if (
    facilityStatus === 'SUSPENDED' &&
    (role === 'RegularUser' || role === 'AdminUser')
  ) {
    toolTip = {
      'aria-label': 'Not available while facility is suspended',
      'data-balloon-pos': 'left',
    }
  }

  return (
    <section
      {...toolTip}
      css={`
        &:hover {
          cursor: pointer;
        }
      `}
      onClick={() => {
        if (
          facilityStatus === 'SUSPENDED' &&
          (role === 'RegularUser' || role === 'AdminUser')
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
}
