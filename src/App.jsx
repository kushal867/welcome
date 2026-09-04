import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="page">
      <header className="hero">
        <h1>Hi, I'm Kushal 👋</h1>
        <p>Welcome to my simple React website.</p>
      </header>

      <main className="content">
        <section className="card">
          <h2>About</h2>
          <p>
            This is a minimal React app built with Vite, running right in
            your browser.
          </p>
        </section>

        <section className="card">
          <h2>Counter Demo</h2>
          <button className="counter" onClick={() => setCount((c) => c + 1)}>
            Clicked {count} times
          </button>
        </section>
      </main>

      <footer className="footer">
        <p>Built with React + Vite</p>
      </footer>
    </div>
  )
}

export default App
