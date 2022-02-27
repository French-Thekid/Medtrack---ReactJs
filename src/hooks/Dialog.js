import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import 'styled-components/macro'
import useOnClickOutside from './useOnClickOutside'

function Dialog(props) {
  const userType = JSON.parse(localStorage.getItem('session')) || {}
  const { user: { role } = {} } = userType || {}

  const ref = useRef()
  useOnClickOutside(ref, () => props.close || null)
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'initial'
    }
  }, [])

  if (!props.open) return null
  return ReactDOM.createPortal(
    <div initial="hidden" animate="visible">
      <DialogBackground full widthSub={props.widthSub} role={role}>
        <div initial="hidden" animate="visible">
          {props.children}
        </div>
      </DialogBackground>
    </div>,
    document.getElementById('portal')
  )
}

const DialogBackground = ({
  children,
  widthSub = '250px',
  heightSub = '0px',
  role,
}) => (
  <div
    css={`
      position: absolute;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      align-items: center;
      justify-items: center;
      bottom: 0;
      right: 0;
      height: calc(100vh - ${heightSub});
      width: calc(100vw - ${widthSub});
      @media only screen and (min-width: 1441px) {
        width: calc(100vw - ${widthSub === '0px' ? widthSub : '250px'});
      }
      @media only screen and (width: 1366px) {
        width: ${role === 'AdminUser'
          ? 'calc(100vw - 250px)'
          : `calc(100vw - ${widthSub === '0px' ? widthSub : '220px'})`};
      }
      @media only screen and (min-width: 769px) and (max-width: 1440px) {
        width: ${role === 'AdminUser'
          ? 'calc(100vw - 250px)'
          : `calc(100vw - ${widthSub === '0px' ? widthSub : '220px'})`};
      }
      z-index: 100;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(5px);
      /* Tablet */
      @media screen and (max-width: 769px) {
        width: 100%;
      }
      @media only screen and (max-width: 1025px) {
        @media only screen and (max-height: 769px) {
          @media (orientation: landscape) {
            width: 100%;
          }
        }
      }

      /* ipad pro */
      @media (width: 1024px) {
        @media (height: 1366px) {
          @media (orientation: portrait) {
            width: 100%;
          }
        }
      } ;
    `}
  >
    {children}
  </div>
)

export default Dialog
