import {Component} from 'react'

import {IoMdClose} from 'react-icons/io'

import Header from '../Header'

import SearchVideos from '../SearchVideos'

import CartContext from '../../context/CartContext'

import {
  HomeContainer,
  HomeSideContainer,
  HomeDiv,
  BannerImage,
  HomeStickyContainer,
  CloseButton,
  ModalContainer,
  GetItNowButton,
  BannerImageContainer,
} from './styledComponents'

import SideBar from '../SideBar'

class HomeRoute extends Component {
  state = {showBanner: true}

  onCloseBanner = () => {
    this.setState({showBanner: false}, this.renderHomeVideos)
  }

  renderHomeVideos = () => {
    const {showBanner} = this.state

    return (
      <>
        {showBanner && (
          <BannerImageContainer data-testid="banner">
            <ModalContainer>
              <BannerImage
                src=" https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
              />
              <p>Buy Nxt Watch Premium</p>
              <GetItNowButton>GET IT NOW</GetItNowButton>
            </ModalContainer>
            <CloseButton
              type="button"
              data-testid="close"
              onClick={this.onCloseBanner}
            >
              <IoMdClose size={20} color="#231f20" />
            </CloseButton>
          </BannerImageContainer>
        )}
        <SearchVideos />
      </>
    )
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#181818' : 'white'

          return (
            <>
              <Header />
              <HomeDiv data-testid="home" bgColor={bgColor}>
                <HomeContainer bgColor={bgColor} data-testid="home">
                  <HomeStickyContainer>
                    <SideBar onChangeActiveTab={this.onChangeActiveTab} />
                  </HomeStickyContainer>
                  <HomeSideContainer bgColor={bgColor}>
                    {this.renderHomeVideos()}
                  </HomeSideContainer>
                </HomeContainer>
              </HomeDiv>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default HomeRoute
