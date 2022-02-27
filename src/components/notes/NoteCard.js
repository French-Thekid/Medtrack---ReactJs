import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import Fade from 'react-reveal/Fade'
import { OrganisationContext } from 'context'

import { Colours, Content, Core, Icons } from 'components'

export default function NoteCard({
  section,
  title,
  details,
  id,
  createdOn,
  avatar,
  type,
  firstName,
  lastName,
  CTitle,
  CId,
  myId,
  ...rest
}) {
  const { status } = useContext(OrganisationContext)
  const [showMenu, setshowMenu] = useState(false)
  let colors = ['#6f42ff', 'red', 'AF1B3F', 'dodgerblue', '#19C216', '#DC136C']

  let index = 0

  switch (section) {
    case 'General':
      index = 0
      break
    case 'Appointments':
      index = 1
      break
    case 'Record':
      index = 2
      break
    case 'Doctor':
      index = 3
      break
    case 'E-Prescription':
      index = 4
      break
    case 'E-Referrals':
      index = 5
      break
    default:
      index = 0
  }

  const myNote = () => myId === CId

  return (
    <Fade bottom>
      <div
        {...rest}
        css={`
          margin-top: 2px;
          height: 200px;
          display: grid;
          grid-template-rows: max-content 1fr max-content;
          grid-rows: 10px;
          border: 1px solid ${Colours.border};
          border-radius: 5px;
          overflow-y: auto;
          padding: 10px;
          box-shadow: 0px 11px 14px 2px rgba(235, 235, 235, 1);
          &:hover {
            cursor: pointer;
            box-shadow: 0px 8px 20px -2px rgba(196, 196, 196, 1);
            transition: ease-out 0.2s;
            transform: translateY(-1px);
          }
        `}
      >
        <div
          css={`
            border-bottom: 1px solid ${Colours.border};
            display: grid;
            grid-template-columns: 1fr max-content;
            padding: 0px 0px 3px 0px;
            align-items: center;
          `}
        >
          <div
            css={`
              border-radius: 25px;
              padding: 0px 20px;
              background: ${colors[index]};
              width: max-content;
              place-items: center;
              display: grid;
            `}
          >
            <Core.Text customSize="13px" color="#fff">
              {section}
            </Core.Text>
          </div>

          <div
            css={`
              color: ${Colours.textGrey};
              height: max-content;
              display: grid;
              place-items: center;
              &:hover {
                cursor: ${status === 'SUSPENDED' ? 'not-allowed' : 'pointer'};
                color: ${Colours.purple};
              }
              position: relative;
            `}
          >
            {myNote() ? (
              <section
                onClick={() => {
                  if (status !== 'SUSPENDED') setshowMenu(true)
                }}
              >
                <Icons.MoreVertIcon />
              </section>
            ) : (
              <div
                css={`
                  height: 30px;
                `}
              />
            )}
            <Content.Menu
              right="10px"
              top="150px"
              show={showMenu}
              action={setshowMenu}
            >
              <Content.MenuItems
                title={'Edit'}
                Icon={Icons.EditRoundedIcon}
                setshowMenu={setshowMenu}
                path={`?action=editNote&id=${id}`}
                action={() =>
                  localStorage.setItem(
                    'selectedNote',
                    JSON.stringify({
                      section,
                      title,
                      details,
                      id,
                      createdOn,
                      avatar,
                      type,
                      CTitle,
                      firstName,
                      lastName,
                      ...rest,
                    })
                  )
                }
              />
              <Content.MenuItems
                title={'Remove'}
                Icon={Icons.DeleteRoundedIcon}
                setshowMenu={setshowMenu}
                path={`?action=removeNote&id=${id}`}
              />
            </Content.Menu>
          </div>
        </div>
        <div
          css={`
            margin-top: 5px;
            margin-bottom: 5px;
            overflow-y: auto;
            display: grid;
            grid-template-rows: 28px 1fr;
          `}
        >
          <Core.Text weight="500" customSize="16px">
            {title}
          </Core.Text>
          <div
            css={`
              height: 100%;
              overflow-y: auto;
              padding-left: 5px;
            `}
          >
            <Core.Text customSize="15px">{details}</Core.Text>
          </div>
        </div>
        <div
          css={`
            display: grid;
            align-items: center;
            padding-top: 8px;
            border-top: 1px solid ${Colours.border};
            grid-template-columns: max-content 1fr max-content;
            grid-gap: 10px;
          `}
        >
          <Content.Avatar
            src={avatar}
            firstName={firstName}
            lastName={lastName}
            size="small"
            shadow
          />
          <div
            css={`
              display: grid;
              grid-template-rows: repeat(2, max-content);
              grid-gap: 2px;
            `}
          >
            <Core.Text customSize="12px">
              {CTitle} {firstName} {lastName}
            </Core.Text>
            <div
              css={`
                padding: 0px 3px;
                background-color: ${type === 'Doctor'
                  ? Colours.purple
                  : Colours.orange};
                border-radius: 25px;
                width: 70px;
                display: grid;
                justify-items: center;
              `}
            >
              <Core.Text customSize="12px" color={'#fff'}>
                {type}
              </Core.Text>
            </div>
          </div>
          <Core.Text color={Colours.textGrey}>
            {new Date(createdOn).toDateString()}
          </Core.Text>
        </div>
      </div>
    </Fade>
  )
}
