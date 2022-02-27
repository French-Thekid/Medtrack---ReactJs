import React, { useContext, useState, useRef } from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, Core, Colours, Loading } from 'components'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_SIGNATURE } from '../mutations'
import { UserContext } from 'context'
import { LOGGED_IN_USER } from 'context/query'
import SignatureCanvas from 'react-signature-canvas'

export default function ManageSignatureModal({ showNotificationSignature }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [file, setFile] = useState({})
  const [fileName, setFileName] = useState('No file Chosen')

  const { loggedInUser } = useContext(UserContext)
  const { id } = loggedInUser || {}

  const [empty, setEnpty] = useState(false)
  const [type, setType] = useState('Draw')
  const [signature, setSignature] = useState('')

  const sigCanvas = useRef({})
  const Clear = () => {
    sigCanvas.current.clear()
  }

  const Save = () => {
    if (sigCanvas.current.isEmpty()) {
      setEnpty(true)
    } else {
      setSignature(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'))
      // close()
    }
  }

  // Mutation
  const [updateUserSignature, { loading, error }] = useMutation(
    UPDATE_SIGNATURE,
    {
      refetchQueries: () => [
        {
          query: LOGGED_IN_USER,
        },
      ],
      onCompleted(updateUserSignature) {
        showNotificationSignature()
      },
    }
  )

  return (
    <Layout.Container>
      {loading && <Loading />}
      {error && (
        <Content.Alert type="error" message="Failed to update signature" />
      )}
      <Dialog open={true} widthSub="300px">
        <Content.CustomCard
          title={'Manage Signature'}
          close={() => {
            history.goBack()
          }}
          minWidth="530px"
        >
          <Toggle type={type} setType={setType} />
          <br />
          {type === 'Upload' && (
            <div>
              <Core.Text>
                Please Upload your signature using the import tool below
              </Core.Text>
              <br />
              <Content.FileChooser
                fileName={fileName}
                setFileName={setFileName}
                onDone={(file) => setFile(file.base64)}
              />
            </div>
          )}
          {type === 'Draw' && (
            <div>
              <Core.Text size="18px" color={Colours.input}>
                Please draw your signature below
              </Core.Text>
              <div
                css={`
                  display: grid;
                  grid-template-rows: max-content max-content;
                  grid-gap: 20px;
                  margin-top: 10px;
                `}
              >
                <div
                  css={`
                    border: ${empty
                      ? `1px solid ${Colours.red}`
                      : `1px solid ${Colours.blue}`};
                    border-radius: 5px;
                    padding: 2px;
                    -webkit-box-shadow: 0px 0px 33px -8px rgba(230, 230, 230, 1);
                    -moz-box-shadow: 0px 0px 33px -8px rgba(230, 230, 230, 1);
                    box-shadow: 0px 0px 33px -8px rgba(230, 230, 230, 1);
                  `}
                >
                  <SignatureCanvas
                    penColor="#4756a1"
                    canvasProps={{
                      width: 500,
                      height: 200,
                      className: 'sigCanvas',
                    }}
                    ref={sigCanvas}
                    onEnd={() => {
                      if (empty === true) setEnpty(false)
                    }}
                  />
                </div>
                <div
                  css={`
                    display: grid;
                    grid-template-columns: max-content 1fr max-content;
                  `}
                >
                  <Core.Button onClick={Clear} width="150px">
                    Clear
                  </Core.Button>
                  <div />
                  <Core.Button onClick={Save} width="150px">
                    Save
                  </Core.Button>
                </div>
              </div>
            </div>
          )}
          <br />
          <Core.Button
            bgColor={Colours.green}
            onClick={async () => {
              await updateUserSignature({
                variables: {
                  signature: type === 'Draw' ? signature : file,
                  userId: id,
                },
              }).catch((e) => {
                console.log(e)
              })
              history.goBack()
            }}
          >
            Upload
          </Core.Button>
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}

const Toggle = ({ type, setType }) => {
  return (
    <div
      css={`
        border-radius: 5px;
        background: ${Colours.foreground};
        padding: 2px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        border: 1px solid ${Colours.border};
        height: 30px;
        margin-bottom: 10px;
        transition: ease-out 0.5s;
      `}
    >
      <div
        css={`
          height: 100%;
          display: grid;
          place-items: Center;
          background: ${type === 'Draw' ? Colours.purple : Colours.foreground};
          color: ${type === 'Draw' ? Colours.foreground : Colours.text};
          border-radius: 5px;
          transition: ease-out 0.5s;
          &:hover {
            cursor: pointer;
          }
        `}
        onClick={() => {
          if (type !== 'Draw') setType('Draw')
        }}
      >
        Draw My Signature
      </div>
      <div
        css={`
          height: 100%;
          display: grid;
          place-items: Center;
          background: ${type === 'Upload'
            ? Colours.purple
            : Colours.foreground};
          color: ${type === 'Upload' ? Colours.foreground : Colours.text};
          border-radius: 5px;
          transition: ease-out 0.5s;
          &:hover {
            cursor: pointer;
          }
        `}
        onClick={() => {
          if (type !== 'Upload') setType('Upload')
        }}
      >
        Upload My Signature
      </div>
    </div>
  )
}
