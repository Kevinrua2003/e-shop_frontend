'use client'
import React from 'react'
import {SetColorProps} from "@/UI/products/types/types";

const SetColor : React.FC<SetColorProps> = ( { images, cartProduct, handleColorSelect } ) => {
    return (
        <div className = "flex gap-4 items-center">
            <span className = { "font-semibold" }>COLOR:</span>
            <div className = { "flex gap-1" }>{ images.map(( image ) => {
                return (
                    <div key = { image.colorCode }
                         onClick = { () => handleColorSelect(image) }
                         className = { `
                        h-7
                        w-7 
                        rounded-full 
                        border-teal-300 
                        flex items-center 
                        justify-center 
                        border-[1.5px]` }>
                        <div style = { { backgroundColor: image.colorCode } }
                             className = { " h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer " }>
                        </div>
                    </div>
                )
            }) }</div>
        </div>
    )
}
export default SetColor
