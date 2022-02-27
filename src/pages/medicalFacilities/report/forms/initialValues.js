import { object, string } from 'yup'

function createAdminReportSchema() {
  return object().shape({
    users: string().required('User filter is required'),
    roles: string().required('Role filter is required'),
    detail: string().required('Level of detail is required'),
    title: string().required('Title is required'),
  })
}

const initialAdminReport = {
  users: 'All',
  roles: 'All',
  detail: 1,
  title: '',
}

const userTypes = [
  { label: 'All', value: 'All' },
  { label: 'Doctors', value: 'Doctors' },
  { label: 'Secretaries', value: 'Secretaries' },
]

const roleTypes = [
  { label: 'All', value: 'All' },
  { label: 'Active Roles', value: 'Active Roles' },
  { label: 'Inactive Roles', value: 'Inactive Roles' },
]

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
]

export {
  createAdminReportSchema,
  initialAdminReport,
  userTypes,
  roleTypes,
  marks,
}
