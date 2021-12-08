import orangePlayButton from './assets/orangeplaybutton.png'
import orangePauseButton from './assets/orangepausebutton.png'

export const PlayButton = ({playing, onClick}) => {
    return <img style={{width: '200px', padding: '10px'}}
    alt='play/pause' src={playing ? orangePauseButton : orangePlayButton} onClick={onClick}
    />
}