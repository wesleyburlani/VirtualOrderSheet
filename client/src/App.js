import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import useReactRouter from 'use-react-router'
import routes from './routes'

const { Header, Content, Footer } = Layout

const App = () => {
  const { location } = useReactRouter()

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{ lineHeight: '64px' }}
        >
          {routes.map(route => (
            <Menu.Item key={route.path}>
              <Link to={route.path}>{route.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 133px)' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact
              component={route.component}
            />
          ))}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Virtual Order Sheet</Footer>
    </Layout>
  )
}

export default App
