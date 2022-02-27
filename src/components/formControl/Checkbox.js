import React from 'react'
import 'styled-components/macro'

import { Colours } from 'components'

export default function Checkbox(props) {
  let { startwithoff } = props
  return (
    <input
      defaultChecked={startwithoff ? true : false}
      type="checkbox"
      css={`
        width: 16px;
        height: 16px;
        background-color: ${Colours.inputBackground};
        border: 1px solid #cacece;
        outline: none;
        padding: 7px;
        margin: 0px;
        margin-bottom: -4px;
        border-radius: 3px;
        position: relative;
        appearance: none;
        &:checked {
          color: white;
          background-color: ${Colours.purple};
          padding: 0;
        }
        &:checked::after {
          color: white;
          font-size: 10px;
          content: '\\2714';
          padding-left: 3px;
          padding-right: 3px;
        }
        &:hover {
          cursor: pointer;
          border: 1px solid ${Colours.purple};
        }
      `}
      {...props}
    />
  )
}
