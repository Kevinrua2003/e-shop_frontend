import {IconType} from "react-icons";

export interface LinkButtonProps {
    link : string,
    text : string,
    className : string,
    icon?: IconType,
}

export interface LinkIconProps {
    children : React.ReactNode;
    link : string;
}

export interface ButtonProps {
    label : string,
    disabled? : boolean,
    outline? : boolean,
    small? : boolean,
    custom? : string,
    icon? : IconType,
    onClick? : ( e : React.MouseEvent<HTMLButtonElement> ) => void,

}