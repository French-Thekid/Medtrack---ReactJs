import React, { useEffect, useState } from 'react'
import 'styled-components/macro'
import ActiveUsers from './ExistingUser'
import {
  Layout,
  Core,
  Colours,
  MenuNavigation,
  Icons,
  Content,
  Loading,
  Notification,
} from 'components'
import { useRouteMatch } from 'react-router-dom'
import { LIST_USERS, SEARCH_USERS } from '../users/queries'
import { DUPLICATE_UPDATE_ROLE, UPDATE_ROLE_USERS } from './mutations'
import { LIST_ROLES, SEARCH_ROLES, READ_ROLES } from './queries'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'

export default function CreateRole() {
  const [view, setView] = useState('Roles')
  const [completed, setcompleted] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState({ roles: [] })
  const [selectedUsers, setSelectedUsers] = useState({ users: [] })
  const {
    params: { roleId },
  } = useRouteMatch()

  //Mutations
  const [
    duplicateRoles,
    { loading: loadingDuplicated, error: duplicateRolesError },
  ] = useMutation(DUPLICATE_UPDATE_ROLE, {
    refetchQueries: () => [
      {
        query: LIST_ROLES,
      },
      {
        query: READ_ROLES,
        variables: { id: parseInt(roleId) },
      },
    ],
  })
  const [
    updateRoleUsers,
    { loading: loadingUsers, error: updateRoleUsersError },
  ] = useMutation(UPDATE_ROLE_USERS, {
    refetchQueries: () => [
      {
        query: LIST_ROLES,
      },
      {
        query: LIST_USERS,
      },
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
  let { loading, error, data: users } = useQuery(LIST_USERS)
  const [
    searchUsers,
    { loading: loading0, error: error0, data: searchResult },
  ] = useLazyQuery(SEARCH_USERS)
  let { loading: loading1, error: error1, data: roles } = useQuery(LIST_ROLES)
  const [
    searchRoles,
    { loading: loading02, error: error02, data: searchResultRoles },
  ] = useLazyQuery(SEARCH_ROLES)
  const {
    loading: loadingDetails,
    error: detailsError,
    data: roleDetails,
  } = useQuery(READ_ROLES, {
    variables: { id: parseInt(roleId) },
  })

  if (loading || loading1 || loadingDetails) return <Loading small />
  if (loading0 || loading02) console.log('Seaching')
  if (error || error0)
    return <Content.Alert type="error" message={'Failed to load users'} />
  if (error1 || error02)
    return <Content.Alert type="error" message={'Failed to load roles'} />
  if (detailsError)
    return (
      <Content.Alert
        type="error"
        message={'Failed to load users on this role'}
      />
    )

  //Handling Seaarch Results (Roles)
  const { listRoles: searchListRoles } = searchResultRoles || {}
  const { total: searchTotalRoles } = searchListRoles || {}

  if (searchTotalRoles > 0) roles = searchResultRoles

  //Handling Seaarch Results
  const { listUsers: searchListUsers } = searchResult || {}
  const { total: searchTotal } = searchListUsers || {}

  if (searchTotal > 0) users = searchResult

  const UserList = users.listUsers.data
  const RoleList = roles.listRoles.data
  const { name, activeUsers = [] } = roleDetails.readRole || {}

  const removeRole = (id) => {
    setSelectedRoles((prevState) => {
      const roles = prevState.roles.filter((item, j) => item !== id)
      return {
        roles,
      }
    })
  }

  const addRole = (id) => {
    setSelectedRoles((state) => {
      const roles = state.roles.concat(id)
      return {
        roles,
      }
    })
  }

  const removeUser = (id) => {
    setSelectedUsers((prevState) => {
      const users = prevState.users.filter((item, j) => item !== id)
      return {
        users,
      }
    })
  }

  const handleChange = async () => {
    if (selectedRoles.roles.length > 0) {
      console.log('Adding Roles', selectedRoles.roles)
      await duplicateRoles({
        variables: {
          params: {
            roleId: parseInt(roleId),
            duplicateIds: selectedRoles.roles,
          },
        },
      }).catch((e) => {
        console.log(e)
      })
    }
    if (
      selectedUsers.users.length > 0 ||
      selectedUsers.users.length < activeUsers.length
    ) {
      console.log('Adding Users', selectedUsers)
      await updateRoleUsers({
        variables: {
          params: {
            roleId: parseInt(roleId),
            userIds: selectedUsers.users,
          },
        },
      }).catch((e) => {
        console.log(e)
      })
    }
  }

  const showNotification = () => {
    setcompleted(true)
    setTimeout(() => {
      setcompleted(false)
    }, 6000)
  }

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 20px;
        overflow-y: auto;
      `}
    >
      {(loadingDuplicated || loadingUsers) && <Loading />}
      {duplicateRolesError && (
        <Content.Alert type="error" message={'Failed to duplicate roles'} />
      )}
      {updateRoleUsersError && (
        <Content.Alert
          type="error"
          message={'Failed to update users on roles'}
        />
      )}
      <Notification
        setcompleted={setcompleted}
        message="Role successfully updated."
        notification={completed}
      />
      <Layout.TopPanel
        title={`Manage Role - ${name}`}
        to={`/facility/settings/roles/view-role/${roleId}`}
        cleanUp={() => localStorage.removeItem('ran')}
      >
        <Core.Button bgColour={Colours.green} onClick={() => handleChange()}>
          Save
        </Core.Button>
      </Layout.TopPanel>
      <div
        css={`
          display: grid;
          grid-template-rows: max-content 1fr;
          grid-row-gap: 20px;
          overflow-y: auto;
        `}
      >
        <MenuNavigation.Container>
          <MenuNavigation.MainItem
            alternative={() => setView('Roles')}
            active={view === 'Roles'}
          >
            Roles
          </MenuNavigation.MainItem>
          <MenuNavigation.MainItem
            alternative={() => setView('Users')}
            active={view === 'Users'}
          >
            Users
          </MenuNavigation.MainItem>
        </MenuNavigation.Container>
        <div
          css={`
            display: grid;
            grid-template-columns: ${view === 'Roles' ? '1fr 1fr' : '1fr 2fr'};
            grid-gap: 30px;
            height: 100%;
            overflow-y: auto;
            @media screen and (max-width: 769px) {
              grid-template-columns: 1fr;
              grid-template-rows: max-content;
              grid-gap: 50px;
            }
            /* Tablets */
            @media screen and (max-width: 769px) {
              @media screen and (max-height: 1025px) {
                @media screen and (orientation: portrait) {
                  grid-template-columns: 1fr;
                  grid-template-rows: max-content;
                  grid-gap: 50px;
                }
              }
            }
            /* Ipod Pro */
            @media (max-width: 1024px) {
              grid-template-columns: 1fr;
              grid-template-rows: max-content;
              grid-gap: 50px;
            }
          `}
        >
          <Layout.Card
            responsive
            title={view === 'Roles' ? 'Role Duplicated' : 'Users Added'}
          >
            {view === 'Roles' && (
              <div
                css={`
                  height: 100%;
                  overflow-y: auto;
                `}
              >
                <div
                  css={`
                    display: grid;
                    width: calc(100% - 20px);
                    padding: 0px 10px;
                    height: 40px;
                    background: #f9f9fb;
                    grid-template-columns: 1fr 2fr 50px;
                    justify-items: start;
                    align-items: center;
                    @media screen and (max-width: 1440px) {
                      grid-template-columns: 1fr 2fr 50px;
                    }
                    /* tablet */
                    @media only screen and (max-height: 769px) {
                      @media only screen and (max-width: 1025px) {
                        @media (orientation: landscape) {
                          grid-template-columns: 1fr 2fr 50px;
                        }
                      }
                    }
                    /* ipad pro */
                    @media (width: 1024px) {
                      @media (height: 1366px) {
                        @media (orientation: portrait) {
                          grid-template-columns: 1fr 2fr 50px;
                        }
                      }
                    }
                  `}
                >
                  <Core.Text colour="#7462AB" fontMax="15px">
                    Name
                  </Core.Text>
                  <Core.Text colour="#7462AB" fontMax="15px">
                    Description
                  </Core.Text>
                  <Core.Text colour="#7462AB" fontMax="15px">
                    Action
                  </Core.Text>
                </div>
                <div
                  css={`
                    height: calc(100% - 40px);
                    overflow-y: auto;
                  `}
                >
                  {RoleList.map(({ name, description, id }, index) => {
                    if (name !== 'Supreme Administrator')
                      if (selectedRoles.roles.includes(id))
                        return (
                          <RolesTable
                            key={index}
                            name={name}
                            description={description}
                            id={id}
                            remove
                            action={removeRole}
                            activeUsers={activeUsers}
                            setSelectedUsers={setSelectedUsers}
                          />
                        )
                    return null
                  })}
                </div>
              </div>
            )}

            {view === 'Users' && (
              <ActiveUsers
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                removeUser={removeUser}
                activeUsers={activeUsers}
                UserList={UserList}
              />
            )}
          </Layout.Card>
          <Layout.Card
            title={view === 'Roles' ? 'Duplicate Role' : 'Add Users'}
            responsive
            searchHandler={view === 'Roles' ? searchRoles : searchUsers}
            searchPlaceholder={
              view === 'Roles' ? 'Search Roles' : 'Search Users'
            }
          >
            {view === 'Roles' && (
              <div
                css={`
                  height: 100%;
                  overflow-y: auto;
                `}
              >
                <div
                  css={`
                    display: grid;
                    width: calc(100% - 20px);
                    padding: 0px 10px;
                    height: 40px;
                    background: #f9f9fb;
                    grid-template-columns: 1fr 2fr 50px;
                    justify-items: start;
                    align-items: center;
                    @media screen and (max-width: 1440px) {
                      grid-template-columns: 1fr 2fr 50px;
                    }
                    /* tablet */
                    @media only screen and (max-height: 769px) {
                      @media only screen and (max-width: 1025px) {
                        @media (orientation: landscape) {
                          grid-template-columns: 1fr 2fr 50px;
                        }
                      }
                    }
                    /* ipad pro */
                    @media (width: 1024px) {
                      @media (height: 1366px) {
                        @media (orientation: portrait) {
                          grid-template-columns: 1fr 2fr 50px;
                        }
                      }
                    }
                  `}
                >
                  <Core.Text colour="#7462AB" fontMax="15px">
                    Name
                  </Core.Text>
                  <Core.Text colour="#7462AB" fontMax="15px">
                    Description
                  </Core.Text>
                  <Core.Text colour="#7462AB" fontMax="15px">
                    Action
                  </Core.Text>
                </div>
                <div
                  css={`
                    height: calc(100% - 40px);
                    overflow-y: auto;
                  `}
                >
                  {RoleList.map(({ name, description, id }, index) => {
                    if (name !== 'Supreme Administrator')
                      if (
                        !selectedRoles.roles.includes(id) &&
                        id !== parseInt(roleId)
                      )
                        return (
                          <RolesTable
                            key={index}
                            name={name}
                            description={description}
                            id={id}
                            add
                            action={addRole}
                            activeUsers={activeUsers}
                            setSelectedUsers={setSelectedUsers}
                          />
                        )
                    return null
                  })}
                </div>
              </div>
            )}
            {view === 'Users' && (
              <div
                css={`
                  display: flex;
                  flex-wrap: wrap;
                  gap: 30px;
                  align-content: flex-start;
                  width: 100%;
                  height: calc(100% - 5px);
                  padding-top: 5px;
                  @media screen and (max-width: 769px) {
                    gap: 20px;
                  }
                  overflow-y: auto;
                `}
              >
                {loading0 && <Loading Contained />}
                {UserList.map(
                  ({ avatar, firstName, lastName, type, id }, index) => {
                    if (!selectedUsers.users.includes(id))
                      return (
                        <Content.UserCard
                          key={index}
                          avatar={avatar}
                          firstName={firstName}
                          lastName={lastName}
                          extra={type}
                          id={id}
                          setSelectedUsers={setSelectedUsers}
                          selectedUsers={selectedUsers}
                        />
                      )
                    return null
                  }
                )}
              </div>
            )}
          </Layout.Card>
        </div>
      </div>
    </div>
  )
}

const RolesTable = ({
  add,
  remove,
  name,
  id,
  action,
  description,
  activeUsers,
  setSelectedUsers,
  ...rest
}) => {
  const initialUsers = activeUsers.map(({ id }, index) => id)
  useEffect(() => {
    if (
      localStorage.getItem('ran') === null ||
      localStorage.getItem('ran') === undefined
    ) {
      setSelectedUsers({ users: initialUsers })
      localStorage.setItem('ran', true)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div
      {...rest}
      css={`
        display: grid;
        width: calc(100% - 20px);
        padding: 10px;
        grid-template-columns: 1fr 2fr 50px;
        place-items: start;
        border-bottom: 1px solid ${Colours.border};
        @media screen and (max-width: 1440px) {
          grid-template-columns: 1fr 2fr 50px;
        }
        /* tablet */
        @media only screen and (max-height: 769px) {
          @media only screen and (max-width: 1025px) {
            @media (orientation: landscape) {
              grid-template-columns: 1fr 2fr 50px;
            }
          }
        }
        /* ipad pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              grid-template-columns: 1fr 2fr 50px;
            }
          }
        }
      `}
    >
      <Core.Text>{name}</Core.Text>
      <Core.Text>{description}</Core.Text>
      <div
        css={`
          width: 100%;
          display: grid;
          place-items: center;
        `}
      >
        <div
          css={`
            width: 30px;
            height: 30px;
            border-radius: 5px;
            color: ${Colours.foreground};
            font-size: 20px;
            background: ${add
              ? Colours.purple
              : remove
              ? Colours.red
              : Colours.purple};
            display: grid;
            place-items: center;

            &:hover {
              cursor: pointer;
              box-shadow: 0px 8px 20px -2px rgba(186, 186, 186, 1);
              transition: ease-out 0.2s;
              transform: translateY(-1px);
            }
          `}
          onClick={() => action(id)}
        >
          {add && <Icons.AddRoundedIcon style={{ fontSize: 'inherit' }} />}
          {remove && (
            <Icons.DeleteRoundedIcon style={{ fontSize: 'inherit' }} />
          )}
        </div>
      </div>
    </div>
  )
}
