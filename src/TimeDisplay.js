import './TimeDisplay.css'

export const TimeDisplay = ({ remainingTime }) => {
    const getFormattedTime = function (milliseconds) {
  
      const totalSeconds = Math.round(milliseconds / 1000);
  
      const seconds = parseInt((totalSeconds % 60).toString(), 10);
      const minutes = parseInt((totalSeconds / 60).toString(), 10) % 60;
      const hours = parseInt((totalSeconds / 3600).toString(), 10);
  
      const ss = seconds < 10 ? '0' + seconds : seconds;
      const mm = minutes < 10 ? '0' + minutes : minutes;
      const hh = hours < 10 ? '0' + hours : hours;
  
      return hh + ':' + mm + ':' + ss;
    }
  
    return <div className="timer-wrapper">
      <div className='displayTime'>
        {getFormattedTime(remainingTime * 1000)}
      </div>
    </div>
  
  };
  