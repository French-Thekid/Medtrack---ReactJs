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
  FormControl,
  Core,
  Colours,
  Item,
  Loading,
  PermissionCheck,
  RestrictedAccess,
} from 'components'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { RadioGroup, FormControlLabel } from '@material-ui/core'
import { PharmacySelection, PDF, Receipt, Methods } from './steps'
import { pdf } from '@react-pdf/renderer'
import MyDocument from './steps/MyDocument'
import { CREATE_PRESCRIPTION } from '../mutations'
import { LIST_PRESCRIPTIONS } from '../queries'
import { useMutation } from '@apollo/react-hooks'
import { clear } from 'idb-keyval'

export default function CreatePrescription({ showNotification }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const {
    params: { patientId },
  } = useRouteMatch()
  const CreatePermission = PermissionCheck({
    feature: 'Prescription',
    action: 'CREATE',
  })
  const [repeated, setRepeated] = useState('false')
  const [repeatedAmount, setRepeatedAmount] = useState(1)
  const [method, setMethod] = useState()
  const [stepcontrol, setStepControl] = useState([])
  const [Prescription, setPrescription] = useState('Default')
  const [item1, setItem1] = useState({
    itemName: '',
    itemQuantity: 1,
    itemDescription: '',
  })
  const [item2, setItem2] = useState({
    itemName: '',
    itemQuantity: 1,
    itemDescription: '',
  })
  const [selectedPharmacy, setSelectedPharmacy] = useState()
  const { orgDetails, prescriptionTemplateColor } =
    useContext(OrganisationContext)

  const { loggedInUser } = useContext(UserContext) || {}

  //Mutation
  const [createPrescription, { loading, error }] = useMutation(
    CREATE_PRESCRIPTION,
    {
      refetchQueries: () => [
        {
          query: LIST_PRESCRIPTIONS,
          variables: { patientId: parseInt(patientId) },
        },
      ],
      onCompleted(createPrescription) {
        showNotification()
      },
    }
  )

  const HandleSubmission = async (event) => {
    event.preventDefault()

    //Patient Data
    const { firstName: PatientFirstName, lastName: PatientLastName } =
      JSON.parse(localStorage.getItem('selectedPatient'))

    //Structuring data to meet schema
    const prescription = {
      title: `E-Prescription for ${PatientFirstName} ${PatientLastName}`,
      method: method,
      patientId: parseInt(patientId),
      IsRepeated: repeated === 'true' ? 0 : 1,
      repeated: parseInt(repeatedAmount),
      base64Pdf: Prescription.split(',')[1],
    }

    let prescriptionItems = []

    if (item1.itemName !== '') {
      prescriptionItems.push({
        name: item1.itemName,
        quantity: parseInt(item1.itemQuantity),
        description: item1.itemDescription,
      })
    }
    if (item2.itemName !== '') {
      prescriptionItems.push({
        name: item2.itemName,
        quantity: parseInt(item2.itemQuantity),
        description: item2.itemDescription,
      })
    }
    Destuctive(stepcontrol).map(({ name, description, quantity }, index) => {
      prescriptionItems.push({
        name,
        quantity: parseInt(quantity),
        description,
      })
      return null
    })
    const toOrganization = selectedPharmacy

    if (method === 'Print') {
      console.log('Saving & Submitting')
      const qrCodeCanvas = document.getElementById('qrCode')
      const doc = (
        <MyDocument
          Items={stepcontrol}
          item2={item2}
          item1={item1}
          repeatedAmount={repeatedAmount}
          repeated={repeated}
          qrc={qrCodeCanvas.toDataURL('image/jpg', 0.3) || null}
          orgDetails={orgDetails}
          prescriptionTemplateColor={prescriptionTemplateColor}
          loggedInUser={loggedInUser}
        />
      )
      const asPdf = pdf([])
      asPdf.updateContainer(doc)
      const blob = await asPdf.toBlob()
      saveAs(blob, 'E-Prescription.pdf')

      //Calls Endpoint
      //Executing mutation
      await createPrescription({
        variables: { prescription, prescriptionItems, toOrganization },
      }).catch((e) => console.log(e))

      clear()
      localStorage.removeItem('SelectedFacilities')
      history.push(`/facility/patient/e-prescriptions/${patientId}`)
    } else {
      //Executing mutation
      await createPrescription({
        variables: { prescription, prescriptionItems, toOrganization },
      }).catch((e) => console.log(e))

      clear()
      localStorage.removeItem('SelectedFacilities')
      history.push(`/facility/patient/e-prescriptions/${patientId}`)
    }
  }

  const CanProceed = () => {
    let prescriptionItems = []

    if (item1.itemName !== '') {
      prescriptionItems.push({
        name: item1.itemName,
        quantity: parseInt(item1.itemQuantity),
        description: item1.itemDescription,
      })
    }
    if (item2.itemName !== '') {
      prescriptionItems.push({
        name: item2.itemName,
        quantity: parseInt(item2.itemQuantity),
        description: item2.itemDescription,
      })
    }
    Destuctive(stepcontrol).map(({ name, description, quantity }, index) => {
      prescriptionItems.push({
        name,
        quantity: parseInt(quantity),
        description,
      })
      return null
    })

    return prescriptionItems.length > 0
  }

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'New E-Prescription'}
          close={() => {
            history.push(`/facility/patient/e-prescriptions/${patientId}`)
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
                <QRGenrator valueString={'This is a valid Prescription'} />
              </div>
              {loading && <Loading />}
              {error && (
                <Content.Alert
                  type="error"
                  message="Fail to send prescription"
                />
              )}
              <Form.StepForm
                handleSubmit={(event) => HandleSubmission(event)}
                restrictive
                CanProceed={CanProceed}
              >
                <Form.Step>
                  <Core.Text>
                    Please enter the prescribed drugs along with quantity and
                    description.
                  </Core.Text>
                  <div
                    css={`
                      display: grid;
                      grid-template-columns: 1fr max-content;
                      grid-column-gap: 30px;
                      margin-top: 5px;
                      padding-top: 15px;
                      border-top: 1px solid ${Colours.border};
                      align-items: Center;
                      width: 100%;
                    `}
                  >
                    <div>
                      <div
                        css={`
                          width: 100%;
                          display: grid;
                          align-items: center;
                          grid-template-columns: repeat(2, max-content);
                          grid-column-gap: 15px;
                        `}
                      >
                        <Core.Text customSize="15px">
                          Will this be a repeated prescription?
                        </Core.Text>
                        <RadioGroup
                          name="repeated"
                          value={repeated}
                          onChange={(e) => setRepeated(e.target.value)}
                        >
                          <div
                            css={`
                              display: grid;
                              grid-template-columns: repeat(2, max-content);
                            `}
                          >
                            <div
                              css={`
                                display: grid;
                                grid-template-columns: repeat(2, max-content);
                                grid-column-gap: 5px;
                                align-items: center;
                              `}
                            >
                              <Core.Text customSize="15px">Yes</Core.Text>
                              <FormControlLabel
                                value={'true'}
                                control={<FormControl.RadioButton />}
                              />
                            </div>
                            <div
                              css={`
                                display: grid;
                                grid-template-columns: repeat(2, max-content);
                                grid-column-gap: 5px;
                                align-items: center;
                              `}
                            >
                              <Core.Text customSize="15px">No</Core.Text>
                              <FormControlLabel
                                value={'false'}
                                control={<FormControl.RadioButton />}
                              />
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    {repeated === 'true' && (
                      <div
                        css={`
                          display: grid;
                          grid-template-columns: max-content max-content;
                          grid-column-gap: 10px;
                          align-items: center;
                        `}
                      >
                        <Core.Text customSize="15px">Amount</Core.Text>
                        <input
                          css={`
                            height: 20px;
                            outline: none;
                            border: 1px solid ${Colours.border};
                            border-radius: 5px;
                            padding-left: 5px;
                            width: 60px;
                            color: ${Colours.text};
                          `}
                          min={1}
                          type="number"
                          value={repeatedAmount}
                          onChange={(e) => setRepeatedAmount(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  <Item
                    itemName={item1.itemName}
                    itemQuantity={item1.itemQuantity}
                    itemDescription={item1.itemDescription}
                    index={1}
                    controller={setItem1}
                    uniqueKey={'Aa'}
                    main
                  />
                  <br />
                  <Item
                    itemName={item2.itemName}
                    itemQuantity={item2.itemQuantity}
                    itemDescription={item2.itemDescription}
                    index={2}
                    controller={setItem2}
                    uniqueKey={'Bb'}
                    main
                  />
                  <div
                    css={`
                      width: 100%;
                      display: grid;
                      justify-items: end;
                      &:hover {
                        cursor: pointer;
                      }
                    `}
                    onClick={() =>
                      setStepControl((prevState) => {
                        return prevState.concat({
                          itemName1: '',
                          itemQuantity1: 1,
                          itemDescription1: '',
                          itemName2: '',
                          itemQuantity2: 1,
                          itemDescription2: '',
                          id: stepcontrol.length,
                        })
                      })
                    }
                  >
                    <Core.Text color={Colours.purple}>
                      + Add More Items In Next Step
                    </Core.Text>
                  </div>
                </Form.Step>
                {stepcontrol.map(
                  (
                    {
                      itemName1,
                      itemQuantity1,
                      itemDescription1,
                      itemName2,
                      itemQuantity2,
                      itemDescription2,
                      id,
                    },
                    index
                  ) => {
                    return (
                      <div key={index}>
                        <Form.Step>
                          <div
                            css={`
                              width: 100%;
                              display: grid;
                              justify-items: end;
                              &:hover {
                                cursor: pointer;
                              }
                            `}
                            onClick={() =>
                              setStepControl((prevState) =>
                                prevState.filter((item, j) => item.id !== id)
                              )
                            }
                          >
                            <Core.Text color={Colours.red}>
                              - Remove this step
                            </Core.Text>
                          </div>
                          <Item
                            itemName={itemName1}
                            itemQuantity={itemQuantity1}
                            itemDescription={itemDescription1}
                            index={
                              id === 0
                                ? id + 3
                                : id === 1
                                ? id + 4
                                : id === 2
                                ? id + 5
                                : id + 6
                            }
                            uniqueKey={index}
                            controller={setStepControl}
                            id={id}
                            first
                          />
                          <br />
                          <Item
                            itemName={itemName2}
                            itemQuantity={itemQuantity2}
                            itemDescription={itemDescription2}
                            index={
                              id === 0
                                ? id + 4
                                : id === 1
                                ? id + 5
                                : id === 2
                                ? id + 6
                                : id + 7
                            }
                            uniqueKey={index + 1}
                            controller={setStepControl}
                            id={id}
                            second
                          />
                          <div
                            css={`
                              width: 100%;
                              display: grid;
                              justify-items: end;
                              &:hover {
                                cursor: pointer;
                              }
                            `}
                            onClick={() =>
                              setStepControl((prevState) => {
                                return prevState.concat({
                                  itemName1: '',
                                  itemQuantity1: 1,
                                  itemDescription1: '',
                                  itemName2: '',
                                  itemQuantity2: 1,
                                  itemDescription2: '',
                                  id: stepcontrol.length,
                                })
                              })
                            }
                          >
                            <Core.Text color={Colours.purple}>
                              + Add More Items In Next Step
                            </Core.Text>
                          </div>
                        </Form.Step>
                      </div>
                    )
                  }
                )}
                <PDF
                  item1={item1}
                  item2={item2}
                  Items={stepcontrol}
                  repeatedAmount={repeatedAmount}
                  repeated={repeated}
                  orgDetails={orgDetails}
                  prescriptionTemplateColor={prescriptionTemplateColor}
                  loggedInUser={loggedInUser}
                />
                <Methods method={method} setMethod={setMethod} />
                {method !== 'Print' && (
                  <PharmacySelection
                    selectedPharmacy={selectedPharmacy}
                    setSelectedPharmacy={setSelectedPharmacy}
                  />
                )}
                <Receipt
                  method={method}
                  item1={item1}
                  item2={item2}
                  repeatedAmount={repeatedAmount}
                  repeated={repeated}
                  stepcontrol={stepcontrol}
                  setPrescription={setPrescription}
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

const Destuctive = (array) => {
  let Items1 = array
    .map((item, index) => {
      if (item.itemName1 !== '') {
        return {
          name: item.itemName1,
          quantity: item.itemQuantity1,
          description: item.itemDescription1,
        }
      }
      return null
    })
    .filter((item, index) => item !== null)

  let Items2 = array
    .map((item, index) => {
      if (item.itemName2 !== '') {
        return {
          name: item.itemName2,
          quantity: item.itemQuantity2,
          description: item.itemDescription2,
        }
      }
      return null
    })
    .filter((item, index) => item !== null)

  const finalArray = Items1.concat(Items2)
  return finalArray
}
