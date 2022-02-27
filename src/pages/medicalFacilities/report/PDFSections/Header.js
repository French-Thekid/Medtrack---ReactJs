import React from 'react'
import 'styled-components/macro'
import {
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer/dist/react-pdf.es.js'

// Create styles
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
  },
  logoContainer: {
    flexDirection: 'column',
    height: 25,
    justifyContent: 'start',
    alignContent: 'center',
    marginBottom: 10,
  },
  Title: {
    fontSize: 12,
    color: '#463188',
    marginTop: 6,
    alignContent: 'center',
  },
})

export default function TemplateHeader({ title }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.Title}>Title: {title}</Text>
        <Text style={styles.Title}>Date: {new Date().toDateString()}</Text>
      </View>
    </View>
  )
}
