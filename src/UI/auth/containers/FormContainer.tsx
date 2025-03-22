import React from 'react';

const FormContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-100 p-6">
            <div className="max-w-[650px] w-full h-full flex flex-col gap-6 items-stretch justify-center bg-white shadow-2xl rounded-2xl p-6 md:p-10 border border-gray-200 transition-all duration-300">
                {children}
            </div>
        </div>
    );
};

export default FormContainer;
