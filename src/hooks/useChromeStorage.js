import {useState, useEffect} from 'react'

export function useChromeStorage(key, defaultValue){
    const [value, setValue] = useState(defaultValue)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        chrome.storage.local.get([key], (result) => {
            if (result[key] !== undefined){
                setValue(result[key])
            }
            setLoading(false)
        })
    }, [key])

    const updateValue = (newValue) => {
        setValue(newValue)
        chrome.storage.local.set({[key]: newValue})
    }

    return [value, updateValue, loading]
}