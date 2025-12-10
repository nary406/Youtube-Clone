import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  transition: display 2s;
  z-index: 0;
  scroll-margin-block: none;
  background-color: ${props => props.bgColor};
`

export const BannerImageContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  height: 150px;
  padding: 20px;
  @media screen and (max-width: 768px) {
    height: 20vh;
  }
`

export const GetItButton = styled.button`
  color: #181818;
  background-color: transparent;
  height: 30px;
  width: 100px;
  margin: 20px;
  border-color: #181818;
  border-style: solid;
  text-align: center;
`

export const BannerImage = styled.img`
  object-fit: fill;
  width: 250px;
`

export const BannerText = styled.p`
  color: #181818;
  font-family: Roboto;
`

export const HomeStickyContainer = styled.div`
  position: sticky;
  position: -webkit-sticky;
  width: 100%;
`
export const HomeSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  background-color: ${props => props.bgColor};
`

export const NavbarLargeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const ColumnAlign = styled.div`
  display: flex;
  flex-direction: column;
`

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  margin-left: 10px;
  outline: none;
  cursor: pointer;
  border-radius: 10px;
`
export const AlignRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`
export const Image = styled.img`
  width: 300px;
  margin: 20px;
`

export const Heading = styled.h1`
  color: black;
  text-align: center;
  font-size: 30px;
`

export const GetItNowButton = styled.button`
  background-color: transparent;
  border: 1px solid #181818;
  padding: 5px;
  color: #181818;
  width: 100px;
`
export const HomeDiv = styled.div`
  background-color: ${props => props.bgColor};
`
