import React from 'react'
import {HeadingProps} from "@/UI/Headings/types/types";

const Heading : React.FC<HeadingProps> = ( { title, center } ) => {
    return (
        <div className = { center ? "text-center" : "text-start" }>
            <h2 className = { "font-bold text-2xl" }>{ title }</h2>
        </div>
    )
}
export default Heading
