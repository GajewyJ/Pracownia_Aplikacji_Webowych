import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { routes } from './helpers/routes'
import NavBar from './components/navbar'
import Footer from './components/footer'
import styled from 'styled-components'

const Main = styled.div`
  margin: 0;
  background-color: #dedede;
  font-family: 'PT Sans', sans-serif;
`;

function App() {
  return (
    <Main>
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
    </Main>
  )
}

export default App