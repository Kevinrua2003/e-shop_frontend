import React from 'react';
import LinkIcon from "@/UI/buttons/components/LinkIcon";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="
            mt-auto
            bg-[hsl(var(--surface-elevated))]
            border-t border-[hsl(var(--border-subtle))]
            py-10 px-6
        ">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-center gap-6 mb-6">
                    <LinkIcon link={"https://facebook.com"}>
                        <MdFacebook 
                            size={24} 
                            className="
                                text-[hsl(var(--text-muted))]
                                hover:text-[hsl(var(--accent))]
                                transition-colors duration-200
                            " 
                        />
                    </LinkIcon>
                    <LinkIcon link={"https://x.com"}>
                        <AiFillTwitterCircle 
                            size={24} 
                            className="
                                text-[hsl(var(--text-muted))]
                                hover:text-[hsl(var(--accent))]
                                transition-colors duration-200
                            " 
                        />
                    </LinkIcon>
                    <LinkIcon link={"https://instagram.com"}>
                        <AiFillInstagram 
                            size={24} 
                            className="
                                text-[hsl(var(--text-muted))]
                                hover:text-[hsl(var(--accent))]
                                transition-colors duration-200
                            " 
                        />
                    </LinkIcon>
                    <LinkIcon link={"https://youtube.com"}>
                        <AiFillYoutube 
                            size={24} 
                            className="
                                text-[hsl(var(--text-muted))]
                                hover:text-[hsl(var(--accent))]
                                transition-colors duration-200
                            " 
                        />
                    </LinkIcon>
                </div>
                
                <div className="w-full h-px bg-[hsl(var(--border-subtle))] mb-6"></div>

                <p className="text-center text-sm text-[hsl(var(--text-muted))]">
                    &copy; {currentYear} <span className="text-[hsl(var(--text-primary))] font-medium">E-Shop</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
