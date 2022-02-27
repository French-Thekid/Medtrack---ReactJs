import React from 'react'
import 'styled-components/macro'

import { Colours, Core } from 'components'

export default function ViewReferral() {
  const { fileName, id, url } =
    JSON.parse(localStorage.getItem('selectedReport')) || {}

  return (
    <>
      <div
        css={`
          height: 50px;
          display: grid;
          grid-template-columns: max-content 1fr;
          grid-gap: 20px;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid ${Colours.border};
        `}
      >
        <Core.BackButton
          t0="/facility/referrals/tables/allReferrals"
          cleanUp={() => localStorage.removeItem('selectedReferral')}
        />
        <div>
          <Core.Text customSize="25px">{fileName}</Core.Text>
          <Core.Text color={Colours.purple} customSize="15px">
            #{id}
          </Core.Text>
        </div>
      </div>
      <Core.IFrame title={fileName} src={url} />
    </>
  )
}
