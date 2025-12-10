import {Link, withRouter} from 'react-router-dom'

import {BsMoon} from 'react-icons/bs'

import {FiSun} from 'react-icons/fi'
import {IoIosLogOut} from 'react-icons/io'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import Popup from 'reactjs-popup'

import './index.css'

import {
  NavHeader,
  Img,
  ContentContainer,
  IconLogButton,
  LogoutButton,
  ThemeButton,
  WebsiteLogo,
  ModalContainer,
  CloseButton,
  AlignRow,
  ConfirmButton,
  ModalDesc,
  AlignColumn,
  ContentListItem,
} from './styledComponents'

import CartContext from '../../context/CartContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {onChangeTheme, onChangeSideBar, isDarkTheme} = value

        const onClickChangeTheme = () => {
          onChangeTheme()
        }

        const onChangeside = () => {
          onChangeSideBar()
        }

        const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'

        const textColor = isDarkTheme ? '#f9f9f9' : '#181818'

        const websiteLogo = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        return (
          <NavHeader bgColor={bgColor}>
            <Link to="/">
              <WebsiteLogo src={websiteLogo} alt="website logo" />
            </Link>
            <ContentContainer>
              <ContentListItem>
                <ThemeButton
                  onClick={onClickChangeTheme}
                  data-testid="theme"
                  color={textColor}
                >
                  {isDarkTheme ? (
                    <FiSun style={{width: '30px', height: '30px'}} />
                  ) : (
                    <BsMoon style={{width: '30px', height: '30px'}} />
                  )}
                </ThemeButton>
              </ContentListItem>

              <ContentListItem>
                <Img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="image_Tag"
                />
                <IconLogButton onClick={onChangeside} color={textColor}>
                  <GiHamburgerMenu style={{width: '30px', height: '30px'}} />
                </IconLogButton>
              </ContentListItem>

              <ContentListItem>
                <Popup
                  modal
                  trigger={
                    <div>
                      <LogoutButton type="button" data-testid="iconButton">
                        Logout
                      </LogoutButton>
                      <IconLogButton
                        color={textColor}
                        type="button"
                        data-testid="iconButton"
                      >
                        <IoIosLogOut style={{width: '30px', height: '30px'}} />
                      </IconLogButton>
                    </div>
                  }
                  className="popup-content"
                >
                  {close => (
                    <ModalContainer>
                      <AlignColumn>
                        <ModalDesc>Are you sure, you want to logout</ModalDesc>
                        <AlignRow>
                          <CloseButton
                            type="button"
                            data-testid="closeButton"
                            onClick={() => close()}
                          >
                            Cancel
                          </CloseButton>

                          <ConfirmButton type="button" onClick={onClickLogout}>
                            Confirm
                          </ConfirmButton>
                        </AlignRow>
                      </AlignColumn>
                    </ModalContainer>
                  )}
                </Popup>
              </ContentListItem>
            </ContentContainer>
          </NavHeader>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
