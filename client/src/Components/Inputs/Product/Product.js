import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import axios from 'axios'

const { Option } = Select

export default props => {
  const [products, setProducts] = useState([])

  const getProducts = () => {
    axios.get('/api/Product')
      .then(result => setProducts(result.data))
  }

  useEffect(getProducts, [])

  useEffect(() => {
    if (products.length > 0 && !products.find(product => product.id == props.value))
      getProducts()
  }, [props.value])

  return (
    <Select
      showSearch
      placeholder="Selecione um produto"
      style={{ width: '100%' }}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      optionFilterProp="children"
      {...props}
    >
      {products.map(product => (
        <Option key={product.referenceCode} value={product.referenceCode}>
          {product.name}
        </Option>
      ))}
    </Select>
  )
}