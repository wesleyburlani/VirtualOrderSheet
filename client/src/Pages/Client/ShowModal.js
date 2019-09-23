import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Table } from 'antd'
import axios from 'axios'

export default ({ visible, client, closeModal }) => {
  const [orders, setOrders] = useState(null)
  
  useEffect(() => {
    if (visible && client)
      axios.get(`/api/Orders/${client.client_cpf}`)
        .then(result => {
          setOrders(result.data)
        })
  }, [visible, client])

  const close = () => {
    closeModal()
  }

  const submit = () => {
    
  }
  
  const columns = [
    {
      title: 'Código',
      dataIndex: 'referenceCode',
    },
    {
      title: 'Data/Hora de Entrada',
      dataIndex: 'created_date',
    },
    {
      title: 'Data/Hora de Saída',
      dataIndex: 'finished_date',
    }
    //{
    //title: 'Valor',
    //  dataIndex: 'total',  
    //}, aqui vem o calculo do total da comanda
    
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
          <Button type="primary" onClick={submit}>
            {'Atualizar'}
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