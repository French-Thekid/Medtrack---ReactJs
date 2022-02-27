import React, { useRef } from 'react'
import 'styled-components/macro'
import { Colours, Core, Icons } from 'components'
import { useOnClickOutside } from 'hooks'
import { useHistory } from 'react-router'

export default function Menu({
  show,
  right = '28px',
  top = '35px',
  children,
  action,
  override,
}) {
  const ref = useRef()
  useOnClickOutside(ref, () => {
    action(false)
    return null
  })
  return show ? (
    <div
      ref={ref}
      css={`
        position: absolute;
        transform: translateY(-1px);
        z-index: 10000;
        right: ${right};
        margin-top: ${top};
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
        <Core.Text>{override || 'Actions'}</Core.Text>
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

export const MenuItems = ({
  Icon = Icons.DeleteRoundedIcon,
  title = 'Action',
  path,
  setshowMenu,
  noIcon,
  action,
}) => {
  const history = useHistory()
  return (
    <div
      css={`
        z-index: 1000;
        width: calc(100% - 20px);
        padding: 0px 10px;
        height: 40px;
        display: grid;
        align-items: center;
        justify-items: ${noIcon ? 'center' : 'start'};
        grid-column-gap: 20px;
        grid-template-columns: ${noIcon ? '1fr' : 'max-content 1fr'};
        color: ${Colours.textGrey};
        &:hover {
          cursor: pointer;
          color: ${Colours.purple};
          background: #f3f5ff;
        }
      `}
      onClick={() => {
        if (action) action()
        setshowMenu(false)
        history.push(path)
      }}
    >
      {!noIcon && <Icon />}
      {title}
    </div>
  )
}
