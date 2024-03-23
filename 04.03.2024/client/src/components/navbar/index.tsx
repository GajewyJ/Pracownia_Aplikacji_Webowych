import { Link } from 'react-router-dom'
import './index.scss'

export default function NavBar() {
  return (
      <nav>
          <Link className='Link' to="/">Home</Link>
          <Link className='Link' to="/cars">Cars</Link>
          <Link className='Link' to="/dealers">Dealers</Link>
          <Link className='Link' to="/adresses">Adresses</Link>
          <Link className='Link' to="/clients">Clients</Link>
          <Link className='Link' to="/sales">Sales</Link>
          <Link className='Link' to="/testdrives">Test Drives</Link>
      </nav>
  )
}