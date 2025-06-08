import Checklist from './Checklist'
import { useState } from 'react'
import { useTimer } from '../hooks/useTimer'
import { useChromeStorage } from '../hooks/useChromeStorage'

export default function Timer({onStartSession, dailyCount, settings}){

    //LOCAL STATE
    const [customMinutes, setCustomMinutes] = useState('');
    const [showCustomInput, setShowCustomInput] = useState('false')
    const [validateError, setValidationError] = useState('')

    //Handle preset session starts
    const handlePresetSession =  (minutes) => {
        onStartSession(minutes)
    }

    //Handle custom session validation and start
    const handleCustomSubmit = () => {
        const minutes = parseInt(customMinutes)

        //Validation
        if (!customMinutes.trim()){
            setValidationError('Please enter a number')
            return
        }

        if (minutes <= 0){
            setValidationError('Please enter a poistive number')
            return
        }

        if (minutes > 180){
            setValidationError('Sessions longer than 3 hours are not recommended')
            return
        }

        //Clear validation and start session
        setValidationError('')
        onStartSession(minutes)
        resetCustomInput()
    }

    //Handle Enter key in custom input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter'){
            handleCustomSubmit()
        } 
        if (e.key === 'Escape'){
            resetCustomInput()
        }
    }

    //Reset Custom input state
    const resetCustomInput = () => {
        setCustomMinutes('')
        setShowCustomInput(false)
        setValidationError('')
    }

    //Handle custom input change 
    const handleCustomChange = (e) => {
        const value = e.target.value
        //Only allow numbers
        if (value === ' ' || /^\d+$/.test(value)){
            setCustomMinutes(value)
            setValidationError('') //Clear error on valid input
        }
    }

   

    return (
        <>
            {/* Top Bar with Daily Count */}
            <div className="top-bar">
                <p>Daily Pomodoro Count: <strong>{dailyCount}</strong></p>
                <div className="top-right">
                    <button className="nav-btn">Progress</button>
                    <button className="nav-btn">Settings</button>
                </div>
            </div>

            {/* Main Session Selection */}
            <div className="work-length">
                <h1>Start Work Session</h1>

                {/* Preset Buttons */}
                <div className="preset-buttons">
                    <button className="session-btn preset-btn"
                    onClick={() => handlePresetSession(25)}>25</button>
                     <button className="session-btn preset-btn"
                    onClick={() => handlePresetSession(50)}>50</button>
                    <button className="session-btn custom-toggle-btn"
                    onClick={() => setShowCustomInput(!showCustomInput)}>
                        {showCustomInput ? 'Cancel' : 'Custom'}
                    </button>
                </div>

                {/* Custom Input Section */}
                {showCustomInput && (
                    <div className="custom-input-section">
                        <div className="custom-input-group">
                            <input 
                            type="text"
                            value={customMinutes}
                            onChange={handleCustomChange}
                            onKeyPress={handleKeyPress}
                            placeholder='Enter Minutes'
                            className={`custom-input ${validationError ? 'error' : ''}`}
                            autoFocus
                            maxLength='3'
                             />
                             <button className="session-btn start-custom-btn"
                             onClick={handleCustomSubmit}
                             disabled={!customMinutes.trim()}>
                                Start
                             </button>
                        </div>

                        
                    </div>
                )}
                
            </div>
            
            
        </>
    )
}