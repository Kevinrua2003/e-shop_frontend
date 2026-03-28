'use client';
import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from '@/app/auth/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Input from "@/UI/inputs/components/Input";
import Button from "@/UI/buttons/components/Button";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { login, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            toast.success("Welcome back!");
            router.push("/");
        }
    }, [user, router]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            await login(data.email, data.password);
        } catch (error) {
            console.log(error);
            toast.error("Invalid credentials");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="
            min-h-[calc(100vh-var(--nav-height))]
            flex items-center justify-center
            bg-[hsl(var(--background))]
            p-6
        ">
            <div className="
                w-full max-w-md
                bg-[hsl(var(--surface-elevated))]
                border border-[hsl(var(--border-subtle))]
                rounded-[var(--radius-lg)]
                p-8
                shadow-[var(--shadow-md)]
            ">
                <h2 className="
                    text-2xl 
                    font-bold 
                    text-center 
                    text-[hsl(var(--text-primary))]
                    mb-2
                ">
                    Welcome Back!
                </h2>
                <p className="
                    text-center 
                    text-[hsl(var(--text-muted))] 
                    text-sm
                    mb-6
                ">
                    Sign in to continue
                </p>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        disabled={isLoading}
                        required
                        register={register}
                        errors={errors}
                    />

                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        disabled={isLoading}
                        required
                        register={register}
                        errors={errors}
                    />

                    <Button
                        label={isLoading ? "Loading..." : "Login"}
                        disabled={isLoading}
                        variant="primary"
                    />
                </form>

                <p className="
                    text-center 
                    text-sm 
                    text-[hsl(var(--text-muted))] 
                    mt-6
                ">
                    {"Don't have an account?"}
                    <Link 
                        href="/auth/register" 
                        className="
                            text-[hsl(var(--accent))]
                            hover:underline
                            font-medium
                            ml-1
                        "
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
