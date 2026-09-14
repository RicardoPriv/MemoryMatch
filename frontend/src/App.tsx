import { useState } from 'react'
import './App.css'
import Header from './components/header'
import Analytics from './components/analytics'
import MatchBoard from './components/matchboard/matchboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <Header />
      <Analytics />
      <MatchBoard />
    </main>
  )
}

export default App
