import React from 'react'
import styled from 'styled-components'
import 'styled-components/macro'
import { useSpring, animated } from 'react-spring'
import { useHistory, useLocation } from 'react-router-dom'

import { Colours, Icons } from 'components'
import logo from 'assets/mainLogo.png'
import SettingsSubMenu from './SettingSubMenu'

const FacilityCollapseMenu = (props) => {
  const { pathname } = useLocation()
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 })

  if (props.navbarState === true) {
    return (
      <CollapseWrapper
        style={{
          transform: open
            .interpolate({
              range: [0, 0.2, 0.3, 1],
              output: [0, -20, 0, -200],
            })
            .interpolate((openValue) => `translate3d(0, ${openValue}px, 0`),
        }}
      >
        <div
          css={`
            min-width: 200px;
            height: max-content;
            display: grid;
            place-items: center;
          `}
        >
          <img src={logo} alt="LOGO" height="90px" width="100px" />
        </div>
        <NavLinks>
          <NavItem
            props={props}
            to="/facility/dashboard"
            active={pathname.includes('/facility/dashboard')}
            title="Dashboard"
          >
            <Icons.HomeRoundedIcon />
          </NavItem>
          <NavItem
            props={props}
            to="/facility/patients/myPatient"
            active={
              pathname.includes('/facility/patients') ||
              pathname.includes('/facility/patient')
            }
            title="Patients"
          >
            <Icons.PeopleAltRoundedIcon />
          </NavItem>
          <NavItem
            props={props}
            to="/facility/appointments"
            active={pathname.includes('/facility/appointments')}
            title="Appointments"
          >
            <Icons.TodayRoundedIcon />
          </NavItem>
          <NavItem
            props={props}
            to="/facility/referrals/tables/allReferrals"
            active={pathname.includes('/facility/referrals')}
            title="Referrals"
          >
            <Icons.AccountTreeRoundedIcon />
          </NavItem>
          {/* <NavItem
            props={props}
            to="/facility/reports"
            active={pathname.includes('/facility/reports')}
            title="Reports"
          >
            <Icons.AssessmentRoundedIcon />
          </NavItem> */}
          <NavItem
            props={props}
            to="/facility/settings/account/profile"
            active={pathname.includes('/facility/settings')}
            title="Settings"
          >
            <SettingsSubMenu
              props={props}
              small
              show={pathname.includes('/facility/settings')}
              to={`/facility/settings/account/profile`}
              title="Account"
              Icon={Icons.AccountCircleRoundedIcon}
              active={pathname.includes('/facility/settings/account')}
            />
          </NavItem>
        </NavLinks>
      </CollapseWrapper>
    )
  }

  return null
}

export default FacilityCollapseMenu

export function FacilityAdminCollapseMenu(props) {
  const { pathname } = useLocation()
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 })

  if (props.navbarState === true) {
    return (
      <CollapseWrapper
        style={{
          transform: open
            .interpolate({
              range: [0, 0.2, 0.3, 1],
              output: [0, -20, 0, -200],
            })
            .interpolate((openValue) => `translate3d(0, ${openValue}px, 0`),
        }}
      >
        <div
          css={`
            min-width: 250px;
            height: max-content;
            display: grid;
            place-items: center;
          `}
        >
          <img src={logo} alt="LOGO" height="90px" width="100px" />
        </div>
        <NavLinks>
          <NavItem
            props={props}
            to="/facility/dashboard"
            active={pathname.includes('/facility/dashboard')}
            title="Dashboard"
          >
            <Icons.HomeRoundedIcon />
          </NavItem>
          <NavItem
            props={props}
            to="/facility/reports"
            active={pathname.includes('/facility/reports')}
            title="Reports"
          >
            <Icons.AssessmentRoundedIcon />
          </NavItem>
          <NavItem
            props={props}
            to="/facility/settings/account/profile"
            active={pathname.includes('/facility/settings')}
            title="Settings"
            Icon={Icons.SettingsRoundedIcon}
          >
            <SettingsSubMenu
              props={props}
              small
              show={pathname.includes('/facility/settings')}
              to={`/facility/settings/account/profile`}
              title="Account"
              Icon={Icons.AccountCircleRoundedIcon}
              active={pathname.includes('/facility/settings/account')}
            />
            <SettingsSubMenu
              props={props}
              small
              show={pathname.includes('/facility/settings')}
              to={`/facility/settings/facility`}
              title="Facility"
              Icon={Icons.AccountBalanceRoundedIcon}
              active={pathname.includes('/facility/settings/facility')}
            />
            <SettingsSubMenu
              props={props}
              small
              show={pathname.includes('/facility/settings')}
              to={`/facility/settings/users/tables/allUsers`}
              title="Users"
              Icon={Icons.GroupRoundedIcon}
              active={pathname.includes('/facility/settings/users')}
            />
            <SettingsSubMenu
              props={props}
              small
              show={pathname.includes('/facility/settings')}
              to={`/facility/settings/roles`}
              title="Roles"
              Icon={Icons.GavelRoundedIcon}
              active={pathname.includes('/facility/settings/roles')}
            />
            <SettingsSubMenu
              props={props}
              small
              show={pathname.includes('/facility/settings')}
              to={`/facility/settings/e-referral-template`}
              title="E-Referral"
              Icon={Icons.AccountTreeRoundedIcon}
              active={pathname.includes(
                '/facility/settings/e-referral-template'
              )}
            />
            <SettingsSubMenu
              props={props}
              small
              show={pathname.includes('/facility/settings')}
              to={`/facility/settings/e-prescription-template`}
              title="E-Prescription"
              Icon={Icons.DescriptionRoundedIcon}
              active={pathname.includes(
                '/facility/settings/e-prescription-template'
              )}
            />
          </NavItem>
        </NavLinks>
      </CollapseWrapper>
    )
  }

  return null
}

