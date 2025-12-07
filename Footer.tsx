
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // The import paths are correct for v6. If you encounter 'Module has no exported member' errors, please ensure `react-router-dom` and `@types/react-router-dom` are installed and up-to-date (v6 or later).

const SocialIcon: React.FC<React.PropsWithChildren<{ href: string }>> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
        {children}
    </a>
);

const Footer: React.FC = () => {
    const location = useLocation();

    // Hide Footer on Dashboard and Login Pages
    if (location.pathname.startsWith('/dashboard') || location.pathname === '/login') {
        return null;
    }

    return (
        <footer className="bg-[#110e1a] border-t border-purple-500/20 mt-20">
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-lg font-bold font-montserrat animate-text-lights">
                            PIXODE
                        </h3>
                        <p className="text-gray-400 mt-3 text-sm">
                            Crafting next-generation websites and apps that help brands grow, connect, and stand out.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white">Quick Links</h4>
                        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                            <li><Link to="/" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">About</Link></li>
                            <li><Link to="/projects" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Projects</Link></li>
                            <li><Link to="/partnerships" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Partnerships</Link></li>
                            <li><Link to="/contact" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Contact</Link></li>
                            {/* <li><Link to="/login" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Employee Login</Link></li> */}
                        </ul>
                        <div className="mt-4">
                            <a
                                href="https://pixodeapply.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-600 rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Be One Of Us
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white">Contact</h4>
                        <ul className="mt-3 space-y-1.5 text-gray-400 text-sm">
                            <li>Email: pixodeofficial@gmail.com</li>
                            <li>Phone: (+63) 992-662-2310</li>
                            <li>Address: Legazpi City, Albay | Fort Bonifacio, Bonifacio Global City</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white">Follow Us</h4>
                        {/* EDIT SOCIAL MEDIA LINKS HERE */}
                        <div className="flex space-x-4 mt-3">
                           <SocialIcon href="https://www.facebook.com/share/17mHeTutdW/">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                           </SocialIcon>
                        </div>
                    </div>
                </div>
                <div className="mt-6 border-t border-purple-500/20 pt-4 text-center text-gray-500 text-xs">
                    <p>&copy; {new Date().getFullYear()} PIXODE Philippines. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
