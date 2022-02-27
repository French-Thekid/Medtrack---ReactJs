import React from 'react'
import 'styled-components/macro'

import { Colours, Icons } from 'components'
import { useHistory } from 'react-router-dom'

export default function BackButton({ to, cleanUp }) {
  const history = useHistory()
  return (
    <div
      css={`
        display: grid;
        place-items: Center;
        border: 1px solid ${Colours.border};
        padding: 5px;
        width: max-content;
        height: max-content;
        border-radius: 50%;
        color: ${Colours.textGrey};
        transition: ease-out 0.1s;
        &:hover {
          border: 1px solid ${Colours.purple};
          box-shadow: 1px 8px 20px -5px rgba(186, 186, 186, 1);
          color: ${Colours.purple};
          transition: ease-out 0.1s;
          transform: translateY(-0.5px);
          cursor: pointer;
        }
      `}
      onClick={() => {
        cleanUp && cleanUp()
        to ? history.push(to) : history.goBack()
      }}
    >
      <Icons.ArrowBackRoundedIcon style={{ fontSize: '20px' }} />
    </div>
  )
}
