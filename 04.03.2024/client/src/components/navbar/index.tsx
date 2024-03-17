import { Link } from 'react-router-dom'
import './index.scss'

export default function NavBar() {
  return (
    <>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/cars">Cars</Link>
            <Link to="/dealers">Dealers</Link>
            <Link to="/adresses">Adresses</Link>
            <Link to="/clients">Clients</Link>
            <Link to="/sales">Sales</Link>
            <Link to="/testdrives">Test Drives</Link>
        </nav>
    </>
  )
}
