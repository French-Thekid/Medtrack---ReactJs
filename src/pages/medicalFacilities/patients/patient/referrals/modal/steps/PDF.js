import React, { useState, useEffect } from 'react'
import 'styled-components/macro'
import { BlobProvider } from '@react-pdf/renderer/dist/react-pdf.es.js'
import { PDFViewer } from '@react-pdf/renderer'
import { Colours, Form, Loading } from 'components'
import { set } from 'idb-keyval'
import MyDocument from './MyDocument'

export default function PDFGenerator({
  orgDetails,
  prescriptionTemplateColor,
  loggedInUser,
  body,
}) {
  const [ready, setReady] = useState(false)
  const [qrc, setQrc] = useState('')

  useEffect(() => {
    const qrCodeCanvas = document.getElementById('qrCode')
    if (qrCodeCanvas !== null) {
      setQrc(qrCodeCanvas.toDataURL('image/jpg', 0.3))
    }
  }, [])

  setTimeout(() => {
    setReady(true)
  }, 1)

  return (
    <Form.Step>
      <div
        css={`
          min-height: 500px;
          min-width: 740px;
        `}
      >
        {ready && (
          <>
            <PDFViewer
              css={`
                height: calc(100% - 2px);
                width: calc(100% - 2px);
                border-radius: 5px;
                border: 1px solid ${Colours.border};
              `}
            >
              <MyDocument
                body={body}
                qrc={qrc}
                orgDetails={orgDetails}
                prescriptionTemplateColor={prescriptionTemplateColor}
                loggedInUser={loggedInUser}
              />
            </PDFViewer>
            {/* Storing PDF for submisssion */}
            <BlobProvider
              document={
                <MyDocument
                  body={body}
                  qrc={qrc}
                  orgDetails={orgDetails}
                  prescriptionTemplateColor={prescriptionTemplateColor}
                  loggedInUser={loggedInUser}
                />
              }
            >
              {({ blob, url, loading, error }) => {
                var reader = new FileReader()
                if (loading) return <Loading />
                if (error) return null
                reader.readAsDataURL(blob)
                reader.onloadend = function () {
                  var base64data = reader.result
                  set('E-Referral', base64data)
                    .then(() => console.log('E-Referral Captured!'))
                    .catch((err) =>
                      console.log('E-Referral Capture failed!', err)
                    )
                }
                return null
              }}
            </BlobProvider>
          </>
        )}
      </div>
    </Form.Step>
  )
}
