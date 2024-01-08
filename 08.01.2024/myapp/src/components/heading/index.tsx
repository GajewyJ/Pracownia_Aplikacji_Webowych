import React from "react"

import "./index.scss"

interface HeadingProps{
    title: string,
    level?: Number
}

export default function Heading({title, level = 1}: HeadingProps){
    return React.createElement(`h${level}`, {}, title)
}