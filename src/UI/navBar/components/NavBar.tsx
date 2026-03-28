'use client'

import React from 'react'
import Container from "@/UI/container/components/Container"
import LinkButton from "@/UI/buttons/components/LinkButton"
import NavBarContainer from "@/UI/container/components/NavBarContainer"
import { Redressed } from "next/font/google"
import CartCount from "@/UI/navBar/components/CartCount"
import UserMenu from "@/UI/navBar/components/UserMenu"
import { AiFillHome } from "react-icons/ai"
import CategoryNav from './CategoryNav'
import ThemeToggle from './ThemeToggle'

const redressed = Redressed({ 
    subsets: ['latin'], 
    weight: ['400'],
    variable: '--font-redressed',
    display: 'swap',
});

const NavBar = () => {
    return (
        <header className="
            sticky top-0 z-50
            bg-[hsl(var(--surface))]/80
            backdrop-blur-xl
            border-b border-[hsl(var(--border-subtle))]
            transition-all duration-300
        ">
            <div className="py-3">
                <Container>
                    <NavBarContainer className="flex items-center justify-between gap-4">
                        <LinkButton 
                            link="/" 
                            text="Home" 
                            icon={AiFillHome}
                            className={`
                                ${redressed.variable} 
                                font-bold 
                                text-[hsl(var(--text-primary))]
                                text-xl 
                                flex 
                                flex-row 
                                items-center 
                                justify-center 
                                gap-2
                                hover:text-[hsl(var(--accent))]
                                transition-colors duration-200
                            `}
                        />

                        <nav className="hidden md:flex">
                            <CategoryNav />
                        </nav>

                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <CartCount />
                            <UserMenu />
                        </div>

                    </NavBarContainer>
                </Container>
            </div>
        </header>
    );
};

export default NavBar;
