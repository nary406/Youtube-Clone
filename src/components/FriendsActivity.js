'use client'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
`

const Title = styled.h3`
  font-size: 18px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`

const FriendList = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

const FriendCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
`

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #3b82f6;
  padding: 2px;
  margin-bottom: 5px;
`

const Name = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
`

const Activity = styled.span`
  font-size: 10px;
  color: #3b82f6;
  font-weight: bold;
`

const friends = [
  { id: 1, name: 'Alex', activity: 'Watching', img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { id: 2, name: 'Sarah', activity: 'Liked 2m ago', img: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: 3, name: 'Mike', activity: 'Shared', img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' }, // Fixed duplicate URL issue in real app
  { id: 4, name: 'Emily', activity: 'Watching', img: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
]

export default function FriendsActivity() {
  return (
    <Container>
      <Title>Trending in your circle 👥</Title>
      <FriendList>
        {friends.map(f => (
          <FriendCard key={f.id}>
            <Avatar src={f.img} alt={f.name} />
            <Name>{f.name}</Name>
            <Activity>{f.activity}</Activity>
          </FriendCard>
        ))}
      </FriendList>
    </Container>
  )
}
