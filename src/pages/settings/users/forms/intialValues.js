import { object, string } from 'yup'

function UserSchema(type) {
  return object().shape({
    avatar: string()
      .nullable()
      .max(131475, 'File size too large, Max: 1024 X 1024'),
    firstName: string().required('First name is required!'),
    lastName: string().required('Last name is required!'),
    type: string().required('Type is required!'),
    email: string().email('Email must be valid').required('Email is required'),
    phone: string(),
    registrationNumber:
      type === 'Doctor'
        ? string('Registration Number cannot be empty').required(
            'Registration Number is required'
          )
        : string('Registration Number cannot be empty').nullable(),
  })
}

const initialUser = {
  avatar: null,
  firstName: '',
  lastName: '',
  email: '',
  registrationNumber: '',
  phone: '',
  type: '',
}

const types = [
  { label: 'Doctor', value: 'Doctor' },
  { label: 'Secretary', value: 'Secretary' },
]

export { initialUser, UserSchema, types }
