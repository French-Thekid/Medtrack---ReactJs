import { object, string } from 'yup'

function UserSchema(type, role) {
  return object().shape({
    avatar: string()
      .nullable()
      .max(131475, 'File size too large, Max: 1024 X 1024'),
    firstName: string().required('First name is required!'),
    lastName: string().required('Last name is required!'),
    email: string().email('Email must be valid').required('Email is required'),
    phone: string(),
    registrationNumber:
      type === 'Doctor'
        ? string().required('Registration Number is required')
        : string(),
    title: string().required('Title is required'),
    gender: string().required('Gender is required'),
    dateOfBirth: string().required('Date of Birth is required'),
    qualifications: string('').nullable(),
    specifications:
      role === 'RegularUser'
        ? string('Cannot be empty')
            .required('Specification is Required')
            .nullable()
        : string().nullable(),
    aboutMe: string().nullable(),
    yearsOfExperience:
      role === 'RegularUser'
        ? string('Cannot be empty').required('Experince is required').nullable()
        : string().nullable(),
  })
}

const initialUser = {
  avatar: null,
  firstName: '',
  lastName: '',
  email: '',
  registrationNumber: '',
  phone: '',
  title: '',
  gender: '',
  dateOfBirth: '',
  qualifications: '',
  specifications: '',
  aboutMe: '',
  yearsOfExperience: '',
}

const titles = [
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

let Genders = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Transgender', value: 'Transgender' },
  { label: 'Intersex', value: 'Intersex' },
  { label: 'Non-Binary', value: 'Non-Binary' },
  { label: 'I Prefer Not to say', value: 'I Prefer Not to say' },
]

export { initialUser, UserSchema, Genders, titles }
