'use client'
import styled, { keyframes } from 'styled-components'
import Link from 'next/link'

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`

const Container = styled.div`
  padding: 0 40px 30px 40px;
`

const SectionTitle = styled.h2`
  font-size: 20px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`

const LiveBadge = styled.span`
  background-color: #ef4444;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  animation: ${pulse} 2s infinite;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`

const StreamCard = styled(Link)`
  text-decoration: none;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16/9;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.02);
    z-index: 2;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  }
`

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  padding: 20px 15px 15px 15px;
  color: white;
`

const ViewerCount = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`

const StreamTitle = styled.p`
  font-weight: bold;
  font-size: 14px;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StreamerName = styled.p`
  font-size: 12px;
  opacity: 0.8;
  margin: 0;
`

const ToxicityWarning = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`

export default function LiveSpotlight({ videos }) {
  // Stable random generator based on video ID
  const getStableRandom = (seedStr) => {
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
      hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) / 2147483647;
  }

  // Mock live data using existing videos
  const liveStreams = videos.slice(0, 4).map(v => {
    const randViewers = getStableRandom(v.id + 'viewers')
    const randToxic = getStableRandom(v.id + 'toxic')
    return {
      ...v,
      viewers: Math.floor(randViewers * 50000) + 1000,
      isToxic: randToxic > 0.8
    }
  })

  return (
    <Container>
      <SectionTitle>
        <LiveBadge>LIVE</LiveBadge> Spotlight: Top Streams Now
      </SectionTitle>
      <Grid>
        {liveStreams.map(stream => (
          <StreamCard key={stream.id} href={`/videos/${stream.id}`}>
            <Thumbnail src={stream.thumbnail_url} alt="stream thumbnail" />
            <ViewerCount>🔴 {stream.viewers.toLocaleString()}</ViewerCount>
            {stream.isToxic && <ToxicityWarning>☢️ Toxic Chat</ToxicityWarning>}
            <Overlay>
              <StreamTitle>{stream.title}</StreamTitle>
              <StreamerName>{stream.channel?.name || 'Unknown Streamer'}</StreamerName>
            </Overlay>
          </StreamCard>
        ))}
      </Grid>
    </Container>
  )
}
