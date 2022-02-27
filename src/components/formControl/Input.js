import React from 'react'
import { TextField, withStyles } from '@material-ui/core'
import 'styled-components/macro'
import { Colours, Icons } from 'components'
import InputMask from 'react-input-mask'

//OUR UI Styles
const CustomTextField = withStyles({
  // disabled: {},
  root: {
    '& input': {
      color: Colours.text,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E7E7E7',
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
})(TextField)

export default function Input(props) {
  const {
    min,
    max,
    mask = '',
    disabled,
    multiline = false,
    rows,
    ...rest
  } = props
  return multiline ? (
    <CustomTextField
      id="outlined-multiline-static"
      variant="outlined"
      multiline={multiline}
      rows={rows}
      InputProps={{
        inputProps: { min, max },
      }}
      {...rest}
      fullWidth
    />
  ) : (
    <InputMask mask={mask} {...rest} disabled={disabled} maskChar=" ">
      {() => (
        <CustomTextField
          variant="outlined"
          disabled={disabled}
          InputProps={{
            inputProps: { min, max },
          }}
          InputLabelProps={{
            shrink: props.type === 'date' ? true : props.isFocussed,
          }}
          {...rest}
          fullWidth
        />
      )}
    </InputMask>
  )
}

export const InputWithImage = (props) => {
  const {
    containerWidth = '100%',
    action,
    value,
    onChange,
    placeholder,
    name,
    small,
  } = props

  return (
    <div
      css={`
        display: grid;
        width: ${containerWidth};
        grid-template-columns: calc(${containerWidth} - 37px) max-content;
        align-items: end;
        border: none;
        font-family: 'Montserrat';
        border: 1px solid ${Colours.border};
        background: ${Colours.foreground};
        border-radius: 5px;
        height: ${small ? '25px' : '30px'};
        &:hover,
        :focus {
          outline: none;
          border: 1px solid ${Colours.purple};
        }
      `}
    >
      <div
        css={`
          padding-left: 5px;
          padding-bottom: 2px;
        `}
      >
        <input
          onKeyPress={(e) => {
            e.key === 'Enter' && e.preventDefault()
          }}
          css={`
            display: flex;
            width: 100%;
            border: none;
            font-size: 16px;
            color: ${Colours.text};
            background: none;
            &:hover,
            :focus {
              outline: none;
              background: inherit;
            }
            &::placeholder {
              color: ${Colours.textGrey};
              font-size: 14px;
            }
          `}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        >
          {props.children}
        </input>
      </div>
      <div
        onClick={action}
        css={`
          border-left: 1px solid ${Colours.border};
          height: 100%;
          width: 37px;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          border: none;
          outline: none;
          background: ${Colours.border};
          color: ${Colours.icon};
          &:hover,
          :focus {
            background: ${Colours.purple};
            cursor: pointer;
            color: ${Colours.foreground};
          }
          display: grid;
          place-items: center;
        `}
      >
        <Icons.SearchRoundedIcon style={{ color: 'inherit' }} />
      </div>
    </div>
  )
}

export function SearchInput({ placeholder = 'Search here' }) {
  return (
    <div
      css={`
        border: 1px solid ${Colours.border};
        border-radius: 5px;
        background: #faf8ff;
        height: 30px;
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-column-gap: 3px;
        align-items: center;
        color: ${Colours.icon};
        padding-left: 5px;
        &:hover {
          border: 1px solid ${Colours.purple};
          background: inherit;
        }
        &:focus,
        &:focus-within {
          border: 1px solid ${Colours.purple};
          background: inherit;
        }
      `}
    >
      <Icons.SearchRoundedIcon style={{ fontSize: '20px' }} />
      <input
        type="text"
        placeholder={placeholder}
        css={`
          border: none;
          outline: none;
          background: inherit;
          color: ${Colours.text};
          &:hover,
          &:focus {
            outline: none;
            background: inherit;
          }
          &::placeholder {
            color: ${Colours.icon};
            font-size: 12px;
          }
        `}
      />
    </div>
  )
}
