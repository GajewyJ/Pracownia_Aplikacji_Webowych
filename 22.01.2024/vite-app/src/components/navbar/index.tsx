import { Link } from "react-router-dom"
import {routes} from "../../helpers/routes"

import "./index.scss"

export default function NavBar(){
    return(
        <nav>
            {routes.map((route) => (
                <Link to={route.path}>{route.label}</Link>
            ))}
        </nav>
    )
}