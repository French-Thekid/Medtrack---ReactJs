import React, { useContext } from 'react'
import 'styled-components/macro'

import { Layout, Colours, Core, Loading, Content } from 'components'
import { OrganisationContext } from 'context'
import { LIST_REFERRALS } from './queries'
import { ACCEPT_REFERRAL, DECLINE_REFERRAL } from './mutations'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { LIST_PATIENTS } from '../patients/queries'

export default function ViewReferral() {
  const history = useHistory()
  const { title, id, status, url, fromOrganization } =
    JSON.parse(localStorage.getItem('selectedReferral')) || {}

  const { organizationId } = useContext(OrganisationContext)

  //Mutation
  const [acceptReferral, { loading, error }] = useMutation(ACCEPT_REFERRAL, {
    refetchQueries: () => [
      {
        query: LIST_REFERRALS,
      },
      {
        query: LIST_PATIENTS,
      },
    ],
  })
  const [declineReferral, { loading: declining, error: failed }] = useMutation(
    DECLINE_REFERRAL,
    {
      refetchQueries: () => [
        {
          query: LIST_REFERRALS,
        },
      ],
    }
  )

  return (
    <Layout.Container double>
      <div
        css={`
          height: 50px;
          display: grid;
          grid-template-columns: ${status === 'Open' &&
          organizationId !== fromOrganization
            ? 'max-content 1fr repeat(2, 150px)'
            : 'max-content 1fr max-content'};
          grid-gap: 20px;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid ${Colours.border};
        `}
      >
        <Core.BackButton
          to="/facility/referrals/tables/allReferrals"
          cleanUp={() => localStorage.removeItem('selectedReferral')}
        />
        <div>
          <Core.Text customSize="25px">{title}</Core.Text>
          <Core.Text color={Colours.purple} customSize="15px">
            #{id}
          </Core.Text>
        </div>
        {status === 'Open' && organizationId !== fromOrganization && (
          <Core.Button
            purpose="major"
            bgColour={Colours.green}
            onClick={async () => {
              const ids = []
              ids.push(parseInt(id))
              await acceptReferral({
                variables: {
                  id: ids,
                },
              }).catch((e) => console.log(e))
              history.push('/facility/referrals/tables/allReferrals')
            }}
          >
            Accept
          </Core.Button>
        )}
        {status === 'Open' && organizationId !== fromOrganization && (
          <Core.Button
            purpose="major"
            bgColour={Colours.red}
            onClick={async () => {
              const ids = []
              ids.push(parseInt(id))
              await declineReferral({
                variables: {
                  id: ids,
                },
              }).catch((e) => console.log(e))
              history.push('/facility/referrals/tables/allReferrals')
            }}
          >
            Decline
          </Core.Button>
        )}
        {status === 'Open' && organizationId === fromOrganization && (
          <div
            css={`
              border: 1px solid ${Colours.purple};
              padding: 10px;
              border-radius: 5px;
            `}
          >
            <Core.Text color={Colours.purple}>Pending</Core.Text>
          </div>
        )}
        {status === 'Declined' && (
          <div
            css={`
              border: 1px solid ${Colours.red};
              padding: 10px;
              border-radius: 5px;
            `}
          >
            <Core.Text color={Colours.red}>Declined</Core.Text>
          </div>
        )}
        {status === 'Accepted' && (
          <div
            css={`
              border: 1px solid ${Colours.green};
              padding: 10px;
              border-radius: 5px;
            `}
          >
            <Core.Text color={Colours.green}>Accepted</Core.Text>
          </div>
        )}
      </div>
      <Core.IFrame title={title} src={url} />
      {(loading || declining) && <Loading />}
      {(error || failed) && (
        <Content.Alert type="error" message="Failed to execute operation" />
      )}
    </Layout.Container>
  )
}
