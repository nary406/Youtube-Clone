'use client'
import styled from 'styled-components'
import { useAppContext } from '@/context/AppContext'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  text-align: center;
`

const Image = styled.img`
  width: 350px;
  margin-bottom: 30px;
`

const Heading = styled.h1`
  font-size: 36px;
  margin-bottom: 15px;
`

const Desc = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 18px;
`

export default function NotFound() {
  const { isDarkTheme } = useAppContext()
  
  const imgUrl = isDarkTheme 
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

  return (
    <Container>
      <Image src={imgUrl} alt="not found" />
      <Heading>Page Not Found</Heading>
      <Desc>We are sorry, the page you requested could not be found.</Desc>
    </Container>
  )
}
