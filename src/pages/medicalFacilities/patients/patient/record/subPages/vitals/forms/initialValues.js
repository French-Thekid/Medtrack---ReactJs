import { object, string } from 'yup'

function createVitalSchema() {
  return object().shape({
    height: string().required('Height is required'),
    weight: string().required('Weight is required'),
    bloodPressure: string().required('Blood Pressure is required'),
    temperature: string().required('Temperature Type is required'),
  })
}

const initialVital = {
  height: '',
  weight: '',
  bloodPressure: '',
  temperature: '',
  BMI: '',
}

export { initialVital, createVitalSchema }
