import React from 'react'

import { Table, PageHeader } from 'antd'

export default () => {

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
  ]
  
  

  return (
    <div>
      <PageHeader onBack={() => null} title="Lista de Clientes"/>,
      <Table dataSource={dataSource} columns={columns}/>
    </div>
  )
} 