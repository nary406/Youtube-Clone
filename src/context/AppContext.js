'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

const AppContext = createContext({
  isDarkTheme: false,
  savedVideos: [],
  activeTab: 'HOME',
  isSidebarOpen: false,
  toggleTheme: () => {},
  toggleSidebar: () => {},
  changeActiveTab: () => {},
  addToSavedVideos: () => {},
  removeFromSavedVideos: () => {},
})

export function AppProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true) // Default to Dark Mode for "Premium" feel
  const [savedVideos, setSavedVideos] = useState([])
  const [activeTab, setActiveTab] = useState('HOME')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mood, setMood] = useState('Chill')

  const toggleTheme = () => setIsDarkTheme(prev => !prev)
  
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)
  
  const changeActiveTab = (tab) => setActiveTab(tab)
  
  const changeMood = (newMood) => setMood(newMood)
  
  const addToSavedVideos = (video) => {
    if (!savedVideos.find(v => v.id === video.id)) {
      setSavedVideos(prev => [...prev, video])
    }
  }
  
  const removeFromSavedVideos = (id) => {
    setSavedVideos(prev => prev.filter(v => v.id !== id))
  }

  return (
    <AppContext.Provider value={{
      isDarkTheme,
      savedVideos,
      activeTab,
      isSidebarOpen,
      mood,
      toggleTheme,
      toggleSidebar,
      changeActiveTab,
      changeMood,
      addToSavedVideos,
      removeFromSavedVideos
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
