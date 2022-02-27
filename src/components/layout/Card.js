import React, { useState } from 'react'
import 'styled-components/macro'

import { Core, Colours, FormControl } from 'components'

export default function CardContainer({
  children,
  title,
  responsive,
  searchHandler,
  searchPlaceholder = 'Search',
}) {
  const [query, setQuery] = useState('')

  return (
    <div
      css={`
        display: grid;
        grid-template-rows: 40px 1fr;
        border-radius: 5px;
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        border: 1px solid ${Colours.border};
        overflow-y: auto;
        /* table */
        @media screen and (max-width: 769px) {
          @media screen and (max-height: 1025px) {
            @media screen and (orientation: portrait) {
              min-height: ${responsive ? '400px' : 'calc(100% - 2px)'};
            }
          }
        }
      `}
    >
      <div
        css={`
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          border-bottom: 1px solid ${Colours.border};
          background: #f8f8fc;
          display: grid;
          justify-items: start;
          align-items: center;
          padding: 5px 10px;
          grid-template-columns: ${searchHandler ? 'max-content 1fr' : '1fr'};
          grid-gap: ${searchHandler ? '20px' : '0px'};
        `}
      >
        <Core.Text customSize="20px">{title}</Core.Text>
        {searchHandler && (
          <FormControl.InputWithImage
            small
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            action={() => {
              if (searchHandler) searchHandler({ variables: { query } })
            }}
          />
        )}
      </div>
      <div
        css={`
          width: calc(100% - 20px);
          padding: 10px;
          overflow-y: auto;
        `}
      >
        {children}
      </div>
    </div>
  )
}
