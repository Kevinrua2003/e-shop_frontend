'use client';

import {SelectImageInputProps} from "@/UI/inputs/types/types";
import {useDropzone} from "react-dropzone";
import {useCallback} from "react";

const SelectImageInput: React.FC<SelectImageInputProps> = ({
                                                               item,
                                                               handleFileChange,
                                                           }) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 0){
            if (handleFileChange) {
                handleFileChange(acceptedFiles[0]);
            }
        }
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
        accept: {"image/*" : [".jpg", ".png"]}
    });

    return (
        <div {...getRootProps()} className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal
      text-slate-400 flex items-center justify-center">
            <input {...getInputProps()}/>
            {isDragActive ? (<p>Drop the image...</p>) : (<p>+ {item?.color} Image</p>)}
        </div>
    );
};

export default SelectImageInput;