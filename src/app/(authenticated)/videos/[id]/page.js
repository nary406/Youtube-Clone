'use client'
import { useState, useEffect, use } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import { ThreeDots } from 'react-loader-spinner'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import { CgPlayListAdd } from 'react-icons/cg'
import { formatDistanceToNow } from 'date-fns'
import { useAppContext } from '@/context/AppContext'

const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  min-height: 100%;
  padding: 20px;
`

const VideoPlayerContainer = styled.div`
  width: 100%;
  height: 500px;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 300px;
  }
`

const Title = styled.p`
  font-size: 18px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 10px;
  font-weight: 500;
`

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`

const Actions = styled.div`
  display: flex;
  gap: 20px;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.active ? '#2563eb' : '#64748b'};
  
  &:hover {
    color: #2563eb;
  }
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.colors.textSecondary};
  margin-bottom: 20px;
  opacity: 0.3;
`

const ChannelInfo = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-start;
`

const ChannelImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`

const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const ChannelName = styled.p`
  margin: 0 0 5px 0;
  color: ${props => props.theme.colors.text};
  font-weight: bold;
`

const Subscribers = styled.p`
  margin: 0 0 15px 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 12px;
`

const Description = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  line-height: 1.6;
`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`

const FailureView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
`

const FailureImage = styled.img`
  width: 300px;
  margin-bottom: 20px;
`

const RetryButton = styled.button`
  background-color: #4f46e5;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
`

export default function VideoDetails({ params }) {
  // In Next.js 15+, params is a promise, but in 14 it's an object. 
  // Assuming 14 or standard usage. If 15, we need to await it or use `use`.
  // To be safe, let's treat it as object for now, if it fails we fix.
  // Actually, `create-next-app@latest` installs 15 usually now.
  // In Next 15, params is async.
  // So `const { id } = use(params)` is the way.
  
  const { id } = use(params)
  
  const [videoDetails, setVideoDetails] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const { addToSavedVideos, removeFromSavedVideos, savedVideos, isDarkTheme } = useAppContext()

  const isSaved = savedVideos.some(v => v.id === id)

  const getVideoDetails = async () => {
    setApiStatus('LOADING')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        setVideoDetails(data.video_details)
        setApiStatus('SUCCESS')
      } else {
        setApiStatus('FAILURE')
      }
    } catch (e) {
      setApiStatus('FAILURE')
    }
  }

  useEffect(() => {
    getVideoDetails()
  }, [id])

  const onLike = () => {
    setIsLiked(prev => !prev)
    setIsDisliked(false)
  }

  const onDislike = () => {
    setIsDisliked(prev => !prev)
    setIsLiked(false)
  }

  const onSave = () => {
    if (isSaved) {
      removeFromSavedVideos(id)
    } else {
      addToSavedVideos(videoDetails)
    }
  }

  const renderSuccess = () => {
    const { title, video_url, channel, view_count, published_at, description } = videoDetails
    const { name, profile_image_url, subscriber_count } = channel || {}

    let date = published_at
    try {
       const parsedDate = new Date(published_at)
       if (!isNaN(parsedDate)) {
         date = formatDistanceToNow(parsedDate, { addSuffix: true })
       }
    } catch (e) {}

    return (
      <>
        <VideoPlayerContainer>
          <ReactPlayer url={video_url} controls width="100%" height="100%" />
        </VideoPlayerContainer>
        
        <Title>{title}</Title>
        
        <StatsContainer>
          <div>
            <span>{view_count} views</span>
            <span style={{margin: '0 5px'}}>•</span>
            <span>{date}</span>
          </div>
          <Actions>
            <ActionButton active={isLiked} onClick={onLike}>
              <AiOutlineLike size={20} /> Like
            </ActionButton>
            <ActionButton active={isDisliked} onClick={onDislike}>
              <AiOutlineDislike size={20} /> Dislike
            </ActionButton>
            <ActionButton active={isSaved} onClick={onSave}>
              <CgPlayListAdd size={20} /> {isSaved ? 'Saved' : 'Save'}
            </ActionButton>
          </Actions>
        </StatsContainer>
        
        <Divider />
        
        <ChannelInfo>
          <ChannelImage src={profile_image_url} alt="channel logo" />
          <ChannelDetails>
            <ChannelName>{name}</ChannelName>
            <Subscribers>{subscriber_count} subscribers</Subscribers>
            <Description>{description}</Description>
          </ChannelDetails>
        </ChannelInfo>
      </>
    )
  }

  const renderFailure = () => (
    <FailureView>
      <FailureImage 
        src={isDarkTheme ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"} 
        alt="failure view" 
      />
      <h2 style={{color: isDarkTheme ? 'white' : 'black'}}>Oops! Something Went Wrong</h2>
      <p style={{color: isDarkTheme ? '#aaa' : '#666'}}>We are having some trouble to complete your request. Please try again.</p>
      <RetryButton onClick={getVideoDetails}>Retry</RetryButton>
    </FailureView>
  )

  return (
    <Container data-testid="videoItemDetails">
      {apiStatus === 'LOADING' && (
        <LoaderContainer data-testid="loader">
          <ThreeDots color={isDarkTheme ? '#ffffff' : '#3b82f6'} height="50" width="50" />
        </LoaderContainer>
      )}
      {apiStatus === 'SUCCESS' && renderSuccess()}
      {apiStatus === 'FAILURE' && renderFailure()}
    </Container>
  )
}
