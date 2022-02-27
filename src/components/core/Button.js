import React, { useContext } from 'react'
import 'styled-components/macro'
import { Colours } from 'components'
import { OrganisationContext } from 'context'
// import { keyframes } from 'styled-components'

export default function Button(props) {
  const { status } = useContext(OrganisationContext)

  let {
    children,
    selfContained,
    bgColour = Colours.purple,
    fontColour = 'white',
    width = '100%',
    height = 'max-content',
    type = 'button',
    bottomMargin = '0px',
    disabled,
    border = 'none',
    action,
    float,
    purpose,
    ...rest
  } = props

  if (purpose === 'major' && status === 'SUSPENDED') {
    disabled = true
  }

  return (
    <button
      css={`
        width: ${selfContained ? 'max-content' : width};
        min-width: max-content;
        height: ${height};
        background: ${bgColour};
        color: ${fontColour};
        font-size: 14px;
        border: ${border};
        padding: 8px;
        box-shadow: 0px 0px 2px 0px rgba(166, 166, 166, 1);
        border-radius: 5px;
        display: grid;
        justify-items: Center;
        outline: none;
        align-items: Center;
        margin-bottom: ${bottomMargin ? bottomMargin : bottomMargin};
        margin-right: ${float ? '4px' : '0px'};
        transition: ease-out 0.2s;
        &:hover {
          cursor: pointer;
          box-shadow: 0px 8px 20px -2px rgba(196, 196, 196, 1);
          transition: ease-out 0.2s;
          transform: translateY(-1px);
        }
        &:disabled {
          cursor: not-allowed;
          opacity: 0.7;
          filter: grayscale(40%);
        }
      `}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
}

//   const pulsar = keyframes`
//   0%   {
//     box-shadow:0px 0px 0px 2px #50afffe8,0px 0px 0px 2px #9fd3ffe8;}

//     25%  {
//     box-shadow:0px 0px 0px 2px #50afffe8,0px 0px 0px 4px #9fd3ffe8;}

//     50%  {
//     box-shadow:0px 0px 0px 4px #50afffe8,0px 0px 0px 6px #9fd3ffe8;}
// `

/* animation: infinite 2s ${pulsar} cubic-bezier(0.17, 0.67, 0.83, 0.67); */
