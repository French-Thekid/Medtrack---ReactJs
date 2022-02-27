import React from 'react'
import 'styled-components/macro'

export default function Step({ children, justify = 'start', ...rest }) {
  return (
    <div
      css={`
        width: 100%;
        display: grid;
        justify-items: ${justify};
      `}
      {...rest}
    >
      {children}
    </div>
  )
}
