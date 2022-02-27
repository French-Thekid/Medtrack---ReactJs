import React, { useContext } from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, Core } from 'components'
import { AuthContext } from 'context'

export default function ForcePasswordResetModal() {
  const { Dialog } = useDialog()
  const { setShowDisassociatedModal } = useContext(AuthContext)

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="0px">
        <Content.CustomCard
          title="Account Disassociated"
          close={() => {
            setShowDisassociatedModal(false)
            window.location.reload() //Temporary Fix
          }}
          minWidth="450px"
        >
          <div>
            <Core.Text>
              Your account was deactivated by the Administrator of your Medical
              <br />
              Facility. To recover access to the system, contact your
              <br />
              administrator to have your account activated, or contact Vertis
              <br />
              Technology Solutions Limited to have an entire facility deployed for
              <br />
              you, with you as the administrator.
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
                  setShowDisassociatedModal(false)
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
