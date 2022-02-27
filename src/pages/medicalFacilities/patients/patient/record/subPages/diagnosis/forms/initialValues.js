import { object, string, bool } from 'yup'

function createDiagnosisSchema() {
  return object().shape({
    name: string().required('Name is required'),
    description: string().required('Description is required'),
    status: bool().required('Status is required'),
  })
}

const initialDiagnosis = {
  name: '',
  description: '',
  status: true,
}

export { initialDiagnosis, createDiagnosisSchema }
