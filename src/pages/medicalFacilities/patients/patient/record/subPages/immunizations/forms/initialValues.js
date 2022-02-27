import { object, string } from 'yup'

function createImmunizationSchema() {
  return object().shape({
    name: string().required('Name is required'),
    type: string().required('Type is required'),
    dateTaken: string().required('Date Taken is required'),
    expDate: string().required('Exp. Date is required'),
  })
}

const initialImmunization = {
  name: '',
  type: '',
  dateTaken: '',
  expDate: '',
}

const Types = [
  { label: 'Vaccine', value: 'Vaccine' },
  { label: 'Immunization', value: 'Immunization' },
]
export { initialImmunization, createImmunizationSchema, Types }
