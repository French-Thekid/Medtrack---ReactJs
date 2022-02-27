import React from 'react'
import 'styled-components/macro'
import { Core, Colours } from 'components'
import { useHistory } from 'react-router'
import forbiddenImage from 'assets/forbidden.png'
import { keyframes } from 'styled-components'

export default function RestrictedAccess({ small, tiny }) {
  const history = useHistory()

  const floating = keyframes`
  0% { transform: translate(0,  0px); }
  50%  { transform: translate(0, 10px); }
  100%   { transform: translate(0, -0px); } 
`

  return (
    <div
      css={`
        display: grid;
        place-items: center;
        height: 100%;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-rows: repeat(4, max-content);
          grid-gap: 10px;
          display: grid;
          place-items: center;
        `}
      >
        <img
          src={forbiddenImage}
          alt="forbidden"
          css={`
            width: ${tiny ? '150px' : '300px'};
            height: ${tiny ? '100' : '250px'};
            -webkit-animation: ${floating} 4s infinite ease-in-out both;
            animation: ${floating} 4s infinite ease-in-out both;
          `}
        />
        <Core.Text weight="600" customSize={tiny ? '20px' : '40px'}>
          Permission Denied
        </Core.Text>
        <Core.Text
          align="center"
          customSize={small ? '15px' : '20px'}
          color={Colours.textGrey}
        >
          You do not have permission to access this feature. <br />
          Please refer to your system admistrator.
        </Core.Text>
        <br />
        {!tiny && (
          <Core.Button width="150px" onClick={() => history.goBack()}>
            Go Back
          </Core.Button>
        )}
      </div>
    </div>
  )
}
