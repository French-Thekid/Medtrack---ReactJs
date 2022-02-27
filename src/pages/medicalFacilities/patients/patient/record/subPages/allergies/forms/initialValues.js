import { object, string, bool } from 'yup'

function createAllergySchema() {
  return object().shape({
    name: string().required('Name is required'),
    description: string().required('Description is required'),
    status: bool().required('Status is required'),
  })
}

const initialAllergy = {
  name: '',
  description: '',
  status: true,
}

export { initialAllergy, createAllergySchema }
