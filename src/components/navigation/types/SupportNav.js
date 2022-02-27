import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavigationBar, Icons } from 'components'
import NavItem from '../NavItem'

function SupportNav() {
  const { pathname } = useLocation()
  return (
    <NavigationBar>
      <NavItem
        to={`/support/facilities`}
        title="Facilities"
        Icon={Icons.AccountBalanceRoundedIcon}
        active={pathname.includes('/support/facilities')}
      />
      <NavItem
        to={`/support/pharmacies`}
        title="Pharmacies"
        Icon={Icons.HomeWorkRoundedIcon}
        active={pathname.includes('/support/pharmacies')}
      />
    </NavigationBar>
  )
}

export default SupportNav
