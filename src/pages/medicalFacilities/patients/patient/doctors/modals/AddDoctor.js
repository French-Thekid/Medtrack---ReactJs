import React, { useState } from 'react'
import 'styled-components/macro'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'

import { LIST_DOCTORS, SEARCH_DOCTORS } from '../../../../appointment/queries'
import { useDialog } from 'hooks'
import {
  Layout,
  Content,
  Core,
  FormControl,
  Colours,
  Loading,
} from 'components'
import { useMutation } from '@apollo/react-hooks'
import { LIST_ASSOCIATED_PATIENTS } from '../queries'
import { ADD_ASSOCIATION } from '../mutations'

export default function AddCotor({ blackList, showNotificationAdd }) {
  const [selectedUsers, setSelectedUsers] = useState({ users: [] })
  const { Dialog } = useDialog()
  const history = useHistory()
  const {
    params: { patientId },
  } = useRouteMatch()
  const [query, setQuery] = useState('')
  //Mutation
  const [addDoctorsToPatient, { loading: removing, error: removeFailed }] =
    useMutation(ADD_ASSOCIATION, {
      refetchQueries: () => [
        {
          query: LIST_ASSOCIATED_PATIENTS,
          variables: { id: parseInt(patientId) },
        },
      ],
      onCompleted(addDoctorsToPatient) {
        showNotificationAdd()
      },
    })

  //Query
  let { loading, error, data: doctors } = useQuery(LIST_DOCTORS)
  const [
    searchDoctors,
    { loading: loading0, error: error0, data: searchResult },
  ] = useLazyQuery(SEARCH_DOCTORS)

  if (loading) return <Loading small />
  if (loading0) console.log('searching')
  if (error || error0)
    return <Content.Alert type="error" message={'Failed to load doctors'} />

  //Handling Seaarch Results
  const { listDoctors: searchList } = searchResult || {}
  const { total: searchTotal } = searchList || {}

  if (searchTotal > 0) doctors = searchResult

  const filteredList = doctors.listDoctors.data
    .map((doctor, index) => {
      if (blackList.indexOf(parseInt(doctor.id)) === -1) return doctor
      return null
    })
    .filter((item, index) => item !== null)

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Add Doctor'}
          close={() => {
            history.goBack()
          }}
          minWidth="550px"
        >
          {removing && <Loading />}
          {removeFailed && (
            <Content.Alert type="error" message="Failed to add doctor" />
          )}
          <div
            css={`
              display: grid;
              grid-template-rows: max-content 1fr max-content;
              overflow-y: auto;
            `}
          >
            <div
              css={`
                display: grid;
                grid-template-rows: max-content max-content;
                grid-gap: 5px;
                padding-bottom: 10px;
                border-bottom: 1px solid ${Colours.border};
              `}
            >
              <Core.Text>
                Please select the doctors you wish to create an association with
                this patient.
              </Core.Text>
              <div
                css={`
                  width: calc(100% - 5px);
                `}
              >
                <FormControl.InputWithImage
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={'Search Doctors'}
                  action={() => {
                    searchDoctors({ variables: { query } })
                  }}
                />
              </div>
            </div>
            {loading0 && <Loading Contained />}
            {filteredList.length === 0 ? (
              <div
                css={`
                  padding: 50px;
                `}
              >
                <Core.Text color={Colours.red}>
                  It appears all doctors have been assigned to this patient
                </Core.Text>
              </div>
            ) : (
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
                {filteredList.map(
                  (
                    {
                      id,
                      user: {
                        avatar,
                        firstName,
                        lastName,
                        person,
                        qualifications = [],
                      },
                    },
                    index
                  ) => {
                    const { title } = person || {}
                    const { specification } =
                      qualifications.length > 0 ? qualifications[0] : {}

                    return (
                      <Content.UserCard
                        key={index}
                        id={id}
                        avatar={avatar}
                        firstName={firstName}
                        lastName={lastName}
                        title={title}
                        extra={specification || 'Not Specified'}
                        selectedUsers={selectedUsers}
                        setSelectedUsers={setSelectedUsers}
                      />
                    )
                  }
                )}
              </div>
            )}
            <div
              css={`
                display: grid;
                justify-items: end;
                padding-top: 10px;
                margin-top: 10px;
                border-top: 1px solid ${Colours.border};
              `}
            >
              <Core.Button
                width="150px"
                bgColour={
                  filteredList.length === 0 ? Colours.purple : Colours.green
                }
                onClick={async () => {
                  if (filteredList.length === 0) history.goBack()
                  else {
                    let ids = []
                    if (selectedUsers.users.length > 0) {
                      ids = selectedUsers.users.map((id, index) => parseInt(id))
                    }
                    await addDoctorsToPatient({
                      variables: {
                        patientId: parseInt(patientId),
                        doctors: ids,
                      },
                    }).catch((e) => console.log(e))
                    history.goBack()
                  }
                }}
              >
                {filteredList.length === 0 ? 'Back' : 'Connect'}
              </Core.Button>
            </div>
          </div>
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
