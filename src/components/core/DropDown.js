import React, { useState, useRef } from 'react'
import { Core, Content, Layout } from '..'
import { useOnClickOutside } from '../../hooks'
function DropDown(props) {
  const [open, setOpen] = useState(false)
  const toggle = () => {
    setOpen(!open)
  }
  const ref = useRef()
  useOnClickOutside(ref, () => setOpen(false))
  const onHover = (state) => {
    if (state) {
      toggle()
    } else {
      return null
    }
  }
  const onLeave = (state) => {
    if (state) {
      toggle()
    } else {
      return null
    }
  }
  return (
    <Core.Box
      z={12}
      onMouseEnter={() => onHover(props.openOnHover)}
      onMouseLeave={() => onLeave(props.openOnHover)}
      width="max-content"
      pd="0px"
      onClick={() => toggle()}
      position="relative"
    >
      {props.children}
      {open ? (
        <Core.Box
          ref={ref}
          mg="0px"
          pd="0px"
          pos="absolute"
          style={{
            transform: `translate(${props.x || '0px'},${props.y || '0px'})`,
          }}
        >
          <Content.Card
            z={12}
            mg="0px"
            bodyPadding="0px"
            width={props.width || 'max-content'}
            height={props.height || 'max-content'}
            style={{
              overflowY: 'auto',
              boxShadow:
                '0 2px 2.7px rgba(0, 0, 0, 0.037),0 6.3px 6.9px rgba(0, 0, 0, 0.043),0 15.3px 14.2px rgba(0, 0, 0, 0.047),0 35.6px 29.2px rgba(0, 0, 0, 0.055),0 105px 80px rgba(0, 0, 0, 0.07)',
            }}
          >
            {props.items
              ? props.items.map((d) => <DropMap key={Math.random()} {...d} />)
              : null}
          </Content.Card>
        </Core.Box>
      ) : null}
    </Core.Box>
  )
}
function DropMap(props) {
  switch (props.type) {
    case 'action':
      return (
        <Core.Box cursor="pointer" pd="6px 2px">
          <Core.Text size="rg" weight="500" {...props}>
            {props.text}
          </Core.Text>
        </Core.Box>
      )
    case 'line':
      return (
        <Layout.Flex align="center">
          <Core.Line
            mt="4px"
            mb="4px"
            pd="0px"
            thickness="1px"
            variant="h"
            length="100%"
            color="lightgrey"
          />
        </Layout.Flex>
      )
    case 'any':
      return <>{props.component}</>
    default:
      return
  }
}
export default DropDown
