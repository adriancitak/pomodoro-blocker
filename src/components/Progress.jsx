import {useState} from 'react'

export default function Progress(props){

    //LOCAL STATE
    const [timeRange, setTimeRange] = useState('week')
    //Values: 'day' | 'week' | 'month'

    const [chartType, setChartType] = useState('sessions')
    //Values: 'sessions' | 'time' | 'tasks'


    return (
        <>
            <h1>progress test</h1>
        </>
    )
}