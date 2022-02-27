import React from 'react'
import 'styled-components/macro'
import {
  Image,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer/dist/react-pdf.es.js'

// Create styles
const styles = StyleSheet.create({
  signitureColumn: {
    height: 'auto',
    marginRight: 35,
    flexDirection: 'column',
    alignContent: 'start',
  },
  image: {
    marginBottom: 10,
    height: 90,
    width: 90,
    borderRadius: 50,
    marginRight: 20,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    color: '#463188',
    marginBottom: 3,
  },
  secondColumn: {
    marginTop: 0,
  },
  Container: {
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    borderBottomColor: '#E1D8FE',
    borderBottomWidth: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  signature: {
    marginTop: 10,
    marginLeft: 30,
    height: 30,
    width: 50,
  },
  number: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#6f42ff',
    marginBottom: 5,
  },
})

export default function TemplateFirstSection({
  firstName,
  lastName,
  title,
  signature,
}) {
  return (
    <View style={styles.Container}>
      <View style={styles.signitureColumn}>
        <Text style={styles.text}>{`${title} ${firstName} ${lastName},`}</Text>
        <Image src={signature} style={styles.signature} />
      </View>
      <View style={styles.secondColumn}>
        <Text style={styles.number}>{`No: ${1}`}</Text>
        <Text style={styles.text}>{`Date: ${new Date().toDateString()}`}</Text>
      </View>
    </View>
  )
}
