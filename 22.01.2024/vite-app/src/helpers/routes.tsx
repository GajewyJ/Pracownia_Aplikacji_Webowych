import React from "react"
import Home from "../pages/home"
import Contact from "../pages/contact"
import About from "../pages/about"

interface RouteItem{
    path: string,
    element: React.JSX.Element,
    label: string
}

export const routes: Array<RouteItem> = [
    {
        path: "/",
        element: <Home/>,
        label: "Home"
    },
    {
        path: "/about",
        element: <About/>,
        label: "About"
    },
    {
        path: "/contact",
        element: <Contact/>,
        label: "Contact"
    }
]