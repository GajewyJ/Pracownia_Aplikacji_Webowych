import './App.scss'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavBar from './components/navbar'
import Footer from './components/footer'
import { routes } from './helpers/routing'

function App() {
  return (
    <Router>
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
      <Footer/>
    </Router>
  )
}

export default App