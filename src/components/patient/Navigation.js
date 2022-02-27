import React, { useState } from 'react'
import 'styled-components/macro'

import { MenuNavigation, Content, Icons, Colours, Core } from 'components'
import { useLocation, useRouteMatch } from 'react-router-dom'

export default function Navigations() {
  const match = useRouteMatch()
  const { pathname } = useLocation()
  const { patientId } = match.params
  const [showMenu, setshowMenu] = useState(false)

  let path = pathname.split('/')[3]
  let activePage = 'Title'
  switch (path) {
    case 'overview':
      activePage = 'Overview'
      break
    case 'appointments':
      activePage = 'Appointments'
      break
    case 'record':
      activePage = 'Record'
      break
    case 'doctors':
      activePage = 'Doctors'
      break
    case 'e-prescriptions':
      activePage = 'E-Prescriptions'
      break
    case 'e-referrals':
      activePage = 'E-Referrals'
      break
    case 'notes':
      activePage = 'Notes'
      break
    case 'billing':
      activePage = 'Billing'
      break
    default:
      activePage = 'Overview'
      break
  }

  return (
    <>
      <div
        css={`
          @media screen and (max-width: 1024px) {
            display: none;
          }
          @media screen and (min-width: 769px) {
            display: visible;
          }
          transition: ease-out 0.5s;
        `}
      >
        <MenuNavigation.Container>
          <MenuNavigation.MainItem
            to={`/facility/patient/overview/${patientId}`}
            active={pathname.includes('overview')}
          >
            Overview
          </MenuNavigation.MainItem>
          <MenuNavigation.MainItem
            to={`/facility/patient/appointments/${patientId}`}
            active={pathname.includes('appointments')}
          >
            Appointments
          </MenuNavigation.MainItem>
          <MenuNavigation.MainItem
            to={`/facility/patient/record/${patientId}`}
            active={pathname.includes('record')}
          >
            Record
          </MenuNavigation.MainItem>
          <MenuNavigation.MainItem
            to={`/facility/patient/doctors/${patientId}`}
            active={pathname.includes('doctors')}
          >
            Doctors
          </MenuNavigation.MainItem>
          <MenuNavigation.MainItem
            to={`/facility/patient/e-prescriptions/${patientId}`}
            active={pathname.includes('e-prescriptions')}
          >
            E-Prescriptions
          </MenuNavigation.MainItem>
          <MenuNavigation.MainItem
            to={`/facility/patient/e-referrals/${patientId}`}
            active={pathname.includes('e-referrals')}
          >
            E-Referrals
          </MenuNavigation.MainItem>
          <MenuNavigation.MainItem
            to={`/facility/patient/notes/${patientId}`}
            active={pathname.includes('notes')}
          >
            Notes
          </MenuNavigation.MainItem>
          <MenuNavigation.MainItem
            to={`/facility/patient/billing/${patientId}`}
            active={pathname.includes('billing')}
          >
            Billing
          </MenuNavigation.MainItem>
        </MenuNavigation.Container>
      </div>
      <div
        css={`
          width: 100%;
          display: grid;
          justify-items: center;
          @media screen and (max-width: 1025px) {
            display: visible;
          }
          @media screen and (min-width: 1025px) {
            display: none;
          }
        `}
      >
        <div
          css={`
            color: ${Colours.textGrey};
            height: max-content;
            display: grid;
            place-items: center;
            &:hover {
              cursor: pointer;
              color: ${Colours.purple};
            }
            grid-template-columns: 1fr max-content;
            border: 1px solid ${Colours.border};
            border-radius: 5px;
            background: rgb(87, 53, 194);
            background: linear-gradient(
              180deg,
              rgba(87, 53, 194, 1) 0%,
              rgba(87, 53, 194, 1) 48%,
              rgba(134, 97, 252, 1) 100%
            );
            box-shadow: 0px 6px 16px 2px rgba(232, 216, 232, 1);
          `}
        >
          <div
            css={`
              padding: 10px 20px;
              border-right: 2px solid ${Colours.foreground};
            `}
          >
            <Core.Text customSize="20px" color={Colours.foreground}>
              {activePage}
            </Core.Text>
          </div>
          <div
            css={`
              color: ${Colours.foreground};
              display: grid;
              align-content: center;
              font-size: 40px;
              &:hover {
                cursor: pointer;
              }
            `}
            onClick={() => {
              setshowMenu(true)
            }}
          >
            <Icons.ExpandMoreRoundedIcon style={{ fontSize: 'inherit' }} />
          </div>
          <Content.Menu
            right="36%"
            top="450px"
            show={showMenu}
            action={setshowMenu}
            override="Sections"
          >
            <Content.MenuItems
              title={'Overview'}
              Icon={Icons.EditRoundedIcon}
              setshowMenu={setshowMenu}
              path={`/facility/patient/overview/${patientId}`}
              noIcon
            />
            <Content.MenuItems
              title={'Appointments'}
              Icon={Icons.DeleteRoundedIcon}
              setshowMenu={setshowMenu}
              path={`/facility/patient/appointments/${patientId}`}
              noIcon
            />
            <Content.MenuItems
              title={'Record'}
              Icon={Icons.DeleteRoundedIcon}
              setshowMenu={setshowMenu}
              path={`/facility/patient/record/${patientId}`}
              noIcon
            />
            <Content.MenuItems
              title={'Doctor'}
              Icon={Icons.DeleteRoundedIcon}
              setshowMenu={setshowMenu}
              path={`/facility/patient/doctors/${patientId}`}
              noIcon
            />
            <Content.MenuItems
              title={'E-Prescription'}
              Icon={Icons.DeleteRoundedIcon}
              setshowMenu={setshowMenu}
              path={`/facility/patient/e-prescriptions/${patientId}`}
              noIcon
            />
            <Content.MenuItems
              title={'E-Referrals'}
              Icon={Icons.DeleteRoundedIcon}
              setshowMenu={setshowMenu}
              path={`/facility/patient/e-referrals/${patientId}`}
              noIcon
            />
            <Content.MenuItems
              title={'Notes'}
              Icon={Icons.DeleteRoundedIcon}
              setshowMenu={setshowMenu}
              path={`/facility/patient/notes/${patientId}`}
              noIcon
            />
            <Content.MenuItems
              title={'Billing'}
              Icon={Icons.DeleteRoundedIcon}
              setshowMenu={setshowMenu}
              path={`/facility/patient/billing/${patientId}`}
              noIcon
            />
          </Content.Menu>
        </div>
      </div>
    </>
  )
}
