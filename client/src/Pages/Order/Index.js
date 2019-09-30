import React, { useEffect, useState } from 'react'
import { Table, PageHeader, Button, Icon, Divider, Tooltip, Tag, message } from 'antd'
import useReactRouter from 'use-react-router'
import axios from 'axios'
import moment from 'moment'
import NewOrderModal from './NewOrderModal'
import EditOrderModal from './EditOrderModal'

export default () => {
  const { history } = useReactRouter()
  const [edit_order_modal, setEditOrderModal] = useState({})
  const [new_order_modal_visible, setNewOrderModalVisible] = useState(false)
  const [orders, setOrders] = useState(null)

  const getOrders = () => {
    axios.get('/api/Order')
      .then(result => {
        const data = result.data.sort((a, b) => {
          if (!a.finished_date) return -1

          if (moment(a.finished_date).isBefore(moment(b.finished_date))) {
            return 1
          } else if (moment(a.finished_date).isAfter(moment(b.finished_date))) {
            return -1
          } else {
            return 0
          }
        })
        setOrders(data)
      })
  }

  useEffect(getOrders, [])

  const closeOrder = id => {
    axios.put(`/api/Order/${id}/close`)
      .then(() => {
        getOrders()
        message.success('Comanda faturada com sucesso!')
      })
      .catch(err => {
        message.error(err.response.data.message)
      })
  }

  const columns = [
    {
      title: 'Cliente',
      dataIndex: 'client.name',
    }, {
      title: 'Entrada',
      dataIndex: 'created_date',
      render: date => moment(date).format('DD/MM/YYYY HH:mm'),
    }, {
      title: 'Saída',
      dataIndex: 'finished_date',
      render: date => date ? moment(date).format('DD/MM/YYYY HH:mm') : '',
    }, {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: status => (
        status === 'open'
          ? <Tag color="green">Em aberto</Tag>
          : <Tag>Finalizado</Tag>
      )
    }, {
      title: 'Ações',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, order) => (
        order.status == 'open' ? (
          <div>
            <Tooltip title="Editar">
              <a onClick={() => setEditOrderModal({ visible: true, order })}>
                <Icon type="edit" />
              </a>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title="Faturar">
              <a onClick={() => closeOrder(order.referenceCode)}>
                <Icon type="dollar" />
              </a>
            </Tooltip>
          </div>
        ) : (
          <div>
            <Icon type="edit" style={{ color: '#888' }} />
            <Divider type="vertical" />
            <Icon type="dollar" style={{ color: '#888' }} />
          </div>
        )
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
            onClick={() => setNewOrderModalVisible(true)}
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

      <NewOrderModal
        visible={new_order_modal_visible}
        closeModal={() => setNewOrderModalVisible(false)}
        onUpdate={getOrders}
      />

      <EditOrderModal
        {...edit_order_modal}
        closeModal={() => setEditOrderModal({ visible: false })}
        onUpdate={getOrders}
      />
    </div>
  )
}