'use client';

import { useCallback, useState } from "react";
import { Avatar } from "@mui/material";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "@/UI/navBar/components/MenuItem";
import BackDrop from "@/UI/navBar/components/BackDrop";
import { useAuth } from "@/app/auth/context/AuthContext";
import { Role } from "@/UI/products/types/types";
import { MdAdminPanelSettings, MdAppRegistration, MdLogin, MdLogout } from "react-icons/md";

const UserMenu = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <>
            <div className="relative z-30">
                <div 
                    onClick={toggleOpen}
                    className="p-2 flex items-center gap-2 rounded-full cursor-pointer shadow-md transition-all duration-300 
                    bg-gradient-to-r from-blue-500 to-purple-500 text-white border border-white hover:scale-110 hover:shadow-lg"
                >
                    <Avatar className="border border-white shadow-sm" />
                    <AiFillCaretDown className="text-lg transition-transform duration-300" />
                </div>

                {isOpen && (
                    <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg overflow-hidden animate-fadeIn">
                        {user && user.userRole === Role.ADMIN && (
                            <Link href="/admin">
                                <div 
                                    onClick={toggleOpen}
                                    className="flex items-center gap-2 p-3 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                                >
                                    <MdAdminPanelSettings className="text-xl text-indigo-600" />
                                    <MenuItem>Admin Panel</MenuItem>
                                </div>
                            </Link>
                        )}

                        {!user && (
                            <Link href="/auth/login">
                                <div 
                                    onClick={toggleOpen}
                                    className="flex items-center gap-2 p-3 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                                >
                                    <MdLogin className="text-xl text-green-600" />
                                    <MenuItem>Login</MenuItem>
                                </div>
                            </Link>
                        )}

                        <Link href="/auth/register">
                            <div 
                                onClick={toggleOpen}
                                className="flex items-center gap-2 p-3 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                            >
                                <MdAppRegistration className="text-xl text-blue-600" />
                                <MenuItem>Register</MenuItem>
                            </div>
                        </Link>

                        {user && (
                            <div 
                                onClick={() => { toggleOpen(); logout(); }}
                                className="flex items-center gap-2 p-3 hover:bg-red-100 transition-all duration-200 cursor-pointer"
                            >
                                <MdLogout className="text-xl text-red-600" />
                                <MenuItem>Log Out</MenuItem>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isOpen && <BackDrop onClick={toggleOpen} />}
        </>
    );
};

export default UserMenu;
