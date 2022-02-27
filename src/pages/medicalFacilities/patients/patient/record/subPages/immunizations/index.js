import React from 'react'
import 'styled-components/macro'
import { Layout } from 'components'
import { useRouteMatch } from 'react-router-dom'

export default function Index() {
  const {
    params: { patientId },
  } = useRouteMatch()

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 20px;
      `}
    >
      <Layout.TopPanel
        title="Immunizations/Vaccinations"
        to={`/facility/patient/record/${patientId}`}
      ></Layout.TopPanel>
    </div>
  )
}
