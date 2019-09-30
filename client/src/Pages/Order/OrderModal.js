import React, { useState } from 'react'
import { Modal, Form, Row, Col, Button, message } from 'antd'
import axios from 'axios'
import ClientInput from '../../Components/Inputs/Client'
import ClientModal from '../Client/ClientModal'

export default Form.create()(({ visible, form, onUpdate, closeModal }) => {
  const { getFieldDecorator, setFieldsValue } = form
  const [client_modal_visible, setClientModalVisible] = useState(false)

  const submit = () => {
    form.validateFields((errors, { client_cpf }) => {
      if (errors) return

      axios.post('/api/Order/open', { client_cpf })
        .then(() => {
          onUpdate()
          closeModal()
        })
        .catch(err => {
          message.error(err.response.data.message)
        })
    })
  }

  return (
    <Modal
      title="Nova comanda"
      visible={visible}
      onCancel={closeModal}
      footer={
        <>
          <Button onClick={closeModal}>
            Cancelar
          </Button>
          <Button type="primary" onClick={submit}>
            Salvar
          </Button>
        </>
      }
    >
      <Form layout="vertical">
        <Row gutter={16} type="flex" align="bottom">
          <Col span={18}>
            <Form.Item label="Informe um cliente">
              {getFieldDecorator('client_cpf', {
                rules: [{ required: true, message: 'Informe um cliente' }]
              })(<ClientInput />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Button
              icon="plus"
              block
              type="primary"
              style={{ marginBottom: 32 }}
              onClick={() => setClientModalVisible(true)}
            >
              Novo
            </Button>
          </Col>
        </Row>
      </Form>

      <ClientModal
        visible={client_modal_visible}
        closeModal={() => setClientModalVisible(false)}
        onUpdate={client_cpf => setFieldsValue({ client_cpf })}
      />
    </Modal>
  )
})