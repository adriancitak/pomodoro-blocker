import {useState} from 'react'

export default function BreakTimer(){

    //LOCAL STATE
    const [customMinutes, setCustomMinutes] = useState('')
    const [showCustomInput, setShowCustomInput] = useState('false')

    return (
        <>
            <h1>Break Timer</h1>
        </>
    )
}