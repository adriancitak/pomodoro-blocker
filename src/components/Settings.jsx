import {useState} from 'react'

export default function Settings(props){
    
    //LOCAL STATE
    const [tempSettings, setTempSettings] = useState(null) //for editing
    const [newBlockedSite, setNewBlockedSite] = useState('')

    return (
        <>
            <h1>Settings test</h1>
        </>
    )
}