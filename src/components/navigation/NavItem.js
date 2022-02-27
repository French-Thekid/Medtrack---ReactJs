import React from 'react'
import 'styled-components/macro'
import { Colours } from 'components'
import { useHistory } from 'react-router-dom'

export default function NavItem({
  children,
  to,
  Icon,
  active,
  title = 'Nav Item',
}) {
  const history = useHistory()
  return title === 'Settings' ? (
    <div
      css={`
        height: max-content;
        width: calc(100% - 20px);
        padding: 10px;
        background: ${active ? '#4F22AF' : 'none'};
        border-radius: 30px;
        display: grid;
        grid-template-rows: ${active ? 'max-content 1fr' : 'max-content'};
        grid-row-gap: ${active ? '10px' : '0px'};
        &:hover {
          cursor: pointer;
          background: ${active ? '#4F22AF' : '#6e43cb'};
        }
      `}
      onClick={() => {
        if (title === 'Settings') {
        } else {
          history.push(to)
        }
      }}
    >
      <div
        css={`
          height: 30px;
          width: calc(100% - 20px);
          background: none;
          border-radius: 30px;
          display: grid;
          grid-template-columns: 30px 1fr;
          grid-column-gap: 10px;
          align-items: center;
          padding-left: 20px;
          transition: left 1s ease-out;
          &:hover {
            cursor: pointer;
            background: ${active ? 'none' : '#6e43cb'};
          }
          @media screen and (max-width: 1440px) {
            height: 25px;
          }
        `}
        onClick={() => history.push(to)}
      >
        <Icon
          style={{
            fontSize: 26,
            color: active ? Colours.foreground : Colours.defaultMenuColour,
          }}
        />
        <Label active={active}>{title}</Label>
      </div>
      <div>{children}</div>
    </div>
  ) : (
    <div
      css={`
        height: 30px;
        width: calc(100% - 40px);
        background: ${active ? '#4F22AF' : 'none'};
        border-radius: 30px;
        padding: 10px;
        display: grid;
        grid-template-columns: 30px 1fr;
        grid-column-gap: 10px;
        align-items: center;
        padding-left: 30px;
        transition: left 1s ease-out;
        &:hover {
          cursor: pointer;
          background: ${active ? '#4F22AF' : '#6e43cb'};
        }
        @media screen and (max-width: 1440px) {
          padding: 5px;
          padding-left: 20px;
        }
      `}
      onClick={() => history.push(to)}
    >
      <Icon
        style={{
          fontSize: 26,
          color: active ? Colours.foreground : Colours.defaultMenuColour,
        }}
      />
      <Label active={active}>{title}</Label>
    </div>
  )
}

const Label = ({ active, children }) => (
  <p
    css={`
      padding: 0px;
      margin: 0;
      font-size: 20px;
      color: ${active ? Colours.foreground : Colours.defaultMenuColour};
      &:hover {
        color: white;
      }
      @media screen and (max-width: 1440px) {
        font-size: 15px;
      }
    `}
  >
    {children}
  </p>
)
