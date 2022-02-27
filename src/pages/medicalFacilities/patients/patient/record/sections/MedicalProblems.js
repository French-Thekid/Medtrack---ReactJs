import React from 'react'
import 'styled-components/macro'
import { Core, Colours, Icons, Loading, Content } from 'components'
import { useRouteMatch } from 'react-router-dom'
import { LIST_DIAGNOSIS } from '../subPages/diagnosis/queries'
import { useQuery } from '@apollo/react-hooks'

export default function MedicalProblems() {
  const {
    params: { patientId },
  } = useRouteMatch()

  //Query
  const { loading, error, data } = useQuery(LIST_DIAGNOSIS, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading Contained />
  if (error)
    return (
      <Content.Alert type="error" message={'Failed to load medical problems'} />
    )

  const diagnosis = data.listExternalDiagnosis.data || []

  const problems = diagnosis
    .map((diagnosisMain, index) => {
      const { diagnosis } = diagnosisMain || {}
      const { diagnosisStatus, name } = diagnosis || {}
      const { name: status } = diagnosisStatus || {}
      if (status === 'Active') return { name }
      return null
    })
    .filter((item, index) => item !== null)

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
          Medical Problems
        </Core.Text>
      </div>
      <div
        css={`
          height: calc(100% - 20px);
          overflow-y: auto;
          background: #fdf8ff;
          border-radius: 5px;
          padding: 10px;
        `}
      >
        {problems.length === 0 ? (
          <div
            css={`
              height: 100%;
              display: grid;
              place-items: center;
            `}
          >
            <Core.Text color={Colours.purple}>No Medical Problems</Core.Text>
          </div>
        ) : (
          problems.map(({ name }, index) => {
            return (
              <div
                key={index}
                css={`
                  display: grid;
                  grid-template-columns: max-content 1fr;
                  grid-gap: 10px;
                  margin-bottom: 20px;
                  align-items: center;
                `}
              >
                <Icons.GradeRoundedIcon
                  style={{ fontSize: '30px', color: Colours.purple }}
                />
                <Core.Text weight="500">{name}</Core.Text>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
