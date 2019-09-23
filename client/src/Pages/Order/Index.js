import React, { useEffect, useState } from 'react'
import { Table, PageHeader, Button, Icon, Divider, Tooltip } from 'antd'
import useReactRouter from 'use-react-router'
import axios from 'axios'
import OrderModal from './OrderModal'

export default () => {
  const { history } = useReactRouter()
  const [order_modal, setOrderModal] = useState({})
  const [orders, setOrders] = useState(null)

  const getOrders = () => {
    axios.get('/api/Orders')
      .then(result => setOrders(result.data))
  }

  useEffect(getOrders, [])

  const dataSource = [
    {
      id: 10,
      enter_date: '02/11/2019 - 19:00',
      exit_date: '',
      value: 100.0,
      status: 'Pago',
      client: {
        name: 'Anthony'
      },
    },
    {
      id: 11,
      enter_date: '02/11/2019 - 19:05',
      exit_date: '',
      value: 105.0,
      status: 'Pago',
      client: {
        name: 'Pamela'
      },
    },
    {
      id: 12,
      enter_date: '02/11/2019 - 19:07',
      exit_date: '',
      value: 155.0,
      status: 'Pago',
      client: {
        name: 'Cleisson'
      },
    },
  ]

  const columns = [
    {
      title: 'Cliente',
      dataIndex: 'client_cpf',
    }, {
      title: 'Entrada',
      dataIndex: 'created_date',
    }, {
      title: 'Saída',
      dataIndex: 'finished_date',
    }, {
      title: 'Status',
      dataIndex: 'status',
    }, {
      title: 'Ações',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, order) => (
        <div>
          <Tooltip title="Editar">
            <a onClick={() => setOrderModal({ visible: true, order })}>
              <Icon type="edit" />
            </a>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Excluir">
            <a style={{ color: 'red' }}>
              <Icon type="delete" />
            </a>
          </Tooltip>
        </div>
      ),
    }
  ]

  return (
    <div>
      <PageHeader
        onBack={() => history.push('/')}
        title="Lista de Comandas"
        extra={[
          <Button
            key="new"
            type="primary"
            icon="plus"
            onClick={() => setOrderModal({ visible: true })}
          >
            Criar comanda
          </Button>
        ]}
      />

      <Table
        loading={orders === null}
        columns={columns}
        dataSource={orders}
        rowKey={obj => obj.referenceCode}
      />

      <OrderModal
        {...order_modal}
        closeModal={() => setOrderModal({})}
      />
    </div>
  )
}