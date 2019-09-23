import React, { useEffect } from 'react'
import { Modal, Button, Form, Row, Col, Input, message } from 'antd'
import axios from 'axios'

export default Form.create()(({ visible, client, form, closeModal, onUpdate }) => {
  const { getFieldDecorator, setFieldsValue } = form

  useEffect(() => {
    if (visible && client)
      setFieldsValue(client)
  }, [visible, client])

  const close = () => {
    form.resetFields()
    closeModal()
  }

  const submit = () => {
    form.validateFields((errors, values) => {
      if (errors) return

      const request = client ? axios.put : axios.post

      request(`/api/Client/${(client || {}).cpf || ''}`, values)
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
      title={`${client ? 'Editando' : 'Criando'} cliente`}
      visible={visible}
      width={600}
      onCancel={close}
      footer={
        <>
          <Button onClick={close}>
            Cancelar
          </Button>
          <Button type="primary" onClick={submit}>
            {client ? 'Atualizar' : 'Salvar'}
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
                <Input
                  placeholder="XXXXXXXXX-XX"
                  disabled={client}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Telefone">
              {getFieldDecorator('phone', {
                
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