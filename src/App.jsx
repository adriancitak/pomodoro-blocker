import Timer from './components/Timer'
import ActiveTimer from './components/ActiveTimer'
import { useState } from 'react'
import { useDailyReset } from './hooks/useDailyReset'
import { useChromeStorage } from './hooks/useChromeStorage'


export default function App(){

// SESSION MANAGEMENT
  const [currentSession, setCurrentSession] = useState(null)
  //Structure: {startTime: number, duration: number, type: 'work' | 'break'}

  const [sessionFlow, setSessionFlow] = useState('work')
  //Values : 'work' | 'break-selection' | 'break'


  //DAILY DATA (resets at midnight)
  const [dailyStats, setDailyStats] = useState({
    date: new Date().toDateString(),
    completedSessions: 0,
    totalWorkTime: 0, //minutes
    totalBreakTime:0, //minutes
    sessionsHistory: [] //array of completed sessions

  })

  
//USER TASKS
  const [dailyTasks, setDailyTasks] = useState([
    {id: '1', text: '', completed: false},
    {id: '2', text: '', completed: false},
    {id: '3', text: '', completed: false}
  ])


//SETTINGS AND PREFERENCES
  const [settings, setSettings] = useState({
    blockedSites: [],
    autoStartBreaks: false,
    notifications: true,
    defaultWorkDuration: 25,
    defaultBreakDuration: 5
  })

//UI STATE
  const [currentView, setCurrentView] = useState('timer')
  //Values: 'timer' | 'progress' | 'settings'

//DAILY RESET TRACKING
  const [lastResetDate, setLastResetDate] = useState(new Date().toDateString())

  return (
    <>
      <Timer />
    </>

  )
}