import React, { useState } from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import {
  Layout,
  Content,
  Core,
  Loading,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { LIST_FILES } from '../queries'
import { CREATE_FILE } from '../mutations'
import { useMutation } from '@apollo/react-hooks'

export default function CreateFile({ showNotificationFileCreate }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState('')
  const {
    params: { patientId },
  } = useRouteMatch()
  const Permission = PermissionCheck({
    feature: 'Patient Document',
    action: 'CREATE',
  })
  //Mutation
  const [createPatientDocument, { loading, error }] = useMutation(CREATE_FILE, {
    refetchQueries: () => [
      {
        query: LIST_FILES,
        variables: { patientId: parseInt(patientId) },
      },
    ],
    onCompleted(createPatientDocument) {
      showNotificationFileCreate()
    },
  })

  const handleSubmit = async () => {
    await createPatientDocument({
      variables: {
        patientDocument: {
          patientId: parseInt(patientId),
          fileName,
          base64Pdf: file.split(',')[1],
        },
      },
    }).catch((e) => console.log(e))
    history.goBack()
  }

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'New File'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {Permission ? (
            <>
              {loading && <Loading />}
              {error && (
                <Content.Alert type="error" message="Fail to upload document" />
              )}
              <div
                css={`
                  display: grid;
                  grid-template-rows: repeat(2, max-content);
                  grid-gap: 10px;
                `}
              >
                <Core.Text>
                  Use the file chooser below to upload your file
                </Core.Text>
                <Content.FileChooser
                  fileName={fileName}
                  setFileName={setFileName}
                  onDone={(file) => setFile(file.base64)}
                />
              </div>
              <div
                css={`
                  display: grid;
                  justify-items: end;
                  margin-top: 20px;
                `}
              >
                <Core.Button width="150px" onClick={handleSubmit}>
                  Upload
                </Core.Button>
              </div>
            </>
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
