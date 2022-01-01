import React, { useState, createContext } from 'react'

export const MetalContext = createContext()

export const MetalProvider = ({ children }) => {
  const [detectedMetals, setDetectedMetals] = useState([])
  const [selectedMetal, setSelectedMetal] = useState(null)

  return (
    <MetalContext.Provider
      value={{ detectedMetals, setDetectedMetals, selectedMetal, setSelectedMetal }}
    >
      {children}
    </MetalContext.Provider>
  )
}
