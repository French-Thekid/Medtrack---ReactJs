import React from 'react'
import 'styled-components/macro'
import { Colours } from 'components'

export default function Background() {
  return (
    <div
      css={`
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr 2fr;
        z-index: -1;
        position: absolute;
      `}
    >
      <div
        css={`
          width: 100%;
          height: 100vh;
          background: ${Colours.background2};
        `}
      />
      <div
        css={`
          width: 100%;
          height: 100vh;
          background: ${Colours.background1};
        `}
      />
    </div>
  )
}
