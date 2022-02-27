import React from 'react'
import { Core, Layout } from '..'
import Wobble from 'react-reveal/Wobble'

function Alert({ type, message, ...props }) {
  return (
    <>
      {' '}
      <Wobble>
        <Core.Box
          style={{
            boxShadow: '0px 21px 36px -9px rgba(224,224,224,1)',
            width: '100%',
            marginBottom: '10px',
          }}
          bg={
            type === 'info'
              ? '#0052CC'
              : type === 'warning'
              ? '#FFAB00'
              : type === 'error'
              ? '#fc1460'
              : '#0052CC'
          }
          radius="4px"
          maxWidth="500px"
          height="max-content"
          color={type === 'warning' ? 'black' : 'white'}
          mg="0px"
          pd="0px"
          {...props}
        >
          <Core.Box>
            <Layout.Flex justify="space-between">
              <Core.Box>
                <Core.Text
                  align="left"
                  size="rg"
                  pd="12px"
                  color={type === 'warning' ? 'black' : 'white'}
                >
                  {message}
                </Core.Text>
              </Core.Box>
            </Layout.Flex>
          </Core.Box>
        </Core.Box>{' '}
      </Wobble>
    </>
  )
}

export default Alert
