'use client'
import styled from 'styled-components'
import { CgPlayListAdd } from 'react-icons/cg'
import VideoCardWide from '@/components/VideoCardWide'
import { useAppContext } from '@/context/AppContext'

const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  min-height: 100%;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 40px;
  background-color: ${props => props.theme.colors.secondaryBackground};
  margin-bottom: 20px;
`

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.theme.isDarkTheme ? '#0f0f0f' : '#e2e8f0'};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`

const Title = styled.h1`
  font-size: 28px;
  color: ${props => props.theme.colors.text};
  margin: 0;
`

const ListContainer = styled.div`
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const NoVideosView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
`

const Image = styled.img`
  width: 50%;
  max-width: 400px;
  margin-bottom: 30px;
`

const Heading = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 24px;
  margin-bottom: 10px;
`

const Desc = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 16px;
`

export default function SavedVideos() {
  const { savedVideos, isDarkTheme } = useAppContext()

  if (savedVideos.length === 0) {
    return (
      <NoVideosView data-testid="savedVideos">
        <Image src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" alt="no saved videos" />
        <Heading>No saved videos found</Heading>
        <Desc>You can save your videos while watching them</Desc>
      </NoVideosView>
    )
  }

  return (
    <Container data-testid="savedVideos">
      <Header>
        <IconContainer>
          <CgPlayListAdd size={30} color="#ff0000" />
        </IconContainer>
        <Title>Saved Videos</Title>
      </Header>
      <ListContainer>
        {savedVideos.map(video => (
          <VideoCardWide key={video.id} video={video} />
        ))}
      </ListContainer>
    </Container>
  )
}
