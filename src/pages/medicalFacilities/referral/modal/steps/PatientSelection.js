import React, { useState } from 'react'
import 'styled-components/macro'
import { LIST_PATIENTS, SEARCH_PATIENTS } from '../../../patients/queries'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { Colours, Core, Content, FormControl, Loading } from 'components'

export default function PatientSelection({
  selectedPatient,
  setSelectedPatient,
}) {
  const [query, setQuery] = useState('')
  //Query
  let { loading, error, data: patients } = useQuery(LIST_PATIENTS)
  const [
    searchPatient,
    { loading: loading1, error: error1, data: searchResult },
  ] = useLazyQuery(SEARCH_PATIENTS)

  if (loading || loading1) return <Loading Contained />
  if (error || error1)
    return <Content.Alert type="error" message={'Failed to load Patients'} />

  const { listPatients } = searchResult || {}
  const { total: searchTotal } = listPatients || {}

  if (searchTotal > 0) patients = searchResult

  const PatientList = patients.listPatients.data

  return (
    <div
      css={`
        min-height: 400px;
        max-height: 469px;
        overflow-y: auto;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 10px;
      `}
    >
      <div
        css={`
          width: calc(100% - 2px);
          display: grid;
          grid-template-columns: max-content 1fr;
          grid-gap: 10px;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid ${Colours.border};
        `}
      >
        <Core.Text>Please select the patient you'd want to refer</Core.Text>
        <FormControl.InputWithImage
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={'Search patients'}
          action={() => {
            searchPatient({ variables: { query } })
          }}
        />
      </div>
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
        {PatientList.map(
          (
            {
              id,
              person: {
                avatar,
                firstName,
                lastName,
                trn,
                address,
                title,
                contact,
              },
            },
            index
          ) => {
            const { contact_number: phone } = contact || {}
            return (
              <Content.UserCard
                special
                single
                key={index}
                id={id}
                avatar={avatar}
                firstName={firstName}
                lastName={lastName}
                title={title}
                trn={trn}
                address={address}
                extra={phone || 'Not Specified'}
                selectedUsers={selectedPatient}
                setSelectedUsers={setSelectedPatient}
              />
            )
          }
        )}
      </div>
    </div>
  )
}
