import React from "react"
import Homepage from "../pages/homepage"
import About from "../pages/about"
import Blog from "../pages/blog"
import BlogPost from "../pages/blogpost"

interface RouteItem{
    path: string,
    element: React.JSX.Element,
    label: string
    hideInMenu?: boolean
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
    {
        path: "/blog",
        element: <Blog/>,
        label: "Blog"
    },
    {
        path: "/blog/:id",
        element: <BlogPost/>,
        label: "Blog Post",
        hideInMenu: true
    },
]