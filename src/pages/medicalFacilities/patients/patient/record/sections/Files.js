import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import {
  Content,
  Icons,
  Colours,
  Loading,
  Core,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { Menu, Items, Font } from '../subComponents'
import { useRouteMatch } from 'react-router-dom'
import { LIST_FILES } from '../subPages/files/queries'
import { useQuery } from '@apollo/react-hooks'
import EmptyTablePlaceHolder from 'assets/empty.png'
import { OrganisationContext } from 'context'

export default function Files() {
  const [query, setQuery] = useState('')
  const match = useRouteMatch()
  const {
    params: { patientId },
  } = useRouteMatch()
  const { status: facilityStatus } = useContext(OrganisationContext)
  const ReadPermission = PermissionCheck({
    feature: 'Patient Document',
    action: 'READ',
  })
  //Query
  const { loading, error, data } = useQuery(LIST_FILES, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading Contained />
  if (error)
    return <Content.Alert type="error" message={'Failed to load documents'} />

  const { listExternalPatientDocuments } = data || {}
  const { data: result } = listExternalPatientDocuments || {}
  const files = result || []

  return (
    <Content.RecordCard
      title="Files/Documents"
      query={query}
      setQuery={setQuery}
      options
      search
      to={'?action=addFile'}
      main={`${match.url}/files`}
    >
      {ReadPermission ? (
        <div
          css={`
            display: grid;
            grid-template-rows: max-content 1fr;
            grid-gap: 20px;
            height: 100%;
          `}
        >
          <div
            css={`
              display: grid;
              grid-template-columns: repeat(4, 1fr) 60px;
              grid-gap: 10px;
              justify-items: start;
              padding-bottom: 5px;
              border-bottom: 2px solid ${Colours.border};
            `}
          >
            <Font.Header>Title</Font.Header>
            <Font.Header>Uploaded At</Font.Header>
            <Font.Header>Uploaded By</Font.Header>
            <Font.Header>Uploaded On</Font.Header>
          </div>
          <div
            css={`
              overflow-y: auto;
              height: 100%;
            `}
          >
            {files.length === 0 ? (
              <div
                css={`
                  width: 100%;
                  height: 100%;
                  display: grid;
                  place-items: Center;
                `}
              >
                <div
                  css={`
                    display: grid;
                    grid-template-rows: max-content max-content;
                    width: max-content;
                    height: max-content;
                    justify-items: Center;
                  `}
                >
                  <img
                    src={EmptyTablePlaceHolder}
                    alt="placeholder"
                    height="120px"
                    css={`
                      @media (min-width: 767px) {
                        height: 150px;
                      }
                    `}
                  />
                  <Core.Text
                    weight="600"
                    customSize="20px"
                    color={Colours.purple}
                  >
                    No Files Yet
                  </Core.Text>
                </div>
              </div>
            ) : (
              files.map(({ document, fromOrganizationObject }, index) => {
                const { id, fileName, createdByUser, createdAt, url } =
                  document || {}
                const { name: facilityName } = fromOrganizationObject || {}
                const { firstName, lastName, person } = createdByUser || {}
                const { title } = person || {}
                return (
                  <Row
                    key={index}
                    id={id}
                    facilityName={facilityName}
                    name={fileName}
                    creator={`${title || ''} ${firstName} ${lastName}`}
                    createdAt={createdAt}
                    url={url}
                    facilityStatus={facilityStatus}
                  />
                )
              })
            )}
          </div>
        </div>
      ) : (
        <RestrictedAccess small tiny />
      )}
    </Content.RecordCard>
  )
}

const Row = ({
  id,
  name,
  creator,
  facilityName,
  createdAt,
  facilityStatus,
  url,
  ...rest
}) => {
  const [showOptions, setShowOption] = useState(false)

  return (
    <div
      {...rest}
      css={`
        display: grid;
        grid-template-columns: repeat(4, 1fr) 60px;
        grid-gap: 10px;
        padding: 10px 0px;
        justify-items: start;
        border-bottom: 1px solid ${Colours.border};
        &:hover {
          background: ${Colours.menuHover};
        }
        position: relative;
      `}
    >
      <Font.Value>{name}</Font.Value>
      <Font.Value>{facilityName}</Font.Value>
      <Font.Value>{creator}</Font.Value>
      <Font.Value>{new Date(parseInt(createdAt)).toDateString()}</Font.Value>
      <div
        css={`
          color: ${Colours.icon};
          &:hover {
            cursor: ${facilityStatus === 'SUSPENDED'
              ? 'not-allowed'
              : 'pointer'};
            color: ${Colours.purple};
          }
        `}
        onClick={() => {
          if (facilityStatus !== 'SUSPENDED') setShowOption(!showOptions)
        }}
      >
        <Icons.MoreHorizRoundedIcon
          style={{ color: 'inherit', fontSize: '25px' }}
        />
      </div>
      {showOptions && (
        <Menu setShowOption={setShowOption}>
          <Items
            to={`?action=viewFile&id=${id}`}
            Icon={Icons.LaunchIcon}
            label="View"
            setShowOption={setShowOption}
            action={() =>
              localStorage.setItem(
                'selectedFile',
                JSON.stringify({
                  id,
                  name,
                  url,
                })
              )
            }
          />
          <Items
            to={`?action=deleteFile&id=${id}`}
            Icon={Icons.DeleteRoundedIcon}
            label="Remove"
            setShowOption={setShowOption}
          />
        </Menu>
      )}
    </div>
  )
}
