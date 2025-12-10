'use client'
import styled from 'styled-components'

const Card = styled.div`
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  border-radius: 16px;
  padding: 20px;
  color: white;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid rgba(255,255,255,0.3);
  z-index: 2;
`

const Info = styled.div`
  flex: 1;
  z-index: 2;
`

const Label = styled.span`
  background-color: rgba(0,0,0,0.3);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const Name = styled.h3`
  margin: 10px 0 5px 0;
  font-size: 20px;
`

const Bio = styled.p`
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.4;
`

const SubscribeBtn = styled.button`
  background-color: white;
  color: #6366f1;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  z-index: 2;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
`

const BackgroundPattern = styled.div`
  position: absolute;
  top: -20px;
  right: -20px;
  font-size: 150px;
  opacity: 0.1;
  transform: rotate(15deg);
`

export default function CreatorSpotlight() {
  return (
    <Card>
      <Avatar src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="creator" />
      <Info>
        <Label>Creator Spotlight</Label>
        <Name>Tech Visionary</Name>
        <Bio>Creating deep dives into the future of AI and space travel. Underrated content you shouldn't miss.</Bio>
      </Info>
      <SubscribeBtn>Subscribe</SubscribeBtn>
      <BackgroundPattern>✨</BackgroundPattern>
    </Card>
  )
}
