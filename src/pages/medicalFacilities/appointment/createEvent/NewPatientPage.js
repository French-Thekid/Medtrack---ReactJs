import React from 'react'
import 'styled-components/macro'

import { Colours, Core } from 'components'
import { NewPatientForm } from './forms'

export default function NewPatientSelection({
  setSelectedPatient,
  formId,
  setPage,
  props,
}) {
  return (
    <div
      css={`
        min-height: 400px;
        max-height: 469px;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 10px;
      `}
    >
      <div
        css={`
          height: 32px;
          display: grid;
          grid-template-columns: 1fr max-content;
          grid-gap: 10px;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid ${Colours.border};
        `}
      >
        <Core.Text>New Patient</Core.Text>
        <div
          css={`
            &:hover {
              cursor: pointer;
            }
          `}
          onClick={() => {
            setSelectedPatient()
            setPage({
              active: 'Patient Attendee',
              main: true,
              patientCreated: false,
            })
          }}
        >
          <Core.Text color={Colours.purple}>{`Cancel & Return`}</Core.Text>
        </div>
      </div>
      <div
        css={`
          height: 417px;
          width: 908px;
          margin-top: 10px;
          overflow-y: auto;
          overflow-x: hidden;
          @media screen and (max-width: 910px) {
            width: 730px;
          }
        `}
      >
        <NewPatientForm props={props} />
      </div>
    </div>
  )
}
