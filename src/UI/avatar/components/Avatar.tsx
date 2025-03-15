import React from 'react'
import {AvatarProps} from "@/UI/avatar/types/types";
import Image from "next/image";
import {LuUser} from "react-icons/lu";

const Avatar : React.FC<AvatarProps> = ( { src } : AvatarProps ) => {
    if (src) {
        return <Image src = { src } alt = { "avatar" } className = "rounded-full" height = { '30' } width = { '30' }/>
    }
    return <LuUser size = { 24 }/>
}
export default Avatar

