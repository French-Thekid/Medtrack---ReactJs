import React from 'react'
import 'styled-components/macro'
import Colours from 'components/Colours'
import { useSpring, animated } from 'react-spring'

export default function Container({ children, minheight, double, top, right }) {
  const bottomStyle = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 20rem, 0)' },
    config: { duration: 500 },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })
  const topStyle = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, -20rem, 0)' },
    config: { duration: 500 },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })
  const rightStyle = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, -20rem, 0)' },
    config: { duration: 500 },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })

  return (
    <animated.div
      style={top ? topStyle : right ? rightStyle : bottomStyle}
      css={`
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        padding: 10px;
        background: ${Colours.foreground};
        box-shadow: 0px 10px 22px -3px rgba(213, 213, 213, 0.7);
        border-radius: 10px;
        overflow-y: auto;
        display: ${double ? 'grid' : 'block'};
        grid-template-rows: ${double ? 'max-content 1fr' : 'inherit'};
        grid-row-gap: ${double ? '20px' : 'inherit'};
        min-height: ${minheight || 'max-content'};
      `}
    >
      {children}
    </animated.div>
  )
}
