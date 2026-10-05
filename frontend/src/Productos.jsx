import { useState, useEffect } from 'react'

function Productos({ onLogout }) {
  const [productos, setProductos] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [editandoId, setEditandoId] = useState(null) // null = estamos creando

  // READ: traer los productos
  async function cargar() {
    const res = await fetch('/product')
    if (res.status === 401) {
      onLogout() // si la sesión se perdió, vuelve al login
      return
    }
    setProductos(await res.json())
  }

  useEffect(() => {
    cargar()
  }, [])

  // CREATE o UPDATE
  async function guardar() {
    const body = JSON.stringify({ name, price: Number(price) })
    const headers = { 'Content-Type': 'application/json' }

    if (editandoId) {
      await fetch('/product/' + editandoId, { method: 'PATCH', headers, body })
    } else {
      await fetch('/product', { method: 'POST', headers, body })
    }

    setName('')
    setPrice('')
    setEditandoId(null)
    cargar()
  }

  // prepara el formulario para editar
  function editar(p) {
    setEditandoId(p.id)
    setName(p.name)
    setPrice(p.price)
  }

  // DELETE
  async function eliminar(id) {
    await fetch('/product/' + id, { method: 'DELETE' })
    cargar()
  }

  async function salir() {
    await fetch('/auth/logout', { method: 'POST' })
    onLogout()
  }

  return (
    <div className="container">
      <div className="header-row">
        <h2>Productos</h2>
        <button className="btn-outline" onClick={salir}>Cerrar sesión</button>
      </div>

      <div className="card form-row">
        <div className="form-group">
          <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <input placeholder="Precio" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button className="btn-primary" onClick={guardar}>
          {editandoId ? 'Actualizar' : 'Crear'}
        </button>
      </div>

      <div className="table-container">
        {productos.length === 0 ? (
          <div className="empty-state">No hay productos todavía</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>
                    <div className="actions">
                      <button className="btn-warning" onClick={() => editar(p)}>Editar</button>
                      <button className="btn-danger" onClick={() => eliminar(p.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Productos
