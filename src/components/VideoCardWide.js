'use client'
import styled from 'styled-components'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

const CardContainer = styled(Link)`
  display: flex;
  gap: 20px;
  text-decoration: none;
  margin-bottom: 20px;
  width: 100%;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.01);
    background-color: ${props => props.theme.isDarkTheme ? '#1f1f1f' : '#f0f0f0'};
    border-radius: 8px;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 10px;
  }
`

const Thumbnail = styled.img`
  width: 300px;
  height: 170px;
  object-fit: cover;
  border-radius: 8px;
  
  @media (max-width: 576px) {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 0;
`

const Title = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
  color: ${props => props.theme.colors.text};
  line-height: 1.4;
`

const ChannelName = styled.p`
  margin: 0 0 8px 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`

const MetaData = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`

const Dot = styled.span`
  width: 3px;
  height: 3px;
  background: ${props => props.theme.colors.textSecondary};
  border-radius: 50%;
`

export default function VideoCardWide({ video }) {
  const { id, title, thumbnail_url, channel, view_count, published_at } = video
  const { name } = channel

  let date = published_at
  try {
     const parsedDate = new Date(published_at)
     if (!isNaN(parsedDate)) {
       date = formatDistanceToNow(parsedDate, { addSuffix: true })
     }
  } catch (e) {}

  return (
    <CardContainer href={`/videos/${id}`}>
      <Thumbnail src={thumbnail_url} alt="video thumbnail" />
      <Content>
        <Title>{title}</Title>
        <ChannelName>{name}</ChannelName>
        <MetaData>
          <span>{view_count} views</span>
          <Dot />
          <span>{date}</span>
        </MetaData>
      </Content>
    </CardContainer>
  )
}
