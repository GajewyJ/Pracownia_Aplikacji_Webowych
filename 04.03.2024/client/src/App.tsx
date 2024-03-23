import './App.scss'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/header'
import { routes } from './helpers/routes'
import Footer from './components/footer'

function App() {
  return (
    <>
      <main>
        <Router>
          <Header/>
          <Routes>
            {routes.map((route) => (
              <Route
              key={route.path}
              path={route.path}
              element={route.element}
              />
            ))}
          </Routes>
          <Footer/>
        </Router>
      </main>
    </>
  )
}

export default App
