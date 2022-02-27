import React, { useState, useContext } from 'react'
import { OrganisationContext, UserContext } from 'context'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { saveAs } from 'file-saver'
import QRCode from 'qrcode.react'
import {
  Layout,
  Content,
  Form,
  Loading,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { pdf } from '@react-pdf/renderer'
import MyDocument from './steps/MyDocument'
import { CREATE_REFERRAL, CREATE_EXTERNAL_REFERRAL } from '../mutations'
import { LIST_REFERRALS } from '../queries'
import { useMutation } from '@apollo/react-hooks'
import { clear } from 'idb-keyval'
import {
  FacilitySelection,
  Receipt,
  Methods,
  PDF,
  CustomRecepient,
} from './steps'

export default function CreateReferral({ showNotification }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const {
    params: { patientId },
  } = useRouteMatch()
  const CreatePermission = PermissionCheck({
    feature: 'Referral',
    action: 'CREATE',
  })
  const [method, setMethod] = useState()
  const [dataSet, setDateSet] = useState({
    recepientName: '',
    recepientEmail: '',
    subject: '',
  })
  const [referral, setReferral] = useState('Default')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const [selectedFacility, setSelectedFacility] = useState({ facility: [] })
  const { orgDetails, prescriptionTemplateColor } =
    useContext(OrganisationContext)

  const { loggedInUser } = useContext(UserContext) || {}

  //Mutation
  const [createReferral, { loading, error }] = useMutation(CREATE_REFERRAL, {
    refetchQueries: () => [
      {
        query: LIST_REFERRALS,
        variables: { patientId: parseInt(patientId) },
      },
    ],
    onCompleted(createReferral) {
      showNotification()
    },
  })

  const [createExternalReferral, { loading: exLoading, error: exError }] =
    useMutation(CREATE_EXTERNAL_REFERRAL, {
      refetchQueries: () => [
        {
          query: LIST_REFERRALS,
          variables: { patientId: parseInt(patientId) },
        },
      ],
      onCompleted(createExternalReferral) {
        showNotification()
      },
    })

  const HandleSubmission = async (event) => {
    event.preventDefault()
    //Patient Data
    const { firstName: PatientFirstName, lastName: PatientLastName } =
      JSON.parse(localStorage.getItem('selectedPatient'))

    //formating Data
    const Facilities = selectedFacility.facility.map((id, index) => {
      return { toOrganization: id }
    })

    if (method === 'Print') {
      console.log('Saving & Submitting')
      const qrCodeCanvas = document.getElementById('qrCode')
      const doc = (
        <MyDocument
          body={body}
          qrc={qrCodeCanvas.toDataURL('image/jpg', 0.3) || null}
          orgDetails={orgDetails}
          prescriptionTemplateColor={prescriptionTemplateColor}
          loggedInUser={loggedInUser}
        />
      )
      const asPdf = pdf([])
      asPdf.updateContainer(doc)
      const blob = await asPdf.toBlob()
      saveAs(blob, 'E-Referral.pdf')
      // Calls Endpoint

      if (selectedFacility.facility.length > 0) {
        await createReferral({
          variables: {
            referral: {
              toOrganizations: Facilities,
              patientId: parseInt(patientId),
              title: `E-Referral for ${PatientFirstName} ${PatientLastName}`,
              base64Pdf: referral.split(',')[1],
            },
          },
        }).catch((e) => console.log(e))
      } else {
        await createExternalReferral({
          variables: {
            referral: {
              name: dataSet.recepientName,
              email: dataSet.recepientEmail,
              patientId: parseInt(patientId),
              title: `E-Referral for ${PatientFirstName} ${PatientLastName}`,
              base64Pdf: referral.split(',')[1],
            },
          },
        }).catch((e) => console.log(e))
      }
      clear()
      localStorage.removeItem('SelectedFacilities')
      history.push(`/facility/patient/e-referrals/${patientId}`)
    } else {
      console.log('Submission', subject)
      if (selectedFacility.facility.length > 0) {
        await createReferral({
          variables: {
            referral: {
              toOrganizations: Facilities,
              patientId: parseInt(patientId),
              title: `E-Referral for ${PatientFirstName} ${PatientLastName}`,
              base64Pdf: referral.split(',')[1],
            },
          },
        }).catch((e) => console.log(e))
      } else {
        await createExternalReferral({
          variables: {
            referral: {
              name: dataSet.recepientName,
              email: dataSet.recepientEmail,
              patientId: parseInt(patientId),
              title: `E-Referral for ${PatientFirstName} ${PatientLastName}`,
              base64Pdf: referral.split(',')[1],
            },
          },
        }).catch((e) => console.log(e))
      }
      clear()
      localStorage.removeItem('SelectedFacilities')
      history.push(`/facility/patient/e-referrals/${patientId}`)
    }
  }

  const CanProceed = (page) => {
    if (page === 2 && selectedFacility.facility.length > 0) {
      return body !== ''
    }
    if (page === 2 && selectedFacility.facility.length === 0) {
      return (
        body !== '' &&
        dataSet.recepientEmail !== '' &&
        dataSet.recepientName !== ''
      )
    }
    return true
  }

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'New E-Referral'}
          close={() => {
            localStorage.removeItem('SelectedFacilities')
            history.push(`/facility/patient/e-referrals/${patientId}`)
          }}
          minWidth="600px"
        >
          {CreatePermission ? (
            <>
              <div
                css={`
                  display: none;
                `}
              >
                <QRGenrator valueString={'This is a valid Referral'} />
              </div>
              {(loading || exLoading) && <Loading />}
              {(error || exError) && (
                <Content.Alert type="error" message="Fail to send referral" />
              )}
              <Form.StepForm
                handleSubmit={(event) => HandleSubmission(event)}
                restrictive1
                CanProceed1={CanProceed}
              >
                <FacilitySelection
                  selectedFacility={selectedFacility}
                  setSelectedFacility={setSelectedFacility}
                  orgDetails={orgDetails}
                />

                <CustomRecepient
                  dataSet={dataSet}
                  controller={setDateSet}
                  selectedFacility={selectedFacility}
                  setBody={setBody}
                  setSubject={setSubject}
                  subject={subject}
                  body={body}
                />

                <PDF
                  orgDetails={orgDetails}
                  prescriptionTemplateColor={prescriptionTemplateColor}
                  loggedInUser={loggedInUser}
                  body={body}
                />
                <Methods method={method} setMethod={setMethod} />
                <Receipt
                  method={method}
                  setReferral={setReferral}
                  dataSet={dataSet}
                />
              </Form.StepForm>
            </>
          ) : (
            <RestrictedAccess small />
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}

const QRGenrator = (props) => {
  const { valueString } = props

  return (
    <div>
      <QRCode
        id="qrCode"
        value={valueString}
        size={80}
        bgColor={'#fff'}
        fgColor={'#463188'}
        level={'H'}
        includeMargin={true}
      />
    </div>
  )
}
