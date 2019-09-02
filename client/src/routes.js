import OrderIndex from './Pages/Order/Index'
import Index from './Pages/Index/Index'

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
    path: '/exemplo',
    component: OrderIndex,
  }
]