import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { Colours } from 'components'

const styles = (theme) => ({
  root: {
    '& input': {
      color: Colours.text,
    },
    display: 'flex',
    flexWrap: 'wrap',
    '& label.Mui-focused': {
      color: '#6f42ff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#e7e7e7',
        borderRadius: '5px',
      },
      '&:hover fieldset': {
        borderColor: '#6f42ff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6f42ff',
      },
    },
  },
  formControl: {
    minWidth: 120,
    width: '100%',
  },
})

function SimpleSelect(props) {
  const {
    label,
    value,
    name,
    groups,
    error,
    action,
    handlechange,
    handleblur,
  } = props

  const { classes } = props

  return (
    <div className={classes.root}>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        onClick={(e) => {
          if (action) action(e.target.value)
        }}
      >
        <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          name={name}
          onChange={handlechange}
          onBlur={handleblur}
          label={label}
          error={error}
          style={{ color: Colours.text }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {groups.map(({ label, value }, index) => (
            <MenuItem key={index} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleSelect)
