'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import { useAppContext } from '@/context/AppContext'

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  transition: background-color 0.3s ease;
`

const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.colors.secondaryBackground};
  width: 100%;
  max-width: 400px;
  transition: background-color 0.3s ease;
`

const Logo = styled.img`
  width: 140px;
  align-self: center;
  margin-bottom: 30px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 5px;
  text-transform: uppercase;
`

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid ${props => props.theme.isDarkTheme ? '#444' : '#e2e8f0'};
  border-radius: 6px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
  }
`

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const Checkbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
`

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
`

const LoginButton = styled.button`
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 12px;
  margin-top: 5px;
`

export default function LoginPage() {
  const [username, setUsername] = useState('Narendra')
  const [password, setPassword] = useState('Vemulanarendra')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()
  const { isDarkTheme } = useAppContext()

  useEffect(() => {
    const token = Cookies.get('jwt_token')
    if (token) {
      router.replace('/')
    }
  }, [router])

  const onSubmit = async (e) => {
    e.preventDefault()
    const userDetails = { username:'rahul', password:'rahul@2021' }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, { expires: 30 })
        router.replace('/')
      } else {
        setErrorMsg(data.error_msg)
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  const logoUrl = isDarkTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  return (
    <LoginContainer>
      <FormCard onSubmit={onSubmit}>
        <Logo src={logoUrl} alt="website logo" />
        
        <InputGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>

        <CheckboxGroup>
          <Checkbox
            id="showPass"
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <CheckboxLabel htmlFor="showPass">Show Password</CheckboxLabel>
        </CheckboxGroup>

        <LoginButton type="submit">Login</LoginButton>
        {errorMsg && <ErrorMessage>*{errorMsg}</ErrorMessage>}
      </FormCard>
    </LoginContainer>
  )
}
