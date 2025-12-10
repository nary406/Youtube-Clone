'use client'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { SiYoutubegaming } from 'react-icons/si'
import { ThreeDots } from 'react-loader-spinner'
import GameFilterBar from '@/components/GameFilterBar'
import LiveSpotlight from '@/components/LiveSpotlight'
import GameSection from '@/components/GameSection'
import EsportsHub from '@/components/EsportsHub'
import GameReleaseRadar from '@/components/GameReleaseRadar'
import { useAppContext } from '@/context/AppContext'

const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  min-height: 100%;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 40px 20px 40px;
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

export default function Gaming() {
  const [videos, setVideos] = useState([])
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [activeFilter, setActiveFilter] = useState('All Games')
  const { isDarkTheme } = useAppContext()

  const getVideos = async () => {
    setApiStatus('LOADING')
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
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
        setVideos(data.videos)
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
  }, [])

  const renderSuccess = () => (
    <>
      <Header>
        <IconContainer>
          <SiYoutubegaming size={30} color="#ff0000" />
        </IconContainer>
        <Title>Gaming</Title>
      </Header>
      
      <GameFilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      
      <LiveSpotlight videos={videos} />
      
      <EsportsHub />
      
      <GameSection title="BGMI going wild 🔫" videos={videos.slice(0, 4)} />
      
      <GameReleaseRadar />
      
      <GameSection title="Minecraft still refusing to die ⛏️" videos={videos.slice(4, 8)} />
      
      <GameSection title="Level Up Your Skills 🧠" videos={videos.slice(8, 12)} />
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
    <Container data-testid="gaming">
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
