"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Role } from "@/UI/products/types/types";

interface AuthContextType {
    user: { userId: string; userName: string; userRole: Role } | null;
    login: (email: string, password: string, name?: string) => Promise<void>;
    logout: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
} 

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<{ userId: string; userName: string; userRole: Role } | null>(null);
    const router = useRouter();

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
            method: "GET",
            credentials: "include", 
          });
          if (res.ok) {
            const data = await res.json();

            const rol = data.userRole === 'ADMIN' ? Role.ADMIN: Role.USER;           

            setUser({
              userId: data.userId,
              userName: data.userName,
              userRole: rol,
            });
            console.log(data);
            
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        }
      };
  
      fetchUser();
      }, []);

    const login = async (email: string, password: string, name?: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password, name }),
            });
    
            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message || "Login failed");
                return;
            }
    
            const data = await res.json();
            const rol = data.userRole === 'ADMIN' ? Role.ADMIN: Role.USER; 
            console.log(data.userRole);
            console.log(typeof(data.userRole));           
            
            setUser({ userId: data.userId, userName: data.userName, userRole: rol });    
            router.push("/");
        } catch (error) {
            console.log(error);
            toast.error("Login error");
        }
    };

    const logout = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
          if (res.ok) {
            toast.success("You are logged out");
            setUser(null);
            router.push("/");
          } else {
            toast.error("Logout failed");
          }
        } catch (error) {
          console.error("Logout error:", error);
          toast.error("Logout error");
        }
      };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);