import React from 'react';
import LinkIcon from "@/UI/buttons/components/LinkIcon";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-10 px-6 rounded-t-2xl shadow-xl">
            <div className="max-w-6xl mx-auto flex flex-col items-center space-y-8">
                
                {/* Navegación */}
                <nav className="flex flex-wrap justify-center gap-6 text-lg font-semibold tracking-wide">
                    <a className="hover:text-yellow-300 transition-all duration-300 hover:underline" href="#">Home</a>
                    <a className="hover:text-yellow-300 transition-all duration-300 hover:underline" href="#">About</a>
                    <a className="hover:text-yellow-300 transition-all duration-300 hover:underline" href="#">Services</a>
                    <a className="hover:text-yellow-300 transition-all duration-300 hover:underline" href="#">Media</a>
                    <a className="hover:text-yellow-300 transition-all duration-300 hover:underline" href="#">Gallery</a>
                    <a className="hover:text-yellow-300 transition-all duration-300 hover:underline" href="#">Contact</a>
                </nav>

                {/* Redes Sociales */}
                <div className="flex justify-center space-x-6">
                    <LinkIcon link={"https://facebook.com"}>
                        <MdFacebook size={32} className="hover:scale-125 transition-transform duration-300 hover:text-blue-300" />
                    </LinkIcon>
                    <LinkIcon link={"https://x.com"}>
                        <AiFillTwitterCircle size={32} className="hover:scale-125 transition-transform duration-300 hover:text-blue-300" />
                    </LinkIcon>
                    <LinkIcon link={"https://instagram.com"}>
                        <AiFillInstagram size={32} className="hover:scale-125 transition-transform duration-300 hover:text-pink-400" />
                    </LinkIcon>
                    <LinkIcon link={"https://youtube.com"}>
                        <AiFillYoutube size={32} className="hover:scale-125 transition-transform duration-300 hover:text-red-400" />
                    </LinkIcon>
                </div>

                {/* Línea divisoria */}
                <div className="w-full border-t border-white/30"></div>

                {/* Derechos de autor */}
                <p className="text-center text-sm font-medium">
                    &copy; 2025 <span className="font-bold text-yellow-300">Just Learning</span>. Made with <span className="text-red-400">&hearts;</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
