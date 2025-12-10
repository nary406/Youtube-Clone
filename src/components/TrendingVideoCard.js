'use client'
import styled from 'styled-components'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { HiFire } from 'react-icons/hi'
import { BiTrendingUp } from 'react-icons/bi'

const CardContainer = styled(Link)`
  display: flex;
  gap: 20px;
  text-decoration: none;
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  transition: all 0.2s;
  background-color: ${props => props.theme.isDarkTheme ? '#181818' : '#fff'};
  border: 1px solid transparent;
  
  &:hover {
    transform: scale(1.01);
    background-color: ${props => props.theme.isDarkTheme ? '#202020' : '#f8f9fa'};
    border-color: ${props => props.theme.isDarkTheme ? '#333' : '#e0e0e0'};
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ThumbnailWrapper = styled.div`
  position: relative;
  min-width: 320px;
  height: 180px;
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    height: auto;
    aspect-ratio: 16/9;
  }
`

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`

const VelocityBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0,0,0,0.8);
  color: #ff8a00;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(4px);
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`

const Header = styled.div``

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  color: ${props => props.theme.colors.text};
  line-height: 1.4;
`

const ChannelName = styled.p`
  margin: 0 0 4px 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`

const MetaData = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 13px;
`

const Dot = styled.span`
  width: 3px;
  height: 3px;
  background: ${props => props.theme.colors.textSecondary};
  border-radius: 50%;
`

const TrendingContext = styled.div`
  margin-top: 12px;
  padding: 10px;
  background: ${props => props.theme.isDarkTheme ? 'rgba(255,255,255,0.05)' : '#f0f9ff'};
  border-radius: 8px;
  font-size: 13px;
  color: ${props => props.theme.colors.text};
  border-left: 3px solid #3b82f6;
`

const ContextTitle = styled.span`
  font-weight: bold;
  color: #3b82f6;
  display: block;
  margin-bottom: 4px;
  font-size: 11px;
  text-transform: uppercase;
`

const SentimentBar = styled.div`
  margin-top: 12px;
  display: flex;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
`

const SentimentSegment = styled.div`
  flex: ${props => props.value};
  background-color: ${props => props.color};
`

const SentimentLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
  margin-top: 4px;
  font-size: 10px;
  color: ${props => props.theme.colors.textSecondary};
`

export default function TrendingVideoCard({ video, rank }) {
  const { id, title, thumbnail_url, channel, view_count, published_at } = video
  const { name } = channel

  let date = published_at
  try {
     const parsedDate = new Date(published_at)
     if (!isNaN(parsedDate)) {
       date = formatDistanceToNow(parsedDate, { addSuffix: true })
     }
  } catch (e) {}

  // Stable random generator based on video ID to prevent hydration errors
  const getStableRandom = (seedStr) => {
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
      hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) / 2147483647;
  }

  const rand1 = getStableRandom(id + 'velocity')
  const rand2 = getStableRandom(id + 'loved')
  const rand3 = getStableRandom(id + 'bored')
  const rand4 = getStableRandom(id + 'annoyed')
  const rand5 = getStableRandom(id + 'reason')

  // Mock data for trending features
  const velocity = Math.floor(rand1 * 50) + 50 // 50-100
  const sentiment = {
    loved: Math.floor(rand2 * 40) + 40,
    bored: Math.floor(rand3 * 20),
    annoyed: Math.floor(rand4 * 10)
  }
  
  const reasons = [
    "Sudden spike in shares in Mumbai",
    "Mentioned by 3 big creators today",
    "Popular in Gaming community",
    "High watch-time completion rate",
    "Viral on Twitter/X right now"
  ]
  const randomReason = reasons[Math.floor(rand5 * reasons.length)]

  return (
    <CardContainer href={`/videos/${id}`}>
      <ThumbnailWrapper>
        <Thumbnail src={thumbnail_url} alt="video thumbnail" />
        <VelocityBadge>
          <HiFire /> {velocity} m/s
        </VelocityBadge>
      </ThumbnailWrapper>
      
      <Content>
        <Header>
          <Title>#{rank} {title}</Title>
          <ChannelName>{name}</ChannelName>
          <MetaData>
            <span>{view_count} views</span>
            <Dot />
            <span>{date}</span>
          </MetaData>
        </Header>

        <TrendingContext>
          <ContextTitle>Why is this trending?</ContextTitle>
          {randomReason}
        </TrendingContext>

        <div>
          <SentimentBar>
            <SentimentSegment value={sentiment.loved} color="#10b981" />
            <SentimentSegment value={sentiment.bored} color="#94a3b8" />
            <SentimentSegment value={sentiment.annoyed} color="#ef4444" />
          </SentimentBar>
          <SentimentLabels>
            <span>😍 {sentiment.loved}%</span>
            <span>😴 {sentiment.bored}%</span>
            <span>😡 {sentiment.annoyed}%</span>
          </SentimentLabels>
        </div>
      </Content>
    </CardContainer>
  )
}
