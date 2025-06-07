import Slider from '@mui/material/Slider'
import { useContext } from 'react'
import SettingsContext from './SettingsContext'
import BackButton from './BackButton'

export default function Settings(){

    const settingsInfo = useContext(SettingsContext)


    return (
        <div style={{textAlign:'left'}}>
            <label>Work minutes: {settingsInfo.workMinutes}</label>
            <Slider 
               value={settingsInfo.workMinutes}
               sx={{
                  borderRadius: '20px'
               }}
               onChange={(e, value) => settingsInfo.setWorkMinutes(value)}
               max={120}
               min={10}
            />
            <label>Break minutes: {settingsInfo.breakMinutes}</label>
            <Slider 
               value={settingsInfo.breakMinutes}
               sx={{
                  borderRadius: '20px'
               }}
               onChange={(e, value) => settingsInfo.setBreakMinutes(value)}
               min={5}

            />
            <div style={{textAlign:'center', marginTop:'20px'}}>
                <BackButton onClick={() => settingsInfo.setShowSettings(false)}/>

            </div>
        </div>
    )
}

// import { useState } from 'react'
// import Slider from '@mui/material/Slider'
// import Typography from '@mui/material/Typography'
// import Box from '@mui/material/Box'

// export default function PomodoroSettings() {
//   const [workMinutes, setWorkMinutes] = useState(25)
//   const [breakMinutes, setBreakMinutes] = useState(5)

//   return (
//     <Box sx={{ width: 300, padding: 2 }}>
//       <Typography gutterBottom>Work Session Length: {workMinutes} min</Typography>
//       <Slider
//         value={workMinutes}
//         onChange={(e, val) => setWorkMinutes(val)}
//         step={1}
//         min={15}
//         max={90}
//         valueLabelDisplay="auto"
//       />

//       <Typography gutterBottom sx={{ mt: 4 }}>Break Session Length: {breakMinutes} min</Typography>
//       <Slider
//         value={breakMinutes}
//         onChange={(e, val) => setBreakMinutes(val)}
//         step={1}
//         min={5}
//         max={30}
//         valueLabelDisplay="auto"
//       />
//     </Box>
//   )
// }