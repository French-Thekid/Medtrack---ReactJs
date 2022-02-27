import React, { useState } from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'

import {
  PaymentTypes,
  initialBill,
  Statuses,
  createBillSchema,
} from './initialValues'
import { Core, FormControl, Loading, Content } from 'components'
import { useRouteMatch } from 'react-router-dom'
import { LIST_BILLINGS } from '../queries'
import { CREATE_BILLING } from '../mutations'
import { useMutation } from '@apollo/react-hooks'

export default function CreateNoteForm({ close, showNotificationCreate }) {
  const {
    params: { patientId },
  } = useRouteMatch()
  const [type, setType] = useState('')

  //Mutation
  const [createBillings, { loading, error }] = useMutation(CREATE_BILLING, {
    refetchQueries: () => [
      {
        query: LIST_BILLINGS,
        variables: { patientId: parseInt(patientId) },
      },
    ],
    onCompleted(createBillings) {
      showNotificationCreate()
    },
  })

  return (
    <Formik
      initialValues={initialBill}
      validationSchema={createBillSchema(type)}
      onSubmit={async (values, actions) => {
        let balance = 0
        switch (type) {
          case 'Cash':
            balance = values.amount - values.cashAmount
            break
          case 'Card':
            balance = values.amount - values.cardAmount
            break
          case 'Cheque':
            balance = values.amount - values.checkAmount
            break
          case 'Health Card':
            balance = values.amount - values.healthCardAmount
            break
          case 'Health Card & Card':
            balance =
              values.amount - (values.healthCardAmount + values.cardAmount)
            break
          case 'Health Card & Cash':
            balance =
              values.amount - (values.healthCardAmount + values.cashAmount)
            break
          case 'Cash & Card':
            balance = values.amount - (values.cardAmount + values.cashAmount)
            break
          default:
            balance = 0
            break
        }

        await createBillings({
          variables: {
            billings: {
              patientId: parseInt(patientId),
              purpose: values.purpose,
              amount: values.amount.toString(),
              type: values.type,
              status: values.status,
              cashAmount: values.cashAmount.toString(),
              cardAmount: values.cardAmount.toString(),
              checkAmount: values.checkAmount.toString(),
              healthCardAmount: values.healthCardAmount.toString(),
              balance: balance.toString(),
            },
          },
        }).catch((e) => console.log(e))
        close()
      }}
    >
      {(props) => {
        const {
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
          touched,
          handleSubmit,
        } = props
        const {
          type,
          purpose,
          status,
          amount,
          cashAmount,
          cardAmount,
          checkAmount,
          healthCardAmount,
        } = values
        return (
          <form
            onSubmit={handleSubmit}
            css={`
              width: 600px;
            `}
          >
            {loading && <Loading />}
            {error && (
              <Content.Alert type="error" message="Fail to create billing" />
            )}
            <Core.Text>Please enter billing details below</Core.Text>
            <br />
            <FormControl.ResponsiveSection>
              <FormControl.Section>
                <FormControl.Input
                  label="Purpose"
                  id="purpose"
                  type="text"
                  value={purpose}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Purpose"
                  data-testid="create-bill-purpose"
                  error={errors.purpose && touched.purpose}
                />
                <FormControl.Error
                  name="purpose"
                  show={errors.purpose && touched.purpose}
                  message={errors.purpose}
                />
              </FormControl.Section>
              <FormControl.Section>
                <FormControl.Input
                  label="Amount Due"
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Amount Due"
                  data-testid="create-bill-amount"
                  error={errors.amount && touched.amount}
                />
                <FormControl.Error
                  name="amount"
                  show={errors.amount && touched.amount}
                  message={errors.amount}
                />
              </FormControl.Section>

              <FormControl.Section marginTop="0px">
                <FormControl.Select
                  value={type}
                  groups={PaymentTypes}
                  label="Payment Type"
                  name="type"
                  handlechange={(e) => {
                    setType(e.target.value)
                    setFieldValue('type', e.target.value)
                  }}
                  handleblur={handleBlur}
                  error={errors.type && touched.type}
                />
                <FormControl.Error
                  name="type"
                  show={errors.type && touched.type}
                  message={errors.type}
                />
              </FormControl.Section>
              <FormControl.Section marginTop="0px">
                <FormControl.Select
                  value={status}
                  groups={Statuses}
                  label="Status"
                  name="status"
                  handlechange={handleChange}
                  handleblur={handleBlur}
                  error={errors.status && touched.status}
                />
                <FormControl.Error
                  name="status"
                  show={errors.status && touched.status}
                  message={errors.status}
                />
              </FormControl.Section>
              {type === 'Cash' ? (
                <FormControl.Section marginTop="0px">
                  <FormControl.Input
                    label="Cash Amount"
                    id="cashAmount"
                    type="number"
                    value={cashAmount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Cash Amount"
                    data-testid="create-bill-cashAmount"
                    error={errors.cashAmount && touched.cashAmount}
                  />
                  <FormControl.Error
                    name="cashAmount"
                    show={errors.cashAmount && touched.cashAmount}
                    message={errors.cashAmount}
                  />
                </FormControl.Section>
              ) : type === 'Card' ? (
                <FormControl.Section marginTop="0px">
                  <FormControl.Input
                    label="Card Amount"
                    id="cardAmount"
                    type="number"
                    value={cardAmount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Card Amount"
                    data-testid="create-bill-cardAmount"
                    error={errors.cardAmount && touched.cardAmount}
                  />
                  <FormControl.Error
                    name="cardAmount"
                    show={errors.cardAmount && touched.cardAmount}
                    message={errors.cardAmount}
                  />
                </FormControl.Section>
              ) : type === 'Cheque' ? (
                <FormControl.Section marginTop="0px">
                  <FormControl.Input
                    label="Cheque Amount"
                    id="checkAmount"
                    type="number"
                    value={checkAmount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Cheque Amount"
                    data-testid="create-bill-checkAmount"
                    error={errors.checkAmount && touched.checkAmount}
                  />
                  <FormControl.Error
                    name="checkAmount"
                    show={errors.checkAmount && touched.checkAmount}
                    message={errors.checkAmount}
                  />
                </FormControl.Section>
              ) : type === 'Health Card' ? (
                <FormControl.Section marginTop="0px">
                  <FormControl.Input
                    label="Health Card Amount"
                    id="healthCardAmount"
                    type="number"
                    value={healthCardAmount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Health Card Amount"
                    data-testid="create-bill-healthCardAmount"
                    error={errors.healthCardAmount && touched.healthCardAmount}
                  />
                  <FormControl.Error
                    name="healthCardAmount"
                    show={errors.healthCardAmount && touched.healthCardAmount}
                    message={errors.healthCardAmount}
                  />
                </FormControl.Section>
              ) : type === 'Health Card & Card' ? (
                <>
                  <FormControl.Section marginTop="0px">
                    <FormControl.Input
                      label="Health Card Amount"
                      id="healthCardAmount"
                      type="number"
                      value={healthCardAmount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Amount"
                      data-testid="create-bill-healthCardAmount"
                      error={
                        errors.healthCardAmount && touched.healthCardAmount
                      }
                    />
                    <FormControl.Error
                      name="healthCardAmount"
                      show={errors.healthCardAmount && touched.healthCardAmount}
                      message={errors.healthCardAmount}
                    />
                  </FormControl.Section>
                  <FormControl.Section marginTop="0px">
                    <FormControl.Input
                      label="Card Amount"
                      id="cardAmount"
                      type="number"
                      value={cardAmount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Amount"
                      data-testid="create-bill-cardAmount"
                      error={errors.cardAmount && touched.cardAmount}
                    />
                    <FormControl.Error
                      name="cardAmount"
                      show={errors.cardAmount && touched.cardAmount}
                      message={errors.cardAmount}
                    />
                  </FormControl.Section>
                </>
              ) : type === 'Health Card & Cash' ? (
                <>
                  <FormControl.Section marginTop="0px">
                    <FormControl.Input
                      label="Health Card Amount"
                      id="healthCardAmount"
                      type="number"
                      value={healthCardAmount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Amount"
                      data-testid="create-bill-healthCardAmount"
                      error={
                        errors.healthCardAmount && touched.healthCardAmount
                      }
                    />
                    <FormControl.Error
                      name="healthCardAmount"
                      show={errors.healthCardAmount && touched.healthCardAmount}
                      message={errors.healthCardAmount}
                    />
                  </FormControl.Section>
                  <FormControl.Section marginTop="0px">
                    <FormControl.Input
                      label="Cash Amount"
                      id="cashAmount"
                      type="number"
                      value={cashAmount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Amount"
                      data-testid="create-bill-cashAmount"
                      error={errors.cashAmount && touched.cashAmount}
                    />
                    <FormControl.Error
                      name="cashAmount"
                      show={errors.cashAmount && touched.cashAmount}
                      message={errors.cashAmount}
                    />
                  </FormControl.Section>
                </>
              ) : type === 'Cash & Card' ? (
                <>
                  <FormControl.Section marginTop="0px">
                    <FormControl.Input
                      label="Cash Amount"
                      id="cashAmount"
                      type="number"
                      value={cashAmount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Amount"
                      data-testid="create-bill-cashAmount"
                      error={errors.cashAmount && touched.cashAmount}
                    />
                    <FormControl.Error
                      name="cashAmount"
                      show={errors.cashAmount && touched.cashAmount}
                      message={errors.cashAmount}
                    />
                  </FormControl.Section>
                  <FormControl.Section marginTop="0px">
                    <FormControl.Input
                      label="Card Amount"
                      id="cardAmount"
                      type="number"
                      value={cardAmount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Amount"
                      data-testid="create-bill-cardAmount"
                      error={errors.cardAmount && touched.cardAmount}
                    />
                    <FormControl.Error
                      name="cardAmount"
                      show={errors.cardAmount && touched.cardAmount}
                      message={errors.cardAmount}
                    />
                  </FormControl.Section>
                </>
              ) : (
                <div />
              )}
            </FormControl.ResponsiveSection>

            <br />
            <div
              css={`
                display: grid;
                float: right;
              `}
            >
              <Core.Button width="150px" type="submit">
                Submit
              </Core.Button>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
