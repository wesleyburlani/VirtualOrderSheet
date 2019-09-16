import React, { useState } from 'react'
import { Table, PageHeader, Button, Icon, Divider, Tooltip } from 'antd'
import useReactRouter from 'use-react-router'
import OrderModal from './OrderModal'

export default () => {
  const { history } = useReactRouter()
  const [order_modal, setOrderModal] = useState({})

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
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: 'Cliente',
      dataIndex: 'client.name',
    }, {
      title: 'Entrada',
      dataIndex: 'enter_date',
    }, {
      title: 'Saída',
      dataIndex: 'exit_date',
    }, {
      title: 'Valor',
      dataIndex: 'value',
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
            <a onClick={() => setOrderModal({ visible: true, order_id: order.id })}>
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
        columns={columns}
        dataSource={dataSource}
        rowKey={obj => obj.id}
      />

      <OrderModal
        // {...order_modal}
        visible={order_modal.visible}
        order_id={order_modal.order_id}
        close={() => setOrderModal({})}
      />
    </div>
  )
}