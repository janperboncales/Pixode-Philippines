import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioProjects as staticProjects, Project } from './data';
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
        <div ref={ref} className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

// Helper function to normalize technologies array
const normalizeTechnologies = (techs: any): string[] => {
    return Array.isArray(techs) ? techs.filter((tech: any) => typeof tech === 'string') as string[] : [];
};

const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>(staticProjects);

    // Fetch projects from Supabase on load
    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching projects:", error.message);
            } else if (data && data.length > 0) {
                setProjects(data.map(p => ({ ...p, technologies: normalizeTechnologies(p.technologies) })) as Project[]);
            }
        };
        fetchProjects();
    }, []);

    return (
        <>
            <div className="overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a031a] via-[#1a0f33] to-[#0a031a] z-10"></div>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-purple-800 to-transparent"></div>
                    <div className="relative z-20 container mx-auto px-4 sm:px-6">
                        <h1 className="text-5xl md:text-6xl font-extrabold font-montserrat animate-fade-in-down">
                            Showcasing Our <span className="animate-text-lights">Digital Creations.</span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                            We take pride in our work. Explore a selection of projects that demonstrate our passion for design and technology.
                        </p>
                    </div>
                </section>

                {/* Project Gallery */}
                <section className="py-20 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {projects.map((project, index) => (
                                <AnimatedSection key={project.id} delay={index * 100}>
                                    <Link
                                        to={`/projects/${project.id}`}
                                        className="block group relative overflow-hidden rounded-xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:-translate-y-2"
                                    >
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
            </div>
        </>
    );
};

export default ProjectsPage;