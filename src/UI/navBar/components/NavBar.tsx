import React from 'react'
import Container from "@/UI/container/components/Container"
import LinkButton from "@/UI/buttons/components/LinkButton"
import NavBarContainer from "@/UI/container/components/NavBarContainer"
import { Redressed } from "next/font/google"
import CartCount from "@/UI/navBar/components/CartCount"
import UserMenu from "@/UI/navBar/components/UserMenu"
import { AiFillHome } from "react-icons/ai"
import CategoryNav from './CategoryNav'

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });

const NavBar = () => {
    return (
        <nav className="sticky top-0 w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 z-50 shadow-lg backdrop-blur-md bg-opacity-90 transition-all duration-300">
            <div className="py-4 border-b border-white/30">
                <Container>
                    <NavBarContainer className="flex items-center justify-between gap-3 md:gap-0">
                        <div className="rounded-full border border-white/50 bg-white/20 backdrop-blur-lg w-[140px] flex flex-row p-2 items-center justify-center text-center hover:scale-105 transition-all duration-300 shadow-md">
                            <LinkButton 
                                link="/" 
                                text="Home" 
                                icon={AiFillHome}
                                className={`${redressed.className} font-bold text-white text-lg flex flex-row items-center justify-center gap-2`}
                            />
                        </div>

                        <div className="hidden md:flex">
                            <CategoryNav />
                        </div>

                        <div className="flex gap-6 items-center">
                            <CartCount />
                            <UserMenu />
                        </div>

                    </NavBarContainer>
                </Container>
            </div>
        </nav>
    );
};

export default NavBar;
