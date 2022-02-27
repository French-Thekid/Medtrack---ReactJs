import React from 'react'
import 'styled-components/macro'
import { LIST_DIAGNOSIS } from '../record/subPages/diagnosis/queries'
import { useQuery } from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router'

import { Content, Loading, Colours, Core } from 'components'
import { useHistory } from 'react-router-dom'

export default function ActiveDiagnosis() {
  const {
    params: { patientId },
  } = useRouteMatch()
  const history = useHistory()

  //Query
  const { loading, error, data } = useQuery(LIST_DIAGNOSIS, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading Contained />
  if (error)
    return <Content.Alert type="error" message={'Failed to load diagnosis'} />

  const diagnosis = data.listExternalDiagnosis.data || []

  const activeDiagnosis = diagnosis
    .map((diagnosisMain, index) => {
      const { diagnosis } = diagnosisMain || {}
      const { diagnosisStatus } = diagnosis || {}
      const { name: status } = diagnosisStatus || {}
      if (status === 'Active') return { ...diagnosis }
      return null
    })
    .filter((item, index) => item !== null)

  return (
    <div
      css={`
        border-radius: 5px;
        border: 1px solid ${Colours.border};
        display: grid;
        grid-template-rows: max-content 1fr;
        overflow-y: auto;
        padding: 10px;
      `}
    >
      <div
        css={`
          display: grid;
          justify-items: end;
          align-items: center;
          &:hover {
            cursor: pointer;
          }
        `}
        onClick={() =>
          history.push(`/facility/patient/record/${patientId}/diagnosis`)
        }
      >
        <Core.Text color={Colours.purple}>See More</Core.Text>
      </div>
      <div
        css={`
          height: 100%;
          overflow-y: auto;
        `}
      >
        {activeDiagnosis.map(({ name, description }, index) => {
          return <Card key={index} title={name} body={description} />
        })}
      </div>
    </div>
  )
}

export const Card = ({ title, body }) => {
  return (
    <div
      css={`
        width: calc(100% - 22px);
        height: 100px;
        background: ${Colours.foreground};
        border: 0.5px solid ${Colours.border};
        margin: 10px 0px;
        border-radius: 5px;
        &:hover {
          box-shadow: 0px 3px 10px -2px rgba(196, 196, 196, 1);
          transition: ease-in-out 0.4s;
          transform: translateY(-1px);
        }
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 5px;
        overflow-y: auto;
        padding: 10px;
      `}
    >
      <Core.Text customSize="20px" color={Colours.purple}>
        {title}
      </Core.Text>
      <Core.Text>{body}</Core.Text>
    </div>
  )
}
