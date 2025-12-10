'use client'
import styled from 'styled-components'
import { useAppContext } from '@/context/AppContext'

const Container = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px 0;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari/Webkit */
  }
`

const MoodChip = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: ${props => props.$active ? (props.theme.isDarkTheme ? '#f9f9f9' : '#0f0f0f') : (props.theme.isDarkTheme ? '#2d2d2d' : '#e5e5e5')};
  color: ${props => props.$active ? (props.theme.isDarkTheme ? '#0f0f0f' : '#f9f9f9') : props.theme.colors.text};
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$active ? (props.theme.isDarkTheme ? '#ffffff' : '#000000') : (props.theme.isDarkTheme ? '#3d3d3d' : '#d4d4d4')};
  }
`

const moods = [
  'Chill', 'Hyper', 'Study', 'Sad', 'Creative', 'Learn Fast', 'Gaming', 'Music', 'Tech'
]

export default function MoodSelector() {
  const { mood, changeMood } = useAppContext()

  return (
    <Container>
      {moods.map(m => (
        <MoodChip 
          key={m} 
          $active={mood === m} 
          onClick={() => changeMood(m)}
        >
          {m}
        </MoodChip>
      ))}
    </Container>
  )
}
