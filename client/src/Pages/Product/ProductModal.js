import React, { useEffect } from 'react'
import { Modal, Button, Form, Row, Col, Input, InputNumber, message } from 'antd'
import axios from 'axios'
import { currencyFormatter, currencyParser } from '../../Utils'

export default Form.create()(({ visible, product, form, closeModal, onUpdate }) => {
  const { getFieldDecorator, setFieldsValue } = form

  useEffect(() => {
    if (visible && product)
      setFieldsValue(product)
  }, [visible, product])

  const close = () => {
    form.resetFields()
    closeModal()
  }

  const submit = () => {
    form.validateFields((errors, values) => {
      if (errors) return

      const request = product ? axios.put : axios.post

      request(`/api/Product/${(product || {}).referenceCode || ''}`, values)
        .then(() => {
          onUpdate()
          close() 
        })
        .catch(err => {
          message.error(err.response.data.message)
        })
    })
  }


  return (
    <Modal
      title={`${product ? 'Editando' : 'Criando'} produto`}
      visible={visible}
      width={600}
      onCancel={close}
      footer={
        <>
          <Button onClick={close}>
            Cancelar
          </Button>
          <Button type="primary" onClick={submit}>
            {product ? 'Atualizar' : 'Salvar'}
          </Button>
        </>
      }
    >
      <Form layout="vertical">
        <Row gutter={16}>

          <Col span={12}>
            <Form.Item label="Nome do Produto">
              {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Informe o nome da Produto' }]
                })(
                <Input placeholder="Nome do Produto"/>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Código">
              {getFieldDecorator('referenceCode', {
                rules: [{ required: true, message: 'Informe o código'}]
              })(
                <Input placeholder="Código"/>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Preço">
              {getFieldDecorator('price', {
                initialValue: 0,
                rules: [{ required: true, message: 'Informe o preço'}]
              })(
                <InputNumber
                  formatter={currencyFormatter}
                  parser={currencyParser}
                  min={0}
                  style={{ width: '100%' }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Descrição">
              {getFieldDecorator('description', {
                
              })(
              <Input placeholder=""/>
              )}
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="Estoque">
              {getFieldDecorator('stock')(
                <Input placeholder="0"/>
              )}
            </Form.Item>
          </Col>
         

        </Row>
      </Form>
    </Modal>
  )
})