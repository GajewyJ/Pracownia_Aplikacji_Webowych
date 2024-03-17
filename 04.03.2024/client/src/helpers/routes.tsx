import React from "react"
import Home from "../pages/home"
import Cars from "../pages/cars"
import Dealers from "../pages/dealers"
import Adresses from "../pages/adresses"
import Clients from "../pages/clients"
import Sales from "../pages/sales"
import TestDrives from "../pages/testdrives"

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
    {
        path: "/adresses",
        element: <Adresses/>,
        label: "Adresses"
    },
    {
        path: "/clients",
        element: <Clients/>,
        label: "Clients"
    },
    {
        path: "/sales",
        element: <Sales/>,
        label: "Sales"
    },
    {
        path: "/testdrives",
        element: <TestDrives/>,
        label: "Test Drives"
    },
]