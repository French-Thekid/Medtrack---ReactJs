import React, { useState } from 'react'
import 'styled-components/macro'
import { Colours, Core, Icons } from 'components'

/**
 * Avatar image size defaults to small.
 * @prop {string} src: url to avatar image
 * @prop {string} size: size of avatar accepts small, medium, large, huge.
 * @prop {string} firstName: firstname of the user
 * @prop {string} lastName: lastname of the user
 * @prop {string} borderColor: adds border to avatar
 */

export function ImageWithStatus({
  size = 'small+',
  src,
  firstName,
  lastName,
  borderColor,
  active,
  responsive,
}) {
  const [srcError, setSrcError] = useState(false)
  let initial = '...'
  let colorIndex = 0
  let fontSize = '18px'
  let colors = [
    '#BF211E',
    '#E57F27',
    '#2A7221',
    '#390099',
    '#9E0059',
    '#1357DD',
    '#4B9E9C',
    '#8FB515',
    '#006992',
    '#ECA400',
    '#FC440F',
  ]

  switch (size) {
    case 'small':
      size = '30px'
      fontSize = '14px'
      break
    case 'small+':
      size = '30px'
      fontSize = '14px'
      break
    case 'medium':
      size = '40px'
      fontSize = '15px'
      break
    case 'large':
      size = '60px'
      fontSize = '26px'
      break
    case 'large+':
      size = '80px'
      fontSize = '30px'
      break
    case 'largee':
      size = '70px'
      fontSize = '26px'
      break
    case 'huge':
      size = '100px'
      fontSize = '35px'
      break
    case 'bbw':
      size = '180px'
      fontSize = '70px'
      break
    default:
      size = '30px'
      fontSize = '18px'
  }

  if (firstName === undefined || lastName === undefined) {
    initial = '...'
  } else {
    initial = firstName.split('')[0] + lastName.split('')[0]
    let charIndex = initial.charCodeAt(0) - 65
    colorIndex = charIndex % 11
  }

  /* eslint-disable */

  return (
    <div
      css={`
        display: grid;
        grid-template-rows: 28px max-content;
        height: ${size};
        width: ${size};
        justify-items: end;
        grid-template-rows: ${size === '70px'
          ? '55px max-content'
          : '28px max-content'};
        @media screen and (min-width: 1440px) {
          height: ${responsive ? '80px' : size};
          width: ${responsive ? '80px' : size};
          grid-template-rows: ${size === '70px'
            ? '55px max-content'
            : responsive
            ? '60px max-content'
            : '25px max-content'};
        }
      `}
    >
      <img
        alt=""
        style={{ display: 'none' }}
        src={src}
        onError={() => {
          setSrcError(true)
        }}
      />
      <div
        css={`
          background-image: url('${srcError ? 'none' : src}');
          background-size: cover;
          background-repeat: no-repeat;
          background-position-y: center;
          background-color: ${colors[colorIndex]};
          height: ${size};
          width: ${size};
          border-radius: 50%;
          display: grid;
          place-items: center;
          border: ${borderColor ? `1px solid ${borderColor}` : 'none'};
          @media screen and (min-width: 1440px) {
            height: ${responsive ? '80px' : size};
            width: ${responsive ? '80px' : size};
          }
        `}
      >
        {srcError || src === null || src === undefined ? (
          <Core.Text customSize={fontSize} color={'#fff'}>
            {initial}
          </Core.Text>
        ) : (
          ''
        )}
      </div>
      <div
        css={`
          height: 15px;
          width: 15px;
          border-radius: 50%;
          font-size: 14px;
          @media screen and (min-width: 1440px) {
            height: 15px;
            width: 15px;
            border-radius: 50%;
            font-size: 10px;
          }
          background: ${active ? Colours.green : Colours.red};
          float: right;
          border: 1px solid white;
          color: white;
          display: grid;
          place-items: center;
        `}
      >
        {active ? (
          <Icons.CheckRoundedIcon
            style={{
              fontWeight: '600',
              fontSize: 'inherit',
            }}
          />
        ) : (
          <Icons.CloseRoundedIcon
            style={{
              fontWeight: '600',
              fontSize: 'inherit',
            }}
          />
        )}
      </div>
    </div>
  )
}
export default ImageWithStatus
