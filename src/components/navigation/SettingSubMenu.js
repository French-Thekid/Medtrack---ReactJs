import React from 'react'
import 'styled-components/macro'
import { Colours } from 'components'
import { useHistory } from 'react-router-dom'

export default function SettingsSubMenu({
  small,
  props,
  show,
  to,
  Icon,
  active,
  title,
}) {
  const history = useHistory()

  return (
    <div
      css={`
        height: 30px;
        width: calc(100% - 40px);
        background: ${active ? '#23085B' : 'none'};
        border-radius: 30px;
        padding: ${small ? '5px' : '10px'};
        display: ${show ? 'grid' : 'none'};
        grid-template-columns: 30px 1fr;
        grid-column-gap: 10px;
        align-items: center;
        padding-left: 30px;
        transition: left 1s ease-out;
        &:hover {
          cursor: pointer;
          background: ${active ? '#23085B' : '#6e43cb'};
        }
        @media screen and (max-width: 1440px) {
          padding: 5px;
          padding-left: 30px;
        }
      `}
      onClick={() => {
        history.push(to)
        if (small) props.handleNavbar()
      }}
    >
      <Icon
        style={{
          fontSize: 24,
          color: active ? Colours.foreground : Colours.defaultMenuColour,
        }}
      />
      <Label customSize="24px" active={active}>
        {title}
      </Label>
    </div>
  )
}

const Label = ({ active, children }) => (
  <p
    css={`
      padding: 0px;
      margin: 0;
      color: ${active ? Colours.foreground : Colours.defaultMenuColour};
      &:hover {
        color: white;
      }
    `}
  >
    {children}
  </p>
)
