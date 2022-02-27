import React from 'react'
import 'styled-components/macro'

export default function ActionButtonContainer({
  children,
  noRight,
  action,
  id,
  data,
  dataSetId,
  ...rest
}) {
  return (
    <div
      {...rest}
      css={`
        margin-right: ${noRight ? '0px' : '10px'};
        &:hover {
          cursor: pointer;
        }
      `}
      onClick={() => {
        if (id === 'edit' || id === 'permissions') action(data)
        else action(dataSetId)
      }}
    >
      {children}
    </div>
  )
}
