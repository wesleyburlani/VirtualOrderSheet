import React from 'react'
import { Link } from 'react-router-dom'

export default () => {

  return (
    <ul>
      <li>
        <Link to="/clients">Lista de clientes</Link>
      </li>
      <li>
        <Link to="/products">Lista de produtos</Link>
      </li>
      <li>
        <Link to="/orders">Lista de comandas</Link>
      </li>
    </ul>
  )
}