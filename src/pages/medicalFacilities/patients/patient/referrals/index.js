import React, { useState } from 'react'
import 'styled-components/macro'
import PDF_SRC from 'assets/PDF.png'
import { CreateReferral } from './modal'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { LIST_REFERRALS } from './queries'
import { useQuery } from '@apollo/react-hooks'
import Fade from 'react-reveal/Fade'

import {
  Colours,
  Core,
  Icons,
  Patient,
  Content,
  Loading,
  Notification,
  PermissionCheck,
  RestrictedAccess,
} from 'components'

const queryString = require('query-string')

export default function EReferrals() {
  const [activeMenu, setActiveMenu] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const {
    params: { patientId },
  } = useRouteMatch()
  const [completed, setcompleted] = useState(false)
  const ReadPermission = PermissionCheck({
    feature: 'Referral',
    action: 'READ',
  })
  //Query
  const { loading, error, data } = useQuery(LIST_REFERRALS, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Failed to load Referrals'} />

  const referrals = data.listReferrals.from

  let filteredList = referrals
  filteredList = referrals
    .map(({ referralStatus, ...rest }, index) => {
      const { name: status } = referralStatus || {}
      if (activeMenu === 'All') return { status, ...rest }
      else if (activeMenu === status) return { status, ...rest }
      else return null
    })
    .filter(function (el) {
      return el != null
    })

  const showNotification = () => {
    setcompleted(true)
    setTimeout(() => {
      setcompleted(false)
    }, 6000)
  }

  return ReadPermission ? (
    <div
      css={`
        display: grid;
        grid-template-rows: 40px 1fr;
        grid-gap: 20px;
        overflow-y: auto;
      `}
    >
      <Notification
        setcompleted={setcompleted}
        message="E-Referral successfully generated and submitted."
        notification={completed}
      />
      <Patient.TopPanel
        path={'?action=CreateReferral'}
        btnTitle="New E-Referral"
        title="E-Referrals"
        placeholder="Search E-Referrals"
      />
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 2fr;
          grid-gap: 20px;
          overflow-y: auto;
          @media only screen and (max-width: 1020px) {
            grid-template-columns: 1fr;
            grid-template-rows: 300px 1fr;
            grid-gap: 50px;
          }
          /* tablet */
          @media only screen and (max-height: 1025px) {
            @media only screen and (max-width: 769px) {
              @media (orientation: portrait) {
                grid-template-columns: 1fr;
              }
            }
          }
          /* Ipod Pro */
          @media (width: 1024px) {
            @media (height: 1366px) {
              @media (orientation: portrait) {
                grid-template-columns: 1fr;
                grid-template-rows: 300px 1fr;
                grid-gap: 50px;
              }
            }
          }
        `}
      >
        <div
          css={`
            height: 100%;
            padding-right: 5px;
            border-right: 1px solid ${Colours.border};
            display: grid;
            grid-template-rows: max-content 1fr;
            grid-gap: 10px;
            overflow-y: auto;
            @media only screen and (max-width: 1020px) {
              padding-bottom: 5px;
              border-bottom: 1px solid ${Colours.border};
            }
            /* Ipod Pro */
            @media (width: 1024px) {
              @media (height: 1366px) {
                @media (orientation: portrait) {
                  padding-bottom: 5px;
                  border-bottom: 1px solid ${Colours.border};
                }
              }
            }
          `}
        >
          <MenuOption activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          <div
            css={`
              height: calc(100% - 2px);
              padding-top: 2px;
              display: grid;
              overflow-y: auto;
              grid-auto-rows: 110px;
            `}
          >
            {filteredList.map((values, index) => {
              return (
                <Card
                  values={values}
                  key={index}
                  setSelectedItem={setSelectedItem}
                />
              )
            })}
          </div>
        </div>
        <div>
          <Core.IFrame responsiveMode src={selectedItem} filler="Referral" />
        </div>
        {action === 'CreateReferral' && (
          <CreateReferral showNotification={showNotification} />
        )}
      </div>
    </div>
  ) : (
    <RestrictedAccess small />
  )
}

export function Card({ Prescription, setSelectedItem, values, ...rest }) {
  const { title, createdAt, status, url, createdByUser, repeated } =
    values || {}
  const { person, firstName, lastName } = createdByUser || {}
  const { title: CreatorTitle } = person || {}

  return (
    <Fade bottom>
      <div
        onClick={() => setSelectedItem(url)}
        css={`
          height: 100px;
          border: 1px solid ${Colours.border};
          border-radius: 5px;
          display: grid;
          grid-template-columns: 77px 1fr 40px;
          align-items: center;
          grid-gap: 5px;

          &:hover {
            cursor: pointer;
            box-shadow: 0px 8px 20px -2px rgba(196, 196, 196, 1);
            transition: ease-out 0.2s;
            transform: translateY(-1px);
          }
        `}
        {...rest}
      >
        <img
          src={PDF_SRC}
          alt="bleh"
          css={`
            height: 95px;
          `}
        />
        <div
          css={`
            display: grid;
            grid-template-rows: repeat(4, max-content);
            grid-gap: 2px;
          `}
        >
          <Core.Text Contained weight="500">
            {title}
          </Core.Text>
          <Core.Text Contained customSize="14px" color={Colours.textGrey}>
            Created On: {new Date(parseInt(createdAt)).toDateString()}
          </Core.Text>
          <Core.Text Contained customSize="14px" color={Colours.textGrey}>
            Created By: {`${CreatorTitle} ${firstName} ${lastName}`}
          </Core.Text>
          <div
            css={`
              display: grid;
              grid-template-columns: ${Prescription && status === 'Repeated'
                ? '1fr max-content'
                : '1fr'};
            `}
          >
            <div
              css={`
                border-radius: 5px;
                padding: 1px 10px;
                background: ${Prescription
                  ? status === 'Open'
                    ? Colours.green
                    : status === 'Filled'
                    ? Colours.red
                    : Colours.purple
                  : status === 'Accepted'
                  ? Colours.green
                  : status === 'Declined'
                  ? Colours.red
                  : Colours.purple};
                width: max-content;
                height: max-content;
              `}
            >
              <Core.Text customSize="14px" color={Colours.foreground}>
                {status}
              </Core.Text>
            </div>
            {Prescription && status === 'Repeated' ? (
              <Core.Text customSize="16px" color={Colours.purple}>
                {repeated} left
              </Core.Text>
            ) : null}
          </div>
        </div>
        <div
          css={`
            background: #f0ebff;
            height: 100%;
            width: 100%;
            display: grid;
            place-items: center;
            color: ${Colours.purple};
          `}
        >
          <Icons.LaunchIcon />
        </div>
      </div>
    </Fade>
  )
}

export function MenuOption({ Prescription, activeMenu, setActiveMenu }) {
  return (
    <div
      css={`
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        height: 35px;
      `}
    >
      <MenuItem
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        title="All"
      />
      <MenuItem
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        title={Prescription ? 'Repeated' : 'Accepted'}
      />
      <MenuItem
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        title={Prescription ? 'Filled' : 'Declined'}
      />
    </div>
  )
}

export function MenuItem({ title, activeMenu, setActiveMenu }) {
  return (
    <div
      css={`
        background: ${activeMenu === title ? '#f6f3ff' : Colours.foreground};
        display: grid;
        place-items: Center;
        &:hover {
          cursor: pointer;
        }
      `}
      onClick={() => setActiveMenu(title)}
    >
      <Core.Text
        color={activeMenu === title ? Colours.purple : Colours.textGrey}
      >
        {title}
      </Core.Text>
    </div>
  )
}
