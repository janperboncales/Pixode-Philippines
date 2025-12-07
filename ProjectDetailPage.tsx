import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { Project } from './data';

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

const ProjectDetailPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!projectId) {
            setError("Project ID is missing.");
            setLoading(false);
            return;
        }

        const fetchProject = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error: dbError } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', projectId)
                    .single(); // Use single here as we expect exactly one project

                if (dbError) {
                    if (dbError.code === 'PGRST116') { // No rows found
                        setError('Project not found.');
                    } else {
                        throw dbError;
                    }
                } else if (data) {
                    setProject({ ...data, technologies: normalizeTechnologies(data.technologies) });
                } else {
                    setError('Project not found.'); // In case data is null but no specific error code
                }
            } catch (err: any) {
                console.error("Error fetching project details:", err.message);
                setError(`Failed to load project: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a031a] pt-32 pb-20">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a031a] pt-32 pb-20 text-red-400 text-center px-4">
                <p className="text-xl mb-4">{error}</p>
                <Link to="/projects" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold">
                    Back to Projects
                </Link>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a031a] pt-32 pb-20 text-gray-400 text-center px-4">
                <p className="text-xl mb-4">No project data available.</p>
                <Link to="/projects" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold">
                    Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="overflow-x-hidden pt-24 md:pt-32">
            <section className="relative pb-20 md:pb-32">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a031a] via-[#1a0f33] to-[#0a031a] z-10"></div>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-800 to-transparent"></div>

                <div className="relative z-20 container mx-auto px-4 sm:px-6">
                    <AnimatedSection>
                        <Link to="/projects" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Back to All Projects
                        </Link>
                    </AnimatedSection>

                    <div className="bg-[#110e1a] border border-purple-500/30 rounded-2xl max-w-4xl mx-auto">
                        <AnimatedSection delay={100}>
                            <img src={project.image} alt={project.title} className="w-full h-64 md:h-80 object-cover rounded-t-2xl" />
                        </AnimatedSection>
                        <div className="p-6 md:p-8">
                            <AnimatedSection delay={200}>
                                <h1 className="text-4xl md:text-5xl font-bold font-montserrat animate-text-lights">{project.title}</h1>
                                <p className="animate-text-lights font-semibold mt-1">{project.type}</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.technologies?.map(tech => (
                                        <span key={tech} className="bg-purple-900/50 text-xs font-medium px-2.5 py-1 rounded-full animate-text-lights">{tech}</span>
                                    ))}
                                </div>
                            </AnimatedSection>

                            <div className="mt-10 space-y-8 text-gray-300">
                                <AnimatedSection delay={300}>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">Overview</h3>
                                        <p>{project.overview}</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={400}>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">Challenges</h3>
                                        <p>{project.challenges || 'N/A'}</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={500}>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">Our Approach</h3>
                                        <p>{project.approach || 'N/A'}</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={600}>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">Results</h3>
                                        <p className="text-lg font-semibold animate-text-lights">{project.results || 'N/A'}</p>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetailPage;