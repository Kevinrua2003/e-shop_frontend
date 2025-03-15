import React from 'react'
import {InputProps} from "@/UI/inputs/types/types";

const Input : React.FC<InputProps> = ( {
                                           id,
                                           label,
                                           type,
                                           disabled,
                                           required,
                                           large,
                                           register,
                                           errors,

                                       } ) => {
    return (
        <div className = { "w-full relative" }>
            <input
                autoComplete = { "off" }
                id = { id }
                disabled = { disabled }
                { ...register(id, { required }) }
                placeholder = { "" }
                type = { type }
                className = { `
                  peer
                  w-full
                  p-4 
                  pt-6 
                  outline-none 
                  bg-white 
                  border-2 
                  rounded-md 
                  transition 
                  disabled:opacity-70 
                  disabled:cursor-not-allowed
                  ${ errors[id] ? "border-rose-400" : "border-slate-300" }
                  ${ errors[id] ? "focus:border-rose-400" : "focus:border-slate-300" }
                  ${ large && "max-h-[150px] min-h-[150px]" }
                  ` }/>
            <label htmlFor = { id }
                   className = { `absolute 
                   cursor-text 
                   text-md 
                   duration-150 
                   -translate-y-3 
                   top-5 
                   z-10 
                   origin-[0] 
                   left-4 
                   peer-placeholder-shown:scale-100 
                   peer-placeholder-shown:translate-y-0 
                   peer-focus:scale-75 
                   peer-focus:-translate-y-4
                   ${ errors[id] ? "text-rose-500" : "text-slate-400" }` }>
                { label }
            </label>
        </div>
    )
}
export default Input
