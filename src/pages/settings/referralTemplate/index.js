import React, { useContext, useEffect, useState } from 'react'
import 'styled-components/macro'
import templateLogo from 'assets/template.png'
import qrcPlaceholder from 'assets/qrc.png'
import { SketchPicker } from 'react-color'
import { OrganisationContext } from 'context'
import { GET_ORGANIZATION } from 'context/query'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_TEMPLATE_COLOR } from './mutations'
import { Core, Colours, Content, Icons, Loading } from 'components'

export default function ReferralTemplate() {
  const [showColorPicker, setShowColourPicker] = useState(false)

  //Getting Organisation ID
  const {
    organizationId,
    referralTemplateColor,
    status: facilityStatus,
  } = useContext(OrganisationContext)

  //Setting up mutation
  const [updateFacility, { loading, error }] = useMutation(
    UPDATE_TEMPLATE_COLOR,
    {
      refetchQueries: () => [
        {
          query: GET_ORGANIZATION,
          variables: { id: '' },
        },
      ],
    }
  )

  if (loading) return <Loading />
  if (error)
    return <Content.Alert type="error" message="Failed to Update Template" />

  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 20px;
        height: 100%;
      `}
    >
      <div
        css={`
          height: 50px;
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 20px;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid ${Colours.border};
        `}
      >
        <Core.Text customSize="25px">E-Referral Template</Core.Text>
      </div>
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 2fr;
          grid-column-gap: 20px;
          height: 100%;
          @media screen and (max-width: 769px) {
            grid-template-columns: 1fr;
            grid-template-rows: max-content;
            grid-gap: 50px;
          }
          /* table */
          @media screen and (max-width: 769px) {
            @media screen and (max-height: 1025px) {
              @media screen and (orientation: portrait) {
                grid-template-columns: 1fr;
                grid-template-rows: max-content;
                grid-gap: 50px;
              }
            }
          }
        `}
      >
        {/* Panel */}
        <div
          css={`
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            border-top: 1px solid ${Colours.border};
            border-right: 1px solid ${Colours.border};
            display: grid;
            grid-template-rows: 40px 1fr;
            height: 100%;
          `}
        >
          <div
            css={`
              background: #f8f8fc;
              border-top-left-radius: 5px;
              border-top-right-radius: 5px;
              border-bottom-left-radius: 5px;
              display: grid;
              place-items: center;
              border-bottom: 1px solid ${Colours.border};
              border-left: 1px solid ${Colours.border};
            `}
          >
            <Core.Text customSize="20px">Templates</Core.Text>
          </div>
          <div
            css={`
              padding: 10px;
              width: calc(100% - 20px);
              height: calc(100% - 20px);
            `}
          >
            <div
              css={`
                border: 1px solid ${Colours.border};
                width: calc(100% - 20px);
                height: 100px;
                border-radius: 5px;
                margin-top: 10px;
                display: grid;
                grid-template-columns: max-content 1fr;
                grid-column-gap: 20px;
                align-items: center;
                padding: 10px;
                box-shadow: 0px 10px 22px -3px rgb(213 213 213 / 70%);
                @media screen and (max-width: 1440px) {
                  height: 70px;
                }
              `}
            >
              <img
                src={templateLogo}
                alt="template"
                css={`
                  height: 75px;
                  width: 75px;
                  @media screen and (max-width: 1440px) {
                    height: 40px;
                    width: 40px;
                  }
                `}
              />
              <div>
                <Font customSize="25px" bigger="18px">
                  Main Template (Default)
                </Font>
                <Font color={Colours.purple} customSize="15px">
                  System Standard
                </Font>
              </div>
            </div>
          </div>
        </div>
        {/* page */}
        <div
          css={`
            border: 1px solid ${Colours.border};
            border-radius: 5px;
            box-shadow: 0px 10px 22px -3px rgb(213 213 213 / 70%);
            display: grid;
            grid-template-rows: 160px 1fr;
            @media screen and (max-width: 1440px) {
              grid-template-rows: 130px 1fr;
            }
          `}
        >
          <Header
            updateFacility={updateFacility}
            organizationId={organizationId}
            showColorPicker={showColorPicker}
            setShowColourPicker={setShowColourPicker}
            referralTemplateColor={referralTemplateColor}
            facilityStatus={facilityStatus}
          />
          <div
            css={`
              display: grid;
              grid-template-rows: 80px 1fr 120px;
              grid-gap: 10px;
              padding: 20px 10px 10px 10px;
              width: calc(100% - 20px))
              height:calc(100% - 30px));
            `}
          >
            <div
              css={`
                display: grid;
                grid-template-columns: 1fr 200px;
                grid-gap: 10px;
                border-bottom: 1px solid ${Colours.border};
              `}
            >
              <div
                css={`
                  display: grid;
                  grid-template-rows: max-content 1fr;
                  grid-gap: 10px;
                `}
              >
                <Font customSize="20px">{`<Creator's Name>`}</Font>
                <Font
                  style={{ marginLeft: '40px' }}
                  customSize="15px"
                >{`<Creator's Signature>`}</Font>
              </div>
              <div
                css={`
                  display: grid;
                  grid-template-rows: max-content 1fr;
                  grid-gap: 10px;
                `}
              >
                <Font customSize="15px">{`No: <Template Number>`}</Font>
                <Font customSize="15px">{`Date: <Date Created>`}</Font>
              </div>
            </div>
            <div
              css={`
                display: grid;
                grid-template-rows: 1fr;
                grid-gap: 10px;
                border-bottom: 1px solid ${Colours.border};
              `}
            >
              <div
                css={`
                  display: grid;
                  grid-template-rows: max-content 1fr;
                  grid-gap: 20px;
                `}
              >
                <Font customSize="15px">{`Dear <Recepient's Name>`}</Font>
                <Font
                  style={{ marginLeft: '40px' }}
                  customSize="15px"
                >{`<Prescribed Items>`}</Font>
              </div>
            </div>
            <div
              css={`
                display: grid;
                grid-template-columns: max-content 1fr 100px;
                grid-gap: 20px;
                align-items: center;
              `}
            >
              <Content.Avatar
                shadow
                borderColor={Colours.border}
                size="huge"
                src=""
                firstName="U"
                lastName="A"
              />
              <div
                css={`
                  display: grid;
                  grid-template-rows: max-content max-content 1fr;
                  grid-gap: 10px;
                `}
              >
                <Font customSize="25px">{`<Patient's Name>`}</Font>
                <Font customSize="15px">{`<Patient's Email>`}</Font>
                <Font customSize="15px">{`<Patient's Phone Number>`}</Font>
              </div>
              <img
                src={qrcPlaceholder}
                alt="template"
                css={`
                  height: 100px;
                  width: 100px;
                `}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Font = ({ children, customSize, bigger, color, logo, ...rest }) => {
  return (
    <p
      css={`
        margin: 0px;
        padding: 0px;
        color: ${color || Colours.text};
        font-size: ${customSize || '20px'};
        @media screen and (max-width: 1440px) {
          font-size: ${bigger || '15px'};
        }
        @media screen and (min-width: 1440px) {
          font-size: ${logo ? '40px' : customSize || '20px'};
        }
      `}
      {...rest}
    >
      {children}
    </p>
  )
}

