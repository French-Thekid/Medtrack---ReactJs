import React, { useEffect, useState } from 'react'
import 'styled-components/macro'
import { READ_ROLES } from './queries'
import {
  Layout,
  Core,
  Colours,
  Content,
  Loading,
  Icons,
  FormControl,
  Notification,
} from 'components'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { keyframes } from 'styled-components'
import { RadioGroup, FormControlLabel } from '@material-ui/core'
import { UPDATE_ROLE_PERMISSIONS } from './mutations'
import { useQuery, useMutation } from '@apollo/react-hooks'

export default function Permissions() {
  const history = useHistory()
  const {
    params: { roleId },
  } = useRouteMatch()
  const [selectedPermissions, setSelectedPermissions] = useState({
    permissions: [],
  })
  const [completed, setcompleted] = useState(false)
  const showNotification = () => {
    setcompleted(true)
    setTimeout(() => {
      setcompleted(false)
    }, 6000)
  }

  //Mutations
  const [
    updateRolePermissions,
    { loading: loading1, error: addPermissionsToRoleError },
  ] = useMutation(UPDATE_ROLE_PERMISSIONS, {
    refetchQueries: () => [
      {
        query: READ_ROLES,
        variables: { id: parseInt(roleId) },
      },
    ],
    onCompleted() {
      showNotification()
    },
  })

  //Query
  const {
    loading,
    error,
    data: roles,
  } = useQuery(READ_ROLES, {
    variables: { id: parseInt(roleId) },
  })
  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert type="error" message={'Failed to load role details'} />
    )

  const { name, permissions = [] } = roles.readRole || {}

  const entities = permissions.map(({ id, entity, action }, index) => {
    let object = JSON.stringify({ feature: entity, action: action })
    return { object, id }
  })
  let grouping = []
  for (let i = 0; i < entities.length; i++) {
    grouping.push({
      object: entities[i].object,
      ids: entities
        .map((item, j) => {
          if (entities[i].object === entities[j].object) return entities[j].id
          return null
        })
        .filter((item, index) => item !== null),
    })
  }
  const temp = grouping.map((item, index) => JSON.stringify(item))
  let filteredList = temp.filter((c, index) => {
    return temp.indexOf(c) === index
  })
  const temp1 = filteredList.map((item, index) => JSON.parse(item))

  const temp2 = temp1.map(({ object, ids }, index) => {
    const entity = JSON.parse(object)
    return { feature: entity.feature, action: entity.action, ids }
  })

  let finalGrouping = []
  for (let i = 0; i < temp2.length; i++) {
    finalGrouping.push({
      feature: temp2[i].feature,
      actions: temp2
        .map((item, j) => {
          if (temp2[i].feature === temp2[j].feature)
            return { action: temp2[j].action, ids: temp2[j].ids }
          return null
        })
        .filter((item, index) => item !== null),
    })
  }
  const temp3 = finalGrouping.map((item, index) => JSON.stringify(item))
  let filteredList1 = temp3.filter((c, index) => {
    return temp3.indexOf(c) === index
  })
  const finalList = filteredList1.map((item, index) => JSON.parse(item))

  const actions = finalList.map((item, index) =>
    item.actions.map((action, index) => action.ids)
  )
  var merged = [].concat.apply([], actions)
  let existingIds = merged.map((item, index) => JSON.stringify(item))

  const handleUpdate = async (permissions) => {
    const a1 = permissions.map((a, index) => JSON.parse(a))
    var merged = [].concat.apply([], a1)
    let permissionIds = [...new Set(merged)]

    console.log('List updated to ', permissionIds)
    await updateRolePermissions({
      variables: {
        params: {
          roleId: parseInt(roleId),
          permissionIds: permissionIds,
        },
      },
    }).catch((e) => {
      console.log(e)
    })
  }

  console.log('List1', selectedPermissions.permissions)

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 20px;
      `}
    >
      <Layout.TopPanel
        title={`Permissions On ${name}`}
        to={`/facility/settings/roles/view-role/${roleId}`}
      >
        <Core.Button
          purpose="major"
          onClick={() => {
            localStorage.setItem('existingIds', JSON.stringify(existingIds))
            history.push(
              `/facility/settings/roles/manage-permissions/${roleId}`
            )
          }}
        >
          Add Permissions
        </Core.Button>
      </Layout.TopPanel>
      <div
        css={`
          overflow-y: auto;
          transition: 0.2s ease-in-out;
        `}
      >
        <Notification
          setcompleted={setcompleted}
          message="Permissions successfully updated."
          notification={completed}
        />
        {loading1 && <Loading small />}
        {addPermissionsToRoleError && (
          <Content.Alert
            type="error"
            message={'Failed to update role permissions'}
          />
        )}
        <Display
          finalList={finalList}
          existingIds={existingIds}
          setSelectedPermissions={setSelectedPermissions}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  )
}

function Display({
  finalList,
  existingIds,
  handleUpdate,
  setSelectedPermissions,
}) {
  useEffect(
    () => {
      setSelectedPermissions({ permissions: existingIds })
    },
    // eslint-disable-next-line
    []
  )


  return (
    <div
      css={`
        transition: 0.2s ease-in-out;
        height: 100%;
      `}
    >
      {finalList.length === 0 ? (
        <Placeholder />
      ) : (
        finalList.map(({ feature }, index) => {
          return (
            <div
              key={index}
              css={`
                margin-bottom: 20px;
              `}
            >
              <CollapsibleComponent
                noFeature
                feature={feature}
                data={finalList}
                defaultClose
                existing
                handleUpdate={handleUpdate}
                setSelectedPermissions={setSelectedPermissions}
                existingIds={existingIds}
              />
            </div>
          )
        })
      )}
    </div>
  )
}

export const CollapsibleComponent = ({
  noFeature,
  feature,
  setSelectedPermissions,
  data = [],
  defaultClose,
  bottom,
  handleRemoval,
  existing,
  handleUpdate,
  existingIds = [],
  ...rest
}) => {
  const [selectedFeature, setSelectedFeature] = useState('')
  const Actions = data
    .map((item, index) => {
      if (item.feature === feature || item.feature === selectedFeature)
        return item.actions
      return null
    })
    .filter((item, index) => item !== null)

  const handleDelete = () => {
    const listToRemove =
      Actions.length > 0
        ? Actions[0].map(({ action, ids }, index) => JSON.stringify(ids))
        : []
    if (handleRemoval) handleRemoval()
    listToRemove.map((itemMain, index) => {
      console.log('Removing', itemMain)
      setSelectedPermissions((state) => {
        const permissions = state.permissions.filter(
          (item, j) => item !== itemMain
        )
        return {
          permissions,
        }
      })
      return null
    })
  }

  return (
    <CollapsibleContainer
      main
      title={feature || selectedFeature}
      defaultClose={defaultClose}
      bottom={bottom}
      handleDelete={handleDelete}
      rest={rest}
      existing={existing}
    >
      <div
        css={`
          display: grid;
          grid-gap: 20px;
        `}
      >
        {!noFeature && (
          <CollapsibleContainer title="Features">
            <RadioGroup
              name="feature"
              value={selectedFeature}
              onChange={(e) => setSelectedFeature(e.target.value)}
            >
              <div
                css={`
                  display: grid;
                  align-items: center;
                  grid-template-columns: repeat(5, 1fr);
                  grid-column-gap: 20px;
                  @media (max-width: 1366px) {
                    grid-template-columns: repeat(4, 1fr);
                  }
                  @media only screen and (max-width: 1025px) {
                    @media only screen and (max-height: 769px) {
                      @media (orientation: landscape) {
                        grid-template-columns: repeat(3, 1fr);
                      }
                    }
                  }
                  @media only screen and (max-width: 769px) {
                    @media only screen and (max-height: 1025px) {
                      @media (orientation: portrait) {
                        grid-template-columns: repeat(3, 1fr);
                      }
                    }
                  }
                  /* ipad pro */
                  @media (width: 1024px) {
                    @media (height: 1366px) {
                      @media (orientation: portrait) {
                        grid-template-columns: repeat(4, 1fr);
                      }
                    }
                  }
                `}
              >
                {data.map(({ feature }, index) => {
                  return (
                    <div
                      css={`
                        display: grid;
                        align-items: center;
                        grid-template-columns: 30px 1fr;
                        grid-gap: 10px;
                        justify-items: start;
                      `}
                    >
                      <FormControlLabel
                        value={feature}
                        control={<FormControl.RadioButton />}
                      />
                      <Core.Text>{feature}</Core.Text>
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
          </CollapsibleContainer>
        )}
        <CollapsibleContainer title="Actions">
          <div
            css={`
              display: grid;
              align-items: center;
              grid-template-columns: repeat(4, 150px);
              grid-column-gap: 20px;
            `}
          >
            {Actions.length > 0 &&
              Actions[0].map(({ action, ids }, index) => {
                return (
                  <div
                    css={`
                      display: grid;
                      align-items: center;
                      grid-template-columns: 30px 1fr;
                      grid-column-gap: 0px;
                      justify-items: start;
                    `}
                  >
                    <section
                      css={`
                        padding-bottom: 2px;
                      `}
                    >
                      {existing ? (
                        <div
                          css={`
                            color: ${Colours.icon};
                            margin-right: 10px;
                            padding-top: 4px;
                            &:hover {
                              color: ${Colours.red};
                              cursor: pointer;
                              transition: ease-out 0.2s;
                              transform: translateY(-1px);
                            }
                          `}
                          onClick={() => {
                            setSelectedPermissions((state) => {
                              let permissions = []
                              if (existing)
                                permissions = existingIds.filter(
                                  (item, j) => item !== JSON.stringify(ids)
                                )
                              else
                                permissions = state.permissions.filter(
                                  (item, j) => item !== JSON.stringify(ids)
                                )
                              if (existing) {
                                handleUpdate(permissions)
                              }
                              return {
                                permissions,
                              }
                            })
                          }}
                        >
                          <Icons.DeleteRoundedIcon
                            style={{ color: 'inherit', fontSize: '18px' }}
                          />
                        </div>
                      ) : (
                        <FormControl.Checkbox
                          startwithoff={noFeature}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPermissions((state) => {
                                const permissions = state.permissions.concat(
                                  JSON.stringify(ids)
                                )
                                return {
                                  permissions,
                                }
                              })
                            } else {
                              setSelectedPermissions((state) => {
                                const permissions = state.permissions.filter(
                                  (item, j) => item !== JSON.stringify(ids)
                                )
                                // if (existing) {
                                //   handleUpdate(permissions)
                                // }
                                return {
                                  permissions,
                                }
                              })
                            }
                          }}
                        />
                      )}
                    </section>
                    <Core.Text>{action}</Core.Text>
                  </div>
                )
              })}
          </div>
        </CollapsibleContainer>
      </div>
    </CollapsibleContainer>
  )
}

const CollapsibleContainer = ({
  title,
  main,
  children,
  defaultClose,
  bottom,
  handleDelete,
  existing,
  rest,
}) => {
  const [showing, setShowing] = useState(defaultClose ? false : '')

  const rotation = keyframes`
  0% { transform:  rotate(0deg); }
  100%   { transform: rotate(180deg); } 
