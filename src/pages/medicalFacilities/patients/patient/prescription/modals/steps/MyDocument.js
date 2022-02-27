import React from 'react'
import {
  Document,
  Page,
  StyleSheet,
} from '@react-pdf/renderer/dist/react-pdf.es.js'
import { findCountry, findProvince } from 'utils'
import {
  Header,
  FirstSection,
  BodySection,
  FooterSection,
} from '../../PDFSections'

export default function MyDocument({
  repeated,
  repeatedAmount,
  item1,
  item2,
  Items,
  qrc,
  orgDetails,
  prescriptionTemplateColor,
  loggedInUser,
}) {
  const {
    firstName = '',
    lastName = '',
    person = {},
    signature,
  } = loggedInUser || {}

  const { title } = person || {}

  const { name, organisationEmail, base64Logo, location, adminContact } =
    orgDetails || {}
  let { streetNumber, streetName, city, province, country } = location || {}
  const { phone } = adminContact || {}

  // Create styles
  const styles = StyleSheet.create({
    page: {
      width: '500px',
      padding: 0,
    },
    container: {
      flexDirection: 'column',
      width: '100%',
      '@media max-width: 400': {
        flexDirection: 'column',
      },
    },
  })

  //Patient Information
  const {
    firstName: PatientFirstName,
    lastName: PatientLastName,
    trn,
    address,
  } = JSON.parse(localStorage.getItem('selectedPatient'))
  const {
    streetNumber: patientStreetNumber,
    streetName: patientStreetName,
    city: patientCity,
    province: patientProvince,
    country: patientCountry,
  } = address || {}

  return (
    <Document
      title={`E-Prescription for ${PatientFirstName} ${PatientLastName}`}
    >
      <Page size="A4" style={styles.page}>
        <Header
          logo={base64Logo}
          title={name}
          streetNumber={streetNumber}
          streetName={streetName}
          city={city}
          province={findProvince(province)}
          country={findCountry(country)}
          organisationEmail={organisationEmail}
          phone={phone}
          color={prescriptionTemplateColor}
        />
        <FirstSection
          title={title}
          firstName={firstName}
          lastName={lastName}
          signature={signature}
        />
        <BodySection
          repeated={repeated}
          repeatedAmount={repeatedAmount}
          item1={item1}
          item2={item2}
          Items={Destuctive(Items).length > 0 ? Destuctive(Items) : []}
        />
        <FooterSection
          qrc={qrc}
          trn={trn}
          firstName={PatientFirstName}
          lastName={PatientLastName}
          streetNumber={patientStreetNumber}
          streetName={patientStreetName}
          city={patientCity}
          province={findProvince(patientProvince)}
          country={findCountry(patientCountry)}
        />
      </Page>
    </Document>
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
