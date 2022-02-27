import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavigationBar, Icons } from 'components'
import NavItem from '../NavItem'
import SettingsSubMenu from '../SettingSubMenu'

function FacilityAdminNav() {
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
        to={`/facility/reports`}
        title="Reports"
        Icon={Icons.AssessmentRoundedIcon}
        active={pathname.includes('/facility/reports')}
      />
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
        <SettingsSubMenu
          show={pathname.includes('/facility/settings')}
          to={`/facility/settings/facility`}
          title="Facility"
          Icon={Icons.AccountBalanceRoundedIcon}
          active={pathname.includes('/facility/settings/facility')}
        />
        <SettingsSubMenu
          show={pathname.includes('/facility/settings')}
          to={`/facility/settings/users/tables/allUsers`}
          title="Users"
          Icon={Icons.GroupRoundedIcon}
          active={pathname.includes('/facility/settings/users')}
        />
        <SettingsSubMenu
          show={pathname.includes('/facility/settings')}
          to={`/facility/settings/roles`}
          title="Roles"
          Icon={Icons.GavelRoundedIcon}
          active={pathname.includes('/facility/settings/roles')}
        />
        <SettingsSubMenu
          show={pathname.includes('/facility/settings')}
          to={`/facility/settings/e-referral-template`}
          title="E-Referral"
          Icon={Icons.AccountTreeRoundedIcon}
          active={pathname.includes('/facility/settings/e-referral-template')}
        />
        <SettingsSubMenu
          show={pathname.includes('/facility/settings')}
          to={`/facility/settings/e-prescription-template`}
          title="E-Prescription"
          Icon={Icons.DescriptionRoundedIcon}
          active={pathname.includes(
            '/facility/settings/e-prescription-template'
          )}
        />
      </NavItem>
    </NavigationBar>
  )
}

export default FacilityAdminNav
