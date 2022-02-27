import React, { useState } from 'react'
import 'styled-components/macro'
import { useHistory, useLocation } from 'react-router-dom'
import { Table, Notification } from 'components'
import { NewReport, DeleteReport } from '../modals'

const queryString = require('query-string')

export default function ReportTable({ Data }) {
  const history = useHistory()
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const [completed, setcompleted] = useState(false)
  const [completed1, setcompleted1] = useState(false)
  const HeaderData = [
    'Icon',
    'Title',
    'Ref. Number',
    'Created By',
    'Generated On',
  ]
  const RowData = Data.map(
    ({ fileName, id, createdAt, createdByUser, ...rest }, index) => {
      const { person, firstName, lastName, type } = createdByUser || {}
      const { title } = person || {}
      const createdByFormat = {
        title,
        type,
        firstName,
        lastName,
      }
      return {
        icon: '',
        fileName,
        id,
        createdBy: JSON.stringify(createdByFormat),
        createdAt: createdAt
          ? new Date(parseInt(createdAt)).toDateString()
          : '',
        ...rest,
      }
    }
  )

  const handleRowClick = (id, data) => {
    localStorage.setItem('selectedReport', JSON.stringify(data))
    history.push(`/facility/reports/viewReport/${id}`)
  }
  const showNotification = () => {
    setcompleted(true)
    setTimeout(() => {
      setcompleted(false)
    }, 6000)
  }

  const showNotificationDelete = () => {
    setcompleted1(true)
    setTimeout(() => {
      setcompleted1(false)
    }, 6000)
  }

  const DeleteAction = (data) => {
    history.push(`?action=deleteReport&&id=${data.id}`)
  }

  return (
    <>
      <Table
        MainButtonpath="?action=createReport"
        title={'Showing All Reports'}
        altTitle="Reports"
        RowData={RowData}
        HeaderData={HeaderData}
        Columns={`70px repeat(4,1fr)`}
        searchPlaceholder="Search Reports"
        buttonTitle="New Report"
        searchEnable
        checkBoxNeeded
        rowClick={handleRowClick}
        massLoading={false}
        massError={false}
        breakingPoint="1155px"
        deleteAction={DeleteAction}
      />
      {action === 'createReport' && (
        <NewReport showNotification={showNotification} />
      )}
      {action === 'deleteReport' && (
        <DeleteReport showNotificationDelete={showNotificationDelete} />
      )}
      <Notification
        setcompleted={setcompleted}
        message="Report successfully saved."
        notification={completed}
      />
      <Notification
        setcompleted={setcompleted1}
        message="Report successfully deleted."
        notification={completed1}
      />
    </>
  )
}
