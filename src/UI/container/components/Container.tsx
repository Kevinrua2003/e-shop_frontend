import React from 'react';
import { ContainerProps } from "@/UI/container/types/types";

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="max-w-[1920px] mx-auto xl:px-20 md:px-10 px-6 transition-all duration-300">
            {children}
        </div>
    );
};

export default Container;