`
  const rotation1 = keyframes`
  100% { transform:  rotate(0deg); }
  0%   { transform: rotate(180deg); } 
`

  return (
    <div
      css={`
        transition: 0.2s ease-in-out;
        &:hover {
          cursor: pointer;
          transition: 0.2s ease-in-out;
        }
        margin-bottom: ${bottom ? '20px' : '0px'};
      `}
      {...rest}
    >
      <div
        css={`
          display: grid;
          grid-template-rows: max-content 1fr;
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: ${main
              ? `1fr max-content max-content`
              : `1fr max-content`};
            padding: 10px;
            align-items: center;
            border: 1px solid ${Colours.border};
            background: ${showing || showing === ''
              ? Colours.menuHover
              : Colours.purple};
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            transition: ease-out 0.5s;
          `}
        >
          <Core.Text
            weight="600"
            customSize={main ? '20px' : '18px'}
            color={
              showing || showing === '' ? Colours.text : Colours.foreground
            }
          >
            {title === '' ? 'Select A Feature' : title}
          </Core.Text>
          {main && !existing && (
            <div
              css={`
                color: ${showing || showing === ''
                  ? Colours.icon
                  : Colours.foreground};
                margin-right: 10px;
                &:hover {
                  color: ${Colours.red};
                  cursor: pointer;
                  transition: ease-out 0.2s;
                  transform: translateY(-1px);
                  border: 1px solid ${Colours.red};
                }
                width: 26px;
                height: 26px;
                padding: 2px;
                border-radius: 5px;
                border: 1px solid ${Colours.border};
                display: grid;
                place-items: Center;
              `}
              onClick={() => handleDelete()}
            >
              <Icons.DeleteRoundedIcon
                style={{ color: 'inherit', fontSize: '18px' }}
              />
            </div>
          )}
          <div
            css={`
              border: 1px solid ${Colours.border};
              padding: 2px;
              border-radius: 5px;
              color: ${showing || showing === ''
                ? Colours.icon
                : Colours.foreground};
              width: 26px;
              height: 26px;
              &:hover {
                cursor: pointer;
                transition: ease-out 0.2s;
                transform: translateY(-1px);
                color: ${showing || showing === ''
                  ? Colours.purple
                  : Colours.foreground};
                border: 1px solid
                  ${showing || showing === ''
                    ? Colours.purple
                    : Colours.foreground};
              }
              display: grid;
              place-items: Center;
            `}
            onClick={() =>
              setShowing(() => {
                if (showing === '') return false
                else if (showing === false) return true
                else return false
              })
            }
          >
            <div
              css={`
                color: 'inherit';
                -webkit-animation: ${showing === ''
                    ? 'none'
                    : showing === false
                    ? rotation
                    : rotation1}
                  1s ease-in-out both;
                animation: ${showing === ''
                    ? 'none'
                    : showing === false
                    ? rotation
                    : rotation1}
                  1s ease-in-out both;
              `}
            >
              <Icons.ExpandMoreRoundedIcon style={{ color: 'inherit' }} />
            </div>
          </div>
        </div>
        <div
          css={`
            width: ${showing || showing === ''
              ? 'calc(100% - 22px)'
              : 'calc(100% - 2px)'};
            display: grid;
            transition: ease-in-out 0.8s;
            height: ${showing || showing === '' ? 'calc(100% - 20px)' : '0px'};
            padding: ${showing || showing === '' ? '10px' : '0px'};
            overflow-y: hidden;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            border: 1px solid ${Colours.border};
          `}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

const Placeholder = () => (
  <div
    css={`
      height: calc(100% - 20px);
      overflow-y: auto;
      background: #fdf8ff;
      border-radius: 5px;
      padding: 10px;
      display: grid;
      place-items: center;
    `}
  >
    <Core.Text color={Colours.purple} customSize="30px">
      No Permissions Added Yet
    </Core.Text>
  </div>
)
