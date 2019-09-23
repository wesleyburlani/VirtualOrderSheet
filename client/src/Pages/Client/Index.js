import React, { useState, useEffect } from 'react'
import { Table, PageHeader, Icon , Divider, Button , Tooltip, Popconfirm, message } from 'antd'
import useReactRouter from 'use-react-router'
import axios from 'axios'
import ClientModal from './ClientModal'
import ShowModal from './ShowModal'

export default () => {
  const { history } = useReactRouter()
  const [client_modal, setClientModal] = useState({})
  const [show_modal, setShowModal] = useState({})
  const [clients, setClients] = useState(null)

  const getClients = () => {
    axios.get('/api/Client')
      .then(result => setClients(result.data))
  }

  useEffect(getClients, [])

  const deleteClient = cpf => {
    axios.delete(`/api/Client/${cpf}`)
      .then(() => {
        message.success('Cliente excluído com sucesso!')
        getClients()
      })
      .catch(() => message.error('Não foi possível excluir esse cliente'))
  }
  
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
      width: 130,
      render: (_, client) => (
        <div>
          <Tooltip title="Visualizar">
            <a onClick={() => setClientModal({ visible: true, client })}>
              <Icon type="eye" />
            </a>
          </Tooltip>
          <Divider type="vertical"/>
          <Tooltip title="Editar">
            <a onClick={() => setClientModal({ visible: true, client })}>
              <Icon type="edit" />
            </a>
          </Tooltip>
          <Divider type="vertical"/>
          <Tooltip title="Excluir">
            <Popconfirm
              title="Tem certeza?"
              onConfirm={() => deleteClient(client.cpf)}
              placement="left"
              okType="danger"
              okText="Excluir"
            >
              <a style={{ color: 'red' }}>
                <Icon type="delete" />
              </a>
            </Popconfirm>
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
      <ShowModal 
        {...show_modal}
        closeModal={() => setShowModal({})}
      />
    </div>
  )
} 