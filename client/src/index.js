import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { MetalProvider } from './contexts/metalContext'
import { RobotProvider } from './contexts/robotContext'

ReactDOM.render(
  <React.StrictMode>
    <RobotProvider>
      <MetalProvider>
        <App />
      </MetalProvider>
    </RobotProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
