import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import {IconType} from "react-icons";

export interface InputProps {
    id : string;
    label : string;
    type? : string;
    disabled? : boolean;
    required? : boolean;
    large? : boolean;
    register : UseFormRegister<FieldValues>;
    errors : FieldErrors;
}

export interface CustomCheckBoxProps{
    id: string;
    label: string;
    disabled?: boolean;
    register : UseFormRegister<FieldValues>;
}

export interface CategoryInputProps{
    label: string;
    icon: IconType;
    selected?: boolean;
    onClick: (value: string) => void;
}

export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null;
}

export type UploadedImageType = {
    color: string;
    colorCode: string;
    image: string;
}