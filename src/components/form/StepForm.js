import React, { useState } from 'react'
import 'styled-components/macro'
import { Core, Colours } from '../index'
import 'index.css'

function StepForm(props) {
  const {
    children,
    handleSubmit,
    isSubmitting,
    customSubmit,
    CanProceed,
    CanProceed1,
    CanProceed2,
    restrictive,
    restrictive1,
    restrictive2,
    CanProceed3,
    errors = {},
  } = props
  const [index, setIndex] = useState(0)
  const length = React.Children.toArray(children).length
  const shouldSubmit = index === length - 1
  const isFirstPage = index === 0
  const handleNext = () =>
    index === length - 1 ? setIndex(0) : setIndex(index + 1)
  const handlePrevious = () => (index === 0 ? setIndex(0) : setIndex(index - 1))

  const page = index + 1
  const activePage = (page / length) * 100

  let toolTip = {}
  if (restrictive) {
    if (CanProceed() === false)
      toolTip = {
        'aria-label': 'Please add items before you proceed.',
        'data-balloon-pos': 'left',
      }
  }
  if (restrictive1) {
    if (page === 2) {
      if (!CanProceed1(page))
        toolTip = {
          'aria-label': 'Please add details before you proceed.',
          'data-balloon-pos': 'left',
        }
    }
  }
  if (restrictive2) {
    if (page === 1) {
      if (!CanProceed3(page))
        toolTip = {
          'aria-label': 'Please select a patient.',
          'data-balloon-pos': 'left',
        }
    }
    if (page === 3) {
      if (!CanProceed2(page))
        toolTip = {
          'aria-label': 'Please add details before you proceed.',
          'data-balloon-pos': 'left',
        }
    }
  }

  const Controller = () => {
    if (restrictive || restrictive1 || restrictive2) {
      if (restrictive) {
        if (CanProceed()) handleNext()
      }
      if (restrictive1) {
        if (CanProceed1(page)) handleNext()
      }
      if (restrictive2) {
        if (page === 1) {
          if (CanProceed3(page)) handleNext()
        }
        if (page > 1) {
          if (CanProceed2(page)) handleNext()
        }
      }
    }
    return false
  }

  return (
    <form onSubmit={handleSubmit} onkeydown="return event.key != 'Enter';">
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 20px;
          align-items: Center;
          grid-column-gap: 5px;
          margin-bottom: 15px;
        `}
      >
        <section
          css={`
            background: ${Colours.softGrey};
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
          `}
        >
          <div
            css={`
              width: ${activePage}%;
              height: 4px;
              background: ${activePage === 100
                ? Colours.green
                : Colours.purple};
              border-top-right-radius: 50px;
              border-bottom-right-radius: 50px;
              transition: ease-out 0.2s;
            `}
          />
        </section>
        <Core.Text
          customSize="10px"
          color={activePage === 100 ? Colours.green : Colours.purple}
        >
          {page}/{length}
        </Core.Text>
      </div>
      {React.Children.toArray(children)[index]}
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
          margin-top: 10px;
        `}
      >
        <div>
          {!isFirstPage && (
            <Core.Button
              type="button"
              width="150px"
              style={{
                float: 'left',
                border: `1px solid ${Colours.purple}`,
              }}
              bgColour="#fff"
              fontColour={Colours.purple}
              onClick={handlePrevious}
              outline
              // action={user.role === 'SupportAdmin' ? 'READ' : 'WRITE'}
            >
              Previous
            </Core.Button>
          )}
        </div>
        <div>
          {shouldSubmit ? (
            <button
              css={`
                width: 150px;
                min-width: max-content;
                height: max-content;
                background: ${Colours.green};
                color: white;
                font-weight: 600;
                border: 1px solid ${Colours.green};
                padding: 8px;
                box-shadow: 0px 0px 2px 0px rgba(166, 166, 166, 1);
                border-radius: 3px;
                display: grid;
                justify-items: Center;
                outline: none;
                align-items: Center;
                margin-bottom: 0px;
                float: right;
                &:hover {
                  cursor: pointer;
                  box-shadow: 0px 3px 3px 0px rgba(196, 196, 196, 1);
                  transition: ease-out 0.2s;
                  transform: translateY(-1px);
                }
                &:disabled {
                  cursor: not-allowed;
                  opacity: 0.6;
                  filter: grayscale(40%);
                }
              `}
              type="submit"
              disabled={isSubmitting /*|| Object.keys(errors).length > 0*/}
            >
              {customSubmit || 'Submit'}
            </button>
          ) : (
            <>
              {props.edit && (
                <button
                  css={`
                    width: 150px;
                    min-width: max-content;
                    height: max-content;
                    background: ${Colours.green};
                    color: white;
                    font-weight: 600;
                    border: 1px solid ${Colours.green};
                    padding: 8px;
                    box-shadow: 0px 0px 2px 0px rgba(166, 166, 166, 1);
                    border-radius: 3px;
                    display: grid;
                    justify-items: Center;
                    outline: none;
                    align-items: Center;
                    margin-bottom: 0px;
                    margin-left: 10px;
                    float: right;
                    &:hover {
                      cursor: pointer;
                      box-shadow: 0px 3px 3px 0px rgba(196, 196, 196, 1);
                      transition: ease-out 0.2s;
                      transform: translateY(-1px);
                    }
                    &:disabled {
                      cursor: not-allowed;
                      opacity: 0.6;
                      filter: grayscale(40%);
                    }
                  `}
                  type="submit"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                >
                  Submit
                </button>
              )}
              <Core.Button
                {...toolTip}
                type="button"
                width="150px"
                style={{
                  float: 'right',
                  border: `1px solid ${Colours.purple}`,
                }}
                onClick={() => {
                  if (!restrictive && !restrictive1 && !restrictive2) {
                    handleNext()
                  } else {
                    Controller()
                  }
                }}
              >
                Next
              </Core.Button>
            </>
          )}
        </div>
      </div>
    </form>
  )
}

export default StepForm
