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
  qrc,
  orgDetails,
  prescriptionTemplateColor,
  loggedInUser,
  body,
}) {
  const {
    firstName = '',
    lastName = '',
    person = {},
    signature,
  } = loggedInUser || {}

  const { title = '' } = person || {}

  const { name, base64Logo, organisationEmail, location, adminContact } =
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
  } = JSON.parse(localStorage.getItem('selectedPatient')) || {}

  const {
    streetNumber: patientStreetNumber,
    streetName: patientStreetName,
    city: patientCity,
    province: patientProvince,
    country: patientCountry,
  } = address || {}
  return (
    <Document title={`E-Referral for ${PatientFirstName} ${PatientLastName}`}>
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
        <BodySection body={body} />
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
