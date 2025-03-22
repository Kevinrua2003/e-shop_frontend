'use client';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from '@/app/auth/context/AuthContext';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Role } from '@/UI/products/types/types';
import CustomCheckBox from '@/UI/inputs/components/CustomCheckBox';

const RegisterForm = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: Role.USER,
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        const newUser = {
            name: data.name,
            email: data.email,
            hashedPassword: data.password,
            role: data.role ? 'ADMIN' : 'USER'
        };
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, newUser);
            toast.success("You are now registered, please login");
        } catch (err: any) {
            err.response.data.message.forEach((msg: string) =>
                toast.error(`Error registering user: ${msg}`)
            );
        }
        window.location.reload();
        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 p-6">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200"
            >
                <h2 className="text-3xl font-extrabold text-center text-gray-800 drop-shadow-lg">Create an Account</h2>
                <p className="text-center text-gray-500 mb-6">Sign up to get started</p>
                <hr className="w-full h-px bg-gray-300 my-4" />
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Name</label>
                        <input {...register("name")} type="text" disabled={isLoading} 
                            className="p-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            placeholder="Enter your name"/>
                        {errors.name && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Email</label>
                        <input {...register("email")} type="email" disabled={isLoading} 
                            className="p-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            placeholder="Enter your email"/>
                        {errors.email && <span className="text-red-500 text-sm mt-1">Invalid email</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Password</label>
                        <input {...register("password")} type="password" disabled={isLoading} 
                            className="p-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            placeholder="Enter your password"/>
                        {errors.password && <span className="text-red-500 text-sm mt-1">Password required</span>}
                    </div>
                    {user && user.userRole === Role.ADMIN && (
                        <CustomCheckBox id="role" label="ADMIN" register={register} />
                    )}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-md shadow-lg transition-all"
                        type="submit"
                    >
                        {isLoading ? "Loading..." : "Sign Up"}
                    </motion.button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account? <Link href="/auth/login" className="text-purple-600 hover:text-purple-800 transition-all font-semibold">Log in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default RegisterForm;