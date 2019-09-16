import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import App from './App';
import ptBR from 'antd/es/locale/pt_BR'
import 'antd/dist/antd.css';
import './styles.css'

const RoutedApp = (
  <Router>
    <ConfigProvider locale={ptBR}>
      <App />
    </ConfigProvider>
  </Router>
)

ReactDOM.render(RoutedApp, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
