import React from 'react'
import Container from "@/UI/container/components/Container";
import FooterList from "@/UI/footer/components/FooterList";
import LinkButton from "@/UI/buttons/components/LinkButton";
import LinkIcon from "@/UI/buttons/components/LinkIcon";
import {MdFacebook} from "react-icons/md";
import {AiFillInstagram, AiFillTwitterCircle, AiFillYoutube} from "react-icons/ai";

const Footer = () => {
    return (
        <footer className = { "bg-slate-700 bg-slate-200 text-sm mt-16" }>
            <Container>
                <div className = "flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className = { "text-slate-100 font-bold" }>Shop Categories</h3>
                        <LinkButton link = { "#" } text = { "Phones" } className = { "text-slate-100" }></LinkButton>
                        <LinkButton link = { "#" } text = { "Laptops" } className = { "text-slate-100" }></LinkButton>
                        <LinkButton link = { "#" } text = { "Desktops" } className = { "text-slate-100" }></LinkButton>
                        <LinkButton link = { "#" } text = { "Watches" } className = { "text-slate-100" }></LinkButton>
                        <LinkButton link = { "#" } text = { "Tvs" } className = { "text-slate-100" }></LinkButton>
                        <LinkButton link = { "#" } text = { "Accessories" }
                                    className = { "text-slate-100" }></LinkButton>
                    </FooterList>
                    <FooterList>
                        <h3 className = { "text-slate-100 font-bold" }>Customer Services</h3>
                        <LinkButton link = { "#" } text = { "Contact Us" }
                                    className = { "text-slate-100" }></LinkButton>
                        <LinkButton link = { "#" } text = { "Shipping Policy" }
                                    className = { "text-slate-100" }></LinkButton>
                        <LinkButton link = { "#" } text = { "Returns & Exchanges" }
                                    className = { "text-slate-100" }></LinkButton>
                        <LinkButton link = { "#" } text = { "FAQs" } className = { "text-slate-100" }></LinkButton>
                    </FooterList>
                    <FooterList>
                        <h3 className = { "text-slate-100 font-bold" }>About Us</h3>
                        <p className = { "text-slate-100" }>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Cupiditate delectus esse facere
                            fugiat illo, impedit ipsa, iste iure non nostrum nulla rem repudiandae sequi sit totam
                            veniam voluptate voluptatibus voluptatum.</p>
                    </FooterList>
                    <FooterList>
                        <h3 className = { "text-slate-100 font-bold" }>Follow Us</h3>
                        <div className = { "flex gap-2" }>
                            <LinkIcon link = { "facebook.com" }>
                                <MdFacebook size = { 24 } color = { "ddd" }/>
                            </LinkIcon>
                            <LinkIcon link = { "x.com" }>
                                <AiFillTwitterCircle size = { 24 } color = { "ddd" }/>
                            </LinkIcon>
                            <LinkIcon link = { "instagram.com" }>
                                <AiFillInstagram size = { 24 } color = { "ddd" }/>
                            </LinkIcon>
                            <LinkIcon link = { "youtube.com" }>
                                <AiFillYoutube size = { 24 } color = { "ddd" }/>
                            </LinkIcon>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
    )
}
export default Footer
