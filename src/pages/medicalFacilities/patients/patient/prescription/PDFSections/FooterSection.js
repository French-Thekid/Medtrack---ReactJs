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
  patientColumn: {
    height: 'auto',
    flexDirection: 'column',
    alignContent: 'start',
  },
  stext: {
    fontSize: 10,
    color: '#463188',
    marginBottom: 5,
  },
  SText: {
    fontSize: 10,
    color: '#463188',
    marginBottom: 5,
    marginLeft: 51,
  },
  secondColumn: {
    marginTop: 0,
  },
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    borderTopColor: '#E1D8FE',
    borderTopWidth: 1,
    position: 'relative',
    bottom: 0,
    width: 'auto',
  },
  qrc: {
    height: 80,
    width: 80,
  },
})

export default function TemplateFooter({
  firstName,
  lastName,
  trn,
  streetNumber = '5',
  streetName = 'Brompton Road',
  city,
  province,
  country,
  qrc,
}) {
  return (
    <View style={styles.Container} wrap={false}>
      <View style={styles.patientColumn}>
        <Text
          style={styles.stext}
        >{`Name:        ${firstName} ${lastName}`}</Text>
        <Text style={styles.stext}>{`TRN:          ${trn}`}</Text>
        <Text
          style={styles.stext}
        >{`Address:    ${streetNumber} ${streetName},`}</Text>
        <Text style={styles.SText}>{`${city}, ${province},`}</Text>
        <Text style={styles.SText}>{country}</Text>
      </View>
      <View style={styles.secondColumn}>
        <Image allowDangerousPaths src={qrc} style={styles.qrc} />
      </View>
    </View>
  )
}
