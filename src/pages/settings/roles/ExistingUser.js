import React, { useEffect } from 'react'
import 'styled-components/macro'

import { Core, Colours, Icons, Content } from 'components'

export default function ActiveUsers({
  selectedUsers,
  setSelectedUsers,
  removeUser,
  UserList,
  activeUsers,
}) {
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
          grid-template-columns: 80px 1fr 50px;
          place-items: center;
          @media screen and (max-width: 1440px) {
            grid-template-columns: 80px 1fr 50px;
          }
          /* tablet */
          @media only screen and (max-height: 769px) {
            @media only screen and (max-width: 1025px) {
              @media (orientation: landscape) {
                grid-template-columns: 80px 1fr 50px;
              }
            }
          }
          /* ipad pro */
          @media (width: 1024px) {
            @media (height: 1366px) {
              @media (orientation: portrait) {
                grid-template-columns: 80px 1fr 50px;
              }
            }
          }
        `}
      >
        <Core.Text colour="#7462AB" fontMax="15px">
          Avatar
        </Core.Text>
        <Core.Text colour="#7462AB" fontMax="15px">
          Name
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
        {UserList.map(({ firstName, lastName, type, avatar, id }, index) => {
          if (selectedUsers.users.includes(id))
            return (
              <Row
                key={index}
                firstName={firstName}
                lastName={lastName}
                type={type}
                avatar={avatar}
                id={id}
                action={removeUser}
              />
            )
          return null
        })}
      </div>
    </div>
  )
}

const Row = ({ firstName, lastName, type, avatar, id, action, ...rest }) => {
  return (
    <div
      {...rest}
      css={`
        display: grid;
        width: calc(100% - 20px);
        padding: 10px;
        grid-template-columns: 80px 1fr 50px;
        place-items: center;
        border-bottom: 1px solid ${Colours.border};
        @media screen and (max-width: 1440px) {
          grid-template-columns: 80px 1fr 50px;
        }
        /* tablet */
        @media only screen and (max-height: 769px) {
          @media only screen and (max-width: 1025px) {
            @media (orientation: landscape) {
              grid-template-columns: 80px 1fr 50px;
            }
          }
        }
        /* ipad pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              grid-template-columns: 80px 1fr 50px;
            }
          }
        }
      `}
    >
      <Content.Avatar
        src={avatar}
        firstName={firstName}
        lastName={lastName}
        size="medium"
      />
      <Core.Text>{`${firstName} ${lastName}`}</Core.Text>
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
            background: ${Colours.red};
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
          <Icons.DeleteRoundedIcon style={{ fontSize: 'inherit' }} />
        </div>
      </div>
    </div>
  )
}
