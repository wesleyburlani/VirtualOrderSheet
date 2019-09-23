import React, { useState, useEffect } from 'react'
import { Table, PageHeader, Icon , Divider, Button , Tooltip } from 'antd'
import useReactRouter from 'use-react-router'
import axios from 'axios'
import ClientModal from './ClientModal'

export default () => {
  const { history } = useReactRouter()
  const [client_modal, setClientModal] = useState({})
  const [clients, setClients] = useState(null)

  const getClients = () => {
    axios.get('/api/Client')
      .then(result => setClients(result.data))
  }

  useEffect(getClients, [])
  
  const columns = [
    {
      title: 'Nome Completo',
      dataIndex: 'name',
    },
    {
      title: 'Cpf',
      dataIndex: 'cpf',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',  
    },
    {
      title: 'Ações',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, client) => (
        <div>
          <Tooltip title="Editar">
          <a onClick={() => setClientModal({ visible: true, client })}>
            <Icon type="edit" />
          </a>
          </Tooltip>
          <Divider type="vertical"/>
          <Tooltip title="Excluir">
          <a style={{ color: 'red' }}>
            <Icon type="delete" />
          </a>
          </Tooltip>
        </div>
      )
    },
  ]

  return (
    <div>
      <PageHeader
        onBack={() => history.push('/')}
        title="Lista de Clientes"
        extra={[
          <Button 
          type="primary" 
          icon="plus" 
          key="new"
          onClick={() => setClientModal({ visible: true })}
          >
            Criar cliente
          </Button>
        ]}
      />
      <Table
        loading={clients === null}
        dataSource={clients}
        columns={columns}
        rowKey={item => item.cpf}
      />
      <ClientModal 
       {...client_modal}
        closeModal={() => setClientModal({})}
        onUpdate={getClients}
      />
    </div>
  )
} 