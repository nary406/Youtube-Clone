'use client'
import styled from 'styled-components'
import { IoMdClose } from 'react-icons/io'

const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  height: 200px;
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  border-radius: 12px; // Modern touch
`

const BannerContent = styled.div`
  width: 60%;
  max-width: 400px;
`

const Logo = styled.img`
  width: 140px;
  margin-bottom: 20px;
`

const Text = styled.p`
  font-size: 20px;
  color: #1e293b;
  margin-bottom: 25px;
  font-weight: 500;
  line-height: 1.5;
`

const Button = styled.button`
  padding: 12px 24px;
  border: 1px solid #1e293b;
  background: transparent;
  color: #1e293b;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: rgba(0,0,0,0.05);
  }
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #1e293b;
  opacity: 0.6;
  
  &:hover {
    opacity: 1;
  }
`

export default function Banner({ onClose }) {
  return (
    <BannerContainer data-testid="banner">
      <BannerContent>
        <Logo src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="nxt watch logo" />
        <Text>Buy Nxt Watch Premium prepaid plans with UPI</Text>
        <Button>GET IT NOW</Button>
      </BannerContent>
      <CloseButton onClick={onClose} data-testid="close">
        <IoMdClose />
      </CloseButton>
    </BannerContainer>
  )
}
