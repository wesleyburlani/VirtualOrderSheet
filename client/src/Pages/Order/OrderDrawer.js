import React from 'react'
import { Drawer, Button } from 'antd'

export default ({ visible, order_id }) => {

  return (
    <Drawer
      title={`${order_id ? 'Editando' : 'Criando'} comanda`}
      visible={visible}
      width={500}
    >
      conteudo

      <div className="drawer-footer-actions">
        <Button style={{ marginRight: 8 }}>
          Cancelar
        </Button>
        <Button type="primary">
          {order_id ? 'Atualizar' : 'Salvar'}
        </Button>
      </div>
    </Drawer>
  )
}