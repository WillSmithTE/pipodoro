import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import CountdownTimer from "./countdown-timer/CountdownTimer";
import { PlayButton } from "./PlayButton";

import "./styles.css";
import { getTimes } from "./times";

export const App = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="App">
      <h1>Pipodoro</h1>
      <div className="wrapper">
        <PlayButton playing={isPlaying} onClick={() => setIsPlaying(!isPlaying)} />
        <Timer isPlaying={isPlaying} />
      </div>
    </div>
  );
}

const Timer = ({ isPlaying }) => {
  console.error({ isPlaying })
  const { workTimeSeconds, breakTimeSeconds } = getTimes();
  return <CountdownCircleTimer
    isPlaying={isPlaying}
    duration={workTimeSeconds}
    colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
    onComplete={() => [false]}
  >
    {TimeDisplay}
  </CountdownCircleTimer>
}


const TimeDisplay = ({ remainingTime }) => {
  const getFormattedTime =function (milliseconds) {

    const totalSeconds = Math.round(milliseconds / 1000);

    const seconds = parseInt((totalSeconds % 60).toString(), 10);
    const minutes = parseInt((totalSeconds / 60).toString(), 10) % 60;
    const hours = parseInt((totalSeconds / 3600).toString(), 10);

    const ss = seconds < 10 ? '0' + seconds : seconds;
    const mm = minutes < 10 ? '0' + minutes : minutes;
    const hh = hours < 10 ? '0' + hours : hours;

    return hh + ':' + mm + ':' + ss;
}

  return <div className ="timer-wrapper">
  <div className='displayTime'>
      {getFormattedTime(remainingTime*1000)}
  </div>
</div>
  return <CountdownTimer
    timeLeft={remainingTime * 1000}
  // completeCallback={this.completed}
  // tickCallback={this.tick}
  />


  if (remainingTime === 0) {
    return <div className="timer">Time's up</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};