function Header({
  showColorPicker,
  setShowColourPicker,
  updateFacility,
  organizationId,
  referralTemplateColor,
  facilityStatus,
}) {
  const [color, setColor] = useState(referralTemplateColor || Colours.teal)
  // eslint-disable-next-line
  useEffect(() => {
    if (!showColorPicker) setColor(referralTemplateColor)
  })

  return (
    <>
      {showColorPicker && (
        <div
          css={`
            position: absolute;
            right: 80px;
            top: 280px;
            padding: 10px;
            border: 1px solid ${Colours.border};
            border-radius: 5px;
            /* tablet*/
            @media screen and (max-width: 769px) {
              @media screen and (max-height: 1025px) {
                @media screen and (orientation: portrait) {
                  right: 80px;
                  top: 480px;
                }
              }
            }
          `}
        >
          <SketchPicker
            color={color}
            onChangeComplete={(selectedColour) => {
              setColor(selectedColour.hex)
            }}
          />
          <br />
          <Core.Button
            onClick={async () => {
              console.log(color)
              await updateFacility({
                variables: {
                  organizationId,
                  color,
                },
              }).catch((e) => {
                console.log(e)
              })
              setShowColourPicker(false)
            }}
          >
            Apply
          </Core.Button>
        </div>
      )}
      <div
        css={`
          height: calc(100% - 20px);
          width: calc(100% - 20px);
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          background: ${color};
          padding: 10px;
          display: grid;
          grid-template-columns: max-content 1fr 60px;
          grid-gap: 30px;
          align-items: center;
        `}
      >
        <div
          css={`
            background-size: cover;
            background-repeat: no-repeat;
            background-position-y: center;
            background-color: ${Colours.teal};
            height: 140px;
            width: 140px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            border: 1px solid ${Colours.border};
            box-shadow: 0px 8px 20px -10px rgba(113, 113, 138, 1);
            @media screen and (max-width: 1440px) {
              height: 90px;
              width: 90px;
            }
          `}
        >
          <Font logo customSize="25px" bigger="38px" color={Colours.foreground}>
            PT
          </Font>
        </div>
        <div
          css={`
            height: 100%;
            display: grid;
            grid-template-rows: max-content 1fr;
            grid-gap: 5px;
          `}
        >
          <Font
            color={Colours.foreground}
            customSize="30px"
            bigger="25px"
          >{`<Facility Title>`}</Font>
          <div
            css={`
              height: 100%;
              width: 100%;
              display: grid;
              grid-template-columns: 1fr max-content;
              justify-items: start;
              @media screen and (max-width: 1440px) {
                grid-column-gap: 20px;
              }
            `}
          >
            <Font
              color={Colours.foreground}
              customSize="20px"
            >{`<Street Number> <Street Name>`}</Font>
            <Font
              color={Colours.foreground}
              customSize="20px"
            >{`<Email Address>`}</Font>
            <Font color={Colours.foreground} customSize="20px">{`<City>`}</Font>
            <Font
              color={Colours.foreground}
              customSize="20px"
            >{`<Phone Number>`}</Font>
            <Font
              color={Colours.foreground}
              customSize="20px"
            >{`<Country>`}</Font>
          </div>
        </div>
        <div
          css={`
            border: 2px solid #fff;
            height: 50px;
            width: 50px;
            border-radius: 50%;
            color: #fff;
            display: grid;
            place-items: center;
            font-size: 30px;
            &:hover {
              cursor: ${facilityStatus === 'SUSPENDED'
                ? 'not-allowed'
                : 'pointer'};
              box-shadow: 0px 8px 20px -2px rgba(186, 186, 186, 1);
              transition: ease-out 0.2s;
              transform: translateY(-1px);
              color: ${Colours.purple};
            }
          `}
          onClick={() => {
            if (facilityStatus !== 'SUSPENDED')
              setShowColourPicker(!showColorPicker)
          }}
        >
          <Icons.ColorizeRoundedIcon style={{ fontSize: 'inherit' }} />
        </div>
      </div>
    </>
  )
}
