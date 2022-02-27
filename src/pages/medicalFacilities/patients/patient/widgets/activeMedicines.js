import React from 'react'
import 'styled-components/macro'
import { LIST_MEDICINES } from '../record/subPages/medicines/queries'
import { useQuery } from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router'
import { Content, Loading, Colours, Core } from 'components'
import { Card } from './ActiveDiagnosis'
import { useHistory } from 'react-router-dom'

export default function ActiveMedicines() {
  const {
    params: { patientId },
  } = useRouteMatch()
  const history = useHistory()

  //Query
  const { loading, error, data } = useQuery(LIST_MEDICINES, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading Contained />
  if (error)
    return <Content.Alert type="error" message={'Failed to load medicines'} />

  const medicines = data.listExternalMedicines.data || []

  const activeMedicines = medicines
    .map((medicineMain, index) => {
      const { medicine } = medicineMain || {}
      const { medicineStatus } = medicine || {}
      const { name: status } = medicineStatus || {}
      if (status === 'Active') return { ...medicine }
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
          history.push(`/facility/patient/record/${patientId}/medicines`)
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
        {activeMedicines.map(({ name, description }, index) => {
          return <Card key={index} title={name} body={description} />
        })}
      </div>
    </div>
  )
}
