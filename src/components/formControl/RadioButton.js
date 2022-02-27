import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'

const CustomRadio = withStyles({
  root: {
    color: '#C2C2C2',
    '&$checked': {
      color: '#6f42ff',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />)

export default function RadioButtons(props) {
  return <CustomRadio {...props} />
}
