import React, { useContext } from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, Core } from 'components'
import { AuthContext } from 'context'

export default function ForcePasswordResetModal() {
  const { Dialog } = useDialog()
  const { setShowForcePasswordResetModal } = useContext(AuthContext)

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="0px">
        <Content.CustomCard
          title="Password Reset Required"
          close={() => {
            setShowForcePasswordResetModal(false)
            window.location.reload() //Temporary Fix
          }}
          minWidth="450px"
        >
          <div>
            <Core.Text>
              The Administrator for your Medical Facility requested that you
              reset <br />
              your password. In order to regain access to the system, an email
              has <br />
              been sent to you containing instructions on how to go about
              resetting <br />
              your password.
            </Core.Text>
            <br />
            <div
              css={`
                margin-top: 10px;
                width: 100%;
                display: grid;
                place-items: center;
              `}
            >
              <Core.Button
                width="150px"
                onClick={() => {
                  setShowForcePasswordResetModal(false)
                  window.location.reload()
                }} //Temporary Fix
              >
                OK
              </Core.Button>
            </div>
          </div>
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
