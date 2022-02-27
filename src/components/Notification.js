import React from 'react'
import Transition from 'react-transition-group/Transition'
import { Icons, Colours, Core } from 'components'
import 'styled-components/macro'

const duration = 300

const defaultStyle = {
  position: 'fixed',
  top: '20px',
  right: '-450px',
  zIndex: '1000',
}

const transitionStyles = {
  entered: {
    transform: 'translateX(-100%)',
    transition: `transform ${duration}ms ease-in-out`,
  },
  exiting: {
    transform: 'translateX(100%)',
    transition: `transform ${duration}ms ease-in-out`,
  },
  exited: {
    right: '-270px',
  },
}

const Notification = ({
  notification,
  title = 'Request Successful!',
  message = '',
  setcompleted,
  fail,
}) => {
  return (
    <Transition in={notification} timeout={duration} unmountOnExit>
      {(state) => (
        <div
          css={`
            padding: 20px;
            height: max-content;
            backdrop-filter: blur(12px) saturate(180%);
            -webkit-backdrop-filter: blur(12px) saturate(180%);
            background-color: rgba(255, 255, 255, 0.65);
            border-radius: 12px;
            border: 1px solid rgba(209, 213, 219, 0.3);
            -webkit-box-shadow: -9px 10px 5px 0px rgba(204, 204, 204, 0.19);
            -moz-box-shadow: -9px 10px 5px 0px rgba(204, 204, 204, 0.19);
            box-shadow: -9px 10px 5px 0px rgba(204, 204, 204, 0.19);
          `}
          onClick={() => setcompleted(false)}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <div
            css={`
              height: max-content;
              width: 420px;
              padding: 0px;
              display: grid;
              grid-template-rows: max-content 1fr;
              grid-row-gap: 10px;
            `}
          >
            <div
              css={`
                display: grid;
                grid-template-columns: max-content 1fr max-content;
                grid-gap: 10px;
              `}
            >
              {fail ? (
                <Icons.LockRoundedIcon style={{ color: Colours.orange }} />
              ) : (
                <Icons.DoneAllRoundedIcon style={{ color: Colours.green }} />
              )}
              <Core.Text customSize="18px" weight="800">
                {title}
              </Core.Text>
              <Core.Text color={Colours.purple}>now</Core.Text>
            </div>
            <div>
              <Core.Text>{message}</Core.Text>
            </div>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default Notification
