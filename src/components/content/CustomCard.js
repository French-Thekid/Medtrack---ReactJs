import React from 'react'
import 'styled-components/macro'
import { Colours, Core, Icons, FormControl } from 'components'
import search from 'assets/searchIcon.png'
import Flip from 'react-reveal/Flip'

export default function CustomCard({
  children,
  title,
  minHeight = 'calc(100% - 2px)',
  minWidth = 'auto',
  close = false,
  addSearch,
  handleSearch,
  searchPlaceHolder = 'Search Name, Emails',
  action,
  query,
  warning,
}) {
  return (
    <div>
      <Flip left>
        <div
          css={`
            min-height: ${minHeight};
            min-width: ${minWidth};
            display: grid;
            grid-template-rows: 40px 1fr;
            overflow-y: auto;
            border: 1px solid ${Colours.border};
            border-radius: 5px;
          `}
        >
          <div
            css={`
              background: ${Colours.menuHover};
              border-bottom: 1px solid ${Colours.border};
              display: grid;
              grid-template-columns: ${addSearch
                ? 'max-content 1fr'
                : close
                ? '1fr max-content'
                : '1fr'};
              grid-column-gap: ${addSearch ? '10px' : '0px'};
              align-items: center;
              padding: 0px 10px;
            `}
          >
            <div
              css={`
                display: grid;
                grid-template-columns: max-content max-content;
                grid-gap: 10px;
                align-items: Center;
              `}
            >
              <Core.Text weight="600">{title}</Core.Text>
              {warning && (
                <Icons.WarningRoundedIcon
                  style={{ color: Colours.orange, fontSize: '22px' }}
                />
              )}
            </div>
            {addSearch && (
              <FormControl.InputWithImage
                value={query}
                onChange={handleSearch}
                placeholder={searchPlaceHolder}
                bntImage={search}
                action={action}
              />
            )}
            {close && (
              <div
                onClick={() => close()}
                css={`
                  height: 24px;
                  width: max-content;
                  border: 2px solid ${Colours.border};
                  border-radius: 5px;
                  &:hover {
                    cursor: pointer;
                  }
                `}
              >
                <Icons.CloseRoundedIcon
                  style={{ margin: '0px', padding: '0px', color: Colours.text }}
                />
              </div>
            )}
          </div>
          <div
            css={`
              width: calc(100% - 20px);
              padding: 10px;
              overflow-y: auto;
              background: ${Colours.foreground};
            `}
          >
            {children}
          </div>
        </div>
      </Flip>
    </div>
  )
}
