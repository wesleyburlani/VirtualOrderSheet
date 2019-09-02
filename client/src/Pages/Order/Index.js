import React from 'react'
import { Table, PageHeader, Button } from 'antd'
import useReactRouter from 'use-react-router'

export default () => {
  const { history } = useReactRouter()

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
    }
  ]

  return (
    <div>
      <PageHeader
        onBack={() => history.push('/')}
        title="Lista de Comandas"
        extra={[
          <Button key="new" type="primary" icon="plus">
            Criar comanda
          </Button>
        ]}
      />

      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={obj => obj.id}
      />
    </div>
  )
}