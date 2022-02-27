import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import { LIST_ASSOCIATED_PATIENTS } from '../queries'
import { TERMINATE_ASSOCIATION } from '../mutations'
import { Layout, Content, Core, Colours, Loading } from 'components'

const queryString = require('query-string')

export default function BookAppointment() {
  const { Dialog } = useDialog()
  const history = useHistory()
  const {
    params: { patientId },
  } = useRouteMatch()
  const { search } = useLocation()
  const { Id: doctorId } = queryString.parse(search)

  //Mutation
  const [removePatientDoctorRelationship, { loading, error }] = useMutation(
    TERMINATE_ASSOCIATION,
    {
      refetchQueries: () => [
        {
          query: LIST_ASSOCIATED_PATIENTS,
          variables: { id: parseInt(patientId) },
        },
      ],
    }
  )

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="250px">
        <Content.CustomCard
          title={'Remove doctor'}
          close={() => {
            history.goBack()
          }}
          minWidth="450px"
        >
          {loading && <Loading />}
          {error && (
            <Content.Alert type="error" message="Failed to remove doctor" />
          )}
          <Core.Text>
            Are you sure you want to remove this doctor? removing this
            <br />
            doctor will result in this doctor not appearing in the list of
            <br />
            doctors you'll be able to book an appointment with for this <br />
            patient
          </Core.Text>
          <br />
          <div
            css={`
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-gap: 20px;
            `}
          >
            <Core.Button
              bgColour={Colours.purple}
              type="button"
              style={{ marginTop: '20px' }}
              onClick={() => history.goBack()}
            >
              No, Cancel
            </Core.Button>
            <Core.Button
              bgColour={Colours.red}
              type="button"
              onClick={async () => {
                let Ids = []
                Ids.push(parseInt(doctorId))
                await removePatientDoctorRelationship({
                  variables: {
                    patientId: parseInt(patientId),
                    doctors: Ids,
                  },
                }).catch((e) => console.log(e))
                history.goBack()
              }}
              style={{ marginTop: '20px' }}
            >
              Yes, Remove
            </Core.Button>
          </div>
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}
