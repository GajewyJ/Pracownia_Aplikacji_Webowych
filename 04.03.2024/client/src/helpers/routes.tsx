import React from "react"
import Home from "../pages/home"
import Cars from "../pages/cars"
import Dealers from "../pages/dealers"

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
        path: "/cars",
        element: <Cars/>,
        label: "Cars"
    },
    {
        path: "/dealers",
        element: <Dealers/>,
        label: "Dealers"
    },
]