import { object, string } from 'yup'

function createBillSchema(type) {
  return object().shape({
    purpose: string().required('Purpose is required'),
    amount: string().required('Amount is required'),
    status: string().required('Status is required'),
    type: string().required('Payment Type is required'),
    checkAmount:
      type === 'Cheque'
        ? string().required('Cheque Amount is required')
        : string(),
    cashAmount:
      type === 'Cash' || type === 'Health Card & Cash' || type === 'Cash & Card'
        ? string().required('Cash Amount is required')
        : string(),
    cardAmount:
      type === 'Card' || type === 'Health Card & Card' || type === 'Cash & Card'
        ? string().required('Card Amount is required')
        : string(),
    healthCardAmount:
      type === 'Health Card' ||
      type === 'Health Card & Card' ||
      type === 'Health Card & Cash'
        ? string().required('Health Card Amount is required')
        : string(),
  })
}

const initialBill = {
  purpose: '',
  amount: '',
  status: '',
  type: '',
  cashAmount: '',
  cardAmount: '',
  checkAmount: '',
  healthCardAmount: '',
}

let PaymentTypes = [
  { label: 'Cash', value: 'Cash' },
  { label: 'Card', value: 'Card' },
  { label: 'Cheque', value: 'Cheque' },
  { label: 'Health Card', value: 'Health Card' },
  { label: 'Health Card & Card', value: 'Health Card & Card' },
  { label: 'Health Card & Cash', value: 'Health Card & Cash' },
  { label: 'Cash & Card', value: 'Cash & Card' },
]
let Statuses = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Paid', value: 'Paid' },
]

export { PaymentTypes, initialBill, createBillSchema, Statuses }
