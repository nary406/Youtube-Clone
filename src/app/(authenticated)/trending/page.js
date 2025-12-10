'use client'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { HiFire } from 'react-icons/hi'
import { ThreeDots } from 'react-loader-spinner'
import TrendingVideoCard from '@/components/TrendingVideoCard'
import TrendingTabs from '@/components/TrendingTabs'
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
  padding: 0 40px 40px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

export default function Trending() {
  const [videos, setVideos] = useState([])
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [activeTab, setActiveTab] = useState('Exploding Now 💥')
  const { isDarkTheme } = useAppContext()

  const getVideos = async () => {
    setApiStatus('LOADING')
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        // Shuffle videos to simulate different lists for different tabs
        const shuffled = data.videos.sort(() => 0.5 - Math.random())
        setVideos(shuffled)
        setApiStatus('SUCCESS')
      } else {
        setApiStatus('FAILURE')
      }
    } catch (e) {
      setApiStatus('FAILURE')
    }
  }

  useEffect(() => {
    getVideos()
  }, [activeTab])

  const renderSuccess = () => (
    <>
      <Header>
        <IconContainer>
          <HiFire size={30} color="#ff0000" />
        </IconContainer>
        <Title>Trending</Title>
      </Header>
      
      <TrendingTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <ListContainer>
        {videos.map((video, index) => (
          <TrendingVideoCard key={video.id} video={video} rank={index + 1} />
        ))}
      </ListContainer>
    </>
  )

  const renderFailure = () => (
    <FailureView>
      <FailureImage 
        src={isDarkTheme ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"} 
        alt="failure view" 
      />
      <h2 style={{color: isDarkTheme ? 'white' : 'black'}}>Oops! Something Went Wrong</h2>
      <p style={{color: isDarkTheme ? '#aaa' : '#666'}}>We are having some trouble to complete your request. Please try again.</p>
      <RetryButton onClick={getVideos}>Retry</RetryButton>
    </FailureView>
  )

  return (
    <Container data-testid="trending">
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
