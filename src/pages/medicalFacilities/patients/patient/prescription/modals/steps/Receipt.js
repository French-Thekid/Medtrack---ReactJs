import React, { useEffect } from 'react'
import 'styled-components/macro'
import tickLogo from 'assets/tick.png'

import { get } from 'idb-keyval'
import { Form, Core, Colours } from 'components'

export default function Receipt({
  stepcontrol,
  method,
  repeatedAmount,
  repeated,
  item1,
  item2,
  setPrescription,
}) {
  // eslint-disable
  useEffect(() => {
    console.log('PDF is Ready for export')
    get('E-Prescription').then((val) => {
      setPrescription(val)
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
          <Core.Text weight="500">Prescribed Medicines</Core.Text>
        </div>
        <div
          css={`
            width: 475px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 10px;
            max-height: 200px;
            overflow-y: auto;
          `}
        >
          {item1.itemName !== '' && (
            <Core.Text>{`${item1.itemQuantity} x ${item1.itemName}`}</Core.Text>
          )}
          {item2.itemName !== '' && (
            <Core.Text>{`${item2.itemQuantity} x ${item2.itemName}`}</Core.Text>
          )}
          {Destuctive(stepcontrol).length > 0 &&
            Destuctive(stepcontrol).map((item, index) => {
              return (
                <Core.Text>{`${item.itemQuantity} x ${item.itemName}`}</Core.Text>
              )
            })}
        </div>
        <br />
        <div
          css={`
            padding-bottom: 5px;
            border-bottom: 1px solid ${Colours.border};
            width: 475px;
            display: grid;
            grid-template-columns: 1fr max-content;
          `}
        >
          <Core.Text weight="500">Dispensing Method</Core.Text>
          <Core.Text weight="500">Repeated</Core.Text>
        </div>
        <div
          css={`
            width: 475px;
            display: grid;
            grid-template-columns: 1fr max-content;
          `}
        >
          <Core.Text>{method}</Core.Text>
          <Core.Text color={Colours.purple}>
            {repeated === 'true' ? `${repeatedAmount} times(s)` : 'No'}
          </Core.Text>
        </div>
      </div>
    </Form.Step>
  )
}

const Destuctive = (array) => {
  let Items1 = array
    .map((item, index) => {
      if (item.itemName1 !== '') {
        return {
          itemName: item.itemName1,
          itemQuantity: item.itemQuantity1,
          itemDescription: item.itemDescription1,
        }
      }
      return null
    })
    .filter((item, index) => item !== null)

  let Items2 = array
    .map((item, index) => {
      if (item.itemName2 !== '') {
        return {
          itemName: item.itemName2,
          itemQuantity: item.itemQuantity2,
          itemDescription: item.itemDescription2,
        }
      }
      return null
    })
    .filter((item, index) => item !== null)

  const finalArray = Items1.concat(Items2)
  return finalArray
}
