import React from 'react'
import 'styled-components/macro'
import { useQuery } from '@apollo/react-hooks'

import { LIST_MEDICAL_FACILITY } from 'pages/support/facilities/forms/queries'
import { Colours, Core, Content, Loading, Form } from 'components'

export default function FacilitySelection({
  selectedFacility,
  setSelectedFacility,
  orgDetails,
}) {
  const { organizationId } = orgDetails || {}
  const { loading, error, data: facilities } = useQuery(LIST_MEDICAL_FACILITY)
  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Failed to load Facilities'} />

  //Patient Information
  const { lastName, title } =
    JSON.parse(localStorage.getItem('selectedPatient')) || {}

  const pharmacies = facilities.listFacilities
    .map((facility, index) => {
      if (organizationId === facility.organizationId) return null
      if (facility.type !== 'Pharmacy') return facility
      return null
    })
    .filter((item, index) => item !== null)

  return (
    <Form.Step>
      <div
        css={`
          padding-bottom: 5px;
          border-bottom: 1px solid ${Colours.border};
          width: 100%;
        `}
      >
        <Core.Text>
          Please Select the Medical Facility(s) you would like to refer {title}{' '}
          {lastName} to. (Optional)
        </Core.Text>
      </div>
      <div
        css={`
          min-height: 400px;
          overflow-y: auto;
          display: grid;
          grid-gap: 10px;
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            overflow-y: auto;
            margin-top: 10px;
            grid-gap: 20px;
            max-height: 500px;
            padding-top: 2px;
            @media screen and (max-width: 1025px) {
              grid-template-columns: 1fr 1fr 1fr;
            }
          `}
        >
          {pharmacies.map(
            ({ organizationId, logoUrl, name, location }, index) => {
              const { province, country } = location || {}
              if (organizationId !== 'support')
                return (
                  <Content.OrganizationCard
                    special
                    key={index}
                    id={organizationId}
                    avatar={logoUrl}
                    name={name}
                    extra={`${province}, ${country}` || 'Not Specified'}
                    selectedOrganization={selectedFacility}
                    setSelectedOrganization={setSelectedFacility}
                  />
                )
              return null
            }
          )}
        </div>
      </div>
    </Form.Step>
  )
}
