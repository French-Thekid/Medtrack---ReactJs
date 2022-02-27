import React, { useState } from 'react'
import 'styled-components/macro'
import { useLocation, useRouteMatch } from 'react-router-dom'

import DoctorsTable from './table'
import { AddDoctor, RemoveDoctor } from './modals'
import { LIST_ASSOCIATED_PATIENTS, SEARCH_DOCTORS } from './queries'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { Loading, Content, Notification } from 'components'

const queryString = require('query-string')

export default function Doctors() {
  const { search } = useLocation()
  const {
    params: { patientId },
  } = useRouteMatch()
  const { action } = queryString.parse(search)
  const [completedAdd, setcompletedAdd] = useState(false)

  //Query
  let {
    loading,
    error,
    data: doctors,
  } = useQuery(LIST_ASSOCIATED_PATIENTS, {
    variables: { id: parseInt(patientId) },
  })

  //Query
  const [
    searchDoctors,
    { loading: loading1, error: error1, data: searchResult },
  ] = useLazyQuery(SEARCH_DOCTORS)

  if (loading || loading1) return <Loading small />
  if (error || error1)
    return (
      <Content.Alert
        type="error"
        message={'Failed to load associated Doctors'}
      />
    )


  const { listPatientDoctors: searchData = [] } = searchResult || {}

  if (searchData.length > 0) doctors = searchResult

  const blackList = doctors.listPatientDoctors.map(
    ({ doctorsId }, index) => doctorsId
  )

  const showNotificationAdd = () => {
    setcompletedAdd(true)
    setTimeout(() => {
      setcompletedAdd(false)
    }, 6000)
  }

  return (
    <>
      <DoctorsTable
        data={doctors.listPatientDoctors}
        searchDoctors={searchDoctors}
        searchProps={{ id: parseInt(patientId) }}
      />
      {action === 'addDoctor' && (
        <AddDoctor
          blackList={blackList}
          showNotificationAdd={showNotificationAdd}
        />
      )}
      {action === 'removeDoctor' && <RemoveDoctor />}
      <Notification
        setcompleted={setcompletedAdd}
        message="Doctor association successfully established."
        notification={completedAdd}
      />
    </>
  )
}
