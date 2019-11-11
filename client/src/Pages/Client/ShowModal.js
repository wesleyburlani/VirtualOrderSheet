import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Table, Tag } from 'antd'
import axios from 'axios'
import moment from 'moment'

export default ({ visible, client, closeModal }) => {
  const [orders, setOrders] = useState(null)
  

  useEffect( () => {
    if (visible && client)
      axios.get(`/api/Order?clientCpf=${client.cpf}`)
        .then(result => {
          setOrders(result.data)
        })
  }, [visible, client])

  const close = () => {
    closeModal()
  }
  
  
  const columns = [
   
    {
      title: 'Data/Hora de Entrada',
      dataIndex: 'created_date',
      render: date => moment(date).format('DD/MM/YYYY HH:mm')
    },
    {
      title: 'Data/Hora de Saída',
      dataIndex: 'finished_date',
      render: date => date ? moment(date).format('DD/MM/YYYY HH:mm') : ''
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => (
        status == 'open' ? (
          <Tag color="green">
            Em aberto
          </Tag>
        ) : (
          <Tag>
          Finalizado
          </Tag>)
      )
    }, 
    {
      title: 'Valor',
      key: 'total',
      render: (_, order) => {
        const products = order.products
        const total = products.reduce((acc, curr) => acc + (curr.quantity * curr.price ), 0)
        return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

      }

    }, 
  ]



  return (
    <Modal
      title="Histórico do cliente"
      visible={visible}
      width={800}
      onCancel={close}
      footer={
        <>
          <Button onClick={close}>
            Voltar
          </Button>
        </>
      }
    >
      {
        client &&
        <>
          <Row>
            <Col span= {12} >
              <p> Nome: { client.name } </p>
              <p> CPF: { client.cpf } </p>
            </Col>
            <Col span= {12} >
              <p>Email: { client.email } </p>
              <p>Telefone: { client.phone } </p> 
            </Col>
          </Row>
        

          <Table
            dataSource={orders}
            columns={columns}
          />

        </>
      }
  
    </Modal>
  )
 
}
