import React from 'react'
import 'styled-components/macro'
import { Core, Colours } from 'components'

export default function MedicalCondition() {
  const { medicalCondition } =
    JSON.parse(localStorage.getItem('selectedPatient')) || {}

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 10px;
        overflow-y: auto;
      `}
    >
      <div
        css={`
          border-bottom: 1px solid ${Colours.border};
          padding: 4px 0px;
        `}
      >
        <Core.Text
          customSize="25px"
          overrideCustomSize="20px"
          screen="1400px"
          color={Colours.teal}
        >
          Medical Condition
        </Core.Text>
      </div>
      <div
        css={`
          height: 100%;
          overflow-y: auto;
        `}
      >
        <Core.Text>{medicalCondition}</Core.Text>
      </div>
    </div>
  )
}
