import React from 'react'
import 'styled-components/macro'

import { Colours, Core } from 'components'

export default function DataDisplay({
  Contained,
  value,
  label,
  highlight,
  noLine,
  overflow,
}) {
  return (
    <div
      css={`
        width: 100%;
        display: grid;
        grid-template-rows: repeat(2, max-content);
        grid-gap: 5px;
      `}
    >
      <section
        css={`
          color: ${Colours.textGrey};
          font-size: 16px;
          height: 25px;
          border-bottom: ${noLine ? 'none' : `1px solid ${Colours.border}`};
        `}
      >
        {label}
      </section>
      <div
        css={`
          @media screen and (max-width: 1440px) {
            height: ${overflow ? '172px' : 'max-content'};
            overflow-y: ${overflow ? 'auto' : 'inherit'};
          }
        `}
      >
        <Core.Text
          Contained={Contained}
          color={highlight ? Colours.purple : Colours.text}
          customSize="18px"
        >
          {value}
        </Core.Text>
      </div>
    </div>
  )
}
