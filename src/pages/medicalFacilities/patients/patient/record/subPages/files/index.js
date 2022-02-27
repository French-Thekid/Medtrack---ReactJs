import React, { useState } from 'react'
import 'styled-components/macro'
import {
  Core,
  Layout,
  Colours,
  Icons,
  Content,
  Loading,
  Notification,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import PDF_SRC from 'assets/PDF.png'
import { CreateFile, DeleteFile } from './modals'
import { LIST_FILES } from './queries'
import { useQuery } from '@apollo/react-hooks'

const queryString = require('query-string')

export default function Index() {
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const ReadPermission = PermissionCheck({
    feature: 'Patient Document',
    action: 'READ',
  })
  const [selectedItem, setSelectedItem] = useState(null)
  const [query, setQuery] = useState('')
  const history = useHistory()
  const {
    params: { patientId },
  } = useRouteMatch()
  const [completedFileCreate, setcompletedFileCreate] = useState(false)

  //Query
  const { loading, error, data } = useQuery(LIST_FILES, {
    variables: { patientId: parseInt(patientId) },
  })
  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Failed to load documents'} />

  const files = data.listExternalPatientDocuments.data || []

  const showNotificationFileCreate = () => {
    setcompletedFileCreate(true)
    setTimeout(() => {
      setcompletedFileCreate(false)
    }, 6000)
  }

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 20px;
        overflow-y: auto;
      `}
    >
      <Notification
        setcompleted={setcompletedFileCreate}
        message="File Successfully added."
        notification={completedFileCreate}
      />
      <Layout.TopPanel
        title="Files/Documents"
        to={`/facility/patient/record/${patientId}`}
      >
        <Core.Button
          purpose="major"
          onClick={() => history.push('?action=newFile')}
        >
          Add New
        </Core.Button>
      </Layout.TopPanel>
      {ReadPermission ? (
        <div
          css={`
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: 20px;
            overflow-y: auto;
            @media only screen and (max-width: 1020px) {
              grid-template-columns: 1fr;
              grid-template-rows: 300px 1fr;
              grid-gap: 50px;
            }
            /* tablet */
            @media only screen and (max-height: 1025px) {
              @media only screen and (max-width: 769px) {
                @media (orientation: portrait) {
                  grid-template-columns: 1fr;
                  grid-template-rows: 300px 1fr;
                  grid-gap: 50px;
                }
              }
            }
            /* Ipod Pro */
            @media (width: 1024px) {
              @media (height: 1366px) {
                @media (orientation: portrait) {
                  grid-template-columns: 1fr;
                  grid-template-rows: 300px 1fr;
                  grid-gap: 50px;
                }
              }
            }
          `}
        >
          <div
            css={`
              height: 100%;
              padding-right: 5px;
              border-right: 1px solid ${Colours.border};
              display: grid;
              grid-template-rows: max-content 1fr;
              grid-gap: 10px;
              overflow-y: auto;
              @media only screen and (max-width: 1020px) {
                border-bottom: 1px solid ${Colours.border};
              }
            `}
          >
            <div
              css={`
                border-bottom: 1px solid ${Colours.border};
                padding-bottom: 10px;
              `}
            >
              <Content.Search query={query} setQuery={setQuery} title="Files" />
            </div>
            <div
              css={`
                height: calc(100% - 2px);
                padding-top: 2px;
                display: grid;
                overflow-y: auto;
                grid-auto-rows: 110px;
              `}
            >
              {files.map((values, index) => {
                return (
                  <Card
                    values={values}
                    key={index}
                    setSelectedItem={setSelectedItem}
                  />
                )
              })}
            </div>
          </div>
          <div>
            <Core.IFrame responsiveMode src={selectedItem} filler="Document" />
          </div>
        </div>
      ) : (
        <RestrictedAccess small />
      )}
      {action === 'newFile' && (
        <CreateFile showNotificationFileCreate={showNotificationFileCreate} />
      )}
      {action === 'deleteFile' && <DeleteFile />}
    </div>
  )
}

export function Card({ Prescription, setSelectedItem, values, ...rest }) {
  const { document, id } = values || {}
  const { fileName, createdAt, url, createdByUser } = document || {}
  const { person, firstName, lastName } = createdByUser || {}
  const { title: CreatorTitle } = person || {}

  const history = useHistory()

  return (
    <Fade bottom>
      <div
        id="Parent"
        css={`
          height: 100px;
          border: 1px solid ${Colours.border};
          border-radius: 5px;
          display: grid;
          grid-template-columns: 77px 1fr 40px;
          align-items: center;
          grid-gap: 5px;

          &:hover {
            cursor: pointer;
            box-shadow: 0px 8px 20px -2px rgba(196, 196, 196, 1);
            transition: ease-out 0.2s;
            transform: translateY(-1px);
          }
        `}
        {...rest}
      >
        <img
          src={PDF_SRC}
          alt="bleh"
          css={`
            height: 95px;
          `}
        />
        <div
          css={`
            display: grid;
            grid-template-rows: repeat(4, max-content);
            grid-gap: 2px;
          `}
        >
          <Core.Text Contained weight="500">
            {fileName}
          </Core.Text>
          <Core.Text Contained customSize="14px" color={Colours.textGrey}>
            Uploaded On: {new Date(parseInt(createdAt)).toDateString()}
          </Core.Text>
          <Core.Text Contained customSize="14px" color={Colours.textGrey}>
            Uploaded By: {`${CreatorTitle || ''} ${firstName} ${lastName}`}
          </Core.Text>
          <section
            id="delete"
            css={`
              color: ${Colours.icon};
              &:hover {
                cursor: pointer;
                color: ${Colours.red};
              }
            `}
            onClick={() => history.push(`?action=deleteFile&id=${id}`)}
          >
            <Icons.DeleteRoundedIcon style={{ color: 'inherit' }} />
          </section>
        </div>
        <div
          onClick={() => {
            setSelectedItem(url)
          }}
          css={`
            background: #f0ebff;
            height: 100%;
            width: 100%;
            display: grid;
            place-items: center;
            color: ${Colours.purple};
          `}
        >
          <Icons.LaunchIcon />
        </div>
      </div>
    </Fade>
  )
}
