"use client"
import AdminNav from "@/UI/admin/components/AdminNav";
// import { useAuth } from "../auth/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { Role } from "@/UI/products/types/types";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    // const { user } = useAuth();
    // const router = useRouter();

    // useEffect(() => {
    //     if (user && user.userRole !== Role.ADMIN) {
    //         router.push("/");
    //     }
    // }, [user, router]);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (user === null) {
    //             router.push("/");
    //         }
    //     }, 1000);
    //     return () => clearTimeout(timer);
    // }, [user, router]);

    // if (!user) return null; 

    return (
        <div>
            <AdminNav />
            {children}
        </div>
    );
};

export default AdminLayout;
