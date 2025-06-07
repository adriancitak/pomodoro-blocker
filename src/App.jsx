import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Timer from './Timer'
import './App.css'
import Settings from './Settings'

function App() {
  const [showSettings, setShowSettings] = useState(false)

  return (

    <main>
        {showSettings ? <Settings /> : <Timer />}
        
        
    </main>
  )
   
      
  
}

export default App
