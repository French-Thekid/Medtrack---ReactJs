import React from 'react'
import 'styled-components/macro'
import { Colours, Icons } from 'components'

export default function ActionItemsContainer({
  Icon = Icons.DeleteRoundedIcon,
  title = 'Action',
  dataSetId,
  action,
  id,
  data,
}) {
  return (
    <div
      css={`
        z-index: 1000;
        width: calc(100% - 20px);
        padding-left: 20px;
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
        if (
          id === 'edit' ||
          id === 'suspend' ||
          id === 'enable' ||
          id === 'permissions' ||
          title === 'Delete' ||
          id === 'request' ||
          id === 'symptoms'
        )
          action(data)
        else action(dataSetId)
      }}
    >
      <Icon />
      {title}
    </div>
  )
}
