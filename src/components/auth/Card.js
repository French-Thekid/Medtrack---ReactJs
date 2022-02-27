import React from 'react'
import 'styled-components/macro'
import { Colours } from 'components'
import Auth1 from 'assets/auth/Auth1.png'
import Auth2 from 'assets/auth/Auth2.PNG'
import Fade from 'react-reveal/Fade'

export default function Card({ children }) {
  return (
    <div
      css={`
        margin: 0 auto;
        width: calc(75% - 20px);
        height: calc(70% - 20px);
        border-radius: 10px;
        background: ${Colours.foreground};
        box-shadow: 0px 6px 15px -4px rgba(212, 212, 212, 1);
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        padding: 10px;
        @media only screen and (min-height: 1024px) {
          height: calc(60% - 20px);
        }
        @media only screen and (max-width: 768px), (max-height: 1025px) {
          @media (orientation: portrait) {
            width: calc(90% - 20px);
            grid-template-columns: max-content 2fr max-content;
          }
        }
        @media only screen and (max-width: 1025px), (max-height: 769px) {
          @media (orientation: landscape) {
            width: calc(90% - 20px);
            grid-template-columns: max-content 2fr max-content;
            height: calc(90% - 20px);
          }
        }
        /* Ipod Pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              width: calc(90% - 20px);
            }
          }
        }
        /* half screen */
        @media only screen and (max-width: 690px) {
          grid-template-columns: 1fr;
        }
      `}
    >
      <div
        css={`
          width: 100%;
          height: 100%;
          display: grid;
          align-items: end;
          justify-items: center;
          /* half screen */
          @media only screen and (max-width: 690px) {
            display: none;
          }
        `}
      >
        <Fade top>
          <img
            src={Auth1}
            alt="first Avatar"
            css={`
              bottom: 0;
              /* monitors */
              height: 320px;
              width: 280px;
              margin: 0;
              /* Laptops */
              @media only screen and (max-height: 769px), (max-width: 1440px) {
                @media only screen and (min-width: 1300px) {
                  height: 300px;
                  width: 240px;
                }
              }
              /* half screen */
              @media only screen and (max-width: 960px) {
                @media only screen and (min-width: 900px) {
                  height: 220px;
                  width: 180px;
                }
              }
              /* Tablet*/
              @media only screen and (max-height: 769px) {
                @media only screen and (max-width: 1025px) {
                  @media (orientation: landscape) {
                    height: 220px;
                    width: 180px;
                  }
                }
              }
              @media only screen and (max-height: 1025px) {
                @media only screen and (max-width: 769px) {
                  @media (orientation: portrait) {
                    height: 180px;
                    width: 120px;
                  }
                }
              }
              /* Ipod Pro */
              @media (width: 1024px) {
                @media (height: 1366px) {
                  @media (orientation: portrait) {
                    height: 220px;
                    width: 180px;
                  }
                }
              }
              @media only screen and (max-width: 1305px) {
                height: 190px;
                width: 140px;
              }
            `}
          />
        </Fade>
      </div>
      <div
        css={`
          display: grid;
          align-items: center;
        `}
      >
        {children}
      </div>
      <div
        css={`
          width: 100%;
          height: 100%;
          display: grid;
          align-items: end;
          justify-items: center;
          /* half screen */
          @media only screen and (max-width: 690px) {
            display: none;
          }
        `}
      >
        {' '}
        <Fade top>
          <img
            src={Auth2}
            alt="second Avatar"
            css={`
              bottom: 0;
              /* monitors */
              height: 320px;
              width: 280px;
              margin: 0;
              /* Laptops */
              @media only screen and (max-height: 769px), (max-width: 1440px) {
                @media only screen and (min-width: 1300px) {
                  height: 300px;
                  width: 240px;
                }
              }
              /* half screen */
              @media only screen and (max-width: 960px) {
                @media only screen and (min-width: 900px) {
                  height: 220px;
                  width: 180px;
                }
              }
              /* Tablet*/
              @media only screen and (max-height: 769px) {
                @media only screen and (max-width: 1025px) {
                  @media (orientation: landscape) {
                    height: 220px;
                    width: 180px;
                  }
                }
              }
              @media only screen and (max-height: 1025px) {
                @media only screen and (max-width: 769px) {
                  @media (orientation: portrait) {
                    height: 180px;
                    width: 120px;
                  }
                }
              }
              /* Ipod Pro */
              @media (width: 1024px) {
                @media (height: 1366px) {
                  @media (orientation: portrait) {
                    height: 220px;
                    width: 180px;
                  }
                }
              }
              @media only screen and (max-width: 1305px) {
                height: 190px;
                width: 140px;
              }
            `}
          />
        </Fade>
      </div>
    </div>
  )
}
