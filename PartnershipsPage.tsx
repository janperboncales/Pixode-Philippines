import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { partners } from './data';

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

const PartnershipsPage: React.FC = () => {

    const partnershipBenefits = [
        { title: "Expand Your Reach", description: "Collaborate with us to access new markets and audiences through co-marketing and joint ventures." },
        { title: "Enhance Your Offerings", description: "Integrate our design and development expertise to provide more value to your own clients." },
        { title: "Drive Innovation", description: "Join forces with a team that's at the forefront of technology and digital trends." },
        { title: "Shared Success", description: "We believe in mutually beneficial relationships that create long-term value for both parties." }
    ];

    return (
        <div className="overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a031a] via-[#1a0f33] to-[#0a031a] z-10"></div>
                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-800 to-transparent"></div>
                <div className="relative z-20 container mx-auto px-4 sm:px-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold font-montserrat leading-tight animate-fade-in-down">
                        Building Success Through 
                        <span className="animate-text-lights block mt-2 md:mt-4">Strategic Alliances.</span>
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        We collaborate with forward-thinking organizations to create powerful synergies and drive mutual growth.
                    </p>
                </div>
            </section>
            
            <div className="bg-[#0a031a]">

                {/* Why Partner With Us Section */}
                <section className="py-20 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6">
                         <AnimatedSection>
                             <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-center mb-16">Why Partner With PIXODE?</h2>
                         </AnimatedSection>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {partnershipBenefits.map((benefit, index) => (
                                <AnimatedSection key={index} delay={index * 100}>
                                    <div className="bg-white/5 p-8 rounded-xl border border-white/10 h-full transform hover:-translate-y-2 transition-transform duration-300">
                                        <h3 className="text-xl font-bold animate-text-lights mb-3">{benefit.title}</h3>
                                        <p className="text-gray-400">{benefit.description}</p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Current Partners Section */}
                <section className="py-20 md:py-24 bg-black/20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <AnimatedSection>
                            <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-center mb-4">Our Valued Partners</h2>
                            <p className="max-w-2xl mx-auto text-center text-gray-400 mb-16">We're proud to work alongside these industry leaders.</p>
                        </AnimatedSection>
                        <AnimatedSection>
                            <div className="relative w-full overflow-hidden marquee-container">
                                <div className="flex w-max animate-marquee">
                                    {[...partners, ...partners].map((partner, index) => (
                                        <a href={partner.websiteUrl} key={index} target="_blank" rel="noopener noreferrer" className="mx-8 sm:mx-12 lg:mx-16 flex-shrink-0" title={partner.name}>
                                            <img 
                                                src={partner.logoUrl} 
                                                alt={partner.name} 
                                                className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Call to Action for New Partnerships */}
                <section className="py-20">
                     <AnimatedSection>
                        <div className="container mx-auto px-4 sm:px-6 text-center">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 sm:p-12 shadow-2xl shadow-indigo-500/20">
                                <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Partner With Us?</h2>
                                <p className="mt-4 text-lg text-indigo-200 max-w-xl mx-auto">Let's explore how we can achieve great things together.</p>
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

export default PartnershipsPage;