import React from 'react'
import { Modal, Button, Form, InputNumber, Row, Col, DatePicker, Select } from 'antd'

const { Option } = Select

export default Form.create()(({ visible, order_id, form }) => {
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
      title={`${order_id ? 'Editando' : 'Criando'} comanda`}
      visible={visible}
      width={600}
      footer={
        <>
          <Button>
            Cancelar
          </Button>
          <Button type="primary">
            {order_id ? 'Atualizar' : 'Salvar'}
          </Button>
        </>
      }
    >
      <Form layout="vertical">
        <Row gutter={16}>

          <Col span={12}>
            <Form.Item label="Data de entrada">
              {getFieldDecorator('enter_date')(
                <DatePicker
                  showTime
                  format="DD/MM/YYYY [às] HH:mm"
                  style={{ width: '100%' }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Data de saída">
              {getFieldDecorator('exit_date')(
                <DatePicker
                  showTime
                  format="DD/MM/YYYY [às] HH:mm"
                  style={{ width: '100%' }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Valor">
              {getFieldDecorator('value', {
                initialValue: 0,
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Status">
              {getFieldDecorator('status')(
                <Select placeholder="Status">
                  <Option value="open">Em aberto</Option>
                  <Option value="paid">Pago</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Cliente">
              {getFieldDecorator('client')(
                <Select placeholder="Cliente">
                  {clients.map(client => (
                    <Option key={client.id} value={client.id}>
                      {client.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>

        </Row>
      </Form>
    </Modal>
  )
})