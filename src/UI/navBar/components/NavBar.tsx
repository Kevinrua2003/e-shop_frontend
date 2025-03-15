import React from 'react'
import Container from "@/UI/container/components/Container";
import LinkButton from "@/UI/buttons/components/LinkButton";
import NavBarContainer from "@/UI/container/components/NavBarContainer";
import {Redressed} from "next/font/google";
import CartCount from "@/UI/navBar/components/CartCount";
import UserMenu from "@/UI/navBar/components/UserMenu";
import {AiFillHome} from "react-icons/ai";
import SearchBar from './SearchBar';

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });

const NavBar = () => {
    return (
        <nav className = { "sticky top-0 w-full bg-slate-200 z-30 shadow-sm" }>
            <div className = { "py-4 border-b-[1px]" }>
                <Container>
                    <NavBarContainer className = { "flex items-center justify-between gap-3 md:gap-0" }>
                        <div className={"rounded-full border border-slate-500 w-[120px] flex flex-row p-1 items-center justify-center text-center"}>
                            <LinkButton link = { "/" } text = { "E-Shop" } icon={<AiFillHome/>}
                                        className = { `${ redressed.className } p-1 font-bold text-2xl flex flex-row items-center justify-center` }/>
                        </div>
                        <div>
                            <SearchBar/>
                        </div>
                        <div className = { "flex gap-8 items-center justify-center " }> {/*TO-DO convertir este div en un container component*/ }
                            <CartCount/>
                            <UserMenu/>
                        </div>
                    </NavBarContainer>
                </Container>
            </div>
        </nav>
    )
}
export default NavBar
