import React from 'react'
import 'styled-components/macro'

import { Core, Colours } from 'components'

export default function TopPanel({ to, cleanUp, title, children }) {
  return (
    <div
      css={`
        display: grid;
        grid-template-columns: max-content 1fr max-content;
        grid-gap: 15px;
        align-items: center;
        padding: 15px 0px 15px 0px;
        border-bottom: 1px solid ${Colours.border};
      `}
    >
      <Core.BackButton cleanUp={cleanUp} to={to ? to : false} />
      <Core.Text customSize="20px">{title}</Core.Text>
      <div
        css={`
          min-width: 150px;
        `}
      >
        {children}
      </div>
    </div>
  )
}
