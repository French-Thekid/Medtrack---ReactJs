import React, { useState } from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, Core } from 'components'

export default function ServiceSuspended({ type }) {
  const { Dialog } = useDialog()
  const [open, setOpen] = useState(true)

  return (
    <Layout.Container>
      <Dialog open={open} widthSub="0px">
        <Content.CustomCard
          warning
          title={'Service Suspended'}
          close={() => {
            setOpen(false)
            localStorage.setItem('WarningDisplayed', true)
          }}
          minWidth="450px"
        >
          {type === 'admin' && (
            <Core.Text>
              Please be aware that your services have been suspended.
              <br />
              To re-establish your services, please contact support to have
              <br />
              the issue rectified.
              <br />
              <br />
              All accessible functions will be deactivated as a result of
              <br />
              the suspension until the issue is fixed.
            </Core.Text>
          )}
          {type === 'regular' && (
            <Core.Text>
              Please be aware that your services have been suspended. To
              <br />
              re-establish your services, please contact your administrator
              <br />
              to have the issue rectified.
              <br />
              <br />
              All accessible functions will be deactivated as a result of the
              <br />
              suspension until the issue is fixed.
            </Core.Text>
          )}
          <br />
          <Core.Button
            onClick={async () => {
              setOpen(false)
              localStorage.setItem('WarningDisplayed', true)
            }}
          >
            OK
          </Core.Button>
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
