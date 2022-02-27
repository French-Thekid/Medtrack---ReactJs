import React, { useContext } from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { Layout, Content, Core, Colours } from 'components'
import { AuthContext, OrganisationContext } from 'context'
import { useHistory } from 'react-router-dom'

export default function MultipleMedicalFacilityModal({ close }) {
  const { Dialog } = useDialog()
  const { setShowMultipleAccess } = useContext(AuthContext)
  const history = useHistory()
  const { organizations } = JSON.parse(localStorage.getItem('session')) || {}

  const { setForceRerender } = useContext(OrganisationContext)

  let suspendCount = 0
  let completelyDisassociated = false
  organizations.map((org, index) => {
    const { userStatus } = org || {}
    if (userStatus === 'Disassociated') suspendCount++
    return null
  })

  if (suspendCount === organizations.length) completelyDisassociated = true

  return (
    <Layout.Container>
      <Dialog open={true} widthSub="0px">
        <Content.CustomCard
          title="Medical Facility Selection"
          close={() => {
            if (close) {
              history.goBack()
              setShowMultipleAccess(false)
            } else {
              setShowMultipleAccess(false)
              window.location.reload() //Temporary Fix
              localStorage.clear()
            }
          }}
          minWidth="550px"
        >
          {completelyDisassociated ? (
            <div>
              <Core.Text>
                Your accounts were deactivated by the Administrator of your
                Medical Facilities.
                <br />
                To recover access to the system, contact your administrators to
                have your account
                <br />
                activated, or contact Vertis Technology Solutions Limited to
                have an entire facility
                <br /> deployed for you, with you as the administrator.
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
                    setShowMultipleAccess(false)
                    window.location.reload() //Temporary Fix
                    localStorage.clear()
                  }} 
                >
                  OK
                </Core.Button>
              </div>
            </div>
          ) : (
            <div
              css={`
                display: grid;
                grid-template-rows: max-content 1fr;
                overflow-y: auto;
                padding: 10px;
              `}
            >
              <Core.Text customSize="18px">
                Please select the Medical Facility you would like to access
              </Core.Text>
              <div
                css={`
                  border-top: 1px solid ${Colours.border};
                  max-height: 500px;
                  overflow-y: auto;
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  padding: 20px 10px;
                  margin-top: 5px;
                  grid-gap: 20px;
                `}
              >
                {organizations.map((org, index) => {
                  const {
                    logoUrl,
                    userStatus,
                    name,
                    organizationId,
                    location,
                  } = org || {}
                  const { province, country } = location || {}

                  return (
                    <FacilityCard
                      setShowMultipleAccess={setShowMultipleAccess}
                      key={index}
                      logoUrl={logoUrl}
                      name={name}
                      id={organizationId}
                      province={province}
                      country={country}
                      close={close}
                      org={org}
                      setForceRerender={setForceRerender}
                      suspended={userStatus === 'Disassociated'}
                    />
                  )
                })}
              </div>
            </div>
          )}
        </Content.CustomCard>
      </Dialog>
    </Layout.Container>
  )
}

const FacilityCard = ({
  setShowMultipleAccess,
  logoUrl,
  name = '',
  id,
  province,
  country,
  close,
  org,
  suspended,
  setForceRerender,
  ...rest
}) => {
  const history = useHistory()

  let toolTip = {
    'aria-label': 'You have been suspended from this facility.',
    'data-balloon-pos': 'left',
  }
  if (!suspended) toolTip = {}

  return (
    <div
      {...rest}
      {...toolTip}
      css={`
        display: grid;
        grid-template-rows: repeat(4, max-content);
        grid-gap: 10px;
        padding: 10px;
        place-items: Center;
        border-radius: 5px;
        border: 1px solid ${suspended ? Colours.red : Colours.border};
        height: 180px;
        background: rgb(250, 248, 255);
        background: linear-gradient(
          180deg,
          rgba(250, 248, 255, 1) 0%,
          rgba(255, 255, 255, 1) 48%,
          rgba(250, 248, 255, 1) 100%
        );
        &:hover {
          cursor: ${suspended ? 'not-allowed' : 'pointer'};
          box-shadow: ${suspended
            ? 'none'
            : '0px 8px 20px -2px rgba(196, 196, 196, 1)'};
          transition: ease-out 0.2s;
          transform: ${suspended ? 'none' : 'translateY(-1px)'};
        }
      `}
      onClick={() => {
        if (!suspended) {
          localStorage.setItem('ActiveOrg', JSON.stringify(org))
          if (close) {
            setShowMultipleAccess(false)
            close()
          } else {
            setShowMultipleAccess(false)
            setTimeout(() => history.push('/facility/dashboard'), 1000)
          }
          setForceRerender(true)
        }
      }}
    >
      <Content.Avatar
        shadow
        size="huge"
        src={logoUrl}
        firstName={name}
        lastName={name.split(' ')[1] || name.split('')[1]}
      />
      <Core.Text Contained color={Colours.purple} customSize="20px">
        {name}
      </Core.Text>
      <Core.Text customSize="16px" color={Colours.purple}>
        {`${province}, ${country}` || 'Not Specified'}
      </Core.Text>
    </div>
  )
}
