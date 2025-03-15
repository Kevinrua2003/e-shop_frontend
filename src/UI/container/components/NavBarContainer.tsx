import React from 'react'
import {NavBarContainerProps} from "@/UI/container/types/types";

const NavBarContainer : React.FC<NavBarContainerProps> = ( props : NavBarContainerProps ) => {
    return (
        <div className = { props.className }>{ props.children }</div>
    )
}
export default NavBarContainer
