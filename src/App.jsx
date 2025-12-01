import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'

const App = () => {
  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-dark via-darker to-slate-700">
      <Sidebar />
      <Main />
    </div>
  )
}

export default App