import React from 'react'
import 'styled-components/macro'
import {
  Image,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer/dist/react-pdf.es.js'
import Logo from 'assets/temp.jpg'

// Create styles
const styles = StyleSheet.create({
  titleColumn: {
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
    color: '#fff',
    marginBottom: 3,
  },
  secondColumn: {
    // marginLeft: 20,
    marginTop: 25,
  },
})

function StylesContainer(color) {
  // Create styles
  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      height: 120,
      justifyContent: 'start',
      marginBottom: 10,
      backgroundColor: color || '#00bad2',
      padding: 10,
    },
  })

  return styles
}

export default function TemplateHeader({
  logo,
  title,
  streetNumber,
  streetName,
  city,
  province,
  country,
  organisationEmail,
  phone,
  color,
}) {
  return (
    <View style={StylesContainer(color).headerContainer}>
      <View>
        <Image src={logo || Logo} style={styles.image} />
      </View>
      <View style={styles.titleColumn}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{`${streetNumber} ${streetName},`}</Text>
        <Text style={styles.text}>{`${city},`}</Text>
        <Text style={styles.text}>{`${province},`}</Text>
        <Text style={styles.text}>{country}</Text>
      </View>
      <View style={styles.secondColumn}>
        <Text style={styles.text}>{organisationEmail}</Text>
        <Text style={styles.text}>{phone}</Text>
      </View>
    </View>
  )
}
