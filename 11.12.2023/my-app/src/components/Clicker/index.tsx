import React from "react";
import "./index.scss"
import Paragraph from "../Paragraph";

function Clicker(): React.JSX.Element{
    const [count, setCount] = React.useState<number>(0)
    return(
        <div>
            <Paragraph content={`You've clicked the button ${count} times`}/>
            <button 
                onClick={() => {
                    setCount(count + 1)
                }}
            >
                Click
            </button>
        </div>
    )
}

export default Clicker