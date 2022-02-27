import React from 'react'
import 'styled-components/macro'
import { READ_ROLES } from './queries'
import { useQuery } from '@apollo/react-hooks'
import { Layout, Core, Colours, Content, Loading } from 'components'
import { useHistory, useRouteMatch } from 'react-router-dom'

export default function CreateRole() {
  const history = useHistory()
  const {
    params: { roleId },
  } = useRouteMatch()

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

  const { name, description, activeUsers = [] } = roles.readRole || {}

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
        title={`View Role - ${name}`}
        cleanUp={() => localStorage.removeItem('selectedRole')}
        to="/facility/settings/roles"
      >
        <div
          css={`
            display: grid;
            grid-template-columns: repeat(2, max-content);
            grid-gap: 10px;
            align-items: Center;
          `}
        >
          <Core.Button
            purpose="major"
            bgColour={Colours.teal}
            onClick={() =>
              history.push(`/facility/settings/roles/permissions/${roleId}`)
            }
            disabled={name === 'Doctor Basic' || name === 'Secretary Basic'}
          >
            Permissions
          </Core.Button>
          <Core.Button
            purpose="major"
            onClick={() =>
              history.push(`/facility/settings/roles/manage-role/${roleId}`)
            }
            disabled={name === 'Doctor Basic' || name === 'Secretary Basic'}
          >
            Manage
          </Core.Button>
        </div>
      </Layout.TopPanel>
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 2fr;
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
          @media (width: 1024px) {
            @media (height: 1366px) {
              @media (orientation: portrait) {
                grid-template-columns: 1fr;
                grid-template-rows: max-content;
                grid-gap: 50px;
              }
            }
          }
        `}
      >
        <Layout.Card title="Role Details">
          <div>
            <Layout.DataDisplay label={'Name'} value={name} />
            <br />
            <Layout.DataDisplay label={'Description'} value={description} />
          </div>
        </Layout.Card>
        <Layout.Card title="Assigned Users" responsive>
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
                grid-template-columns: 150px repeat(3, 1fr);
                @media screen and (max-width: 1440px) {
                  grid-template-columns: 60px repeat(3, 1fr);
                }
                /* tablet */
                @media only screen and (max-height: 769px) {
                  @media only screen and (max-width: 1025px) {
                    @media (orientation: landscape) {
                      grid-template-columns: 80px repeat(3, 1fr);
                    }
                  }
                }
                /* ipad pro */
                @media (width: 1024px) {
                  @media (height: 1366px) {
                    @media (orientation: portrait) {
                      grid-template-columns: 150px repeat(3, 1fr);
                    }
                  }
                }
                @media only screen and (max-width: 1025px) {
                  grid-template-columns: 150px repeat(2, 1fr);
                }
                place-items: center;
              `}
            >
              <Core.Text colour="#7462AB" fontMax="15px">
                Avatar
              </Core.Text>
              <Core.Text colour="#7462AB" fontMax="15px">
                Name
              </Core.Text>
              <Core.Text colour="#7462AB" fontMax="15px">
                Type
              </Core.Text>
              <div
                css={`
                  @media only screen and (max-width: 1025px) {
                    display: none;
                  }
                `}
              >
                <Core.Text colour="#7462AB" fontMax="15px">
                  Email
                </Core.Text>
              </div>
            </div>
            <div
              css={`
                height: calc(100% - 40px);
                overflow-y: auto;
              `}
            >
              {activeUsers.map(
                ({ avatar, firstName, lastName, email, type }, index) => {
                  return (
                    <UserTable
                      key={index}
                      avatar={avatar}
                      firstName={firstName}
                      lastName={lastName}
                      email={email}
                      type={type}
                    />
                  )
                }
              )}
            </div>
          </div>
        </Layout.Card>
      </div>
    </div>
  )
}

const UserTable = ({ type, firstName, lastName, email, avatar, ...rest }) => {
  return (
    <div
      {...rest}
      css={`
        display: grid;
        width: calc(100% - 20px);
        padding: 10px;
        grid-template-columns: 150px repeat(3, 1fr);
        grid-row-gap: 20px;
        border-bottom: 1px solid ${Colours.border};
        @media screen and (max-width: 1440px) {
          grid-template-columns: 60px repeat(3, 1fr);
        }
        /* tablet  */
        @media only screen and (max-height: 769px) {
          @media only screen and (max-width: 1025px) {
            @media (orientation: landscape) {
              grid-template-columns: 80px repeat(3, 1fr);
            }
          }
        }
        /* ipad pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              grid-template-columns: 150px repeat(3, 1fr);
            }
          }
        }
        @media only screen and (max-width: 1025px) {
          grid-template-columns: 150px repeat(2, 1fr);
        }
        place-items: center;
        overflow-y: auto;
      `}
    >
      <Content.Avatar
        src={avatar}
        firstName={firstName}
        lastName={lastName}
        size="medium"
        shadow
      />
      <Core.Text customSize="18px" colour="#7462AB">
        {`${firstName} ${lastName}`}
      </Core.Text>
      <div
        css={`
          padding: 2px 10px;
          background-color: ${type === 'Doctor'
            ? Colours.purple
            : Colours.orange};
          border-radius: 25px;
          width: 80px;
          display: grid;
          justify-items: center;
        `}
      >
        <Core.Text color={Colours.foreground} customSize="15px" id="data">
          {type}
        </Core.Text>
      </div>
      <div
        css={`
          @media only screen and (max-width: 1025px) {
            display: none;
          }
        `}
      >
        <Core.Text Contained customSize="18px" color={Colours.purple}>
          {email}
        </Core.Text>
      </div>
    </div>
  )
}
