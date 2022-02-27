import React, { useState, useEffect } from 'react'
import 'styled-components/macro'

import { Colours, Icons } from 'components'

function Checkbox(props) {
  const [checked, setChecked] = useState(props.state || false)
  const { actions = () => {} } = props

  useEffect(() => {
    setChecked(props.state)
  }, [props.state])

  return (
    <div
      {...props}
      onClick={() => {
        setChecked(!checked)
        actions(!checked)
      }}
      css={`
        height: ${checked ? '20px' : '15px'};
        width: ${checked ? '20px' : '15px'};
        border-radius: 3px;
        border: ${checked ? '2px solid #fff' : `2px solid #C2C2C2`};
        &:hover {
          cursor: pointer;
          border: ${checked ? 'none' : `2px solid ${Colours.purple}`};
        }
        display: grid;
        align-items: center;
        justify-items: center;
        background: ${checked ? Colours.purple : Colours.foreground};
      `}
    >
      {checked ? (
        <Icons.CheckRoundedIcon
          style={{ color: 'white', width: '20px', height: '20px' }}
        />
      ) : null}
    </div>
  )
}

export default Checkbox
