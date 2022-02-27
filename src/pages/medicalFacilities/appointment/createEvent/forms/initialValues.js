import { object, string } from 'yup'

function createPatientSchema({ patientCreated }) {
  return object().shape({
    avatar: string().max(131475, 'File size too large, Max: 1024 X 1024'),
    firstName: !patientCreated
      ? string()
      : string().required('First Name is required'),
    middleName: !patientCreated
      ? string()
      : string().required('Middle Name is required'),
    lastName: !patientCreated
      ? string()
      : string().required('Last Name is required'),
    dateOfBirth: !patientCreated
      ? string()
      : string().required('Date of Birth Required'),
    gender: !patientCreated
      ? string()
      : string().required('Gender is Required'),
    email: !patientCreated
      ? string()
      : string().email('Invalid Email').required('Email is required'),
    trn: !patientCreated
      ? string()
      : string()
          .required('TRN is required')
          .test('len', '9 digits Required', (val = '') => {
            return val.replace(/\s/g, '').length === 11
          }),
    phone: !patientCreated
      ? string()
      : string().test(
          'len',
          '10 digits Required',
          (val = '') =>
            val.replace(/\s/g, '').replace('(', '').replace(')', '-').length ===
            12
        ),
    emergencyContactName: !patientCreated
      ? string()
      : string()
          .required('Full Name is required')
          .test('len', 'Full Name Required', (val = '') => {
            if (
              val.split(' ')[1] !== null &&
              val.split(' ')[1] !== undefined &&
              val.split(' ')[1] !== ''
            ) {
              return true
            } else return false
          }),
    emergencyContactNumber: !patientCreated
      ? string()
      : string().test(
          'len',
          '10 digits Required',
          (val = '') =>
            val.replace(/\s/g, '').replace('(', '').replace(')', '-').length ===
            12
        ),
    medicalCondition: !patientCreated
      ? string()
      : string().required('Medical Condition is required'),
    reasonForVisit: string().required('Reason for Visit is required'),
    title: string().required('Title is required'),
  })
}


const initialPatient = {
  avatar: '',
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  trn: '',
  contact: {
    number: '',
    type: 'Update Needed',
    carrier: 'Update Needed',
    extension: 'Update Needed',
  },
  address: {
    streetNumber: 'Update Needed',
    streetName: 'Update Needed',
    city: 'Update Needed',
    province: 7,
    country: 124,
  },
  emergencyContact: {
    fullName: '',
    relationship: 'Update Needed',
    contactNumber: 'Update Needed',
    email: '',
    address: 'Update Needed',
  },
  medicalCondition: '',
}

let Genders = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
]

export { initialPatient, createPatientSchema, Genders }
