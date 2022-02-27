import React from 'react'
import 'styled-components/macro'
import {
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer/dist/react-pdf.es.js'

// Create styles
const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    color: '#463188',
    marginBottom: 3,
  },
  ItemContainer: {
    marginBottom: 20,
    borderBottomColor: '#E1D8FE',
    borderBottomWidth: 1,
    borderBottomStyle: 'dotted',
    paddingBotom: 3,
  },
  Container: {
    flexDirection: 'column',
    justifyContent: 'start',
    marginBottom: 0,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    flexGrow: 1,
  },

  number: {
    fontSize: 12,
    color: '#6f42ff',
    marginBottom: 5,
  },
  repeated: {
    fontSize: 10,
    color: 'red',
    marginBottom: 5,
  },
})

export default function TemplateBody({
  repeated,
  repeatedAmount,
  item1,
  item2,
  Items,
}) {
  return (
    <View style={styles.Container}>
      {item1.itemName !== '' && (
        <>
          <View style={styles.ItemContainer}>
            <Text
              style={styles.number}
            >{`${item1.itemQuantity} x ${item1.itemName}`}</Text>
            <Text style={styles.text}>{item1.itemDescription}</Text>
          </View>
        </>
      )}
      {item2.itemName !== '' && (
        <>
          <View style={styles.ItemContainer}>
            <Text
              style={styles.number}
            >{`${item2.itemQuantity} x ${item2.itemName}`}</Text>
            <Text style={styles.text}>{item2.itemDescription}</Text>
          </View>
        </>
      )}
      {Items.length > 0 &&
        Items.map((item, index) => {
          return (
            <View key={index} style={styles.ItemContainer}>
              <Text
                style={styles.number}
              >{`${item.itemQuantity} x ${item.itemName}`}</Text>
              <Text style={styles.text}>{item.itemDescription}</Text>
            </View>
          )
        })}
      {repeated === 'true' && (
        <View>
          <Text
            style={styles.repeated}
          >{`This is to be repeat ${repeatedAmount} time(s)`}</Text>
        </View>
      )}
    </View>
  )
}
