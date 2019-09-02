import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import routes from './routes'

const App = () => {
  return (
    <Router>
      {routes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          exact
          component={route.component}
        />
      ))}
    </Router>
  )
}

export default App
