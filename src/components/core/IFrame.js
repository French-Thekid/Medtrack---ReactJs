import React from 'react'
import 'styled-components/macro'
import PlaceHolder from 'assets/placeholder.png'
import { Colours, Core } from 'components'

export default function IFrame(props) {
  if (props.src === null || props.src === undefined)
    return (
      <div
        css={`
          /* tablet */
          @media only screen and (max-height: 1025px) {
            @media only screen and (max-width: 769px) {
              @media (orientation: portrait) {
                min-height: 400px;
              }
            }
          }
          /* Ipod Pro */
          @media (width: 1024px) {
            @media (height: 1366px) {
              @media (orientation: portrait) {
                min-height: 400px;
              }
            }
          }

          width: calc(100% - 2px);
          height: calc(100% - 2px);
          border-radius: 5px;
          border: 1px solid ${Colours.border};
          display: grid;
          place-items: center;
        `}
      >
        <div
          css={`
            display: grid;
            place-items: center;
            grid-gap: 10px;
          `}
        >
          <img src={PlaceHolder} alt="placeholder" css={``} />
          <Core.Text color={Colours.textGrey} customSize="20px" align="center">
            Select a {props.filler || 'Item'}
            <br /> to Preview
          </Core.Text>
        </div>
      </div>
    )
  return (
    <iframe
      css={`
        min-height: ${props.responsiveMode ? 'max-content' : '400px'};
        width: calc(100% - 2px);
        height: calc(100% - 6px);
        border-radius: 5px;
        border: 1px solid ${Colours.border};
      `}
      title={props.title}
      {...props}
    />
  )
}
