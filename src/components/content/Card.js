import React from 'react'
import { Core } from '..'

function Card({ bodyPadding, onClick, children, ...rest }) {
  return (
    <>
      <Core.Box
        style={{
          overflow: 'hidden',
          boxShadow: '0px 10px 22px -3px rgb(213 213 213 / 70%)',
        }}
        radius="4px"
        height="auto"
        color={'black'}
        bg="#fbfbff"
        pd={bodyPadding || '8px'}
        cursor={onClick ? 'pointer' : 'initial'}
        {...rest}
      >
        <Core.Box cursor={onClick ? 'pointer' : 'initial'}>{children}</Core.Box>
      </Core.Box>
    </>
  )
}

export default Card
