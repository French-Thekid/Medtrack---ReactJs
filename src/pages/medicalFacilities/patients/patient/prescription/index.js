import React, { useState } from 'react'
import 'styled-components/macro'

import {
  Patient,
  Core,
  Colours,
  Content,
  Loading,
  Notification,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { Card, MenuOption } from '../referrals/index'
import { CreatePrescription } from './modals'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { LIST_PRESCRIPTIONS } from './queries'
import { useQuery } from '@apollo/react-hooks'

const queryString = require('query-string')

export default function EPrescription() {
  const [activeMenu, setActiveMenu] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const {
    params: { patientId },
  } = useRouteMatch()
  const [completed, setcompleted] = useState(false)
  const ReadPermission = PermissionCheck({
    feature: 'Prescription',
    action: 'READ',
  })
  //Query
  const { loading, error, data } = useQuery(LIST_PRESCRIPTIONS, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert type="error" message={'Failed to load Prescriptions'} />
    )

  const prescriptions = data.listPrescriptions.data

  let filteredList = prescriptions
  filteredList = prescriptions
    .map(({ prescriptionStatus, IsRepeated, ...rest }, index) => {
      let { name: status } = prescriptionStatus || {}
      if (IsRepeated === 0) status = 'Repeated'

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
        /* height: 100%; */
        overflow-y: auto;
      `}
    >
      <Notification
        setcompleted={setcompleted}
        message="E-Prescription successfully generated and submitted."
        notification={completed}
      />
      <Patient.TopPanel
        path={'?action=CreatePrescription'}
        btnTitle="New E-Prescription"
        title="E-Prescriptions"
        placeholder="Search E-Prescriptions"
      />
      <div
        css={`
          display: grid;
          grid-template-columns: 400px 1fr;
          @media only screen and (min-width: 1440px) {
            grid-template-columns: 533.33px 1fr;
          }
          grid-gap: 20px;
          overflow-y: auto;
          height: 100%;
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
            /* height: 100%; */
            padding-right: 5px;
            border-right: 1px solid ${Colours.border};
            display: grid;
            grid-template-rows: max-content 1fr;
            grid-gap: 10px;
            overflow-y: auto;
            @media only screen and (min-width: 1440px) {
              min-width: 533.33px;
            }
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
          <MenuOption
            Prescription
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
          <div
            css={`
              height: 100%;
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
                  Prescription
                />
              )
            })}
          </div>
        </div>
        <div css={``}>
          <Core.IFrame
            responsiveMode
            src={selectedItem}
            filler="Prescription"
          />
        </div>
        {action === 'CreatePrescription' && (
          <CreatePrescription showNotification={showNotification} />
        )}
      </div>
    </div>
  ) : (
    <RestrictedAccess small />
  )
}
