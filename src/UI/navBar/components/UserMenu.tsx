'use client';

import { useCallback, useState, useRef, useEffect } from "react";
import { Avatar } from "@mui/material";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "@/UI/navBar/components/MenuItem";
import BackDrop from "@/UI/navBar/components/BackDrop";
import { useAuth } from "@/app/auth/context/AuthContext";
import { Role } from "@/UI/products/types/types";
import { MdAdminPanelSettings, MdAppRegistration, MdLogin, MdLogout, MdPersonPin } from "react-icons/md";

const UserMenu = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <div className="relative z-30" ref={menuRef}>
                <button 
                    onClick={toggleOpen}
                    className="
                        p-1.5 
                        flex items-center gap-2 
                        rounded-[var(--radius-md)]
                        cursor-pointer 
                        transition-all duration-200 
                        border border-[hsl(var(--border))]
                        bg-[hsl(var(--surface-elevated))]
                        hover:border-[hsl(var(--accent)/0.3)]
                    "
                >
                    <Avatar 
                        sx={{ width: 28, height: 28 }} 
                        className="border border-[hsl(var(--border))]"
                    />
                    <AiFillCaretDown className={`
                        text-xs 
                        transition-transform duration-200 
                        text-[hsl(var(--text-secondary))]
                        ${isOpen ? 'rotate-180' : ''}
                    `} />
                </button>

                {isOpen && (
                    <div className="
                        absolute right-0 top-12 
                        w-56 
                        bg-[hsl(var(--surface-elevated))]
                        border border-[hsl(var(--border-subtle))]
                        rounded-[var(--radius-md)]
                        shadow-[var(--shadow-lg)]
                        overflow-hidden
                        animate-in fade-in slide-in-from-top-2 duration-200
                    ">
                        {user && user.userRole === Role.ADMIN && (
                            <Link href="/admin">
                                <div 
                                    onClick={toggleOpen}
                                    className="
                                        flex items-center gap-3 
                                        p-3 
                                        text-[hsl(var(--text-primary))]
                                        hover:bg-[hsl(var(--surface-hover))] 
                                        transition-colors duration-150 
                                        cursor-pointer
                                    "
                                >
                                    <MdAdminPanelSettings className="text-lg" />
                                    <MenuItem>Admin Panel</MenuItem>
                                </div>
                            </Link>
                        )}

                        {user && user.userRole === Role.USER && (
                            <Link href={`/user/${user.userId}`}>
                                <div 
                                    onClick={toggleOpen}
                                    className="
                                        flex items-center gap-3 
                                        p-3 
                                        text-[hsl(var(--text-primary))]
                                        hover:bg-[hsl(var(--surface-hover))] 
                                        transition-colors duration-150 
                                        cursor-pointer
                                    "
                                >
                                    <MdPersonPin className="text-lg" />
                                    <MenuItem>Your Orders</MenuItem>
                                </div>
                            </Link>
                        )}

                        {!user && (
                            <Link href="/auth/login">
                                <div 
                                    onClick={toggleOpen}
                                    className="
                                        flex items-center gap-3 
                                        p-3 
                                        text-[hsl(var(--text-primary))]
                                        hover:bg-[hsl(var(--surface-hover))] 
                                        transition-colors duration-150 
                                        cursor-pointer
                                    "
                                >
                                    <MdLogin className="text-lg" />
                                    <MenuItem>Login</MenuItem>
                                </div>
                            </Link>
                        )}

                        <Link href="/auth/register">
                            <div 
                                onClick={toggleOpen}
                                className="
                                    flex items-center gap-3 
                                    p-3 
                                    text-[hsl(var(--text-primary))]
                                    hover:bg-[hsl(var(--surface-hover))] 
                                    transition-colors duration-150 
                                    cursor-pointer
                                "
                            >
                                <MdAppRegistration className="text-lg" />
                                <MenuItem>Register</MenuItem>
                            </div>
                        </Link>

                        {user && (
                            <div 
                                onClick={() => { toggleOpen(); logout(); }}
                                className="
                                    flex items-center gap-3 
                                    p-3 
                                    text-[hsl(var(--error))]
                                    hover:bg-[hsl(var(--error)/0.1)] 
                                    transition-colors duration-150 
                                    cursor-pointer
                                    border-t border-[hsl(var(--border-subtle))]
                                "
                            >
                                <MdLogout className="text-lg" />
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
