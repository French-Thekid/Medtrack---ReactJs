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
    fontSize: 13,
    color: '#463188',
    marginBottom: 3,
  },
  bold: {
    fontSize: 15,
    color: '#463188',
    marginBottom: 3,
    textDecoration: 'underline',
    paddingBottom: 3,
    width: 'auto',
    textAlign: 'center',
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
  centered: {
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
  },
})

export default function TemplateBody({ body }) {
  return (
    <View style={styles.Container}>
      <View style={styles.centered}>
        <Text style={styles.bold}>To Whom This May Concern</Text>
      </View>
      <Text style={styles.text}>{body}</Text>
    </View>
  )
}
