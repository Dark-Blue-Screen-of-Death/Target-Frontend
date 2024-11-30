import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RRWebRecorder from './Scripts/RRWebRecorder'
import useDeviceFingerprint from './Scripts/ClientJSController'

function App() {
  const [count, setCount] = useState(0)

  const { fingerprint, deviceInfo } = useDeviceFingerprint();

  useEffect(() => {
    const data = fetch('http://localhost:10000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(data => {
      console.log(data)
    })
  }, []);

  return (
    <>
    <RRWebRecorder />
      <div>
    {fingerprint && <p>Fingerprint: {fingerprint}</p>}
    {deviceInfo && <p>{JSON.stringify(deviceInfo)}</p>}
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
