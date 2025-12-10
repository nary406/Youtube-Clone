'use client'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 40px 20px 40px;
  overflow-x: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

const FilterChip = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.$active ? '#a855f7' : (props.theme.isDarkTheme ? '#333' : '#ddd')};
  background-color: ${props => props.$active ? 'rgba(168, 85, 247, 0.2)' : props.theme.colors.secondaryBackground};
  color: ${props => props.$active ? '#a855f7' : props.theme.colors.textSecondary};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #a855f7;
    color: #a855f7;
  }
`

const genres = [
  'All Games', 'FPS', 'RPG', 'MOBA', 'Horror', 'Sports', 'Indie', 'Strategy', 'Racing'
]

export default function GameFilterBar({ activeFilter, onFilterChange }) {
  return (
    <Container>
      {genres.map(genre => (
        <FilterChip 
          key={genre} 
          $active={activeFilter === genre}
          onClick={() => onFilterChange(genre)}
        >
          {genre}
        </FilterChip>
      ))}
    </Container>
  )
}
