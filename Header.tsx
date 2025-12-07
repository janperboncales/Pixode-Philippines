import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom'; // The import paths are correct for v6. If you encounter 'Module has no exported member' errors, please ensure `react-router-dom` and `@types/react-router-dom` are installed and up-to-date (v6 or later).

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const navItems = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/projects", name: "Projects" },
    { path: "/partnerships", name: "Partnerships" },
    { path: "/contact", name: "Contact" },
];

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [lineStyle, setLineStyle] = useState({});
    
    const navRef = useRef<HTMLElement>(null);
    const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const location = useLocation();

     useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const updateLinePosition = () => {
        const activeLinkIndex = navItems.findIndex(item => item.path === location.pathname);
        const activeLinkEl = navLinksRef.current[activeLinkIndex];
        
        if (activeLinkEl && navRef.current) {
            const navRect = navRef.current.getBoundingClientRect();
            const linkRect = activeLinkEl.getBoundingClientRect();
            setLineStyle({
                width: linkRect.width,
                left: linkRect.left - navRect.left,
                opacity: 1,
            });
        } else {
             setLineStyle({ opacity: 0, width: 0 });
        }
    };
    
    useEffect(() => {
       const timer = setTimeout(updateLinePosition, 100); // Initial position after mount
       window.addEventListener('resize', updateLinePosition); // Update on resize
       return () => {
           clearTimeout(timer);
           window.removeEventListener('resize', updateLinePosition);
       }
    }, [location.pathname]); // Update when route changes

    if (location.pathname === '/login') {
        return null;
    }

    return (
        <>
            <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                <div className={`flex items-center gap-2 bg-black/30 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-purple-500/20 transition-all duration-300 ${isScrolled ? 'py-2 px-6' : 'py-3 px-8'}`}>
                    <a 
                        href="https://pixodeapply.vercel.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-2xl font-bold font-montserrat animate-text-lights flex-shrink-0 mr-4 hover:opacity-80 transition-opacity"
                    >
                        PIXODE
                    </a>
                    
                    <nav ref={navRef} className="hidden md:flex relative items-center space-x-1">
                        {navItems.map((item, index) => (
                             <NavLink 
                                key={item.path}
                                to={item.path}
                                ref={el => { navLinksRef.current[index] = el; }}
                                className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-300"
                            >
                                {item.name}
                            </NavLink>
                        ))}
                       <div className="magic-line" style={lineStyle}></div>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link to="/contact" className="hidden md:block px-3 py-1 text-xs font-medium text-white animate-background-lights rounded-full focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                            Inquire Now
                        </Link>

                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none p-2">
                                {isOpen ? <XIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            {isOpen && (
                 <div className="md:hidden fixed top-24 left-4 right-4 z-40 bg-black/70 backdrop-blur-xl border border-white/10 rounded-3xl animate-fade-in-down">
                    <nav className="flex flex-col items-center space-y-2 p-4">
                       {navItems.map(item => (
                             <NavLink 
                                key={item.path}
                                to={item.path} 
                                onClick={() => setIsOpen(false)} 
                                className={({ isActive }) => `w-full text-center px-4 py-3 rounded-lg text-gray-300 transition-all duration-300 ${isActive ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/10'}`}
                            >
                                {item.name}
                            </NavLink>
                       ))}
                        <Link to="/contact" onClick={() => setIsOpen(false)} className="mt-4 w-full text-center px-5 py-3 text-sm font-medium text-white animate-background-lights rounded-lg focus:ring-4 focus:outline-none focus:ring-ring-purple-300">
                            Inquire Now
                        </Link>
                    </nav>
                </div>
            )}
        </>
    );
};

export default Header;