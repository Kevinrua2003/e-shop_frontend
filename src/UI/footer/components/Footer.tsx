import React from 'react';
import LinkIcon from "@/UI/buttons/components/LinkIcon";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-10 px-6 rounded-t-2xl shadow-xl">
            <div className="max-w-6xl mx-auto flex flex-col items-center space-y-8">

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
                <div className="w-full border-t border-white/30"></div>

                <p className="text-center text-sm font-medium">
                    &copy; 2025 <span className="font-bold text-yellow-300">Just Learning</span>. Made with <span className="text-red-400">&hearts;</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
