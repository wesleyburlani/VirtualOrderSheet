import React, { useState, useEffect } from 'react'
import { Table, PageHeader, Icon , Divider, Button, Tooltip, Popconfirm, message } from 'antd'
import useReactRouter from 'use-react-router'
import axios from 'axios'
import ProductModal from './ProductModal'

export default () => {
  const { history } = useReactRouter()
  const [product_modal, setProductModal] = useState({})
  const [products, setProducts] = useState(null)
  
  const getProducts = () => { 
    axios.get('/api/Product')
      .then(result => setProducts(result.data))
  }

  useEffect(getProducts, [])
  
  const deleteProduct = referenceCode => {
    axios.delete(`/api/Product/${referenceCode}`)
      .then(() => {
        message.success('Produto excluído com sucesso!')
        getProducts()
      })
      .catch(() => message.error('Não foi possível excluir esse produto'))
  }

  const columns = [
    {
      title: 'Produto',
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
      title: 'Ações',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, product) => (
        <div>
          <Tooltip title="Editar">
            <a onClick={() => setProductModal({ visible: true, product })}>
              <Icon type="edit" />
            </a>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Excluir">
            <Popconfirm
              title="Tem certeza?"
              onConfirm={() => deleteProduct(product.referenceCode)}
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
        title="Lista de Produtos"
        extra={[
          <Button 
            type="primary" 
            icon="plus" 
            key="new"
            onClick={() => setProductModal({ visible: true })}
          >
            Novo Produto
          </Button>
        ]}
      />
      <Table
        loading={products === null}
        dataSource={products}
        columns={columns}
        rowKey={item => item.referenceCode}
      />
       <ProductModal 
       {...product_modal}
        closeModal={() => setProductModal({})}
        onUpdate={getProducts}
      />
    </div>
  )
} 