import React from 'react'
import 'styled-components/macro'
import { Colours } from 'components'
import { useHistory } from 'react-router'

export default function MainItem({ to, active, children, alternative }) {
  const history = useHistory()

  return (
    <div
      css={`
        width: max-content;
        padding: 5px 20px;
        border-bottom: ${active ? `2px solid ${Colours.purple}` : 'none'};
        color: ${active ? Colours.purple : Colours.textGrey};
        font-size: 18px;
        transition: ease-out 0.1s;
        &:hover {
          cursor: pointer;
          color: ${Colours.purple};
          transition: ease-out 0.1s;
          transform: translateY(-1px);
        }
      `}
      onClick={() => (to ? history.push(to) : alternative())}
    >
      {children}
    </div>
  )
}
