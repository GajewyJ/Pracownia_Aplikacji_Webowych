import './App.scss'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavBar from './components/navbar'
import Footer from './components/footer'
import { routes } from './helpers/routing'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App