'use client'
import styled from 'styled-components'
import { FaMoon, FaSun } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { useAppContext } from '@/context/AppContext'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import Popup from 'reactjs-popup'

const HeaderContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background-color: ${props => props.theme.colors.background};
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`

const Logo = styled.img`
  width: 120px;
  cursor: pointer;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
`

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`

const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.text === '#f9f9f9' ? '#f9f9f9' : '#3b82f6'};
  color: ${props => props.theme.colors.text === '#f9f9f9' ? '#f9f9f9' : '#3b82f6'};
  padding: 5px 15px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.text === '#f9f9f9' ? '#f9f9f9' : '#3b82f6'};
    color: ${props => props.theme.colors.background};
  }
`

const PopupContainer = styled.div`
  background-color: ${props => props.theme.colors.secondaryBackground};
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  border: 1px solid ${props => props.theme.colors.text};
`

const PopupButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid grey;
  background: ${props => props.primary ? '#3b82f6' : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.text};
`

export default function Header() {
  const { isDarkTheme, toggleTheme } = useAppContext()
  const router = useRouter()

  const onLogout = () => {
    Cookies.remove('jwt_token')
    router.replace('/login')
  }

  const logoUrl = isDarkTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  return (
    <HeaderContainer>
      <Link href="/">
        <Logo src={logoUrl} alt="website logo" />
      </Link>
      
      <Actions>
        <IconButton onClick={toggleTheme} data-testid="theme">
          {isDarkTheme ? <FaSun /> : <FaMoon />}
        </IconButton>
        
        <ProfileImage 
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" 
          alt="profile" 
        />
        
        <Popup
          trigger={<LogoutButton>Logout</LogoutButton>}
          modal
          nested
        >
          {close => (
            <PopupContainer>
              <p style={{color: isDarkTheme ? 'white' : 'black'}}>Are you sure, you want to logout?</p>
              <PopupButtons>
                <Button onClick={() => close()}>Cancel</Button>
                <Button primary onClick={onLogout}>Confirm</Button>
              </PopupButtons>
            </PopupContainer>
          )}
        </Popup>
      </Actions>
    </HeaderContainer>
  )
}
