import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [target, setTarget] = useState({ x: null, y: null })
  const [isSent, setIsSent] = useState(false)

  const handleInput = e => {
    if (e.target.name === 'x-value') setTarget(prev => ({ ...prev, x: e.target.value }))
    if (e.target.name === 'y-value') setTarget(prev => ({ ...prev, y: e.target.value }))
  }

  const handleMoveToTarget = async () => {
    try {
      await axios.post(`http://localhost:8080/robot/move/position`, target)
    } catch (error) {
      console.log(error)
    }
  }

  const handleMove = async direction => {
    try {
      await axios.get(`http://localhost:8080/robot/move/${direction}`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getRobotPosition = async () => {
      try {
        const res = await axios.get('http://localhost:8080/robot/position')
        setPosition(res.data)
        setIsSent(true)
      } catch (error) {
        console.log(error)
      }
    }
    getRobotPosition()
    setIsSent(false)
  }, [])

  return (
    <div>
      <div className="controller-container">
        <div className="buttons-wrapper">
          <button onClick={() => handleMove('left')}>LEFT</button>
          <button onClick={() => handleMove('right')}>RIGHT</button>
          <button onClick={() => handleMove('forward')}>FORWARD</button>
          <button onClick={() => handleMove('backward')}>BACKWARD</button>
          <button onClick={() => handleMove('left-forward')}>LEFT-FORWARD</button>
          <button onClick={() => handleMove('right-forward')}>RIGHT-FORWARD</button>
          <button onClick={() => handleMove('left-backward')}>LEFT-BACKWARD</button>
          <button onClick={() => handleMove('right-backward')}>RIGHT-BACKWARD</button>
        </div>
        <div className="specific-position-entering-area">
          <input
            type="number"
            placeholder="X Value"
            name="x-value"
            onChange={e => handleInput(e)}
          />
          <input
            type="number"
            placeholder="Y Value"
            name="y-value"
            onChange={e => handleInput(e)}
          />
          <button onClick={handleMoveToTarget}>Move</button>
        </div>
        <div className="position">
          <p>
            Robot Position: X = {position.x ? position.x : 0}, Y = {position.y ? position.y : 0}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
