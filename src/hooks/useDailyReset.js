import {useState, useEffect} from 'react'

export function useDailyReset(){
    const [shouldReset, setShouldReset] = useState(false)

    useEffect(() => {
        const checkReset = () => {
            const today = new Date().toDateString()
            const lastReset = localStorage.getItem('lastResetDate')

            if (lastReset !== today){
                localStorage.setItem('lastResetDate', today)
                setShouldReset(true)
            }
        }

        checkReset()

    }, [])

    return shouldReset
}