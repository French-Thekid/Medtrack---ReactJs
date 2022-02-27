import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, Core } from 'components'
import { useHistory, useLocation } from 'react-router-dom'

const queryString = require('query-string')

export default function RequestAccess({ showNotificationRequest }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  const { search } = useLocation()
  const { id } = queryString.parse(search)

  const { name } = JSON.parse(localStorage.getItem('selectedPatient')) || {}

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Access Request'}
          close={() => {
            history.goBack()
            localStorage.removeItem('selectedPatient')
          }}
          minWidth="450px"
        >
          <Core.Text>
            You are about to request access to {name}'s account, <br /> are you
            sure you want to proceed?
          </Core.Text>
          <br />
          <Core.Button
            onClick={() => {
              console.log(id)
              history.goBack()
              localStorage.removeItem('selectedPatient')
              showNotificationRequest()
            }}
          >
            Yes, Submit Request
          </Core.Button>
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
