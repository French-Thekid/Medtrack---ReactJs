import React, { useEffect } from 'react'
import 'styled-components/macro'
import tickLogo from 'assets/tick.png'

import { get } from 'idb-keyval'
import { Form, Core, Colours } from 'components'

export default function Receipt({ dataSet, setReferral, method }) {
  const list = JSON.parse(localStorage.getItem('SelectedFacilities')) || []

  //Patient Information
  const { lastName, firstName, title } =
    JSON.parse(localStorage.getItem('selectedPatient')) || {}

  // eslint-disable
  useEffect(() => {
    console.log('PDF is Ready for export')
    get('E-Referral').then((val) => {
      setReferral(val)
    }) // eslint-disable-next-line
  }, [])

  return (
    <Form.Step>
      <div
        css={`
          display: grid;
          width: 100%;
          place-items: center;
          margin-bottom: 20px;
        `}
      >
        <img
          src={tickLogo}
          alt="tick"
          css={`
            height: 60px;
            width: 70px;
          `}
        />{' '}
        <br />
        <Core.Text>
          Your all set, please submit once you're happy with the details below
        </Core.Text>
        <br />
        <div
          css={`
            padding-bottom: 5px;
            border-bottom: 1px solid ${Colours.border};
            width: 475px;
          `}
        >
          <Core.Text weight="500">Patient</Core.Text>
        </div>
        <div
          css={`
            width: 475px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 10px;
            max-height: 200px;
            overflow-y: auto;
          `}
        >
          <Core.Text>{`${title || ''} ${firstName || 'None'} ${
            lastName || 'Selected'
          }`}</Core.Text>
        </div>
        <br />
        <br />
        <div
          css={`
            padding-bottom: 5px;
            border-bottom: 1px solid ${Colours.border};
            width: 475px;
          `}
        >
          <Core.Text weight="500">Receiving Facilities</Core.Text>
        </div>
        <div
          css={`
            width: 475px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 10px;
            max-height: 200px;
            overflow-y: auto;
          `}
        >
          {list.length === 0 ? (
            <Core.Text>{dataSet.recepientName}</Core.Text>
          ) : (
            list.map((item, index) => {
              return <Core.Text>{item}</Core.Text>
            })
          )}
        </div>
        <br />
        <br />
        <div
          css={`
            padding-bottom: 5px;
            border-bottom: 1px solid ${Colours.border};
            width: 475px;
            display: grid;
          `}
        >
          <Core.Text weight="500">Dispensing Method</Core.Text>
        </div>
        <div
          css={`
            width: 475px;
            display: grid;
          `}
        >
          <Core.Text>{method || 'None Selected'}</Core.Text>
        </div>
      </div>
    </Form.Step>
  )
}
