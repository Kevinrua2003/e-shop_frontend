import React from 'react'
import {LinkIconProps} from "@/UI/buttons/types/types";
import Link from "next/link";


const LinkIcon : React.FC<LinkIconProps> = ( props : LinkIconProps ) => {
    return (
        <Link className = { "w-[24]" } href = { props.link }>{ props.children }</Link>
    )
}
export default LinkIcon
