import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton'
import PauseButton from './PauseButton';
import SettingsButton from './SettingsButton';

export default function Timer(){

    const red = '#f54e4e'
    const green = '#4aec8c'


    return (
        <div>
            <CircularProgressbar value={90} text={'90%'} styles={buildStyles({
                textColor: '#fff',
                pathColor: red,
                tailColor: 'rgba(255,255,255,0.2)',
            })}/>
            <div style={{marginTop:'20px'}}>
                <PlayButton />
                <PauseButton />
            </div>
            <div style={{marginTop:'20px'}}>
                <SettingsButton />
            </div>

        </div>
    )
}