import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, Core } from 'components'
import { useHistory } from 'react-router-dom'

export default function ViewFile() {
  const { Dialog } = useDialog()
  const history = useHistory()

  const { name, url } = JSON.parse(localStorage.getItem('selectedFile')) || {}

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'View Files/Documents'}
          close={() => {
            history.goBack()
            localStorage.removeItem('selectedFile')
          }}
          minWidth="450px"
        >
          <div
            css={`
              width: 750px;
              height: 750px;
            `}
          >
            <Core.IFrame title={name} src={url} />
          </div>
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
