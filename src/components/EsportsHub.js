'use client'
import styled from 'styled-components'

const Container = styled.div`
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  margin: 0 40px 30px 40px;
  padding: 20px;
  border-radius: 16px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h2`
  font-size: 22px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`

const MatchCard = styled.div`
  background: rgba(255,255,255,0.1);
  padding: 15px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(255,255,255,0.2);
  }
`

const Team = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
`

const TeamLogo = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
`

const Score = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #fbbf24;
`

const Status = styled.span`
  font-size: 12px;
  background-color: #ef4444;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 10px;
`

export default function EsportsHub() {
  return (
    <Container>
      <Header>
        <Title>🏆 Esports Hub</Title>
        <button style={{color: '#a5b4fc', fontWeight: 'bold'}}>Full Schedule &gt;</button>
      </Header>
      
      <MatchCard>
        <Team>
          <TeamLogo color="#ef4444" />
          T1
        </Team>
        <Score>2 - 1</Score>
        <Team>
          GEN.G
          <TeamLogo color="#fbbf24" />
        </Team>
        <Status>LIVE</Status>
      </MatchCard>
      
      <MatchCard>
        <Team>
          <TeamLogo color="#3b82f6" />
          Cloud9
        </Team>
        <div style={{fontSize: '14px', opacity: 0.8}}>VS</div>
        <Team>
          Fnatic
          <TeamLogo color="#f97316" />
        </Team>
        <span style={{fontSize: '12px', opacity: 0.8}}>Starts in 2h</span>
      </MatchCard>
    </Container>
  )
}
