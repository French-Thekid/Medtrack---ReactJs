import React, { useRef } from 'react'
import 'styled-components/macro'
import { useOnClickOutside } from 'hooks'

import { useHistory } from 'react-router'
import { Core, Colours } from 'components'

export default function Menu({
  setShowOption,
  children,
  width = 'max-content',
  top = '30px',
  mr = '20px',
}) {
  const ref = useRef()
  useOnClickOutside(ref, () => {
    setShowOption(false)
    return null
  })

  return (
    <div
      ref={ref}
      css={`
        position: absolute;
        transform: translateY(-1px);
        z-index: 10000;
        min-height: 100px;
        width: ${width};
        right: 0;
        top: ${top};
        border-radius: 5px;
        grid-template-rows: max-content 1fr;
        background: ${Colours.foreground};
        border: 0.5px solid #f0f0f0;
        box-shadow: 0px 0px 41px -24px rgba(194, 194, 194, 1);
        margin-right: ${mr};
      `}
    >
      <div
        css={`
          height: 40px;
          width: 100%;
          display: grid;
          place-items: center;
          box-shadow: 0 2px 2px -1px rgba(152, 162, 179, 0.3),
            0 1px 5px -2px rgba(152, 162, 179, 0.3);
        `}
      >
        <Core.Text>Actions</Core.Text>
      </div>
      <div
        css={`
          width: calc(100% - 20px);
          padding: 10px;
        `}
      >
        {children}
      </div>
    </div>
  )
}

export const Items = ({ Icon, to, setShowOption, label, action }) => {
  const history = useHistory()

  return (
    <div
      css={`
        z-index: 10000;
        width: calc(100% - 40px);
        padding-left: 20px;
        padding-right: 20px;
        height: 40px;
        display: grid;
        align-items: center;
        justify-items: start;
        grid-column-gap: 20px;
        grid-template-columns: max-content 1fr;
        color: ${Colours.textGrey};
        &:hover {
          cursor: pointer;
          color: ${Colours.purple};
          background: #f3f5ff;
        }
      `}
      onClick={() => {
        history.push(to)
        setShowOption(false)
        if (action) action()
      }}
    >
      <Icon />
      {label}
    </div>
  )
}
