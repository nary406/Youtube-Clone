import React from 'react'

const CartContext = React.createContext({
  isDarkTheme: false,
  savedVideos: [],
  addToSaveVideos: () => {},
  activeTabItem: () => {},
  activeTab: '',
  sideBar: false,
  onChangeSideBar: () => {},
  onChangeTheme: () => {},
  removeSaveVideos: () => {},
})

export default CartContext
