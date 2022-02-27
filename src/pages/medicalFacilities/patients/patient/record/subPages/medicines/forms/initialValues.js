import { object, string, bool } from 'yup'

function createMedicineSchema() {
  return object().shape({
    name: string().required('Name is required'),
    dosage: string().required('Dosage is required'),
    description: string().required('Instruction is required'),
    status: bool().required('Status is required'),
  })
}

const initialMedicine = {
  name: '',
  dosage: '',
  description: '',
  status: true,
}

export { initialMedicine, createMedicineSchema }
