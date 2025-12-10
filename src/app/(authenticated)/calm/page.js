'use client'
import styled, { keyframes } from 'styled-components'
import { useState, useEffect } from 'react'

const breatheAnimation = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`

const Container = styled.div`
  min-height: 100%;
  background: linear-gradient(to bottom, #e0f2f1, #80cbc4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #004d40;
  text-align: center;
`

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin: 40px 0;
  animation: ${breatheAnimation} 8s infinite ease-in-out;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
`

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 10px;
`

const Subtitle = styled.p`
  font-size: 18px;
  max-width: 600px;
  line-height: 1.6;
`

const AudioControl = styled.button`
  margin-top: 30px;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #00695c;
  color: white;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background-color: #004d40;
  }
`

export default function CalmCorner() {
  const [text, setText] = useState('Breathe In')

  useEffect(() => {
    const interval = setInterval(() => {
      setText(prev => prev === 'Breathe In' ? 'Breathe Out' : 'Breathe In')
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Container>
      <Title>Calm Corner 🍃</Title>
      <Subtitle>Take a break from the noise. No autoplay. No distractions. Just you and your breath.</Subtitle>
      
      <Circle>
        {text}
      </Circle>
      
      <p>Ambient sounds playing...</p>
      <AudioControl>Mute Sound</AudioControl>
    </Container>
  )
}