export function SupportCollapseMenu(props) {
  const { pathname } = useLocation()
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 })

  if (props.navbarState === true) {
    return (
      <CollapseWrapper
        style={{
          transform: open
            .interpolate({
              range: [0, 0.2, 0.3, 1],
              output: [0, -20, 0, -200],
            })
            .interpolate((openValue) => `translate3d(0, ${openValue}px, 0`),
        }}
      >
        <div
          css={`
            min-width: 200px;
            height: max-content;
            display: grid;
            place-items: center;
          `}
        >
          <img src={logo} alt="LOGO" height="90px" width="100px" />
        </div>
        <NavLinks>
          <NavItem
            props={props}
            to="/support/facilities"
            active={pathname.includes('/support/facilities')}
            title="Facilities"
            Icon={Icons.AccountBalanceRoundedIcon}
          >
            <Icons.AccountBalanceRoundedIcon />
          </NavItem>
          <NavItem
            props={props}
            to="/support/pharmacies"
            active={pathname.includes('/support/pharmacies')}
            title="Pharmacies"
            Icon={Icons.HomeWorkRoundedIcon}
          >
            <Icons.HomeWorkRoundedIcon />
          </NavItem>
        </NavLinks>
      </CollapseWrapper>
    )
  }

  return null
}

const CollapseWrapper = styled(animated.div)`
  background: rgb(139, 73, 241);
  background: linear-gradient(
    180deg,
    rgba(139, 73, 241, 1) 0%,
    rgba(101, 87, 245, 1) 100%
  );
  position: fixed;
  top: 4.5rem;
  left: 0;
  box-shadow: -5px 5px 2px rgba(0, 0, 0, 0.04);
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  padding: 10px;
  z-index: 10;
`

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 10px;
  margin-top: 10;
  & div {
    transition: all 300ms linear 0s;
  }
`
function NavItem({ props, children, colour, to, active, title, ...rest }) {
  const history = useHistory()

  return title === 'Settings' ? (
    <div
      css={`
        height: max-content;
        width: calc(100% - 20px);
        padding: 0px 10px 10px 10px;
        background: ${active ? '#4F22AF' : 'none'};
        color: ${active ? Colours.foreground : Colours.defaultMenuColour};
        border-radius: 20px;
        display: grid;
        grid-template-rows: ${active ? 'max-content 1fr' : 'max-content'};
        grid-row-gap: ${active ? '10px' : '0px'};
        &:hover {
          cursor: pointer;
          background: ${active ? '#4F22AF' : '#6e43cb'};
        }
      `}
      onClick={() => {
        if (title === 'Settings') {
        } else {
          history.push(to)
        }
      }}
    >
      <div
        css={`
          width: calc(100% - 60px);
          font-size: 0.8rem;
          line-height: 2;
          color: ${active ? Colours.foreground : Colours.defaultMenuColour};
          text-transform: uppercase;
          padding: 5px 20px 5px 10px;
          text-decoration: none;
          display: grid;
          justify-items: center;
          border-radius: 30px;
          background: ${active ? '#4F22AF' : 'none'};
          display: grid;
          grid-template-columns: 30px 1fr;
          grid-column-gap: 10px;
          align-items: center;
          justify-items: start;
          &:hover {
            cursor: pointer;
            color: #fff;
            background: ${active ? 'none' : '#6e43cb'};
          }
        `}
        onClick={() => history.push(to)}
      >
        <Icons.SettingsRoundedIcon />
        {title}
      </div>
      <div>{children}</div>
    </div>
  ) : (
    <div
      css={`
        margin-top: 5px;
        margin-bottom: 5px;
        width: calc(100% - 60px);
        font-size: 0.8rem;
        line-height: 2;
        color: ${active ? Colours.foreground : Colours.defaultMenuColour};
        text-transform: uppercase;
        padding: 5px 20px 5px 20px;
        text-decoration: none;
        display: grid;
        justify-items: center;
        border-radius: 30px;
        background: ${active ? '#4F22AF' : 'none'};
        display: grid;
        grid-template-columns: 30px 1fr;
        grid-column-gap: 10px;
        align-items: center;
        justify-items: start;
        &:hover {
          cursor: pointer;
          color: #fff;
          background: ${active ? '#4F22AF' : '#6e43cb'};
        }
      `}
      {...rest}
      onClick={() => {
        history.push(to)
        props.handleNavbar()
      }}
    >
      {children}
      {title}
    </div>
  )
}
