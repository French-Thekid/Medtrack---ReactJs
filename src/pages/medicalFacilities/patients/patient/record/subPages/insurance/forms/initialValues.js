import { object, string, bool } from 'yup'

function createInsuranceSchema() {
  return object().shape({
    name: string().required('Name is required'),
    policyNumber: string().required('Description is required'),
    issueDate: string().required('Issue Date is required'),
    expDate: string().required('Exp. Date is required'),
    status: bool().required('Status is required'),
  })
}

const initialInsurance = {
  name: '',
  policyNumber: '',
  issueDate: '',
  expDate: '',
  status: true,
}

export { initialInsurance, createInsuranceSchema }
