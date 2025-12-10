'use client'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillHome } from 'react-icons/ai'
import { HiFire } from 'react-icons/hi'
import { SiYoutubegaming } from 'react-icons/si'
import { CgPlayListAdd } from 'react-icons/cg'
import { RiLeafLine } from 'react-icons/ri'
import { useAppContext } from '@/context/AppContext'

const SidebarContainer = styled.div`
  width: 250px;
  height: calc(100vh - 60px);
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 60px;
  flex-shrink: 0;
  border-right: 1px solid ${props => props.theme.isDarkTheme ? '#333' : '#e5e5e5'};
  
  @media (max-width: 768px) {
    display: none; 
  }
`

const NavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`

const NavItem = styled.li`
  background-color: ${props => props.$isActive ? (props.theme.isDarkTheme ? '#383838' : '#e2e8f0') : 'transparent'};
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  text-decoration: none;
  color: ${props => props.$isActive ? props.theme.colors.text : props.theme.colors.textSecondary};
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
  
  &:hover {
    background-color: ${props => props.theme.isDarkTheme ? '#383838' : '#f1f5f9'};
    color: ${props => props.theme.colors.text};
  }
`

const IconWrapper = styled.span`
  margin-right: 15px;
  font-size: 20px;
  color: ${props => props.$isActive ? '#ff0000' : props.theme.colors.textSecondary};
`

const Footer = styled.div`
  padding: 20px;
  color: ${props => props.theme.colors.text};
`

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`

const SocialIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

const StreakContainer = styled.div`
  margin: 20px;
  padding: 15px;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  border-radius: 12px;
  color: white;
  text-align: center;
`

const StreakCount = styled.div`
  font-size: 24px;
  font-weight: bold;
`

const StreakLabel = styled.div`
  font-size: 12px;
  opacity: 0.9;
`

export default function Sidebar() {
  const pathname = usePathname()
  const { isDarkTheme } = useAppContext()

  const links = [
    { id: 'HOME', path: '/', label: 'Home', icon: AiFillHome },
    { id: 'TRENDING', path: '/trending', label: 'Trending', icon: HiFire },
    { id: 'GAMING', path: '/gaming', label: 'Gaming', icon: SiYoutubegaming },
    { id: 'SAVED', path: '/saved-videos', label: 'Saved Videos', icon: CgPlayListAdd },
    { id: 'CALM', path: '/calm', label: 'Calm Corner', icon: RiLeafLine },
  ]

  return (
    <SidebarContainer>
      <div>
        <NavLinks>
          {links.map(link => {
            const isActive = pathname === link.path
            return (
              <NavItem key={link.id} $isActive={isActive}>
                <StyledLink href={link.path} $isActive={isActive}>
                  <IconWrapper $isActive={isActive}>
                    <link.icon />
                  </IconWrapper>
                  {link.label}
                </StyledLink>
              </NavItem>
            )
          })}
        </NavLinks>
        
        <StreakContainer>
          <StreakCount>🔥 12</StreakCount>
          <StreakLabel>Day Learning Streak</StreakLabel>
        </StreakContainer>
      </div>
      
      <Footer>
        <p style={{fontWeight: 'bold', marginBottom: '10px'}}>CONTACT US</p>
        <SocialIcons>
          <SocialIcon src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" alt="facebook logo" />
          <SocialIcon src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" alt="twitter logo" />
          <SocialIcon src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png" alt="linked in logo" />
        </SocialIcons>
        <p style={{fontSize: '14px', lineHeight: '1.5'}}>Enjoy! Now to see your channels and recommendations!</p>
      </Footer>
    </SidebarContainer>
  )
}
