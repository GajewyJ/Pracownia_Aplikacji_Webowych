import React from "react"
import Homepage from "../pages/homepage"
import About from "../pages/about"

interface RouteItem{
    path: string,
    element: React.JSX.Element,
    label: string
}

//export const routes: RouteItem[] = []
export const routes: Array<RouteItem> = [
    {
        path: "/",
        element: <Homepage/>,
        label: "Homepage"
    },
    {
        path: "/about",
        element: <About/>,
        label: "About"
    },
]