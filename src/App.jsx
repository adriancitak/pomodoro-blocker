import Timer from './components/Timer'
import ActiveTimer from './components/ActiveTimer'
import Checklist from './Components/Checklist'
import { useState, useEffect } from 'react'
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

//DAILY RESET CHECK (runs on app load)
useEffect(() => {
  const checkDailyReset = () => {
    const today = new Date().toDateString()
    
    if (dailyStats.date !== today) {
      console.log('New day detected, resetting daily stats')
      setDailyStats({
        date: today,
        completedSessions: 0,
        totalWorkTime: 0,
        totalBreakTime: 0,
        sessionsHistory: []
      })
    }
  }

  checkDailyReset()
}, []) // Run once on mount

//SESSION MANAGEMENT FUNCTIONS
const startWorkSession = (minutes) => {
  const session = {
    startTime: Date.now(),
    duration: minutes * 60 * 1000,
    type: 'work'
  }
  
  console.log(`Starting ${minutes}-minute work session`)
  setCurrentSession(session)
  setSessionFlow('work')

  //TODO:Enable website blocking here
  //TODO: Show notification
}

const startBreakSession = (minutes) => {
  const session = {
    startTime: Date.now(),
    duration: minutes * 60 * 1000,
    type: 'break'
  }

  console.log(`Starting ${minutes}-minute break session`)
  setCurrentSession(session)
  setSessionFlow('break')
}

const completeSession = () => {
  if (!currentSession) return
  
  const sessionDurationMinutes = currentSession.duration / (60 * 1000)

  if (currentSession.type === 'work'){
    //WOrk session completed - update stats and offer break
    console.log('Work session completed')

    setDailyStats(prev => ({
      ...prev,
      completedSessions: prev.completedSessions + 1,
      totalWorkTime: prev.totalWorkTime + sessionDurationMinutes,
      sessionsHistory: [...prev.sessionsHistory, {
        ...currentSession,
        completedAt: date.now()
      }]
    }))
  } else {
    //Break session completed - back to work
    console.log('Break session completed')

    setDailyStats(prev => ({
      ...prev,
      totalBreakTime: prev.totalBreakTime + sessionDurationMinutes
    }))

    //Back to work selection
    setSessionFlow('work')

  }

  //Clear current session
  setCurrentSession(null)

  //TODO: disable website blocking
  //Todo: show completion notification

}

const skipBreak = () => {
  console.log('Break skipped, back to work')
  setSessionFlow('work')
}

//TAST MANAGEMENT

const updateTasks = (newTasks) => {
  setDailyTasks(newTasks)
  //TODO: save to chrome storage
}

//RENDER LOGIC
const renderMainContent = () => {
  switch (sessionFlow){
    case 'work':
      return (
        <Timer 
          onStartSession={startWorkSession}
          dailyCount={dailyStats.completedSessions}
          settings={settings}
      />
    )

    case 'break-selection':
      return (
        <div className="break-selection">
          <h2>🎉 Greak work! Time for a break?</h2>
          <div className="break-options">
            <button className="session-btn" 
            onClick={() => startBreakSession(5)}>5</button>
            <button className="session-btn" 
            onClick={() => startBreakSession(10)}>10</button>
            <button className="session-btn" 
            onClick={() => startBreakSession(15)}>15</button>
          </div>
          <button className="skip-break-btn" 
          onClick={skipBreak}Skip Break and Continue Working></button>
        </div>
      )

      case 'break':
        return (
          <div className="break-in-progress">
            <h2>Break Time</h2>
            <p>Enjoy your break. Walk around. Breathe. Relax.</p>
          </div>
        )
      default:
        return <Timer onStartSession={startWorkSession} dailyCount={dailyStats.completedSessions} />
  }
}



  return (
    <div className="app">
      {/* Active Timer Display (shows over everything when session is active) */}
      {currentSession && (
        <div className="active-timer-overlay">
          <div className="active-timer">
            <h3>{currentSession.type === 'work' ? '⏰ Work Session' : 'Break Time'}</h3>
            <div className="timer-display">
              {/* TODO: Replace with actual countdown */}
              <span>{Math.round(currentSession.duration / 60000)} minutes remaining</span>
            </div>
            <button className="complete-btn"
            onClick={completeSession}>Complete Session</button>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="main-content">
        {renderMainContent()}

        {/* Always show checklist except during breaks */}
        {sessionFlow !== 'break' && (
          <Checklist tasks={dailyTasks} onUpdateTasks={updateTasks} />
        )}
      </main>

      {/* Debug Info (remove in production) */}
      <div className="debug-info" style={{fontSize: '12px', color: '#666', padding: '10px'}}>
        <p>Current Flow: {sessionFlow}</p>
        <p>Active Session: {currentSession ? currentSession.type : 'None'} </p>
        <p>Daily Sessions: {dailyStats.completedSessions}</p>
      </div>

    </div>

  )
}