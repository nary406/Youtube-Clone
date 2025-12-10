'use client'
import styled from 'styled-components'
import { useAppContext } from '@/context/AppContext'

const Container = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 0 20px 0;
  overflow-x: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

const CategoryChip = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.isDarkTheme ? '#333' : '#ddd'};
  background-color: ${props => props.theme.colors.secondaryBackground};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 13px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.isDarkTheme ? '#333' : '#eee'};
    color: ${props => props.theme.colors.text};
  }
`

const categories = [
  'Watch Later-but-never-will',
  'Stuck in your head',
  'You binged this creator',
  'Underrated Gems',
  'Shorts you missed',
  'Code Tutorials',
  'Life Hacks'
]

export default function CategoryBar() {
  return (
    <Container>
      {categories.map(cat => (
        <CategoryChip key={cat}>
          {cat}
        </CategoryChip>
      ))}
    </Container>
  )
}
