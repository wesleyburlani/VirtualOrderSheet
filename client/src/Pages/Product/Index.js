import React, { useState } from 'react'
import { Table, PageHeader, Icon , Divider, Button , Tooltip } from 'antd'
import useReactRouter from 'use-react-router'
import ProductModal from './ProductModal'

export default () => {
  const { history } = useReactRouter()

  const dataSource = [
    {
        referenceCode: '1',
        name: 'Bebida A',
        price: 8.00,
        description: 'SsS',
        stock: 10,
    },
    {
        referenceCode: '2',
        name: 'Bebida B',
        price: 10.00,
        description: 'ACF',
        stock: 15,
      },
  ]
  
  const columns = [
    {
      title: 'Bebida',
      dataIndex: 'name',
    },
    {
      title: 'Preço',
      dataIndex: 'price',
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
    },
    {
      title: 'Estoque',
      dataIndex: 'stock',  
    },
    {
      title: 'Ações',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: () => (
        <div>
          <Tooltip title="Editar">
            <a>
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
      )
    },
  ]

  return (
    <div>
      <PageHeader
        onBack={() => history.push('/')}
        title="Lista de Produtos"
        extra={[
          <Button type="primary" icon="plus" key="new">
            Novo Produto
          </Button>
        ]}
      />
      <Table
        dataSource={dataSource}
        columns={columns}
      />
       <ProductModal 
       {...product_modal}
        closeModal={() => setProducttModal({})}
      />
    </div>
  )
} 