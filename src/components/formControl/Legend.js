import React from 'react'
import 'styled-components/macro'
import { Colours } from 'components'

function Legend({ children }) {
  return (
    <legend
      css={`
        font-size: 18px;
        color: ${Colours.purple};
      `}
    >
      {children}
    </legend>
  )
}
export default Legend
