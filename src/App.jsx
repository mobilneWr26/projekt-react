import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import { Link } from 'react-router'
import StronaGlowna from './pages/StronaGlowna'
import Wyniki from './pages/Wyniki'
import Quiz from './pages/Quiz'
import Historia from './pages/Historia'
function App() {

  return (
    <main>
      <nav>
        <Link to="/">Start</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/wyniki">Wyniki</Link>
        <Link to="/historia">Historia</Link>
      </nav>

    <Routes>
      <Route path="/" element={<StronaGlowna />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/wyniki" element={<Wyniki />} />
      <Route path="/historia" element={<Historia />} />
    </Routes>
    </main>
  );
}

export default App
