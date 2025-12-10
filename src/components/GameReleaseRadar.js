'use client'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0 40px 30px 40px;
`

const Title = styled.h2`
  font-size: 20px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 15px;
`

const List = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

const GameCard = styled.div`
  min-width: 200px;
  background-color: ${props => props.theme.colors.secondaryBackground};
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid ${props => props.theme.isDarkTheme ? '#333' : '#eee'};
`

const GameImage = styled.div`
  width: 60px;
  height: 60px;
  background-color: #333;
  border-radius: 12px;
  margin-bottom: 10px;
`

const GameTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 5px 0;
  color: ${props => props.theme.colors.text};
`

const ReleaseDate = styled.p`
  font-size: 12px;
  color: #a855f7;
  font-weight: bold;
  margin: 0 0 10px 0;
`

const WishlistBtn = styled.button`
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.textSecondary};
  color: ${props => props.theme.colors.text};
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.text};
    color: ${props => props.theme.colors.background};
  }
`

const games = [
  { id: 1, title: 'GTA VI', date: 'Coming 2025' },
  { id: 2, title: 'Hollow Knight: Silksong', date: 'TBA' },
  { id: 3, title: 'Elden Ring DLC', date: 'June 21' },
  { id: 4, title: 'Black Myth: Wukong', date: 'Aug 20' },
]

export default function GameReleaseRadar() {
  return (
    <Container>
      <Title>🚀 Game Release Radar</Title>
      <List>
        {games.map(g => (
          <GameCard key={g.id}>
            <GameImage />
            <GameTitle>{g.title}</GameTitle>
            <ReleaseDate>{g.date}</ReleaseDate>
            <WishlistBtn>+ Wishlist</WishlistBtn>
          </GameCard>
        ))}
      </List>
    </Container>
  )
}
