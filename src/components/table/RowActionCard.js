import React, { useRef } from 'react'
import 'styled-components/macro'
import { Colours, Core } from 'components'
import { useOnClickOutside } from 'hooks'

export default function RowActionCard({
  setshowActions = () => console.log('Didnt work'),
  show,
  validID,
  id,
  right = '0px',
  children,
  actions,
}) {
  const ref = useRef()
  useOnClickOutside(ref, () => {
    actions(false)
    setshowActions((prevState) => {
      return { id: prevState.id, state: false }
    })
    return null
  })
  return show && validID === id ? (
    <div
      ref={ref}
      css={`
        position: absolute;
        transform: translateY(-1px);
        z-index: 10000;
        right: ${right};
        min-height: 100px;
        min-width: 200px;
        border-radius: 5px;
        grid-template-rows: max-content 1fr;
        background: ${Colours.foreground};
        border: 0.5px solid #f0f0f0;
        box-shadow: 0px 0px 41px -24px rgba(194, 194, 194, 1);
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
  ) : null
}
