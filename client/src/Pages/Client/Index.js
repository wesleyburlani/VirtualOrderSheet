import React, { useState, useEffect } from 'react'
import { Table, PageHeader, Icon , Divider, Button , Tooltip } from 'antd'
import useReactRouter from 'use-react-router'
import axios from 'axios'
import ClientModal from './ClientModal'
import { api } from '../../endpoints'

export default () => {
  const { history } = useReactRouter()
  const [client_modal, setClientModal] = useState({})
  const [clients, setClients] = useState([])

  useEffect(() => {
    axios.get('/api/Client')
      .then(result => console.log(result))
  }, [])

  const dataSource = [
    {
      id: '1',
      name: 'Mike Hong',
      cpf: '212345678-89',
      phone: '(49) 8934-2356',
      email: 'mikeh@email.com',
    },
    {
      id: '2',
      name: 'John XXX',
      cpf: '342334567-89',
      phone: '(49) 8834-2245',
      email: 'johnx@email.com',
    },
  ]
  
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
      render: (_,client) => (
        <div>
          <Tooltip title="Editar">
          <a onClick={() => setClientModal({ visible: true, client_id: client.id })}>
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
        dataSource={dataSource}
        columns={columns}
      />
      <ClientModal 
       {...client_modal}
        closeModal={() => setClientModal({})}
      />
    </div>
  )
} 