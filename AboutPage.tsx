import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { teamMembers } from './data';

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

const AboutPage: React.FC = () => {
    const founders = teamMembers.filter(member => member.category === 'Founder');
    const creativeTeam = teamMembers.filter(member => member.category === 'Creative Team');
    
    const processSteps = [
        { name: "Ideation & Discovery", description: "We start by understanding your vision, defining project goals, and mapping out the core features." },
        { name: "UI/UX Design", description: "Our experts create stunning, user-friendly designs and interactive prototypes for your product." },
        { name: "Development", description: "Our developers bring the designs to life with clean, efficient, and scalable code." },
        { name: "QA & Testing", description: "We rigorously test every aspect to ensure a bug-free, seamless, and high-performance experience." },
        { name: "Launch & Support", description: "We handle the deployment process and provide ongoing support to ensure your product's success." }
    ];

    return (
        <div className="overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a031a] via-[#1a0f33] to-[#0a031a] z-10"></div>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-800 to-transparent"></div>
                <div className="relative z-20 container mx-auto px-4 sm:px-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold font-montserrat leading-tight animate-fade-in-down">
                        The Minds Behind
                        <span className="animate-text-lights block mt-2 md:mt-4">the Magic.</span>
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        We are a passionate team of creators, thinkers, and innovators dedicated to building exceptional digital experiences.
                    </p>
                </div>
            </section>
            
            <div className="bg-[#0a031a]">
                {/* Our Story Section */}
                <section className="py-20 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <AnimatedSection>
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-bold font-montserrat mb-6">Our Mission</h2>
                                    <p className="text-gray-400 text-lg mb-4">
                                        At PIXODE, our mission is simple: to empower businesses with transformative digital solutions. We believe that great design and powerful technology can solve real-world problems, foster growth, and create lasting connections between brands and their audiences.
                                    </p>
                                    <p className="text-gray-400 text-lg">
                                        We approach every project as a partnership, working closely with our clients to understand their unique challenges and goals. Our collaborative process ensures that we not only meet expectations but consistently exceed them, delivering products that are not only beautiful but also effective and user-centric.
                                    </p>
                                </div>
                            </AnimatedSection>
                             <AnimatedSection delay={100}>
                                <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
                                   <img 
                                        src="https://i.imgur.com/ydwQkjf.jpeg" 
                                        alt="Our team collaborating"
                                        className="w-full h-full object-cover"
                                    />
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>
                
                {/* Process Timeline Section */}
                <section className="py-20 md:py-24 bg-black/20">
                    <div className="container mx-auto px-4 sm:px-6">
                         <AnimatedSection>
                             <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-center mb-16">Our Development Process</h2>
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

                {/* Meet Our Team Section */}
                <section className="py-20 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6">
                        <AnimatedSection>
                            <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-center mb-16">Meet Our Team</h2>
                        </AnimatedSection>
                        
                        {/* Founders */}
                        <AnimatedSection>
                            <h3 className="text-2xl md:text-3xl font-bold animate-text-lights text-center mb-12">The Founders</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center max-w-7xl mx-auto">
                                {founders.map(member => (
                                    <div key={member.id} className="text-center bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300 h-full">
                                        <img src={member.image} alt={member.name} className="w-40 h-40 sm:w-48 sm:h-48 rounded-lg object-cover mb-4 shadow-lg"/>
                                        <h4 className="text-xl font-bold text-white">{member.name}</h4>
                                        <p className="text-gray-400">{member.role}</p>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>

                        {/* Creative Team */}
                        <AnimatedSection>
                             <h3 className="text-2xl md:text-3xl font-bold animate-text-lights text-center mt-20 mb-12">Our Creative Team</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12">
                                {creativeTeam.map(member => (
                                    <div key={member.id} className="text-center group">
                                         <div className="relative overflow-hidden rounded-lg shadow-lg">
                                            <img src={member.image} alt={member.name} className="w-full h-auto aspect-square object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-300"/>
                                         </div>
                                        <h4 className="mt-4 text-lg font-semibold text-white">{member.name}</h4>
                                        <p className="text-gray-500 text-sm">{member.role}</p>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* CTA Banner */}
                <section className="py-20">
                     <AnimatedSection>
                        <div className="container mx-auto px-4 sm:px-6 text-center">
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 sm:p-12 shadow-2xl shadow-purple-500/20">
                                <h2 className="text-3xl md:text-4xl font-bold text-white">Have a Project in Mind?</h2>
                                <p className="mt-4 text-lg text-purple-200 max-w-xl mx-auto">Let's collaborate and create something amazing together.</p>
                                <div className="mt-8">
                                    <Link to="/contact" className="px-8 py-4 text-lg font-semibold text-white animate-background-lights rounded-lg hover:brightness-110 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        Contact Us
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

export default AboutPage;