import React from 'react'
import {ContainerProps} from "@/UI/container/types/types";

//Esta clase es un contenedor para usar en todas las secciones de la página y que se comporten de la misma forma ante cualquier dispositivo

const Container : React.FC<ContainerProps> = ( { children } ) => {
    return (
        <div className = { "max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4" }>{ children }</div>
    )
}
export default Container;
