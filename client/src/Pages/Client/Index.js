import React from 'react'
import { Table, PageHeader, Icon , Divider, Button } from 'antd'
import useReactRouter from 'use-react-router'

export default () => {
  const { history } = useReactRouter()

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
      render: () => (
        <div>
          <a>
            <Icon type="edit" />
          </a>
          <Divider type="vertical"/>
          <a style={{ color: 'red' }}>
            <Icon type="delete" />
          </a>
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
          <Button type="primary" icon="plus" key="new">
            Criar cliente
          </Button>
        ]}
      />
      <Table
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  )
} 