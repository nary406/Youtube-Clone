'use client'
import styled from 'styled-components'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'

const VideoCardContainer = styled(Link)`
  text-decoration: none;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.2s;
  position: relative;

  &:hover {
    transform: scale(1.05);
    z-index: 10;
  }
`

const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
`

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  color: white;
  
  ${VideoCardContainer}:hover & {
    opacity: 1;
  }
`

const PreviewText = styled.p`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
`

const Stats = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;
`

const VideoDetails = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ChannelName = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`

const MetaData = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 2px;
`

const Dot = styled.span`
  width: 3px;
  height: 3px;
  background-color: ${props => props.theme.colors.textSecondary};
  border-radius: 50%;
`

export default function VideoCard({ video }) {
  const { id, title, thumbnail_url, channel, view_count, published_at } = video
  const { name, profile_image_url } = channel

  let date = published_at
  try {
     const parsedDate = new Date(published_at)
     if (!isNaN(parsedDate)) {
       date = formatDistanceToNow(parsedDate, { addSuffix: true })
     }
  } catch (e) {}

  return (
    <VideoCardContainer href={`/videos/${id}`}>
      <ThumbnailContainer>
        <Thumbnail src={thumbnail_url} alt="video thumbnail" />
        <HoverOverlay>
          <PreviewText>▶ Click to Watch</PreviewText>
          <Stats>
            <span>🔥 92% Liked</span>
            <span>👀 {view_count}</span>
          </Stats>
        </HoverOverlay>
      </ThumbnailContainer>
      
      <VideoDetails>
        <ChannelImage src={profile_image_url} alt="channel logo" />
        <TextContent>
          <Title>{title}</Title>
          <ChannelName>{name}</ChannelName>
          <MetaData>
            <span>{view_count} views</span>
            <Dot />
            <span>{date}</span>
          </MetaData>
        </TextContent>
      </VideoDetails>
    </VideoCardContainer>
  )
}
