import React, { useState, createContext, useContext } from 'react'
import { Request } from '../utils'
import { SessionContext } from './session'
import { useQuery } from '@apollo/react-hooks'
import { GET_ORGANIZATION } from './query'

import { Content, Loading } from '../components'

const queryString = require('querystring')

const organisation = {
  Organisations: [],
}
const OrganisationContext = createContext(organisation)
const { Provider } = OrganisationContext

function OrganisationProvider({ children }) {
  const { idToken } = useContext(SessionContext)
  const userType = JSON.parse(localStorage.getItem('session'))
  const [Organisations] = useState(organisation.Organisations)
  const [organisationErrors, setOrganisationErrors] = useState(null)
  const [, setForceRerender] = useState()

  //getting Organization
  let orgDetails = {}
  if (userType === undefined || userType === null) orgDetails = {}
  else {
    orgDetails = GetOrganization({
      org:
        userType.user.role === 'AdminUser'
          ? {}
          : localStorage.getItem('ActiveOrg') !== undefined &&
            localStorage.getItem('ActiveOrg') !== null
          ? JSON.parse(localStorage.getItem('ActiveOrg'))
          : '',
    })
  }
  /**
   * Code Above is used to prevent api call when user is logged out
   */
  const {
    logoUrl,
    organizationId,
    name: orgName = 'Loading..',
    status = 'Loading..',
    templates,
    referral,
  } = orgDetails || {}
  const { color: prescriptionTemplateColor } = templates || {}
  const { color: referralTemplateColor } = referral || {}
  // const status = 'SUSPENDED'
  const CreateOrganisation = async ({
    name,
    taxId,
    replyToEmail,
    logoUrl,
    adminContact,
    technicalContact,
    billingContact,
    location,
  }) => {
    const body = {
      name,
      taxId,
      replyToEmail,
      adminContact,
      billingContact,
      technicalContact,
      location,
    }
    if (logoUrl !== 'https://i.ibb.co/2ndQMZt/Aegis.png')
      body.base64Logo = logoUrl.split(',')[1]
    else body.logoUrl = logoUrl
    try {
      const result = await Request({
        url: `v1/support/onboarding`,
        type: 'post',
        body: body,
        authorization: idToken,
      })

      const json = await result.json()
      if (!result.ok) {
        setOrganisationErrors(json)
      } else {
        setTimeout(() => window.location.reload(), 1000)
      }
    } catch (error) {
      setOrganisationErrors(error)
    }
  }
  //Update Organization Support Side
  const UpdateOrganisation = async ({
    name,
    taxId,
    organizationId,
    replyToEmail,
    logoUrl,
    adminContact,
    technicalContact,
    billingContact,
    location,
  }) => {
    const query = queryString.stringify({
      query: organizationId,
    })
    try {
      const result = await Request({
        url: `v1/organization/update-attribute?${query}`,
        type: 'post',
        body: {
          name,
          taxId,
          replyToEmail,
          base64Logo: logoUrl.split(',')[1],
          adminContact,
          billingContact,
          technicalContact,
          location,
        },
        authorization: idToken,
      })

      const json = await result.json()
      if (!result.ok) {
        setOrganisationErrors(json)
      }
    } catch (error) {
      setOrganisationErrors(error)
    }
  }

  //Update organization Broker Side
  const UpdateOrganisationAttribute = async ({ body, organizationId }) => {
    const query = queryString.stringify({
      query: organizationId,
    })
    try {
      const result = await Request({
        url: `v1/organization/update-attribute?${query}`,
        type: 'post',
        body: body,
        authorization: idToken,
      })

      const json = await result.json()
      if (!result.ok) {
        setOrganisationErrors(json)
      }
    } catch (error) {
      setOrganisationErrors(error)
    }
  }

  //Delete Organization
  const DeleteOrganisation = async (organisationId, noRefresh) => {
    try {
      const query = queryString.stringify({
        query: organisationId,
      })
      const result = await Request({
        url: `v1/support/organization/delete?${query}`,
        type: 'delete',
        authorization: idToken,
      })
      const json = await result.json()
      if (!result.ok) {
        setOrganisationErrors(json)
      } else {
        if (!noRefresh) setTimeout(() => window.location.reload(), 1000)
      }
    } catch (error) {
      setOrganisationErrors(error)
    }
  }

  //Suspend and Enable Organization
  const ToggleOrganisation = async (organisationId, status) => {
    const query = queryString.stringify({
      query: organisationId,
    })
    // console.log(query)
    try {
      const result = await Request({
        url: `v1/organization/update-attribute?${query}`,
        type: 'post',
        body: {
          status,
        },
        authorization: idToken,
      })

      const json = await result.json()
      if (!result.ok) {
        setOrganisationErrors(json)
      }
    } catch (error) {
      setOrganisationErrors(error)
    }
  }
  const store = {
    status,
    logoUrl,
    prescriptionTemplateColor,
    referralTemplateColor,
    orgName,
    orgDetails,
    organizationId,
    Organisations,
    CreateOrganisation,
    DeleteOrganisation,
    organisationErrors,
    ToggleOrganisation,
    UpdateOrganisation,
    UpdateOrganisationAttribute,
    setForceRerender,
  }
  return <Provider value={store}>{children}</Provider>
}

export { OrganisationContext, OrganisationProvider }

function GetOrganization({ org = {} }) {
  if (org === null) org = {}

  // console.log('Fetching info for', org.organizationId)
  //Query
  const { loading, error, data } = useQuery(GET_ORGANIZATION, {
    variables: { id: org.organizationId || '' },
  })
  if (loading) return <Loading />
  if (error) return <Content.Alert type="error" message={error.message} />

  const { readFacility } = data || {}
  return readFacility
}
