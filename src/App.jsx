import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import { Link } from 'react-router'
function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <nav>
        <Link to="/">Start</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/wyniki">Wyniki</Link>
        <Link to="/historia">Historia</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>🌍 CountryQuiz</h1>} />
        <Route path="/quiz" element={<h1>Quiz</h1>} />
        <Route path="/wyniki" element={<h1>Wyniki</h1>} />
        <Route path="/historia" element={<h1>Historia quizów</h1>} />
      </Routes>
    </main>
  );
}

export default App
