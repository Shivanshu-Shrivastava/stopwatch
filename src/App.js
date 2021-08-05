import React, { useState, useRef } from 'react';
import start from './svg/Play.svg'
import pause from './svg/Pause.svg'
import stop from './svg/stop.svg'
import cancel from './svg/cancel.svg'

export default function App() {
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const increment = useRef(null)

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 100)
  }

  const handlePause = () => {
    clearInterval(increment.current)
    setIsPaused(false)
  }

  const handleResume = () => {
    setIsPaused(true)
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 100)
  }

  const handleReset = () => {
    clearInterval(increment.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(0)
  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    if (getMinutes == '05'){
      handleReset()
    }

    return ` ${getMinutes} : ${getSeconds}`
  }

  return (
    <div style={{position:'absolute',left:'50%',bottom:'50%'
    ,background: '#d2cece',
    borderRadius:' 6px',
    boxShadow: 'rgb(0 0 0 / 24%) 0px 3px 8px'
    }} className="app">
      <h3>Time of Timer goes here </h3>
      <div className='stopwatch-card'>
        <p style={{fontSize:'xxx-large',textAlign:'center'}}>{formatTime()}</p>
        <div style={{display:'flex',justifyContent:'center'}} className='buttons'>
          {
            !isActive && !isPaused ?
              <span style={{cursor:'pointer',fontSize:'xx-large'}} class='material-icons' onClick={handleStart}>play_arrow</span>
              : (
                isPaused ? <span style={{cursor:'pointer',fontSize:'xx-large'}} class='material-icons' onClick={handlePause}>pause</span> :
                  <span style={{cursor:'pointer',fontSize:'xx-large'}} class='material-icons' onClick={handleResume}>replay</span>
              )
          }
          <button style={{background:'none',border:'none',cursor:'pointer',fontSize:'xx-large' }} class='material-icons' onClick={handleReset} disabled={!isActive}>stop</button>
        </div>
      </div>
    </div>
  );
}

