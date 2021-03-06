import React from 'react'
import 'styled-components/macro'

import { Core, Colours } from 'components'
import Checkbox from './Checkbox'

export default function Header({
  data = [],
  Columns = '1fr',
  deleteAction,
  enableAction,
  suspendAction,
  editAction,
  checkBoxNeeded,
  setSelectedAllRow,
  rowData,
  selectedRows,
  setSelectedRow,
  justify,
  breakingPoint,
  altTitle,
}) {
  if (checkBoxNeeded) {
    Columns = '45px ' + Columns
  }

  if (deleteAction || enableAction || editAction || editAction) {
    Columns = Columns + ' 90px'
  }

  //Capturing All IDS
  const ids = rowData
    .map((value, index) => value.id)
    .filter((item) => item)
    .join()

  return (
    <div
      css={`
        width: calc(100% - 20px);
        height: max-content;
        @media (max-width: ${breakingPoint}) {
          display: none;
        }
        display: grid;
        grid-template-columns: ${Columns};
        grid-column-gap: 10px;
        justify-items: ${justify};
        align-items: center;
        padding: 10px;
        border-bottom: 2px solid ${Colours.border};
      `}
    >
      {checkBoxNeeded ? (
        <Checkbox
          state={selectedRows.rows.length === rowData.length ? true : false}
          actions={(e) => {
            setSelectedAllRow(e)
            if (e) {
              setSelectedRow((state) => {
                const rows = [...new Set(state.rows.concat(ids.split(',')))]
                return {
                  rows,
                }
              })
            } else {
              setSelectedRow((state) => {
                const rows = []
                return {
                  rows,
                }
              })
            }
          }}
        />
      ) : null}
      {data.map((value, index) => {
        if (
          (altTitle === 'Roles' && index === 2) ||
          (altTitle === 'Roles' && index === 3)
        )
          return (
            <div
              css={`
                width: 100%;
                display: grid;
                justify-items: center;
              `}
            >
              <Core.Text weight="600" key={index}>
                {value}
              </Core.Text>
            </div>
          )
        else
          return (
            <Core.Text weight="600" key={index}>
              {value}
            </Core.Text>
          )
      })}

      {deleteAction || suspendAction || enableAction || editAction ? (
        <div
          css={`
            width: 100%;
            display: flex;
            justify-content: Center;
          `}
        >
          <Core.Text weight="600">Actions</Core.Text>
        </div>
      ) : null}
    </div>
  )
}
