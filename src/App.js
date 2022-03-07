import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "./react-countdown-circle-timer/packages/web/src/index";
import { PlayButton } from "./PlayButton";
import bongosAlarm from './assets/bongo-djembe-percussion-loop_110bpm_A_major.wav'
import "./styles.css";
import { TimeDisplay } from "./TimeDisplay";
import { getTimes } from "./times";
import TodoList from "./todo-list/src/App";
import { Buttons } from "./Buttons";
import { usePageVisibility } from "./usePageVisibility";

export const App = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="App">
      <h1>Pipodoro</h1>
      {/* <Buttons/> */}
      <div className="wrapper">
        <PlayButton playing={isPlaying} onClick={() => setIsPlaying(!isPlaying)} />
        <Timer isPlaying={isPlaying} />
      </div>
      <TodoList />
    </div>
  );
}

const onComplete = ({alarm, timeIndex, times, numLoops, setTimeIndex, setNumLoops}) => {
  alarm.play()
  if (timeIndex === times.length - 1) {
    setTimeIndex(0)
    setNumLoops(numLoops + 1)
  } else {
    setTimeIndex(timeIndex + 1)
  }
}

const Timer = ({ isPlaying }) => {
  const times = getTimes()
  const [timeIndex, setTimeIndex] = useState(0)
  const [numLoops, setNumLoops] = useState(1)
  const [key, setKey] = useState(undefined)

  useEffect(() => {
    console.error({message: 'updating key', time: new Date().toTimeString()})
    setKey(getRandom())
  }, [timeIndex])

  const alarm = new Audio(bongosAlarm)

  console.error({timeIndex, time: new Date().toTimeString()})


  return <CountdownCircleTimer
    key={key}
    isPlaying={isPlaying}
    duration={times[timeIndex]}
    colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
    onComplete={() => onComplete({alarm, timeIndex, times, numLoops, setTimeIndex, setNumLoops})}
  >
    {({remainingTime}) => <InsideTimer {...{remainingTime, alarm, timeIndex, times, numLoops, setTimeIndex, setNumLoops}}/>}
  </CountdownCircleTimer>
}

function getRandom() {
  return crypto.randomUUID()

}

const InsideTimer = ({ remainingTime, alarm, timeIndex, times, numLoops, setTimeIndex, setNumLoops }) => {

  const isVisible = usePageVisibility()

  useEffect(() => {
    if (isVisible) {
      clearTimeout()
    } else {
      setTimeout(() => {
        onComplete({alarm, timeIndex, times, numLoops, setTimeIndex, setNumLoops})
      }, remainingTime * 1000)
    }
  }, [remainingTime, alarm, timeIndex, times, numLoops, setTimeIndex, setNumLoops, isVisible])

  return <TimeDisplay remainingTime={remainingTime} numLoops={numLoops} />
}