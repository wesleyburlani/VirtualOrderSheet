import React from 'react'
import { Modal, Button, Form, InputNumber, Row, Col, DatePicker, Select, Input } from 'antd'

const { Option } = Select

export default Form.create()(({ visible, client_id, form }) => {
  const { getFieldDecorator } = form

  const clients = [
    {
      id: '1',
      name: 'Mike Hong',
    },
    {
      id: '2',
      name: 'John XXX',
    },
  ]

  return (
    <Modal
      title={`${client_id ? 'Editando' : 'Criando'} cliente`}
      visible={visible}
      width={600}
      footer={
        <>
          <Button>
            Cancelar
          </Button>
          <Button type="primary">
            {client_id ? 'Atualizar' : 'Salvar'}
          </Button>
        </>
      }
    >
      <Form layout="vertical">
        <Row gutter={16}>

          <Col span={12}>
            <Form.Item label="Nome Completo">
              {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Informe o nome competo' }]
                })(
                <Input placeholder="Nome Completo"/>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="CPF">
              {getFieldDecorator('cpf', {
                rules: [{ required: true, message: 'Informe o CPF'}]
              })(
                <Input placeholder="XXXXXXXXX-XX"/>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Telefone">
              {getFieldDecorator('fone', {
                
              })(
              <Input placeholder="(xx) xxxx-xxxx"/>
              )}
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="Email">
              {getFieldDecorator('email')(
                <Input placeholder="example@email.com"/>
              )}
            </Form.Item>
          </Col>
         

        </Row>
      </Form>
    </Modal>
  )
})