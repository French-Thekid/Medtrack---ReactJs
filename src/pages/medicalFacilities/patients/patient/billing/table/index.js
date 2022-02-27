import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Table, Content, Loading } from 'components'
import { LIST_BILLINGS, SEARCH_BILLINGS } from '../queries'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { DELETE_BILLING } from '../mutations'
import { useMutation } from '@apollo/react-hooks'

export default function Billing() {
  const history = useHistory()
  const {
    params: { patientId },
  } = useRouteMatch()

  const HeaderData = [
    'Purpose',
    'Charge',
    'Payment Type',
    'Balance',
    'Status',
    'Billed On',
  ]

  //Query
  let {
    loading,
    error,
    data: billings,
  } = useQuery(LIST_BILLINGS, { variables: { patientId: parseInt(patientId) } })
  const [
    searchBilling,
    { loading: loading0, error: error0, data: searchResult },
  ] = useLazyQuery(SEARCH_BILLINGS)

  //Mutation
  const [deleteBillings, { loading: l, error: e }] = useMutation(
    DELETE_BILLING,
    {
      refetchQueries: () => [
        {
          query: LIST_BILLINGS,
          variables: { patientId: parseInt(patientId) },
        },
      ],
    }
  )

  if (loading || loading0) return <Loading small />
  if (error || error0)
    return <Content.Alert type="error" message={'Failed to load Billings'} />

  //Handling Seaarch Results
  const { listBillings: searchList } = searchResult || {}
  const { total: searchTotal } = searchList || {}

  if (searchTotal > 0) billings = searchResult

  const { listBillings } = billings || {}
  const { data = [] } = listBillings || {}
  const bills = data || {}

  const RowData = bills.map(
    (
      {
        id,
        purpose,
        amount,
        type,
        balance,
        billingsStatus,
        createdAt,
        ...rest
      },
      index
    ) => {
      const { name: status } = billingsStatus || {}

      return {
        purpose,
        paymentAmount: parseInt(amount),
        type,
        balance: parseInt(balance),
        status,
        createdOn: new Date(parseInt(createdAt)).toDateString(),
        id,
        amount,
        ...rest,
      }
    }
  )

  const DeleteMultipleAction = async (ids) => {
    let Ids = ids.map((i, j) => parseInt(i))
    await await deleteBillings({
      variables: {
        id: Ids,
      },
    }).catch((e) => console.log(e))
    history.goBack()
  }

  const DeleteAction = (data) => {
    history.push(`?action=removeBill&Id=${data.id}`)
  }
  const EditAction = (data) => {
    localStorage.setItem('selectedBilling', JSON.stringify(data))
    history.push(`?action=editBill&Id=${data.id}`)
  }

  return (
    <Table
      MainButtonpath="?action=addBilling"
      title={'Billings'}
      altTitle="Billing"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`repeat(6,1fr)`}
      searchPlaceholder="Search Billing"
      buttonTitle="New Bill"
      searchEnable
      checkBoxNeeded
      massLoading={l}
      massError={e}
      deleteAction={DeleteAction}
      editAction={EditAction}
      breakingPoint="1206px"
      searchHandler={searchBilling}
      searchProps={{ patientId: parseInt(patientId) }}
      deleteMultipleAction={DeleteMultipleAction}
    />
  )
}
