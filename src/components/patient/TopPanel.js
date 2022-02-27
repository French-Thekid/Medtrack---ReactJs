import React, { useState } from 'react'
import 'styled-components/macro'
import { useHistory } from 'react-router-dom'

import { Core, Colours, FormControl } from 'components'

export default function TopPanel({
  path,
  btnTitle,
  title,
  placeholder,
  searchHandler,
  searchExtras,
}) {
  const history = useHistory()
  const [query, setQuery] = useState('')

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: max-content 1fr max-content;
        grid-gap: 20px;
        align-items: center;
        border-bottom: 1px solid ${Colours.border};
        padding-bottom: 5px;
      `}
    >
      <Core.Text customSize="25px">{title}</Core.Text>
      <FormControl.InputWithImage
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        action={() => {
          if (searchHandler) {
            let variables = { query }
            if (searchExtras) variables = { query, ...searchExtras }
            searchHandler({ variables: { ...variables } })
          }
        }}
      />
      <Core.Button purpose="major" onClick={() => history.push(path)}>
        {btnTitle}
      </Core.Button>
    </div>
  )
}
