import React from 'react'
import 'styled-components/macro'

import { FormControl } from 'components'

export default function Item({
  itemName,
  controller,
  itemQuantity,
  itemDescription,
  index = 1,
  uniqueKey,
  main,
  id,
  first,
  second,
}) {
  const handleChange = (e, type) => {
    if (main) {
      switch (type) {
        case 'name':
          controller((prevState) => {
            return {
              itemName: e.target.value,
              itemQuantity: prevState.itemQuantity,
              itemDescription: prevState.itemDescription,
            }
          })
          break
        case 'quantity':
          controller((prevState) => {
            return {
              itemName: prevState.itemName,
              itemQuantity: e.target.value,
              itemDescription: prevState.itemDescription,
            }
          })
          break
        case 'description':
          controller((prevState) => {
            return {
              itemName: prevState.itemName,
              itemQuantity: prevState.itemQuantity,
              itemDescription: e.target.value,
            }
          })
          break
        default:
          console.log('Default')
          break
      }
    } else {
      switch (type) {
        case 'name':
          controller((prevState) => {
            return prevState.map((item, index) => {
              if (item.id === id) {
                if (first) {
                  return {
                    itemName1: e.target.value,
                    itemQuantity1: item.itemQuantity1,
                    itemDescription1: item.itemDescription1,
                    itemName2: item.itemName2,
                    itemQuantity2: item.itemQuantity2,
                    itemDescription2: item.itemDescription2,
                    id: item.id,
                  }
                } else if (second) {
                  return {
                    itemName1: item.itemName1,
                    itemQuantity1: item.itemQuantity1,
                    itemDescription1: item.itemDescription1,
                    itemName2: e.target.value,
                    itemQuantity2: item.itemQuantity2,
                    itemDescription2: item.itemDescription2,
                    id: item.id,
                  }
                }
              }
              return item
            })
          })
          break
        case 'quantity':
          controller((prevState) => {
            return prevState.map((item, index) => {
              if (item.id === id) {
                if (first) {
                  return {
                    itemName1: item.itemName1,
                    itemQuantity1: e.target.value,
                    itemDescription1: item.itemDescription1,
                    itemName2: item.itemName2,
                    itemQuantity2: item.itemQuantity2,
                    itemDescription2: item.itemDescription2,
                    id: item.id,
                  }
                } else if (second) {
                  return {
                    itemName1: item.itemName1,
                    itemQuantity1: item.itemQuantity1,
                    itemDescription1: item.itemDescription1,
                    itemName2: item.itemName2,
                    itemQuantity2: e.target.value,
                    itemDescription2: item.itemDescription2,
                    id: item.id,
                  }
                }
              }
              return item
            })
          })
          break
        case 'description':
          controller((prevState) => {
            return prevState.map((item, index) => {
              if (item.id === id) {
                if (first) {
                  return {
                    itemName1: item.itemName1,
                    itemQuantity1: item.itemQuantity1,
                    itemDescription1: e.target.value,
                    itemName2: item.itemName2,
                    itemQuantity2: item.itemQuantity2,
                    itemDescription2: item.itemDescription2,
                    id: item.id,
                  }
                } else if (second) {
                  return {
                    itemName1: item.itemName1,
                    itemQuantity1: item.itemQuantity1,
                    itemDescription1: item.itemDescription1,
                    itemName2: item.itemName2,
                    itemQuantity2: item.itemQuantity2,
                    itemDescription2: e.target.value,
                    id: item.id,
                  }
                }
              }
              return item
            })
          })
          break
        default:
          console.log('Default')
          break
      }
    }
  }
  return (
    <FormControl.FieldSet>
      <FormControl.Legend>{`Item ${index}`}</FormControl.Legend>
      <FormControl.ResponsiveSection col="2fr 1fr">
        <FormControl.Section>
          <FormControl.Input
            label="Name"
            id={`ItemName${uniqueKey}`}
            type="text"
            value={itemName}
            onChange={(e) => handleChange(e, 'name')}
            placeholder="Item Name"
            error={
              (itemDescription !== '' && itemQuantity > 1 && itemName === '') ||
              (itemDescription !== '' && itemName === '')
            }
          />
        </FormControl.Section>
        <FormControl.Section>
          <FormControl.Input
            label="Item Quantity"
            id={`ItemQuantity${uniqueKey}`}
            type="number"
            min={1}
            value={itemQuantity}
            onChange={(e) => handleChange(e, 'quantity')}
            placeholder="Item Quantity"
          />
        </FormControl.Section>
      </FormControl.ResponsiveSection>
      <FormControl.Input
        label="Item Description"
        id={`ItemDescription${uniqueKey}`}
        type="text"
        value={itemDescription}
        onChange={(e) => handleChange(e, 'description')}
        multiline
        rows={2}
        placeholder="Item Description"
      />
    </FormControl.FieldSet>
  )
}
