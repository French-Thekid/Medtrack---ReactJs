import { object, string } from 'yup'

function createPatientSchema() {
  return object().shape({
    reasonForVisit: string().required('Reason for Visit is required'),
    title: string().required('Title is required'),
  })
}

const initialPatient = {
  title: '',
  reasonForVisit: '',
}

export { initialPatient, createPatientSchema }
