import React from 'react'
import 'styled-components/macro'

import { Icons, Colours } from 'components'

export default function WidgetCard({
  colour,
  title,
  firstTitle,
  firstCount,
  secondTitle,
  secondCount,
  admin,
}) {
  const percentageCompleted = (secondCount / firstCount) * 100
  let percentageCompletedString =
    percentageCompleted.toString().split('.')[0] + '%'

  if (percentageCompletedString === 'NaN%') percentageCompletedString = '0%'

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: 130px max-content max-content;
        grid-row-gap: 10px;
        @media only screen and (max-width: 1440px) {
          grid-template-rows: 80px max-content max-content;
          grid-row-gap: 10px;
        }
      `}
    >
      <div
        css={`
          height: 125px;
          width: 125px;
          border-radius: 50%;
          @media only screen and (max-width: 1440px) {
            height: 70px;
            width: 70px;
          }
          margin: auto;
          background: ${colour === Colours.green
            ? '#E8FFEB'
            : colour === Colours.blue
            ? '#E2EDFF'
            : '#FFF7E5'};
          display: grid;
          place-items: center;
        `}
      >
        {title === 'Appointments' ? (
          <section
            css={`
              font-size: 35px;
              @media only screen and (min-width: 1440px) {
                font-size: 60px;
              }
            `}
          >
            <Icons.TodayRoundedIcon
              style={{
                fontSize: 'inherit',
                color: colour,
              }}
            />
          </section>
        ) : title === 'Roles' ? (
          <section
            css={`
              font-size: 35px;
              @media only screen and (min-width: 1440px) {
                font-size: 60px;
              }
            `}
          >
            <Icons.GavelRoundedIcon
              style={{
                fontSize: 'inherit',
                color: colour,
              }}
            />
          </section>
        ) : title === 'Reports' ? (
          <section
            css={`
              font-size: 35px;
              @media only screen and (min-width: 1440px) {
                font-size: 60px;
              }
            `}
          >
            <Icons.AssessmentRoundedIcon
              style={{
                fontSize: 'inherit',
                color: colour,
              }}
            />
          </section>
        ) : (
          <section
            css={`
              font-size: 35px;
              @media only screen and (min-width: 1440px) {
                font-size: 60px;
              }
            `}
          >
            <Icons.PeopleAltRoundedIcon
              style={{
                fontSize: 'inherit',
                color: colour,
              }}
            />
          </section>
        )}
      </div>
      <section>
        <section
          css={`
            padding-bottom: 2px;
            border-bottom: 1px solid ${Colours.border};
            margin-bottom: 5px;
          `}
        >
          <Label weight="500" colour={colour}>
            {title}
          </Label>
        </section>
        <section
          css={`
            display: grid;
            grid-template-columns: 1fr 50px;
            grid-column-gap: 10px;
            @media only screen and (max-width: 1440px) {
              grid-template-columns: 1fr 30px;
              grid-column-gap: 10px;
            }
          `}
        >
          <Label weight="400" fontMax="18px" colour={Colours.text}>
            {firstTitle}
          </Label>
          <Label weight="500" fontMax="18px" colour={colour}>
            {firstCount}
          </Label>
        </section>
        <section
          css={`
            display: grid;
            grid-template-columns: 1fr 50px;
            grid-column-gap: 10px;
            @media only screen and (max-width: 1440px) {
              grid-template-columns: 1fr 30px;
              grid-column-gap: 10px;
            }
          `}
        >
          <Label weight="400" fontMax="18px" colour={Colours.text}>
            {secondTitle}
          </Label>
          <Label weight="500" fontMax="18px" colour={colour}>
            {secondCount}
          </Label>
        </section>
      </section>
      <div
        css={`
          display: grid;
          grid-template-rows: repeat(2, max-content);
          grid-column-gap: 5px;
          margin-top: ${admin ? '20px' : '0px'};
        `}
      >
        <section
          css={`
            width: 100%;
            display: grid;
            justify-items: end;
            margin-bottom: 2px;
          `}
        >
          <Label fontMax="12px" fontMin="15px" colour={colour}>
            {percentageCompletedString} {admin ? '' : 'Completed'}
          </Label>
        </section>
        <div
          css={`
            width: 100%;
            height: 15px;
            border-radius: 25px;
            background: ${colour === Colours.green ? '#E8FFEB' : '#E2EDFF'};
            @media only screen and (max-width: 1440px) {
              height: 10px;
            }
          `}
        >
          <div
            css={`
              width: ${percentageCompletedString};
              height: 100%;
              border-radius: 25px;
              background: ${colour};
            `}
          ></div>
        </div>
      </div>
    </div>
  )
}

const Label = ({
  children,
  colour,
  weight = 400,
  fontMax = '20px',
  fontMin = '25px',
  clickable,
  ...rest
}) => (
  <p
    {...rest}
    css={`
      margin: 0px;
      padding: 0px;
      font-weight: ${weight};
      font-size: ${fontMax};
      /* @media only screen and (min-height: 1025px) {
        font-size: ${fontMin};
      } */
      &:hover {
        cursor: ${clickable ? 'pointer' : 'arror'};
      }
      color: ${colour || Colours.text};
    `}
  >
    {children}
  </p>
)
