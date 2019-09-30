import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Divider, Row, Col, DatePicker, InputNumber, Icon } from 'antd'
import moment from 'moment'
import ClientInput from '../../Components/Inputs/Client'
import ProductInput from '../../Components/Inputs/Product'

export default Form.create()(({ visible, order, form, closeModal }) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form
  const [products, setProducts] = useState([Math.random()])

  useEffect(() => {
    if (visible && order) {
      setFieldsValue({
        created_date: moment(order.created_date),
        client_cpf: order.client_cpf,
      })
      console.log(order)
    }
  }, [visible, order])

  const close = () => {
    form.resetFields()
    closeModal()
  }

  const submit = () => {
    form.validateFields((errors, values) => {
      if (errors) return

      console.log(values)
      close()
    })
  }

  const onProductChange = product_id => {
    const empty = Object.values(getFieldValue('product')).filter(p => !p.referenceCode)
    if (empty.length == 1 && product_id)
      setProducts(prev => [...prev, Math.random()])
  }

  const removeProduct = id => {
    setProducts(prev => prev.filter(p => p != id))
  }

  return (
    <Modal
      title={`${order ? 'Editando' : 'Criando'} comanda`}
      visible={visible}
      width={600}
      onCancel={close}
      footer={
        <>
          <Button onClick={close}>
            Cancelar
          </Button>
          <Button type="primary" onClick={submit}>
            {order ? 'Atualizar' : 'Salvar'}
          </Button>
        </>
      }
    >
      <Form layout="vertical">
        <Row gutter={16}>

          <Col span={12}>
            <Form.Item label="Data de entrada">
              {getFieldDecorator('created_date', {
                rules: [{ required: true, message: 'Informe a data de entrada' }]
              })(
                <DatePicker
                  showTime
                  format="DD/MM/YYYY [às] HH:mm"
                  style={{ width: '100%' }}
                  disabled={!!order}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Cliente">
              {getFieldDecorator('client_cpf', {
                rules: [{ required: true, message: 'Informe um cliente' }]
              })(
                <ClientInput disabled={!!order} />
              )}
            </Form.Item>
          </Col>

          <Divider orientation="left">
            Produtos consumidos
          </Divider>

          <div className="form-item-no-margin">
            {order && order.products.map((product, index) => (
              <Row key={index} gutter={16}>
                <Col span={18}>
                  <ProductInput
                    value={product.referenceCode}
                    disabled={true}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    value={product.quantity}
                    disabled={true}
                  />
                </Col>
              </Row>
            ))}

            {products.map((id, index) => (
              <Row gutter={16} type="flex" align="bottom">
                <Col span={18}>
                  <Form.Item label={index == 0 ? 'Produto' : ''}>
                    {getFieldDecorator(`product[${id}][referenceCode]`, {
                      onChange: onProductChange
                    })(
                      <ProductInput />
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label={index == 0 ? 'Quantidade' : ''}>
                    {getFieldDecorator(`product[${id}][quantity]`, {
                      initialValue: 1,
                    })(
                      <InputNumber
                        placeholder="Quantidade"
                        min={1}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <a
                    onClick={() => removeProduct(id)}
                    style={{ display: 'block', marginBottom: 13, textAlign: 'center' }}
                  >
                    <Icon type="delete" style={{ color: 'red' }} />
                  </a>
                </Col>
              </Row>
            ))}
          </div>

        </Row>
      </Form>
    </Modal>
  )
})