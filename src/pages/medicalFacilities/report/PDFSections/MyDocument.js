import React from 'react'
import {
  Document,
  Page,
  StyleSheet,
} from '@react-pdf/renderer/dist/react-pdf.es.js'
import { Header, Users, Roles } from './index'

export default function MyDocument({
  title = 'New Report',
  userData,
  roleData,
  users,
  roles,
  detail,
}) {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      width: '500px',
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 10,
      paddingRight: 10,
    },
    container: {
      flexDirection: 'column',
      width: '100%',
      '@media max-width: 400': {
        flexDirection: 'column',
      },
    },
  })

  return (
    <Document title={title}>
      <Page size="A4" style={styles.page}>
        <Header title={title} />
        <Users userData={userData} detail={detail} users={users} />
        <Roles roleData={roleData} detail={detail} roles={roles} />
      </Page>
    </Document>
  )
}
