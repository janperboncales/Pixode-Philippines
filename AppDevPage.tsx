import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioProjects as staticProjects, whyChoosePixode, Project } from './data'; 
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

const AppDevPage: React.FC = () => {

    const processSteps = [
        { name: "Ideation", description: "We start by understanding your vision and defining the core features and goals of your app." },
        { name: "Design", description: "Our UI/UX experts create stunning, user-friendly designs and prototypes for your app." },
        { name: "Development", description: "Our developers bring the designs to life with clean, efficient, and scalable code." },
        { name: "QA & Testing", description: "We rigorously test every aspect of the app to ensure a bug-free, seamless experience." },
        { name: "Launch & Support", description: "We handle the app store submission process and provide ongoing support and maintenance." }
    ];

    const [appProjects, setAppProjects] = useState<Project[]>(staticProjects.filter(p => p.type.toLowerCase().includes("app")));

    // Fetch projects from Supabase on load
    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .ilike('type', '%app%') // Filter for apps in SQL
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching projects:", error.message);
            } else if (data && data.length > 0) {
                setAppProjects(data.map(p => ({ ...p, technologies: normalizeTechnologies(p.technologies) })) as Project[]);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a031a] via-[#1a0f33] to-[#0a031a] z-10"></div>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-800 to-transparent"></div>
                <div className="relative z-20 container mx-auto px-4 sm:px-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold font-montserrat leading-tight animate-fade-in-down">
                        Transforming Ideas into
                        <span className="animate-text-lights block mt-2 md:mt-4">Stunning Mobile Apps.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        We design and develop beautiful, high-performance mobile apps for iOS and Android that engage users and drive business growth.
                    </p>
                    <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                        <Link to="/contact" className="px-8 py-4 text-lg font-semibold text-white animate-background-lights rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                            Inquire Now
                        </Link>
                    </div>
                </div>
            </section>
            
            {/* Main Content */}
            <div className="bg-[#0a031a]">

                {/* Why Choose PIXODE Section */}
                <section className="py-20 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6">
                         <AnimatedSection>
                            <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-center mb-16">Why Businesses Trust PIXODE</h2>
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

                {/* Process Timeline Section */}
                <section className="py-20 md:py-24 bg-black/20">
                    <div className="container mx-auto px-4 sm:px-6">
                         <AnimatedSection>
                             <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-center mb-16">Our Proven Process</h2>
                         </AnimatedSection>
                        <div className="relative">
                            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-purple-500/30 hidden md:block"></div>
                            {processSteps.map((step, index) => (
                                <AnimatedSection key={index}>
                                    <div className={`flex md:items-center mb-12 flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                        <div className="md:w-5/12">
                                            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                                                <h3 className="text-2xl font-bold animate-text-lights">{`0${index + 1}. ${step.name}`}</h3>
                                                <p className="text-gray-400 mt-2">{step.description}</p>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 bg-purple-600 rounded-full flex-shrink-0 my-4 md:my-0 flex items-center justify-center text-white font-bold z-10 shadow-lg shadow-purple-500/50">
                                            {index + 1}
                                        </div>
                                        <div className="md:w-5/12"></div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Case Studies Preview */}
                <section className="py-20 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6">
                        <AnimatedSection>
                            <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-center mb-16">Apps That Make an Impact</h2>
                        </AnimatedSection>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {appProjects.map((project, index) => (
                               <AnimatedSection key={project.id} delay={index * 100}>
                                    <Link to={`/projects/${project.id}`} className="block group relative overflow-hidden rounded-xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:-translate-y-2">
                                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500"></div>
                                            <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/20 transition-colors duration-500"></div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-purple-200 transition-colors duration-300">{project.title}</h3>
                                            <p className="animate-text-lights font-semibold text-xs sm:text-sm mb-2">{project.type}</p>
                                            <div className="max-h-0 group-hover:max-h-16 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                                                <p className="text-gray-300 text-xs line-clamp-2 mt-1">{project.overview}</p>
                                            </div>
                                        </div>
                                    </Link>
                               </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* CTA Banner */}
                <section className="py-20">
                     <AnimatedSection>
                        <div className="container mx-auto px-4 sm:px-6 text-center">
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 sm:p-12 shadow-2xl shadow-purple-500/20">
                                <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Build Your App?</h2>
                                <p className="mt-4 text-lg text-purple-200 max-w-xl mx-auto">Let's discuss your idea and how we can bring it to life.</p>
                                <div className="mt-8">
                                    <Link to="/contact" className="px-8 py-4 text-lg font-semibold text-white animate-background-lights rounded-lg hover:brightness-110 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        Let's Talk
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

export default AppDevPage;