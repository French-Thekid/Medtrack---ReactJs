import { object, string } from 'yup'

const createOrganisationSchema = object().shape({
  name: string()
    .required('Organisation must have a name!')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  logoUrl: string().max(131475, 'File size too large, Max: 1024 X 1024'),
  location: object().shape({
    streetNumber: string(),
    streetName: string().required('Street Name is required'),
    city: string().required('City is required'),
    province: string().required('Province is required'),
    country: string().required('Country is required'),
  }),
  billingContact: object().shape({
    firstName: string().required('Biller First Name is required'),
    lastName: string().required('Biller Last Name is required'),
    position: string().required('Biller Position is required'), //make this required in future
    email: string().email('Invalid Email').required('Biller Email is required'),
    phoneType: string(),
    phone: string()
      .required('Biller Phone number is required')
      .test(
        'len',
        '10 digits Required',
        (val = '') =>
          val.replace(/\s/g, '').replace('(', '').replace(')', '-').length ===
          12
      ),
  }),
  technicalContact: object().shape({
    firstName: string().required(`Technical's First Name is required`),
    lastName: string().required(`Technical's Last Name is required`),
    position: string().required(`Technical's Position is required`), //make this required in future
    email: string()
      .email('Invalid Email')
      .required(`Technical's Email is required`),
    phoneType: string(),
    phone: string()
      .required(`Technical's Phone number is required`)
      .test(
        'len',
        '10 digits Required',
        (val = '') =>
          val.replace(/\s/g, '').replace('(', '').replace(')', '-').length ===
          12
      ),
  }),
})
const initialOrganisation = {
  type: '',
  name: '',
  logoUrl: '',
  status: null,
  description: '',
  location: {
    streetNumber: '',
    streetName: '',
    province: '',
    city: '',
    country: '',
  },
  billingContact: {
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
    avatar: '',
  },
  technicalContact: {
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
    avatar: '',
  },
}

const Parishes = [
  { label: 'Hanover', value: 'Hanover' },
  { label: 'St. Elizabeth', value: 'St. Elizabeth' },
  { label: 'St. James', value: 'St. James' },
  { label: 'Trelawny', value: 'Trelawny' },
  { label: 'Westmoreland', value: 'Westmoreland' },
  { label: 'Clarendon', value: 'Clarendon' },
  { label: 'Manchester', value: 'Manchester' },
  { value: 'St. Ann', label: 'St. Ann' },
  { label: 'St. Catherine', value: 'St. Catherine' },
  { label: 'St. Mary', value: 'St. Mary' },
  { label: 'Kingston', value: 'Kingston' },
  { label: 'Portland', value: 'Portland' },
  { label: 'St. Andrew', value: 'St. Andrew' },
  { label: 'St. Thomas', value: 'St. Thomas' },
]

const Countries = [
  { label: 'Jamaica', value: 'Jamaica' },
  { label: 'United States', value: 'United States' },
]

const States = [
  { label: 'Alabama', value: 'Alabama' },
  { label: 'Alaska', value: 'Alaska' },
  { label: 'American Samoa', value: 'American Samoa' },
  { label: 'Arizona', value: 'Arizona' },
  { label: 'Arkansas', value: 'Arkansas' },
  { label: 'California', value: 'California' },
  { label: 'Colorado', value: 'Colorado' },
  { label: 'Connecticut', value: 'Connecticut' },
  { label: 'Delaware', value: 'Delaware' },
  { label: 'District of Columbia', value: 'District of Columbia' },
  {
    label: 'Federated States of Micronesia',
    value: 'Federated States of Micronesia',
  },
  { label: 'Florida', value: 'Florida' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Guam', value: 'Guam' },
  { label: 'Hawaii', value: 'Hawaii' },
  { label: 'Idaho', value: 'Idaho' },
  { label: 'Illinois', value: 'Illinois' },
  { label: 'Indiana', value: 'Indiana' },
  { label: 'Iowa', value: 'Iowa' },
  { label: 'Kansas', value: 'Kansas' },
  { label: 'Kentucky', value: 'Kentucky' },
  { label: 'Louisiana', value: 'Louisiana' },
  { label: 'Maine', value: 'Maine' },
  { label: 'Marshall Islands', value: 'Marshall Islands' },
  { label: 'Maryland', value: 'Maryland' },
  { label: 'Massachusetts', value: 'Massachusetts' },
  { label: 'Michigan', value: 'Michigan' },
  { label: 'Minnesota', value: 'Minnesota' },
  { label: 'Mississippi', value: 'Mississippi' },
  { label: 'Missouri', value: 'Missouri' },
  { label: 'Montana', value: 'Montana' },
  { label: 'Nebraska', value: 'Nebraska' },
  { label: 'Nevada', value: 'Nevada' },
  { label: 'New Hampshire', value: 'New Hampshire' },
  { label: 'New Jersey', value: 'New Jersey' },
  { label: 'New Mexico', value: 'New Mexico' },
  { label: 'New York', value: 'New York' },
  { label: 'North Carolina', value: 'North Carolina' },
  { label: 'North Dakota', value: 'North Dakota' },
  { label: 'Northern Mariana Islands', value: 'Northern Mariana Islands' },
  { label: 'Ohio', value: 'Ohio' },
  { label: 'Oklahoma', value: 'Oklahoma' },
  { label: 'Oregon', value: 'Oregon' },
  { label: 'Palau', value: 'Palau' },
  { label: 'Pennsylvania', value: 'Pennsylvania' },
  { label: 'Puerto Rico', value: 'Puerto Rico' },
  { label: 'Rhode Island', value: 'Rhode Island' },
  { label: 'South Carolina', value: 'South Carolina' },
  { label: 'South Dakota', value: 'South Dakota' },
  { label: 'Tennessee', value: 'Tennessee' },
  { label: 'Texas', value: 'Texas' },
  { label: 'Utah', value: 'Utah' },
  { label: 'Vermont', value: 'Vermont' },
  { label: 'Virgin Island', value: 'Virgin Island' },
  { label: 'Virginia', value: 'Virginia' },
  { label: 'Washington', value: 'Washington' },
  { label: 'West Virginia', value: 'West Virginia' },
  { label: 'Wisconsin', value: 'Wisconsin' },
  { label: 'Wyoming', value: 'Wyoming' },
]

export {
  initialOrganisation,
  createOrganisationSchema,
  Parishes,
  States,
  Countries,
}
