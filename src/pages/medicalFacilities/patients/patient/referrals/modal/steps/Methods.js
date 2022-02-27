import React from 'react'
import 'styled-components/macro'
import { Form, Core, Colours, Icons } from 'components'

export default function Methods({ method, setMethod }) {
  return (
    <Form.Step>
      <div
        css={`
          padding-bottom: 5px;
          border-bottom: 1px solid ${Colours.border};
          width: 100%;
        `}
      >
        <Core.Text>
          Please select the method you'd want to use to dispense this Referral
        </Core.Text>
      </div>
      <div
        css={`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 20px;
          margin-top: 20px;
        `}
      >
        <Method
          setMethod={setMethod}
          method="Direct"
          title="Directly To Facility"
          selected={method}
        />
        <Method
          setMethod={setMethod}
          method="Email"
          title="Email To Facility"
          selected={method}
        />
        <Method
          setMethod={setMethod}
          method="Print"
          title="Download and Print"
          selected={method}
        />
      </div>
    </Form.Step>
  )
}

const Method = ({ selected, title, setMethod, method }) => {
  return (
    <div
      onClick={() => {
        setMethod(method)
      }}
      css={`
        height: 150px;
        width: 200px;
        border-radius: 5px;
        background: rgb(170, 144, 255);
        background: ${selected === method
          ? `linear-gradient(180deg, rgba(178,255,188,1) 0%, rgba(24,187,46,1) 100%)`
          : `linear-gradient(
            180deg,
            rgba(170, 144, 255, 1) 0%,
            rgba(86, 46, 213, 1) 100%
          )`};
        &:hover {
          cursor: pointer;
          box-shadow: 0px 8px 20px -2px rgba(196, 196, 196, 1);
          transition: ease-out 0.2s;
          transform: translateY(-3px);
        }
        display: grid;
        grid-template-rows: 1fr 50px;
        place-items: center;
      `}
    >
      {title === 'Directly To Pharmacy' && (
        <div
          css={`
            display: grid;
            place-items: Center;
            grid-template-columns: repeat(3, max-content);
          `}
        >
          <Icons.AccountBalanceRoundedIcon
            style={{ color: '#fff', fontSize: '40px' }}
          />
          <Icons.SyncAltRoundedIcon
            style={{ color: '#fff', fontSize: '40px' }}
          />
          <Icons.AccountBalanceRoundedIcon
            style={{ color: '#fff', fontSize: '40px' }}
          />
        </div>
      )}
      {title === 'Email To Pharmacy' && (
        <div
          css={`
            display: grid;
            place-items: Center;
          `}
        >
          <Icons.EmailRoundedIcon style={{ color: '#fff', fontSize: '50px' }} />
        </div>
      )}
      {title === 'Download and Print' && (
        <div
          css={`
            display: grid;
            place-items: Center;
          `}
        >
          <Icons.GetAppRoundedIcon
            style={{ color: '#fff', fontSize: '50px' }}
          />
        </div>
      )}
      <div
        css={`
          display: grid;
          align-items: start;
          height: 100%;
        `}
      >
        <Core.Text color={Colours.foreground}>{title}</Core.Text>
      </div>
    </div>
  )
}
