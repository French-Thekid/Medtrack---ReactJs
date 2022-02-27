import React, { useContext, useState, useEffect } from 'react'
import { OrganisationContext } from 'context'
import 'styled-components/macro'
import { useHistory, useLocation } from 'react-router-dom'

const Brand = () => {
  const { logoUrl } = useContext(OrganisationContext)
  const { pathname } = useLocation()
  const [error, setError] = useState(false)
  const path = pathname.split('/')[1].split('/')[0]
  const history = useHistory()
  useEffect(() => {
    if (logoUrl === null || logoUrl === undefined) {
      setError(true)
    }
  }, [])

  return (
    <div
      css={`
        display: grid;
        align-items: center;
        height: 35px;
        width: 35px;
        background: red;
      `}
      onClick={() =>
        history.push(`/${path}/${path === 'support' ? 'organisation' : 'home'}`)
      }
    ></div>
  )
}

export default Brand
