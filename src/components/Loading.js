import { Colours, Core } from 'components'
import React from 'react'
import styled, { keyframes } from 'styled-components'

const cubeGridScaleDelay = keyframes`
0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
`

const Loader = styled.div`
  z-index: 0;
  width: 70px;
  text-align: center;

  & > div {
    width: 18px;
    height: 18px;
    background-color: ${(props) => props.color || Colours.purple};

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: ${cubeGridScaleDelay} 1.4s infinite ease-in-out both;
    animation: ${cubeGridScaleDelay} 1.4s infinite ease-in-out both;
  }

  & .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  & .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
`
export default function Loading({ color, text, Contained }) {
  return (
    <div
      style={{
        width: Contained ? 'max-content' : '100%',
        height: Contained ? 'max-content' : '100%',
        placeItems: 'center',
        display: 'grid',
        position: Contained ? 'relative' : 'absolute',
        zIndex: 1000,
        margin: 'auto',
        top: 0,
        left: 0,
      }}
    >
      <Loader color={color}>
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </Loader>
      {text ? (
        <Core.Text align="center" mt="12px">
          {text}
        </Core.Text>
      ) : null}
    </div>
  )
}
