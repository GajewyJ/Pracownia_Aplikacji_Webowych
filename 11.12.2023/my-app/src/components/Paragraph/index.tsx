import React from "react";
import "./index.scss"

interface ParagraphProps{
    content: string
}

function Paragraph({content}: ParagraphProps): React.JSX.Element{
    return(
        <p>{content}</p>
    )
}

export default Paragraph