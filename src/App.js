import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { PlayButton } from "./PlayButton";
import bongosAlarm from './assets/bongo-djembe-percussion-loop_110bpm_A_major.wav'
import "./styles.css";
import { TimeDisplay } from "./TimeDisplay";
import { getTimes } from "./times";
import TodoList from "./todo-list/src/App";

export const App = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="App">
      <h1>Pipodoro</h1>
      <div className="wrapper">
        <PlayButton playing={isPlaying} onClick={() => setIsPlaying(!isPlaying)} />
        <Timer isPlaying={isPlaying} />
      </div>
      <TodoList/>
    </div>
  );
}

const Timer = ({ isPlaying }) => {
  const times = getTimes()
  const [timeIndex, setTimeIndex] = useState(0)
  const [numLoops, setNumLoops] = useState(1)

  const alarm = new Audio(bongosAlarm)

  const onComplete = () => {
    alarm.play()
    if (timeIndex === times.length - 1) {
      setTimeIndex(0)
      setNumLoops(numLoops + 1)
    } else {
      setTimeIndex(timeIndex + 1)
    }
  }

  return <CountdownCircleTimer
    key={timeIndex}
    isPlaying={isPlaying}
    duration={times[timeIndex]}
    colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
    onComplete={onComplete}
  >
    {({ remainingTime }) => {
      return <TimeDisplay remainingTime={remainingTime} numLoops={numLoops} />
    }}
  </CountdownCircleTimer>
}
