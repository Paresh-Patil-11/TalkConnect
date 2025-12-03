import React from 'react'
import Sidebar from './components/SideBar/SideBar.jsx'
import Main from './components/Main/Main.jsx'

const App = () => {
  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Sidebar />
      <Main />
    </div>
  )
}

export default App
