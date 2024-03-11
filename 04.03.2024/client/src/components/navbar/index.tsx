import { Link } from 'react-router-dom'
import './index.scss'

export default function NavBar() {
  return (
    <>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/cars">Cars</Link>
            <Link to="/dealers">Dealers</Link>
        </nav>
    </>
  )
}
