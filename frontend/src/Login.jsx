import { useState } from 'react'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')

  async function enviar(url) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()

    if (!res.ok) {
      setMensaje(data.error)
      return
    }

    if (url === '/auth/login') {
      onLogin()
    } else {
      setMensaje('Usuario creado, ahora inicia sesión')
    }
  }

  // Comprueba si el mensaje es de éxito o error para el color
  const isSuccess = mensaje === 'Usuario creado, ahora inicia sesión';

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2>Iniciar sesión</h2>
        
        <div className="form-group">
          <input 
            placeholder="Usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        
        <button className="btn-primary" onClick={() => enviar('/auth/login')}>Entrar</button>
        <button className="btn-secondary" onClick={() => enviar('/auth/register')}>Registrarme</button>
        
        {mensaje && (
          <p className={`msg ${isSuccess ? 'success' : ''}`}>{mensaje}</p>
        )}
      </div>
    </div>
  )
}

export default Login
