import { Form } from 'components'
import React from 'react'
import 'styled-components/macro'

import { FormControl } from 'components'

export default function CustomRecepient({
  dataSet,
  controller,
  selectedFacility,
  setBody,
  setSubject,
  subject,
  body,
}) {
  const handleChange = (e, type) => {
    switch (type) {
      case 'name':
        controller((prevState) => {
          return { ...prevState, recepientName: e.target.value }
        })
        break
      case 'email':
        controller((prevState) => {
          return { ...prevState, recepientEmail: e.target.value }
        })
        break
      case 'subject':
        setSubject(e.target.value)
        break
      case 'body':
        setBody(e.target.value)
        break

      default:
        console.log('Default')
        break
    }
  }

  return (
    <Form.Step>
      <FormControl.ResponsiveSection col="1fr">
        {selectedFacility.facility.length === 0 && (
          <FormControl.FieldSet>
            <FormControl.Legend>{`Recepient Details`}</FormControl.Legend>
            <FormControl.Input
              label="Name"
              type="text"
              value={dataSet.recepientName}
              onChange={(e) => handleChange(e, 'name')}
              placeholder="Name"
              error={
                selectedFacility.facility.length === 0 &&
                dataSet.recepientName === ''
              }
            />
            <br />
            <br />
            <FormControl.Input
              label="Email"
              type="email"
              value={dataSet.recepientEmail}
              onChange={(e) => handleChange(e, 'email')}
              placeholder="Email"
              error={
                selectedFacility.facility.length === 0 &&
                dataSet.recepientEmail === ''
              }
            />
          </FormControl.FieldSet>
        )}
        <FormControl.FieldSet>
          <FormControl.Legend>{`Referral Details`}</FormControl.Legend>
          <section
            css={`
              margin-top: 10px;
            `}
          >
            <FormControl.Input
              label="Referral Subject"
              type="text"
              value={subject}
              onChange={(e) => handleChange(e, 'subject')}
              placeholder="Referral Subject"
              error={selectedFacility.facility.length === 0 && subject === ''}
            />
          </section>
          <br /> <br />
          <FormControl.Input
            label="Referral Body"
            type="text"
            multiline
            rows={8}
            value={body}
            onChange={(e) => handleChange(e, 'body')}
            placeholder="Referral Body"
            error={selectedFacility.facility.length === 0 && body === ''}
          />
        </FormControl.FieldSet>
      </FormControl.ResponsiveSection>
    </Form.Step>
  )
}
