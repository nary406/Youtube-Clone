'use client'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${props => props.isDarkTheme ? '#0f0f0f' : '#f9f9f9'};
    color: ${props => props.isDarkTheme ? '#f9f9f9' : '#0f0f0f'};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;
  }
`
export default GlobalStyle
