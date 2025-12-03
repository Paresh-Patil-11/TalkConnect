import React from 'react'
import Sidebar from './components/Sidebar/SideBar.jsx'
import Main from './components/Main/Main.jsx'

const App = () => {
  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-dark via-darker to-slate-700">
      <Sidebar />
      <Main />
    </div>
  )
}

export default App
