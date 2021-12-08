import orangePlayButton from './assets/orangeplaybutton.png'
import orangePauseButton from './assets/orangepausebutton.png'

export const PlayButton = ({playing, onClick}) => {
    return <img src={playing ? orangePauseButton : orangePlayButton} onClick={onClick}/>
}