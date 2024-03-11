import './App.scss'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavBar from './components/navbar'
import Header from './components/header'
import { routes } from './helpers/routes'

function App() {
  return (
    <>
      <main>
        <Router>
          <Header/>
          <NavBar/>
          <Routes>
            {routes.map((route) => (
              <Route
              key={route.path}
              path={route.path}
              element={route.element}
              />
            ))}
          </Routes>
        </Router>
      </main>
    </>
  )
}

export default App
