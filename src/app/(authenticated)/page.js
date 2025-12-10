'use client'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { AiOutlineSearch } from 'react-icons/ai'
import { ThreeDots } from 'react-loader-spinner'
import Banner from '@/components/Banner'
import VideoCard from '@/components/VideoCard'
import MoodSelector from '@/components/MoodSelector'
import CategoryBar from '@/components/CategoryBar'
import CreatorSpotlight from '@/components/CreatorSpotlight'
import FriendsActivity from '@/components/FriendsActivity'
import { useAppContext } from '@/context/AppContext'

const HomeContainer = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.colors.background};
  min-height: 100%;
`

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: ${props => props.theme.colors.background};
  z-index: 10;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.isDarkTheme ? '#333' : '#eee'};
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  border: 1px solid ${props => props.theme.isDarkTheme ? '#444' : '#ccc'};
  border-radius: 20px;
  padding: 0 15px;
  margin-bottom: 20px;
  background-color: ${props => props.theme.colors.background};
  overflow: hidden;
`

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
  background: transparent;
  color: ${props => props.theme.colors.text};
  font-size: 16px;
`

const SearchButton = styled.button`
  background: ${props => props.theme.isDarkTheme ? '#222' : '#f8f8f8'};
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  color: ${props => props.theme.colors.textSecondary};
  margin-right: -15px;
  border-left: 1px solid ${props => props.theme.isDarkTheme ? '#444' : '#ccc'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => props.theme.isDarkTheme ? '#333' : '#e0e0e0'};
  }
`

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`

const SectionTitle = styled.h2`
  font-size: 18px;
  color: ${props => props.theme.colors.text};
  margin: 30px 0 15px 0;
`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
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
  padding: 10px 25px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  margin-top: 10px;
`

export default function Home() {
  const [showBanner, setShowBanner] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [videos, setVideos] = useState([])
  const [apiStatus, setApiStatus] = useState('INITIAL') // INITIAL, LOADING, SUCCESS, FAILURE
  const { isDarkTheme, mood } = useAppContext()

  const getVideos = async (search = '') => {
    setApiStatus('LOADING')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${search}`
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
        // Mock filtering based on mood (random shuffle for demo)
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
  }, [mood]) // Re-fetch/shuffle when mood changes

  const onSearch = () => {
    getVideos(searchInput)
  }

  const renderVideos = () => {
    if (videos.length === 0) {
      return (
        <FailureView>
          <FailureImage src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" alt="no videos" />
          <h2 style={{color: isDarkTheme ? 'white' : 'black'}}>No Search results found</h2>
          <p style={{color: isDarkTheme ? '#aaa' : '#666'}}>Try different key words or remove search filter</p>
          <RetryButton onClick={() => getVideos(searchInput)}>Retry</RetryButton>
        </FailureView>
      )
    }
    return (
      <VideosGrid>
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </VideosGrid>
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
      <RetryButton onClick={() => getVideos(searchInput)}>Retry</RetryButton>
    </FailureView>
  )

  return (
    <HomeContainer data-testid="home">
      <StickyHeader>
        <MoodSelector />
        <CategoryBar />
      </StickyHeader>

      {showBanner && <Banner onClose={() => setShowBanner(false)} />}
      
      <CreatorSpotlight />
      <FriendsActivity />
      
      <SearchContainer>
        <SearchInput 
          type="search" 
          placeholder="Search" 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
        <SearchButton onClick={onSearch} data-testid="searchButton">
          <AiOutlineSearch size={20} />
        </SearchButton>
      </SearchContainer>

      <SectionTitle>
        {mood === 'Chill' ? 'Recommended for you' : `Top picks for ${mood} mood`}
      </SectionTitle>

      {apiStatus === 'LOADING' && (
        <LoaderContainer data-testid="loader">
          <ThreeDots color={isDarkTheme ? '#ffffff' : '#3b82f6'} height="50" width="50" />
        </LoaderContainer>
      )}

      {apiStatus === 'SUCCESS' && renderVideos()}
      {apiStatus === 'FAILURE' && renderFailure()}
    </HomeContainer>
  )
}
