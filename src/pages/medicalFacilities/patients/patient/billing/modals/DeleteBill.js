import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { LIST_BILLINGS } from '../queries'
import { DELETE_BILLING } from '../mutations'
import { useMutation } from '@apollo/react-hooks'

import { Layout, Content, Core, Colours, Loading } from 'components'

const queryString = require('query-string')

export default function DeleteBill() {
  const { Dialog } = useDialog()
  const history = useHistory()
  const { search } = useLocation()
  const { Id } = queryString.parse(search)

  const {
    params: { patientId },
  } = useRouteMatch()

  //Mutation
  const [deleteBillings, { loading, error }] = useMutation(DELETE_BILLING, {
    refetchQueries: () => [
      {
        query: LIST_BILLINGS,
        variables: { patientId: parseInt(patientId) },
      },
    ],
  })

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Delete Bill'}
          close={async () => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {loading && <Loading />}
          {error && (
            <Content.Alert type="error" message="Fail to delete bill" />
          )}
          <Core.Text>Are you sure you want to delete this bill?</Core.Text>
          <br />
          <Core.Button
            bgColour={Colours.red}
            onClick={async () => {
              let ids = []
              ids.push(parseInt(Id))
              await deleteBillings({
                variables: {
                  id: ids,
                },
              }).catch((e) => console.log(e))
              history.goBack()
            }}
          >
            Yes, Delete
          </Core.Button>
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
