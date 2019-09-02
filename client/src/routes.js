import OrderIndex from './Pages/Order/Index'
import Index from './Pages/Index/Index'
import ClientIndex from './Pages/Client/Index'

export default [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/orders',
    component: OrderIndex,
  },
  {
    path: '/clients',
    component: ClientIndex,
  },
  {
    path: '/exemplo',
    component: OrderIndex,
  },
]