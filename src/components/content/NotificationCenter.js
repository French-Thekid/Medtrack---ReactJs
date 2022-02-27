import React, { useEffect, useState, useRef } from 'react'
// import { useHistory } from 'react-router'
import 'styled-components/macro'

import { useOnClickOutside } from '../../hooks'
import { Content, Core, Colours, Layout, Icons } from 'components'

export default function NotificationCenter({ x, y, open, close = () => {} }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      subject: 'Example Notsfdsfdsfdsfsdfdsfdsfdsfdsfdsfdsfsdfsfdsfdification',
      message: 'Appointment at 7:30am has been rescheduled to tomorrow',
      date: new Date().toLocaleDateString(),
      read: false,
      actionUrl: '/404',
      from: {
        avatar: 'https://source.unsplash.com/vTL_qy03D1I/60x60',
        firstName: 'Jacob',
        lastName: 'Stewart',
        userId: 1,
      },
    },
    {
      id: 2,
      subject: 'Example Notification',
      message: 'Appointment at 7:30am has been rescheduled to tomorrow',
      date: new Date().toLocaleDateString(),
      read: false,
      from: {
        avatar: '',
        firstName: 'Jacob',
        lastName: 'Stewart',
        userId: 1,
      },
    },
    {
      id: 3,
      subject: 'Example Notification',
      message: 'Appointment at 7:30am has been rescheduled to tomorrow',
      date: new Date().toLocaleDateString(),
      read: true,
      from: {
        avatar: 'https://source.unsplash.com/J1jYLLlRpA4/60x60',
        firstName: 'Jacob',
        lastName: 'Stewart',
        userId: 1,
      },
    },
    {
      id: 4,
      subject: 'Example Notification',
      message: 'Appointment at 7:30am has been rescheduled to tomorrow',
      date: new Date().toLocaleDateString(),
      read: true,
      from: {
        avatar: 'https://source.unsplash.com/J1jYLLlRpA4/60x60',
        firstName: 'Jacob',
        lastName: 'Stewart',
        userId: 1,
      },
    },
    {
      id: 5,
      subject: 'Example Notification',
      message: 'Appointment at 7:30am has been rescheduled to tomorrow',
      date: new Date().toLocaleDateString(),
      read: false,
      from: {
        avatar: 'https://source.unsplash.com/J1jYLLlRpA4/60x60',
        firstName: 'Jacob',
        lastName: 'Stewart',
        userId: 1,
      },
    },
    {
      id: 1234,
      subject: 'Example Notification',
      message: 'Appointment at 7:30am has been rescheduled to tomorrow',
      date: new Date().toLocaleDateString(),
      read: true,
      from: {
        avatar: 'https://source.unsplash.com/LWkFHEGpleE/60x60',
        firstName: 'Jacob',
        lastName: 'Stewart',
        userId: 1,
      },
    },
  ])
  const ref = useRef()
  useOnClickOutside(ref, () => close())

  const onClear = () => {
    setNotifications([])
  }

  useEffect(() => {}, [open, notifications])

  return (
    <div
      ref={ref}
      css={`
        -moz-transform: translate(-155px, 236px);
        -webkit-transform: translate(${x || '0px'}, ${y || '0px'});
        width: ${open ? '340px' : '0px'};
        height: ${open ? '400px' : '0px'};
        overflow: hidden;
        border: 1px solid ${Colours.border};
        border-radius: 5px;
        background: white;
        position: absolute;
        padding: 0px;
        margin: 0px;
        z-index: 100;
        box-shadow: 0 2px 2.7px rgba(0, 0, 0, 0.037),
          0 6.3px 6.9px rgba(0, 0, 0, 0.043),
          0 15.3px 14.2px rgba(0, 0, 0, 0.047),
          0 35.6px 29.2px rgba(0, 0, 0, 0.055), 0 105px 80px rgba(0, 0, 0, 0.07);
      `}
    >
      <NotificationHeader onClear={onClear} />
      <NotificationBody notificationList={notifications} />
    </div>
  )
}

function NotificationHeader({ onClear = () => {} }) {
  return (
    <Core.Box radius="0px" bb={`2px solid ${Colours.border}`} bg="white">
      <Layout.Flex justify="space-between">
        <Core.Text weight="400" color="#83919F">
          Notifications
        </Core.Text>
        <div
          css={`
            color: ${Colours.textGrey};
            &:hover {
              color: ${Colours.purple};
              cursor: pointer;
            }
          `}
          onClick={() => onClear()}
        >
          Clear
        </div>
      </Layout.Flex>
    </Core.Box>
  )
}

function NotificationBody({ notificationList = [] }) {
  return (
    <Core.Box
      bg="#F8F5FF"
      pd="8px"
      height="355px"
      style={{ overflowY: 'auto' }}
    >
      {notificationList.map((item, index) => (
        <NotificationCard key={index} data={item} />
      ))}
    </Core.Box>
  )
}

function NotificationCard({ data }) {
  // const history = useHistory()
  let { subject, message, date, from,/* actionUrl,*/ read } = data
  return (
    <div
      css={`
        background: #fff;
        padding: 4px;
        margin-bottom: 8px;
        border-radius: 5px;
        border: 1px solid ${Colours.border};
        transition: ease-out 0.2s;
        &:hover {
          cursor: pointer;
          box-shadow: 0px 8px 20px -2px rgba(196, 196, 196, 1);
          transition: ease-out 0.2s;
          transform: translateY(-2px);
        }
      `}
    >
      <Layout.Flex>
        <Core.Box>
          <Content.Avatar
            size="medium"
            src={from.avatar}
            firstName={from.firstName}
            lastName={from.lastName}
          />
        </Core.Box>
        <Core.Box width="200px">
          <div
            css={`
              display: grid;
              grid-template-columns: 1fr max-content;
              grid-column-gap: 10px;
            `}
          >
            <section
              css={`
                width: 180px;
              `}
            >
              <Core.Text weight="400" mb="4px" Contained>
                {subject}
              </Core.Text>
            </section>
            <CardBadge read={read} />
          </div>
          <Core.Text size="sm" mb="8px" weight="300">
            {message}
          </Core.Text>
          <Core.Text size="sm" weight="300" color="#83919F">
            {date} - by {from.firstName} {from.lastName}
          </Core.Text>
        </Core.Box>
        <div
          css={`
            padding-top: 5px;
            transition: ease-out 0.2s;
            &:hover {
              cursor: pointer;
              transition: ease-out 0.2s;
              transform: translateY(-1px);
            }
          `}
          // onClick={() => history.push(actionUrl)}
        >
          <Icons.LaunchIcon style={{ color: Colours.purple, fontSize: 20 }} />
        </div>
      </Layout.Flex>
    </div>
  )
}

export function CardBadge({ read }) {
  return (
    <>
      {read ? null : (
        <span
          style={{
            borderRadius: '50%',
            width: '10px',
            height: '10px',
            background: '#1ae835',
          }}
        />
      )}
    </>
  )
}
