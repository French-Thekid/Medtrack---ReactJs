import React from 'react'
import 'styled-components/macro'
import { LIST_ALLERGIES } from '../record/subPages/allergies/queries'
import { useQuery } from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router'
import { Content, Loading, Colours, Core } from 'components'
import { Card } from './ActiveDiagnosis'
import { useHistory } from 'react-router-dom'

export default function ActiveAllergies() {
  const {
    params: { patientId },
  } = useRouteMatch()
  const history = useHistory()

  //Query
  const { loading, error, data } = useQuery(LIST_ALLERGIES, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading Contained />
  if (error)
    return (
      <Content.Alert type="error" message={'Failed to load active allergies'} />
    )

  const allergies = data.listExternalAllergies.data

  const activeAllergy = allergies
    .map((allergyMain, index) => {
      const { allergy } = allergyMain || {}
      const { allergyStatus } = allergy || {}
      const { name: status } = allergyStatus || {}
      if (status === 'Active') return { ...allergy }
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
          history.push(`/facility/patient/record/${patientId}/allergies`)
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
        {activeAllergy.map(({ name, description }, index) => {
          return <Card key={index} title={name} body={description} />
        })}
      </div>
    </div>
  )
}
