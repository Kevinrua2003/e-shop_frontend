'use client'
import React, { useState} from 'react'
import Heading from "@/UI/Headings/components/Heading";
import Input from "@/UI/inputs/components/Input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Button from "@/UI/buttons/components/Button";
import Link from "next/link";
import toast from 'react-hot-toast';
import CustomCheckBox from '@/UI/inputs/components/CustomCheckBox';
import axios from 'axios';
import { useAuth } from '@/app/auth/context/AuthContext';
import { Role } from '@/UI/products/types/types';

const RegisterForm = () => {
    const {user} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
            name: "",
            role: Role.USER,
        }
    });

    const onSubmit : SubmitHandler<FieldValues> = async ( data ) => {
        setIsLoading(true);

        const user = {
            name: data.name,
            email: data.email,
            hashedPassword: data.password,
            role: data.role ? 'ADMIN' : 'USER'
        }

        try{
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, user);
            toast.success("You now are registered, please login");
        }
        catch(err: any){
            const loop = err.response.data.message.length
            for (let index = 0; index < loop; index++) {
                toast.error(`Error registering user: ${err.response.data.message[index]}`);
            }            
        }
        window.location.reload();
        setIsLoading(false);
    }
    return (
        <>
            <Heading title = { "Sign up for E~Shop" }/>
            {/* <Button label = { "Sign up with Google" } outline icon = { AiOutlineGoogle } onClick = { () => {
            } }/> */}
            <hr className = "w-full h-px bg-slate-300"/>
            <Input id = { "name" } label = { "name" } disabled = { isLoading } register = { register } required
                   errors = { errors }/>
            <Input id = { "email" } label = { "email" } disabled = { isLoading } register = { register } required
                   errors = { errors }/>
            <Input id = { "password" } label = { "password" } disabled = { isLoading } register = { register } required
                   type = { "password" }
                   errors = { errors }/>
            {user && (user.userRole === Role.ADMIN) &&
                <CustomCheckBox id={'role'} label={'ADMIN'} register={register} />
            }
            <Button disabled = { isLoading } label = { isLoading ? "Loading" : "Sign Up" }
                    onClick = { handleSubmit(onSubmit) }/>
            {!user ? 
                <p className = { "text-sm" }>
                    Already have an account? <Link href = { "/auth/login" } className = { "underline" }>Log in</Link>
                </p>
                :
                <p className = { "text-sm" }>
                    Already logged in 
                </p>
            }
        </>
    )
}
export default RegisterForm
