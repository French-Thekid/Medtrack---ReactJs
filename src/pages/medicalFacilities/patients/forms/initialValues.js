import { object, string } from 'yup'

function createPatientSchema({ update }) {
  return object().shape({
    avatar: string('Required')
      .max(131475, 'File size too large, Max: 1024 X 1024')
      .nullable(),
    title: string(),
    firstName: string().required('First Name is required'),
    middleName: string().required('Middle Name is required'),
    lastName: string().required('Last Name is required'),
    dateOfBirth: string().required('Date of Birth Required'),
    gender: string().required('Gender is Required'),
    email: string().email('Invalid Email').required('Email is required'),
    trn: string()
      .required('TRN is required')
      .test('len', '9 digits Required', (val = '') => {
        return val.replace(/\s/g, '').length === 11
      }),
    contact: object().shape({
      number: string()
        .required('Phone Number is required')
        .test(
          'len',
          '10 digits Required',
          (val = '') =>
            val.replace(/\s/g, '').replace('(', '').replace(')', '-').length ===
            12
        ),
      type: string().required('Phone Type is required'),
      carrier: string(),
      extension: string(),
    }),
    address: object().shape({
      streetNumber: string(),
      streetName: string().required('Street Name is required'),
      city: string().required('City is required'),
      province: string().required('Province is required'),
      country: string().required('Country is required'),
    }),
    emergencyContact: object().shape({
      fullName: update
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
      relationship: update
        ? string()
        : string().required('Relationship is required'),
      contactNumber: update
        ? string()
        : string().required('Contact Number is required'),
      email: string().email('Invalid Email').nullable(),
      address: update ? string() : string().required('Address is required'),
    }),
    medicalCondition: update
      ? string()
      : string().required('Medical Condition is required'),
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
    type: '',
    carrier: '',
    extension: '',
  },
  address: {
    streetNumber: '',
    streetName: '',
    city: '',
    province: '',
    country: '',
  },
  emergencyContact: {
    fullName: '',
    relationship: '',
    contactNumber: '',
    email: '',
    address: '',
  },
  medicalCondition: '',
}

const ContactTypes = [
  { label: 'Mobile', value: 'Mobile' },
  { label: 'Office', value: 'Office' },
  { label: 'Fixed Line', value: 'Fixed Line' },
  { label: 'Cell', value: 'Cell' },
  { label: 'Home', value: 'Home' },
]

let Genders = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
]

const ContactCarriers = [
  {
    label: 'Digicel',
    value: 'Digicel',
  },
  {
    label: 'Flow',
    value: 'Flow',
  },
  {
    label: 'Others',
    value: 'Others',
  },
]

const Titles = [
  {
    label: 'Dr.',
    value: 'Dr.',
  },
  {
    label: 'Esq.',
    value: 'Esq.',
  },
  {
    label: 'Hon.',
    value: 'Hon.',
  },
  {
    label: 'Jr.',
    value: 'Jr.',
  },
  {
    label: 'Mr.',
    value: 'Mr.',
  },
  {
    label: 'Mrs.',
    value: 'Mrs.',
  },
  {
    label: 'Ms.',
    value: 'Ms.',
  },
  {
    label: 'Messrs.',
    value: 'Messrs.',
  },
  {
    label: 'Mmes.',
    value: 'Mmes.',
  },
  {
    label: 'Msgr.',
    value: 'Msgr.',
  },
  {
    label: 'Prof.',
    value: 'Prof.',
  },
  {
    label: 'Rev.',
    value: 'Rev.',
  },
  {
    label: 'Rt. Hon..',
    value: 'Rt. Hon..',
  },
  {
    label: 'Sr.',
    value: 'Sr.',
  },
  {
    label: 'St.',
    value: 'St.',
  },
]

const Countries = () => {
  const countries = JSON.parse(localStorage.getItem('Countries'))
  let data = []
  if (countries) {
    data = countries.map(({ id, name }, index) => {
      return { label: name, value: id }
    })
  }
  return data
}

const Provinces = (country) => {
  let key = 'Jamaica'
  switch (country) {
    case 54:
      key = 'Canada'
      break
    case 124:
      key = 'Jamaica'
      break
    case 244:
      key = 'United Kingdom'
      break
    case 245:
      key = 'United States'
      break
    default:
      key = 'Jamaica'
      break
  }

  const province = JSON.parse(localStorage.getItem(key))

  let data = []
  if (province) {
    data = province.map(({ id, name }, index) => {
      return { label: name, value: id }
    })
  }
  return data
}

export {
  Countries,
  Provinces,
  initialPatient,
  createPatientSchema,
  Titles,
  ContactCarriers,
  ContactTypes,
  Genders,
}
