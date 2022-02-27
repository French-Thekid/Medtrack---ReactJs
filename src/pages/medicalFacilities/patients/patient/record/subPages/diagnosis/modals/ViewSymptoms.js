import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, Colours, Core } from 'components'
import { useHistory } from 'react-router-dom'

export default function ViewSymptoms() {
  const { Dialog } = useDialog()
  const history = useHistory()

  const { name: title, symptoms } =
    JSON.parse(localStorage.getItem('selectedDiagnosis')) || {}

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={`${title} Symptoms`}
          close={() => {
            history.goBack()
            localStorage.removeItem('selectedDiagnosis')
          }}
          minWidth="650px"
        >
          <div
            css={`
              max-height: 500px;
              overflow-y: auto;
            `}
          >
            {symptoms.length === 0 ? (
              <div
                css={`
                  border-radius: 5px;
                  background: #fdf8ff;
                  padding: 10px;
                  height: calc(100% - 20px);
                  width: calc(100% - 20px);
                  display: grid;
                  place-items: Center;
                `}
              >
                <Core.Text color={Colours.purple}>
                  No Symptoms were added
                </Core.Text>
              </div>
            ) : (
              symptoms.map(({ name, description }, index) => {
                return <Card title={name} body={description} />
              })
            )}
          </div>
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}

const Card = ({ title, body }) => {
  return (
    <div
      css={`
        width: calc(100% - 22px);
        background: ${Colours.foreground};
        border: 0.5px solid ${Colours.border};
        margin: 10px 0px;
        border-radius: 5px;
        &:hover {
          box-shadow: 0px 3px 10px -2px rgba(196, 196, 196, 1);
          transition: ease-in-out 0.4s;
          transform: translateY(-1px);
        }
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 5px;
        padding: 10px;
        margin-bottom: 20px;
      `}
    >
      <Core.Text customSize="20px" color={Colours.purple}>
        {title}
      </Core.Text>
      <Core.Text>{body}</Core.Text>
    </div>
  )
}
