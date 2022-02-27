import React, { useState } from 'react'
import 'styled-components/macro'
import { Notification } from 'components'
import BillingTable from './table'
import { CreateBill, EditBill, DeleteBill } from './modals'
import { useLocation } from 'react-router-dom'

const queryString = require('query-string')

export default function Billing() {
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const [completedCreate, setcompletedCreate] = useState(false)
  const [completedEdit, setcompletedEdit] = useState(false)

  const showNotificationCreate = () => {
    setcompletedCreate(true)
    setTimeout(() => {
      setcompletedCreate(false)
    }, 6000)
  }
  const showNotificationEdit = () => {
    setcompletedEdit(true)
    setTimeout(() => {
      setcompletedEdit(false)
    }, 6000)
  }

  return (
    <div>
      <Notification
        setcompleted={setcompletedCreate}
        message="Bill Successfully added."
        notification={completedCreate}
      />
      <Notification
        setcompleted={setcompletedEdit}
        message="Bill Successfully updated."
        notification={completedEdit}
      />
      <BillingTable />
      {action === 'addBilling' && (
        <CreateBill showNotificationCreate={showNotificationCreate} />
      )}
      {action === 'editBill' && (
        <EditBill showNotificationEdit={showNotificationEdit} />
      )}
      {action === 'removeBill' && <DeleteBill />}
    </div>
  )
}
