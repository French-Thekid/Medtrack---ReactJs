import React from 'react'
import 'styled-components/macro'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import {
  Note,
  Patient,
  Loading,
  Content,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { EditNote, NewNote, RemoveNote } from './modal'
import { LIST_NOTES, SEARCH_NOTES } from './queries'

const queryString = require('query-string')

export default function Notes() {
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const {
    params: { patientId },
  } = useRouteMatch()
  const ReadPermission = PermissionCheck({
    feature: 'Note',
    action: 'READ',
  })
  const { id: myId } = JSON.parse(localStorage.getItem('user') || '{}')

  //Query
  let { loading, error, data } = useQuery(LIST_NOTES, {
    variables: { patientId: parseInt(patientId) },
  })
  const [
    searchNotes,
    { loading: loading0, error: error0, data: searchResult },
  ] = useLazyQuery(SEARCH_NOTES)

  if (loading0) console.log('Searching')
  if (loading) return <Loading small />
  if (error || error0)
    return <Content.Alert type="error" message={error.message} />

  //Handling Seaarch Results
  const { listNotes: searchList } = searchResult || {}
  const { total: searchTotal } = searchList || {}

  if (searchTotal > 0) data = searchResult

  return ReadPermission ? (
    <>
      <div
        css={`
          display: grid;
          grid-template-rows: 40px 1fr;
          grid-gap: 20px;
          overflow-y: auto;
        `}
      >
        <Patient.TopPanel
          path={'?action=CreateNote'}
          btnTitle="Attach Note"
          title="Notes"
          placeholder="Search Notes"
          searchHandler={searchNotes}
          searchExtras={{ patientId: parseInt(patientId) }}
        />
        <div
          css={`
            height: 100%;
            width: 100%;
            overflow-y: auto;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 20px;
            grid-template-rows: 240px;

            @media screen and (max-width: 1025px) {
              grid-template-columns: 1fr 1fr;
            }
            @media screen and (max-width: 769px) {
              @media screen and (orientation: portrait) {
                grid-template-columns: 1fr;
              }
            }
            @media screen and (min-width: 1440px) {
              grid-template-columns: 1fr 1fr 1fr 1fr;
            }
          `}
        >
          {loading0 && <Loading Contained />}
          {data.listNotes.data.map(
            (
              { section, title, details, id, createdAt, createdByUser },
              index
            ) => {
              const {
                id: creatorId,
                avatar,
                type,
                firstName,
                lastName,
                person,
              } = createdByUser || {}
              const { title: CTitle } = person || {}
              return (
                <Note.NoteCard
                  key={index}
                  section={section}
                  title={title}
                  details={details}
                  id={id}
                  createdOn={new Date(parseInt(createdAt))}
                  avatar={avatar}
                  type={type}
                  firstName={firstName}
                  lastName={lastName}
                  CTitle={CTitle}
                  CId={creatorId}
                  myId={myId}
                />
              )
            }
          )}
        </div>
      </div>
      {action === 'editNote' && <EditNote />}
      {action === 'CreateNote' && <NewNote />}
      {action === 'removeNote' && <RemoveNote />}
    </>
  ) : (
    <RestrictedAccess small />
  )
}
