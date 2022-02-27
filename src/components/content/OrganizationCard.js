import React from 'react'
import 'styled-components/macro'
import { Colours, Content, Core } from 'components'

export default function UserCard({
  avatar,
  name,
  extra,
  id,
  setSelectedOrganization,
  selectedOrganization,
  single,
  special,
  ...rest
}) {
  let list = []
  return (
    <div
      {...rest}
      css={`
        height: 170px;
        width: 190px;
        border: 1px solid
          ${single
            ? selectedOrganization === id
              ? Colours.green
              : Colours.border
            : selectedOrganization.facility.includes(id)
            ? Colours.green
            : Colours.border};
        border-radius: 5px;
        display: grid;
        padding: 10px;
        justify-items: center;
        grid-template-rows: 70px max-content 1fr max-content;
        grid-row-gap: 5px;
        &:hover {
          cursor: pointer;
          box-shadow: 0px 8px 20px -2px rgba(237, 237, 237, 1);
          transition: ease-out 0.2s;
          transform: translateY(-1px);
        }

        /* Tablets */
        @media screen and (max-width: 1025px) {
          @media screen and (max-height: 769px) {
            @media screen and (orientation: landscape) {
              width: 230px;
            }
          }
        }
      `}
    >
      <Content.Avatar
        size="largee"
        src={avatar}
        firstName={name}
        lastName={name[1] ? name[1].split(' ')[1] || name[1].split('')[1] : 'M'}
      />

      <Core.Text customSize="16px" Contained>
        {name}
      </Core.Text>
      <Core.Text customSize="12px" color={Colours.purple}>
        {extra}
      </Core.Text>
      <Core.Button
        bgColour={
          single
            ? selectedOrganization === id
              ? Colours.green
              : Colours.purple
            : selectedOrganization.facility.includes(id)
            ? Colours.green
            : Colours.purple
        }
        onClick={() => {
          if (single) {
            setSelectedOrganization(id)
          } else {
            if (selectedOrganization.facility.includes(id)) {
              if (special) {
                list = JSON.parse(localStorage.getItem('SelectedFacilities'))

                localStorage.setItem(
                  'SelectedFacilities',
                  JSON.stringify(list.filter((item, index) => item !== name))
                )
              }
              setSelectedOrganization((state) => {
                const facility = state.facility.filter((item, j) => item !== id)
                return {
                  facility,
                }
              })
            } else {
              if (special) {
                list =
                  JSON.parse(localStorage.getItem('SelectedFacilities')) || []

                list.push(name)

                localStorage.setItem('SelectedFacilities', JSON.stringify(list))
              }
              setSelectedOrganization((state) => {
                const facility = state.facility.concat(id)
                return {
                  facility,
                }
              })
            }
          }
        }}
      >
        {single
          ? selectedOrganization === id
            ? 'Selected'
            : 'Select'
          : selectedOrganization.facility.includes(id)
          ? 'Selected'
          : 'Select'}
      </Core.Button>
    </div>
  )
}
