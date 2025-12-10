'use client'
import styled from 'styled-components'
import Link from 'next/link'

const CardContainer = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
`

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 12px;
  aspect-ratio: 3/4;
  object-fit: cover;
`

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  line-height: 1.5;
`

const ViewCount = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
`

export default function GamingVideoCard({ video }) {
  const { id, title, thumbnail_url, view_count } = video

  return (
    <CardContainer href={`/videos/${id}`}>
      <Thumbnail src={thumbnail_url} alt="video thumbnail" />
      <Title>{title}</Title>
      <ViewCount>{view_count} Watching Worldwide</ViewCount>
    </CardContainer>
  )
}
