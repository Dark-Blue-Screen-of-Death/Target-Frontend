import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NoCaptcha from './Scripts/NoCaptcha'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <div>
        <NoCaptcha />
      </div>
      
    </>
  )
}

export default App
