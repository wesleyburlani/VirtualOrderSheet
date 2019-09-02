import OrderIndex from './Pages/Order/Index'
import Index from './Pages/Index/Index'
import ClientIndex from './Pages/Client/Index'

export default [
  {
    path: '/',
    component: Index,
    name: 'Página inicial',
  },
  {
    path: '/orders',
    component: OrderIndex,
    name: 'Comandas',
  },
  {
    path: '/clients',
    component: ClientIndex,
    name: 'Clientes',
  },
]