

import {useState, useEffect} from 'react'

export function useTimer(session, isPaused = false){
    const [timeRemaining, setTimeRemaining] = useState(null)
    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        if (!session || isPaused) return

        const interval = setInterval(() => {
            const now = Date.now()
            const elapsed = now - session.startTime
            const remaining = session.duration - elapsed

            if (remaining <= 0){
                setTimeRemaining(0)
                setIsCompleted(true)
            } else {
                setTimeRemaining(remaining)
            }
        }, 1000)

        return () => clearInterval(interval)

    }, [session, isPaused])

    return {timeRemaining, isCompleted}
}