import React from 'react'
import 'styled-components/macro'
import { Colours, Content, Core } from 'components'

export default function UserCard({
  avatar,
  firstName,
  lastName,
  extra,
  id,
  setSelectedUsers,
  selectedUsers,
  single,
  title,
  special,
  trn,
  address,
  ...rest
}) {
  return (
    <div
      {...rest}
      css={`
        height: 170px;
        width: 190px;
        border: 1px solid
          ${single
            ? selectedUsers === id
              ? Colours.green
              : Colours.border
            : selectedUsers.users.includes(id)
            ? Colours.green
            : Colours.border};
        border-radius: 5px;
        display: grid;
        padding: 10px;
        justify-items: center;
        grid-template-rows: 70px max-content 1fr max-content;
        grid-row-gap: 5px;
        &:hover {
          cursor: pointer;
          box-shadow: 0px 8px 20px -2px rgba(237, 237, 237, 1);
          transition: ease-out 0.2s;
          transform: translateY(-1px);
        }

        /* Tablets */
        @media screen and (max-width: 1025px) {
          @media screen and (max-height: 769px) {
            @media screen and (orientation: landscape) {
              width: 230px;
            }
          }
        }
      `}
    >
      <Content.Avatar
        size="largee"
        src={avatar}
        firstName={firstName}
        lastName={lastName}
      />
      <Core.Text customSize="16px">{`${firstName} ${lastName}`}</Core.Text>
      <Core.Text customSize="12px" color={Colours.purple}>
        {extra}
      </Core.Text>
      <Core.Button
        bgColour={
          single
            ? selectedUsers === id
              ? Colours.green
              : Colours.purple
            : selectedUsers.users.includes(id)
            ? Colours.green
            : Colours.purple
        }
        onClick={() => {
          if (special) {
            localStorage.setItem(
              'selectedPatient',
              JSON.stringify({ firstName, lastName, trn, address, title })
            )
          }
          if (single) {
            setSelectedUsers(id)
          } else {
            if (selectedUsers.users.includes(id)) {
              setSelectedUsers((state) => {
                const users = state.users.filter((item, j) => item !== id)
                return {
                  users,
                }
              })
            } else {
              setSelectedUsers((state) => {
                const users = state.users.concat(id)
                return {
                  users,
                }
              })
            }
          }
        }}
      >
        {single
          ? selectedUsers === id
            ? 'Selected'
            : 'Select'
          : selectedUsers.users.includes(id)
          ? 'Selected'
          : 'Select'}
      </Core.Button>
    </div>
  )
}
