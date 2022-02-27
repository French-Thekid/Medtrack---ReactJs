import React from 'react'
import { Colours, Core } from 'components'

export const Header = ({ children }) => (
  <Core.Text weight="450" color={Colours.textGrey}>
    {children}
  </Core.Text>
)
export const Value = ({ children, color }) => (
  <Core.Text weight="450" color={color || Colours.text}>
    {children}
  </Core.Text>
)
