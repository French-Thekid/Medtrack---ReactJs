import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, Colours, Core } from 'components'
import { useHistory } from 'react-router-dom'
import { AdminReport } from '../forms'

export default function CreateReport({ showNotification }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Generate Report'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          <div
            css={`
              display: grid;
              grid-template-rows: max-content 1fr;
              grid-gap: 10px;
            `}
          >
            <div
              css={`
                padding: 10px;
                border-bottom: 1px solid ${Colours.border};
              `}
            >
              <Core.Text>
                Please use the options below to narrow down your desired report.
              </Core.Text>
            </div>
            <AdminReport
              close={() => {
                history.goBack()
              }}
              showNotification={showNotification}
            />
          </div>
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
