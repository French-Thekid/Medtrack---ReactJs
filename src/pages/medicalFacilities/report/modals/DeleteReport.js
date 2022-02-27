import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, Core, Colours, Loading } from 'components'
import { useHistory } from 'react-router-dom'
import { LIST_REPORT } from '../queries'
import { DELETE_REPORT } from '../mutations'
import { useMutation } from '@apollo/react-hooks'
import { useLocation } from 'react-router-dom'

const queryString = require('query-string')

export default function DeleteReportModal({ showNotificationDelete }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const { search } = useLocation()
  const { id } = queryString.parse(search)

  const [deleteReport, { loading, error }] = useMutation(DELETE_REPORT, {
    refetchQueries: () => [
      {
        query: LIST_REPORT,
      },
    ],
    onCompleted() {
      showNotificationDelete()
      history.goBack()
    },
  })

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="300px">
        <Content.CustomCard
          title={'Delete Report'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {loading && <Loading />}
          {error && (
            <Content.Alert type="error" message="Failed to remove report" />
          )}
          <Core.Text>Are you sure you want to delete this report?</Core.Text>
          <br />
          <Core.Button
            bgColour={Colours.red}
            onClick={async () => {
              let Ids = []
              Ids.push(parseInt(id))
              await deleteReport({
                variables: {
                  id: Ids,
                },
              }).catch((e) => console.log(e))
            }}
          >
            Yes, Delete
          </Core.Button>
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
