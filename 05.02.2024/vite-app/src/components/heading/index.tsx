import React from "react"

import styled from "styled-components"

const h1 = styled.h1`
    width: 100%;
    font-size: 2.3em;
    text-align: center;
`;

interface HeadingProps{
    title: string
}

export default function Heading({title}: HeadingProps){
    return React.createElement(h1, {}, title)
}