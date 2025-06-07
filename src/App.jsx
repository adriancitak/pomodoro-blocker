import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Timer from './Timer'
import './App.css'
import Settings from './Settings'
import SettingsContext from './SettingsContext'

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [workMinutes, setWorkMinutes] = useState(50)
  const [breakMinutes, setBreakMinutes] = useState(10)

  return (

    <main>
        <SettingsContext.Provider value={{
          showSettings,
          setShowSettings,
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes
        }}>
            {showSettings ? <Settings /> : <Timer />}
        </SettingsContext.Provider>
        
        
    </main>
  )
   
      
  
}

export default App
