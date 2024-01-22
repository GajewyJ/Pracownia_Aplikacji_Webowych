import React from "react"

import "./index.scss"

interface HeadingProps{
    title: string
}

export default function Heading({title}: HeadingProps){
    return React.createElement(`h1`, {}, title)
}