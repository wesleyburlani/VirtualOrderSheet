import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import axios from 'axios'

const { Option } = Select

export default props => {
  const [clients, setClients] = useState([])

  const getClients = () => {
    axios.get('/api/Client')
      .then(result => setClients(result.data))
  }

  useEffect(getClients, [])

  useEffect(() => {
    if (clients.length > 0 && !clients.find(client => client.id == props.value))
      getClients()
  }, [props.value])

  return (
    <Select
      showSearch
      placeholder="Selecione um cliente"
      style={{ width: '100%' }}
      {...props}
    >
      {clients.map(client => (
        <Option key={client.cpf} value={client.cpf}>
          {client.name}
        </Option>
      ))}
    </Select>
  )
}