'use client'
import React, {useEffect, useState} from 'react'
import Heading from "@/UI/Headings/components/Heading";
import Input from "@/UI/inputs/components/Input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Button from "@/UI/buttons/components/Button";
import Link from "next/link";
import { useAuth } from '@/app/auth/context/AuthContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const { login, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        async function redirect(){
            if(user){
                toast.success("You are logged in");
                router.push("/")
            }
        }
        redirect();
    })

    const onSubmit : SubmitHandler<FieldValues> = async ( data ) => {
        setIsLoading(true);

        try {
            await login(data.email, data.password, data.name);
          } catch (error) {
            console.log(error);
            
            toast.error("Error during login");
          } finally {
            setIsLoading(false);
          }
    }
    return (
        <>
            <Heading title = { "Sign in to E~Shop" }/>
            {/* <Button label = { "Continue with Google" } outline icon = { AiOutlineGoogle } onClick = { () => {
            } }/> */}
            <hr className = "w-full h-px bg-slate-300"/>
            <Input id = { "name" } type='text' label = { "name" } required disabled = { isLoading } register = { register }
                   errors = { errors }/>
            <Input id = { "email" } type='email' label = { "email" } required disabled = { isLoading } register = { register }
                   errors = { errors }/>
            <Input id = { "password" } type='password' label = { "password" } required disabled = { isLoading } register = { register }
                   errors = { errors }/>
            <Button disabled = { isLoading } label = { isLoading ? "Loading" : "Login" }
                    onClick = { handleSubmit(onSubmit) }/>
            <p className = { "text-sm" }>
                Do not have an account ? <Link href = { "/auth/register" } className = { "underline" }>Sign up</Link>
            </p>
        </>
    )
}
export default LoginForm
