"use client";
import React, { useState } from "react";
import { API_URL } from "@/utils/api";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/UI/inputs/components/Input";
import Button from "@/UI/buttons/components/Button";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Validación previa acorde al backend (CreateUserDto: 8-16 caracteres).
    if (
      typeof data.password !== "string" ||
      data.password.length < 8 ||
      data.password.length > 16
    ) {
      toast.error("Password must be between 8 and 16 characters");
      return;
    }

    setIsLoading(true);
    // El backend siempre crea usuarios con rol USER en el registro público.
    const newUser = {
      name: data.name,
      email: data.email,
      hashedPassword: data.password,
    };
    try {
      const res = await fetch(
        `${API_URL}/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        }
      );
      if (res.ok) {
        toast.success("You are now registered, please login");
        router.refresh();
      } else {
        const errorData = await res.json();
        if (Array.isArray(errorData?.message)) {
          errorData.message.forEach((msg: string) => {
            toast.error(`Error: ${msg}`);
          });
        } else {
          toast.error(`Error: ${errorData.message || "Unknown error"}`);
        }
      }
    } catch {
      toast.error("Network error. Please try again.");
    }
    setIsLoading(false);
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
          Create an Account
        </h2>
        <p className="
            text-center 
            text-[hsl(var(--text-muted))] 
            text-sm
            mb-6
        ">
          Sign up to get started
        </p>
        
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="name"
            label="Name"
            disabled={isLoading}
            required
            register={register}
            errors={errors}
          />
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
          <p className="text-xs text-[hsl(var(--text-muted))] -mt-3">
            Password must be 8 to 16 characters
          </p>
          <Button
            label={isLoading ? "Loading..." : "Sign Up"}
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
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="
                text-[hsl(var(--accent))]
                hover:underline
                font-medium
            "
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
