import React from "react"
import Home from "../pages/home"
import Cars from "../pages/cars"
import Dealers from "../pages/dealers"
import Adresses from "../pages/adresses"
import Clients from "../pages/clients"
import Sales from "../pages/sales"
import TestDrives from "../pages/testdrives"
import CarsById from "../pages/carsById"
import AdressesById from "../pages/adressesById"
import ClientsById from "../pages/clientsById"
import DealersById from "../pages/dealersById"
import SalesById from "../pages/salesById"
import TestDrivesById from "../pages/testdrivesById"

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
    {
        path: "/cars/:id",
        element: <CarsById/>,
        label: "Cars By Id"
    },
    {
        path: "/adresses/:id",
        element: <AdressesById/>,
        label: "Adresses By Id"
    },
    {
        path: "/clients/:id",
        element: <ClientsById/>,
        label: "Clients By Id"
    },
    {
        path: "/dealers/:id",
        element: <DealersById/>,
        label: "Dealers By Id"
    },
    {
        path: "/sales/:id",
        element: <SalesById/>,
        label: "Sales By Id"
    },
    {
        path: "/testdrives/:id",
        element: <TestDrivesById/>,
        label: "Test Drives By Id"
    }
]