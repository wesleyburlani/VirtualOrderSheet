import React from 'react'
import { Modal, Button, Form, InputNumber, Row, Col, DatePicker, Select, Input } from 'antd'

const { Option } = Select

export default Form.create()(({ visible, product_id, form }) => {
  const { getFieldDecorator } = form

  const products = [
    {
      id: '1',
      name: 'Bebida A',
    },
    {
      id: '2',
      name: 'Bebida B',
    },
  ]

  return (
    <Modal
      title={`${product_id ? 'Editando' : 'Criando'} produto`}
      visible={visible}
      width={600}
      footer={
        <>
          <Button>
            Cancelar
          </Button>
          <Button type="primary">
            {product_id ? 'Atualizar' : 'Salvar'}
          </Button>
        </>
      }
    >
      <Form layout="vertical">
        <Row gutter={16}>

          <Col span={12}>
            <Form.Item label="Nome da Bebida">
              {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Informe o nome da bebida' }]
                })(
                <Input placeholder="Nome da Bebida"/>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Preço">
              {getFieldDecorator('price', {
                rules: [{ required: true, message: 'Informe o preço'}]
              })(
                <Input placeholder="00.00"/>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Descrição">
              {getFieldDecorator('descripton', {
                
              })(
              <Input placeholder="Informações sobre a bebida"/>
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