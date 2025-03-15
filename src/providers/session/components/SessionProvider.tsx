"use client"
import { SessionProvider } from "next-auth/react";
import { Props } from "../types/types";

const Provider = ({children}: Props) => {
    return <SessionProvider>{children}</SessionProvider>
};

export default Provider;