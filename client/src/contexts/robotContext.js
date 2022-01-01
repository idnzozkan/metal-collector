import React, { useState, createContext } from 'react'

export const RobotContext = createContext()

export const RobotProvider = ({ children }) => {
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })

  return (
    <RobotContext.Provider value={{ currentPosition, setCurrentPosition }}>
      {children}
    </RobotContext.Provider>
  )
}
