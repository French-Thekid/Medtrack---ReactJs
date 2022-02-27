import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavigationBar, Icons } from 'components'
import NavItem from '../NavItem'
import SettingsSubMenu from '../SettingSubMenu'

function FacilityNav() {
  const { pathname } = useLocation()
  return (
    <NavigationBar>
      <NavItem
        to={`/facility/dashboard`}
        title="Dashboard"
        Icon={Icons.HomeRoundedIcon}
        active={pathname.includes('/facility/dashboard')}
      />
      <NavItem
        to={`/facility/patients/myPatient`}
        title="Patients"
        Icon={Icons.PeopleAltRoundedIcon}
        active={
          pathname.includes('/facility/patients') ||
          pathname.includes('/facility/patient')
        }
      />
      <NavItem
        to={`/facility/appointments`}
        title="Appointments"
        Icon={Icons.TodayRoundedIcon}
        active={pathname.includes('/facility/appointments')}
      />
      <NavItem
        to={`/facility/referrals/tables/allReferrals`}
        title="Referrals"
        Icon={Icons.AccountTreeRoundedIcon}
        active={pathname.includes('/facility/referrals')}
      />
      {/* <NavItem
        to={`/facility/reports`}
        title="Reports"
        Icon={Icons.AssessmentRoundedIcon}
        active={pathname.includes('/facility/reports')}
      /> */}
      <NavItem
        to={`/facility/settings/account/profile`}
        title="Settings"
        Icon={Icons.SettingsRoundedIcon}
        active={pathname.includes('/facility/settings')}
      >
        <SettingsSubMenu
          show={pathname.includes('/facility/settings')}
          to={`/facility/settings/account/profile`}
          title="Account"
          Icon={Icons.AccountCircleRoundedIcon}
          active={pathname.includes('/facility/settings/account')}
        />
      </NavItem>
    </NavigationBar>
  )
}

export default FacilityNav
