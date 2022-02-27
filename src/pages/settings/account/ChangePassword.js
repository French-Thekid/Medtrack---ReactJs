import React from 'react'
import 'styled-components/macro'
import { Core, Colours } from 'components'
import tickLogo from 'assets/tick.png'
import { ChangePasswordForm } from './forms'

export default function AccountChangePassword({ showNotificationPassword }) {
  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 50px 1fr;
        grid-row-gap: 10px;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr max-content;
          align-items: center;
        `}
      >
        <Core.Text customSize="25px">Change Password</Core.Text>
        <Core.Button
          purpose={'major'}
          type="submit"
          bgColour={Colours.green}
          form="changePassword"
          width="150px"
        >
          Save
        </Core.Button>
      </div>
      <div
        css={`
          box-shadow: 0px 8px 20px -10px rgba(210, 210, 210, 1);
          border: 1px solid ${Colours.border};
          border-radius: 5px;
          display: grid;
          grid-template-rows: max-content 1fr;
          padding: 20px;
          justify-items: center;
          @media screen and (min-width: 1440px) {
            grid-row-gap: 30px;
          }
          /* Tablets */
          @media screen and (max-width: 1025px) {
            @media screen and (max-height: 769px) {
              @media screen and (orientation: landscape) {
                grid-template-rows: 1fr;
                grid-template-columns: 1fr 1fr;
              }
            }
          }

          /* Ipod pro */
          @media (width: 1024px) {
            @media (height: 1366px) {
              @media (orientation: portrait) {
                padding-top: 70px;
              }
            }
          }
          @media (width: 1366px) {
            @media (height: 1024px) {
              @media (orientation: landscape) {
                padding-top: 70px;
              }
            }
          }
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-rows: repeat(2, max-content);
            place-items: center;
            grid-row-gap: 10px;
            @media screen and (min-width: 1440px) {
              grid-row-gap: 30px;
            }
            padding-bottom: 10px;
            border-bottom: 1px solid ${Colours.border};
            width: 100%;
            /* Tablets */
            @media screen and (max-width: 1025px) {
              @media screen and (max-height: 769px) {
                @media screen and (orientation: landscape) {
                  padding-bottom: 0px;
                  border-bottom: none;
                  border-right: 1px solid ${Colours.border};
                }
              }
            }
          `}
        >
          <img
            src={tickLogo}
            alt="tick"
            css={`
              height: 120px;
              width: 140px;
              @media screen and (max-width: 1440px) {
                height: 80px;
                width: 120px;
              }
              @media screen and (min-width: 1440px) {
                height: 200px;
                width: 240px;
              }
              /* Ipod pro */
              @media (width: 1024px) {
                @media (height: 1366px) {
                  @media (orientation: portrait) {
                    height: 300px;
                    width: 340px;
                  }
                }
              }
              @media (width: 1366px) {
                @media (height: 1024px) {
                  @media (orientation: landscape) {
                    height: 250px;
                    width: 290px;
                  }
                }
              }
              /* tablet portrait */
              @media screen and (max-width: 769px) {
                @media screen and (max-height: 1025px) {
                  @media screen and (orientation: portrait) {
                    height: 140px;
                    width: 180px;
                  }
                }
              }
              /* Tablets */
              @media screen and (max-width: 1025px) {
                @media screen and (max-height: 769px) {
                  @media screen and (orientation: landscape) {
                    height: 250px;
                    width: 290px;
                  }
                }
              }
            `}
          />
          <Core.Text customSize="30px">Password Currently Active</Core.Text>
        </div>
        <div
          css={`
            margin-top: 20px;
            width: 100%;
            max-width: 400px;
            /* tablet portrait */
            @media screen and (max-width: 769px) {
              @media screen and (max-height: 1025px) {
                @media screen and (orientation: portrait) {
                  margin-top: 50px;
                  width: 100%;
                  max-width: 400px;
                }
              }
            }
            /* Ipod pro */
            @media (width: 1024px) {
              @media (height: 1366px) {
                @media (orientation: portrait) {
                  margin-top: 50px;
                  width: 100%;
                  max-width: 400px;
                }
              }
            }
            @media (width: 1366px) {
              @media (height: 1024px) {
                @media (orientation: landscape) {
                  margin-top: 50px;
                  width: 100%;
                  max-width: 400px;
                }
              }
            }
          `}
        >
          <ChangePasswordForm
            id="changePassword"
            showNotificationPassword={showNotificationPassword}
          />
        </div>
      </div>
    </div>
  )
}
