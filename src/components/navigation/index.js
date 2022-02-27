import React, { useState } from 'react'
import styled from 'styled-components'
import 'styled-components/macro'
import { useSpring, animated, config } from 'react-spring'
import { useLocation } from 'react-router-dom'
import logo from 'assets/mainLogo.png'
import BurgerMenu from './BurgerMenu'
import OrganisationBar from './OrganizationBar'
import FacilityCollapseMenu, {
  SupportCollapseMenu,
  FacilityAdminCollapseMenu,
} from './CollapseMenu'

const NavigationBar = (props) => {
  const userType = JSON.parse(localStorage.getItem('session'))
  const {
    user: { role },
  } = userType

  const { pathname } = useLocation()
  const path = pathname.split('/')[1].split('/')[0]
  const [navbarOpen, setNavBarOpen] = useState(false)
  const handleNavbar = () => {
    setNavBarOpen(!navbarOpen)
  }

  const barAnimation = useSpring({
    from: { transform: 'translate3d(0, -10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  })

  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 800,
    config: config.wobbly,
  })

  return (
    <div
      css={`
        width: 250px;
        height: 100%;
        @media (max-width: 1440px) {
          width: ${role === 'AdminUser' ? '250px' : '220px'};
        }
        @media (max-width: 1024px) {
          width: max-content;
          height: max-content;
        }
        @media only screen and (max-width: 1025px) {
          @media only screen and (max-height: 769px) {
            @media (orientation: landscape) {
              width: max-content;
              height: max-content;
            }
          }
        }
        /* ipad pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              width: max-content;
              height: max-content;
            }
          }
        }
        display: grid;
        justify-items: center;
        z-index: 1;
      `}
    >
      <NavBar style={barAnimation}>
        <NavContainer>
          <NavLinks style={linkAnimation} role={role}>
            <div
              css={`
                width: 100%;
                height: 100%;
                display: grid;
                place-items: center;
              `}
            >
              <img
                src={logo}
                alt="LOGO"
                css={`
                  height: ${role === 'AdminUser' ? '100px' : '110px'};
                  width: ${role === 'AdminUser' ? '120px' : '130px'};
                  @media (min-width: 1440px) {
                    height: 150px;
                    width: 180px;
                  }
                `}
              />
            </div>
            <div
              css={`
                width: 100%;
                height: max-content;
                display: grid;
                justify-items: center;
                grid-row-gap: 5px;
              `}
            >
              {props.children}
            </div>
            <div
              css={`
                height: 100%;
                width: 100%;
                align-items: end;
                display: grid;
                @media screen and (max-width: 1440px) {
                  margin-top: 20px;
                  height: ${role === 'AdminUser'
                    ? 'max-content'
                    : 'max-content'};
                }
              `}
            >
              <OrganisationBar role={role} />
            </div>
          </NavLinks>
          <BurgerWrapper>
            <BurgerMenu navbarState={navbarOpen} handleNavbar={handleNavbar} />
          </BurgerWrapper>
        </NavContainer>
      </NavBar>
      {path === 'support' && role === 'SupportAdmin' ? (
        <SupportCollapseMenu
          navbarState={navbarOpen}
          handleNavbar={handleNavbar}
        />
      ) : path === 'facility' && role === 'AdminUser' ? (
        <FacilityAdminCollapseMenu
          navbarState={navbarOpen}
          handleNavbar={handleNavbar}
        />
      ) : path === 'facility' && role === 'RegularUser' ? (
        <FacilityCollapseMenu
          navbarState={navbarOpen}
          handleNavbar={handleNavbar}
        />
      ) : (
        <p>Something went wrong with your URL</p>
      )}
    </div>
  )
}

export default NavigationBar

const NavBar = styled(animated.nav)`
  width: 100%;
  z-index: 1;
  display: grid;
  justify-items: center;
  background: rgb(139, 73, 241);
  box-shadow: 10px 0px 26px -6px rgba(189, 187, 189, 1);
  background: linear-gradient(
    180deg,
    rgba(139, 73, 241, 1) 0%,
    rgba(101, 87, 245, 1) 100%
  );
  @media (max-width: 1025px) {
    border-radius: 5px;
  }
  @media only screen and (max-width: 1025px) {
    @media only screen and (max-height: 769px) {
      @media (orientation: landscape) {
        border-radius: 5px;
      }
    }
  }
  /* ipad pro */
  @media (width: 1024px) {
    @media (height: 1366px) {
      @media (orientation: portrait) {
        border-radius: 5px;
      }
    }
  } ;
`

const NavContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  width: calc(100% - 20px);
  height: 100%;
`

function NavLinks({ children, style, role }) {
  return (
    <animated.div
      style={style}
      css={`
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        padding: 10px;
        display: grid;
        justify-items: center;
        grid-template-rows: ${role === 'AdminUser'
          ? '120px 1fr max-content'
          : '170px 1fr max-content'};
        transition: left 1s ease-out;
        @media (min-width: 1440px) {
          grid-template-rows: 170px 1fr 176px;
        }

        @media (max-width: 1025px) {
          display: none;
        }
        @media only screen and (max-width: 1025px) {
          @media only screen and (max-height: 769px) {
            @media (orientation: landscape) {
              display: none;
            }
          }
        }

        /* ipad pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              display: none;
            }
          }
        }
      `}
    >
      {children}
    </animated.div>
  )
}

const BurgerWrapper = styled.div`
  @media only screen and (min-width: 1025px) {
    @media only screen and (min-height: 769px) {
      @media (orientation: landscape) {
        display: none;
      }
    }
  }
  /* Ipod pro */
  @media (width: 1024px) {
    @media (height: 1366px) {
      @media (orientation: portrait) {
        display: visible;
      }
    }
  }
`
