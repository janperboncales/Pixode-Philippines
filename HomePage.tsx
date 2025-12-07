import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioProjects as staticProjects, services, whyChoosePixode, partners, Project } from './data';
import { supabase } from './supabaseClient';

const AnimatedSection: React.FC<React.PropsWithChildren<{ delay?: number }>> = ({ children, delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return (
        <div 
            ref={ref} 
            className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// Helper function to normalize technologies array
const normalizeTechnologies = (techs: any): string[] => {
    return Array.isArray(techs) ? techs.filter((tech: any) => typeof tech === 'string') as string[] : [];
};


const HomePage: React.FC = () => {
    const [recentProjects, setRecentProjects] = useState<Project[]>(staticProjects.slice(0, 4));

    // Fetch projects from Supabase on load
    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(4);

            if (error) {
                console.error("Error fetching projects:", error.message);
            } else if (data && data.length > 0) {
                setRecentProjects(data.map(p => ({ ...p, technologies: normalizeTechnologies(p.technologies) })) as Project[]);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a031a] via-[#1a0f33] to-[#0a031a] z-10"></div>
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-900 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-900 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
                </div>
                <div className="relative z-20 container mx-auto px-4 sm:px-6">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-montserrat leading-tight animate-fade-in-down">
                        We Build Digital Experiences
                        <span className="animate-text-lights block mt-2 md:mt-4">That Inspire.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        At PIXODE, we craft next-generation websites and apps that help business grow, connect, and stand out.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                        <Link to="/contact" className="px-8 py-4 text-lg font-semibold text-white animate-background-lights rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                            📃 Get Started
                        </Link>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="bg-[#0a031a]">
                
                {/* Services Section */}
                <section id="services" className="py-20 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6">
                        <AnimatedSection>
                             <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-center mb-16">What We Do</h2>
                             <p className="max-w-3xl mx-auto text-center text-gray-400 text-lg">We offer a complete suite of digital services to help your brand succeed in the online world.</p>
                        </AnimatedSection>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                            {services.map((service, index) => (
                                <AnimatedSection key={index} delay={index * 100}>
                                    <div className="bg-white/5 p-8 rounded-xl border border-white/10 h-full transform hover:-translate-y-2 transition-transform duration-300">
                                        {/* Render SVG string directly using dangerouslySetInnerHTML */}
                                        <div className="text-purple-400 mb-4" dangerouslySetInnerHTML={{ __html: service.icon }}></div>
                                        <h3 className="text-xl font-bold animate-text-lights mb-3">{service.title}</h3>
                                        <p className="text-gray-400">{service.description}</p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Featured Projects Section */}
                <section id="portfolio" className="py-20 md:py-24 bg-black/20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <AnimatedSection>
                            <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-center mb-16">Our Recent Work</h2>
                        </AnimatedSection>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {recentProjects.map((project, index) => (
                               <AnimatedSection key={project.id} delay={index * 100}>
                                    <Link to={`/projects/${project.id}`} className="block group relative overflow-hidden rounded-xl shadow-2xl hover:shadow-purple-500/30 transition-shadow duration-500">
                                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500"></div>
                                            <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/20 transition-colors duration-500"></div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-purple-200 transition-colors duration-300">{project.title}</h3>
                                            <p className="animate-text-lights font-semibold text-sm sm:text-base mb-2">{project.type}</p>
                                            <div className="max-h-0 group-hover:max-h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                                                <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 mt-2">{project.overview}</p>
                                            </div>
                                        </div>
                                    </Link>
                               </AnimatedSection>
                            ))}
                        </div>
                        <AnimatedSection>
                            <div className="text-center mt-12">
                                <Link to="/projects" className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white animate-background-lights rounded-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                                    View All Projects
                                </Link>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                 {/* Why Choose Us Section */}
                <section className="py-20 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6">
                         <AnimatedSection>
                            <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-center mb-16">Why Choose PIXODE</h2>
                         </AnimatedSection>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {whyChoosePixode.map((feature, index) => (
                                <AnimatedSection key={index} delay={index * 100}>
                                    <div className="bg-white/5 p-8 rounded-xl border border-white/10 h-full transform hover:-translate-y-2 transition-transform duration-300">
                                        <h3 className="text-xl font-bold animate-text-lights mb-3">{feature.title}</h3>
                                        <p className="text-gray-400">{feature.description}</p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Partners Section */}
                <section className="py-20 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6">
                        <AnimatedSection>
                            <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-center mb-4">Our Partners & Friends</h2>
                             <p className="max-w-2xl mx-auto text-center text-gray-400 mb-16">We're proud to collaborate with these industry leaders.</p>
                        </AnimatedSection>
                         <AnimatedSection>
                            <div className="relative w-full overflow-hidden marquee-container">
                                <div className="flex w-max animate-marquee">
                                    {[...partners, ...partners].map((partner, index) => (
                                        <a href={partner.websiteUrl} key={index} target="_blank" rel="noopener noreferrer" className="mx-8 sm:mx-12 lg:mx-16 flex-shrink-0" title={partner.name}>
                                            <img 
                                                src={partner.logoUrl} 
                                                alt={partner.name} 
                                                className="h-16 sm:h-20 md:h-24 w-auto object-contain transform hover:scale-110 transition-transform duration-300 opacity-70 hover:opacity-100"
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* CTA Banner */}
                <section className="py-20">
                     <AnimatedSection>
                        <div className="container mx-auto px-4 sm:px-6 text-center">
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 sm:p-12 shadow-2xl shadow-purple-500/20">
                                <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Start Your Project?</h2>
                                <p className="mt-4 text-lg text-purple-200 max-w-xl mx-auto">Let's build something incredible together.</p>
                                <div className="mt-8">
                                    <Link to="/contact" className="px-8 py-4 text-lg font-semibold text-white animate-background-lights rounded-lg hover:brightness-110 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        Get in Touch
                                    </Link>
                                 </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </section>
            </div>
        </div>
    );
};

export default HomePage;