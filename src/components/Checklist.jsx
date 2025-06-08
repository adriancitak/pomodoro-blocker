import {useState} from 'react'

export default function Checklist(){
    
    //LOCAL STATE
    const [editingTask, setEditingTask] = useState(null);
    return (
        <div>
            <p>3 Most Important Goals for the Day</p>
            <input type="text" />
        </div>
    )
}