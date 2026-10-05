import { useState, useEffect } from 'react'
import Login from './Login'
import Productos from './Productos'

function App() {
  const [logueado, setLogueado] = useState(false)
  const [cargando, setCargando] = useState(true)

  // al abrir la página, pregunta al backend si ya hay sesión
  useEffect(() => {
    fetch('/auth/me')
      .then((res) => res.json())
      .then((data) => {
        setLogueado(data.logueado)
        setCargando(false)
      })
  }, [])

  if (cargando) return <p>Cargando...</p>
  if (!logueado) return <Login onLogin={() => setLogueado(true)} />
  return <Productos onLogout={() => setLogueado(false)} />
}

export default App
