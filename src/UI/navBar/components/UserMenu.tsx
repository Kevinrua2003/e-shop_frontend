'use client';

import {useCallback, useState} from "react";
import {Avatar} from "@mui/material";
import {AiFillCaretDown} from "react-icons/ai";
import Link from "next/link";
import MenuItem from "@/UI/navBar/components/MenuItem";
import BackDrop from "@/UI/navBar/components/BackDrop";
import { useAuth } from "@/app/auth/context/AuthContext";
import { Role } from "@/UI/products/types/types";

const UserMenu = () => {

    const {user} = useAuth();

    const {logout} = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => { setIsOpen((prev) => !prev)}, [])

    return (
        <>
            <div className=" relative z-30">
                <div onClick={toggleOpen}
                     className="p-2 border-[1px] border-slate-400 flex flex-row items-center
                gap-1 rounded-full cursor-pointer shadow-md transition text-slate-700"
                >
                    <Avatar/>
                    <AiFillCaretDown/>
                </div>
                {isOpen &&
                    (<div className={"absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer"}>
                            <div>
                                {/* <Link href={"/orders"}>
                                    <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                                </Link> */}
                                {user && (user.userRole === Role.ADMIN) &&
                                    <Link href={"/admin"}>
                                        <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                                    </Link>
                                }
                            </div>
                            <div>
                                {!user &&
                                    <Link href={"/auth/login"}>
                                        <MenuItem onClick={toggleOpen}>Login</MenuItem>
                                    </Link>
                                }
                                <Link href={"/auth/register"}>
                                        <MenuItem onClick={toggleOpen}>Register</MenuItem>
                                </Link>
                                {user &&
                                    <MenuItem onClick={ () => {toggleOpen(); logout()}}>Log Out</MenuItem>
                                }
                            </div>
                        </div>
                    )}
            </div>
            {isOpen ? <BackDrop onClick={toggleOpen}/> : null};
        </>
    );
};

export default UserMenu;