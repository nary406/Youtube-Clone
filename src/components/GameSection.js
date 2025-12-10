'use client'
import styled from 'styled-components'
import GamingVideoCard from '@/components/GamingVideoCard'

const Container = styled.div`
  padding: 0 40px 30px 40px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`

const Title = styled.h2`
  font-size: 20px;
  color: ${props => props.theme.colors.text};
  margin: 0;
`

const ViewAll = styled.button`
  color: #3b82f6;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`

export default function GameSection({ title, videos }) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <ViewAll>View All</ViewAll>
      </Header>
      <Grid>
        {videos.map(video => (
          <GamingVideoCard key={video.id} video={video} />
        ))}
      </Grid>
    </Container>
  )
}
