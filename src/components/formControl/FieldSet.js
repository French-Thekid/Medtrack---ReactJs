import React from 'react'
import 'styled-components/macro'
import { Colours } from 'components'

function Fieldset({ children, borderColour = Colours.border }) {
  return (
    <fieldset
      css={`
        width: calc(100% - 22px);
        border: 1px solid ${borderColour};
        border-radius: 5px;
        padding: 10px;
        margin: 0px;
      `}
    >
      {children}
    </fieldset>
  )
}
export default Fieldset
