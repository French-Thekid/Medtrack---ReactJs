import React from 'react'
import 'styled-components/macro'
import { useSpring, animated, config } from 'react-spring'

import { Colours, Core, Icons } from 'components'
import { useHistory } from 'react-router-dom'

const queryString = require('query-string')

export default function Footer({
  squeeze = false,
  data = [],
  pagination = {},
  setPagination,
  selectedRows = { rows: [] },
  setSelectedRow,
  disableMultiAction,
  deleteMultipleAction,
  suspendMultipleAction,
  enableMultipleAction,
}) {
  const history = useHistory()
  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 800,
    config: config.wobbly,
  })

  const DeleteAll = queryString.stringify({
    action: 'massDelete',
  })
  const SuspendAll = queryString.stringify({
    action: 'massSuspend',
  })
  const EnableAll = queryString.stringify({
    action: 'massEnable',
  })

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 1fr max-content 80px max-content;
        box-shadow: 0px 0px 5px 0px rgba(235, 235, 235, 1);
        background: ${Colours.menuHover};
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top: 1px solid ${Colours.border};
        padding: 10px;
        align-items: center;
        justify-items: center;
      `}
    >
      {selectedRows.rows.length > 1 &&
      !disableMultiAction &&
      (deleteMultipleAction ||
        suspendMultipleAction ||
        enableMultipleAction) ? (
        <animated.div
          style={linkAnimation}
          css={`
            width: 100%;
            display: grid;
            grid-template-columns: ${squeeze
              ? 'repeat(3,max-content)'
              : '60px max-content max-content'};
            align-items: center;
            justify-items: Center;
          `}
        >
          <div
            css={`
              height: 30px;
              width: 30px;
              border-radius: 50%;
              display: grid;
              align-items: center;
              justify-items: Center;
              &:hover {
                cursor: pointer;
                box-shadow: 0px 12px 18px -6px rgba(151, 151, 151, 0.75);
              }
              background: #ece6ff;
              transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
              transition-duration: 0.1s;
            `}
            onClick={() =>
              setSelectedRow((state) => {
                const rows = []
                return {
                  rows,
                }
              })
            }
          >
            <Icons.CloseRoundedIcon
              style={{ fontSize: '20px', color: Colours.purple }}
            />
          </div>
          {squeeze ? (
            ''
          ) : (
            <Core.Text size="sm">
              <b
                css={`
                  color: ${Colours.purple};
                `}
              >
                {selectedRows.rows.length}
              </b>{' '}
              Items Selected
            </Core.Text>
          )}
          <div
            css={`
              display: flex;
            `}
          >
            {deleteMultipleAction && (
              <Action
                squeeze={squeeze}
                ids={selectedRows.rows}
                action={() => history.push(`?${DeleteAll}`)}
              >
                {squeeze ? '' : 'Delete'}
              </Action>
            )}
            {suspendMultipleAction && (
              <Action
                suspend
                ids={selectedRows.rows}
                action={() => history.push(`?${SuspendAll}`)}
              >
                Suspend
              </Action>
            )}
            {enableMultipleAction && (
              <Action
                enable
                ids={selectedRows.rows}
                action={() => history.push(`?${EnableAll}`)}
              >
                Enable
              </Action>
            )}
          </div>
        </animated.div>
      ) : (
        <div />
      )}
      <section
        css={`
          &:hover {
            cursor: pointer;
          }
        `}
        onClick={() => {
          if (pagination.start >= 10)
            setPagination({
              start: pagination.start - 10,
              end:
                data.length > pagination.end - 10 && pagination.end % 10 === 0
                  ? pagination.end - 10
                  : pagination.end - (pagination.end % 10),
            })
        }}
      >
        <Icons.ArrowBackIosRoundedIcon
          style={{
            color: pagination.start < 10 ? Colours.icon : Colours.purple,
          }}
        />
      </section>
      <Core.Text>
        {data.length < 10
          ? `${data.length} of ${data.length}`
          : `${pagination.end} of ${data.length}`}
      </Core.Text>
      <section
        css={`
          &:hover {
            cursor: pointer;
          }
        `}
        onClick={() => {
          if (data.length > pagination.end)
            setPagination({
              start: pagination.start + 10,
              end:
                data.length < pagination.end + 10
                  ? data.length
                  : pagination.end + 10,
            })
        }}
      >
        <Icons.ArrowForwardIosRoundedIcon
          style={{
            color:
              data.length <= pagination.end ? Colours.icon : Colours.purple,
          }}
        />
      </section>
    </div>
  )
}

const Action = ({ squeeze, children, action, ids, suspend, enable }) => {
  return (
    <div
      css={`
        height: max-content;
        padding: 5px 20px;
        color: ${suspend
          ? Colours.orange
          : enable
          ? Colours.blue
          : Colours.red};
        font-size: 14px;
        background: ${suspend
          ? Colours.orange
          : enable
          ? Colours.blue
          : Colours.red};
        border-radius: 5px;
        margin-left: ${squeeze ? '10px' : '40px'};
        display: grid;
        grid-template-columns: repeat(2, max-content);
        grid-column-gap: 5px;
        align-items: Center;
        &:hover {
          cursor: pointer;
          box-shadow: 0 1.7px 3.5px rgba(0, 0, 0, 0.016),
            0 3.5px 12.6px rgba(0, 0, 0, 0.037), 0 10px 35px rgba(0, 0, 0, 0.08);
        }
        transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
        transition-duration: 0.1s;
        @media screen and (max-width: 769px) {
          grid-template-columns: max-content;
        }
      `}
      onClick={() => action(ids)}
    >
      {children === 'Suspend' ? (
        <Icons.PauseCircleOutlineRoundedIcon
          style={{
            color: Colours.foreground,
            fontSize: '16px',
          }}
        />
      ) : children === 'Enable' ? (
        <Icons.PlayCircleOutlineRoundedIcon
          style={{
            color: Colours.foreground,
            fontSize: '16px',
          }}
        />
      ) : (
        <Icons.DeleteRoundedIcon
          style={{
            color: Colours.foreground,
            fontSize: '16px',
          }}
        />
      )}
      <section
        css={`
          @media screen and (max-width: 769px) {
            display: none;
          }
        `}
      >
        <Core.Text color={Colours.foreground}>{children}</Core.Text>
      </section>
    </div>
  )
}
