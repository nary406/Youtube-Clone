'use client'
import styled from 'styled-components'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`

const MainBody = styled.div`
  display: flex;
  flex: 1;
`

const ContentContainer = styled.div`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  overflow-y: auto;
  height: calc(100vh - 60px);
  
  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

export default function AuthenticatedLayout({ children }) {
  return (
    <AppContainer>
      <Header />
      <MainBody>
        <Sidebar />
        <ContentContainer>
          {children}
        </ContentContainer>
      </MainBody>
    </AppContainer>
  )
}
