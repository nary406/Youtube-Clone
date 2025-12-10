'use client'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  padding: 0 40px;
  overflow-x: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

const Tab = styled.button`
  padding: 10px 20px;
  border-radius: 25px;
  border: 1px solid ${props => props.$active ? 'transparent' : (props.theme.isDarkTheme ? '#444' : '#ccc')};
  background: ${props => props.$active ? 'linear-gradient(90deg, #ff8a00, #e52e71)' : 'transparent'};
  color: ${props => props.$active ? 'white' : props.theme.colors.text};
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.$active ? 'transparent' : props.theme.colors.text};
  }
`

const tabs = [
  'Exploding Now 💥',
  'Rising Today 📈',
  'Weekly Monsters 👹',
  'Slow Burn Classics 🐢',
  'Hidden Gems 💎'
]

export default function TrendingTabs({ activeTab, onTabChange }) {
  return (
    <Container>
      {tabs.map(tab => (
        <Tab 
          key={tab} 
          $active={activeTab === tab}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </Tab>
      ))}
    </Container>
  )
}
