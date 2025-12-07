import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

// Icons for contact info section
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);


const ContactPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        // Clear status message on user input
        setStatus('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ---------------------------------------------------------
        // SECRET BACKDOOR: Check if Subject is the secret password
        // Redirects to Login Page for authentication
        // ---------------------------------------------------------
        if (formData.subject.trim().toLowerCase() === 'pixode-admin') {
            navigate('/login');
            return;
        }

        setIsSubmitting(true);
        setStatus('Sending...');

        // 1. Send to Formspree (Email Notification)
        const formspreeEndpoint = 'https://formspree.io/f/xdkpbnpd';
        
        // 2. Save to Supabase (Dashboard Database)
        try {
            // Attempt to save to Supabase first (background)
            const { error } = await supabase.from('inquiries').insert([
                {
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                }
            ]);
            if (error) console.error("Supabase error saving inquiry:", error.message);

            // Send to Formspree
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setStatus('Thank you for your message! We will get back to you shortly.');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus(''), 5000);
            } else {
                const data = await response.json();
                if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
                    setStatus(data.errors.map((error: { message: string }) => error.message).join(", "));
                } else {
                    setStatus('Oops! There was a problem submitting your form.');
                }
                setTimeout(() => setStatus(''), 5000);
            }
        } catch (error: any) {
            console.error("Error submitting contact form:", error.message);
            setStatus('Oops! There was a problem submitting your form.');
            setTimeout(() => setStatus(''), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a031a] via-[#1a0f33] to-[#0a031a] z-10"></div>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-pink-800 to-transparent"></div>
                <div className="relative z-20 container mx-auto px-4 sm:px-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold font-montserrat animate-fade-in-down">
                        Let's Create <span className="animate-text-lights">Something Great.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        Have a project in mind or just want to say hello? We'd love to hear from you.
                    </p>
                </div>
            </section>

            <div className="bg-[#0a031a]">
                {/* Contact Form & Info Section */}
                <section className="py-20 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                            {/* Form */}
                            <AnimatedSection>
                                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                                    <h2 className="text-3xl font-bold font-montserrat mb-6">Send us a Message</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                            <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-purple-500 focus:border-purple-500 transition" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                            <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-purple-500 focus:border-purple-500 transition" />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                            <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-purple-500 focus:border-purple-500 transition" placeholder="How can we help?" />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                            <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-purple-500 focus:border-purple-500 transition"></textarea>
                                        </div>
                                        <div>
                                            <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 text-lg font-semibold text-white animate-background-lights rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                                                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                                            </button>
                                        </div>
                                        {status && <p className="text-center animate-text-lights mt-4">{status}</p>}
                                    </form>
                                </div>
                            </AnimatedSection>

                            {/* Info */}
                            <AnimatedSection delay={100}>
                                <div className="space-y-8 lg:mt-12">
                                    <h2 className="text-3xl font-bold font-montserrat mb-6">Contact Information</h2>
                                    <p className="text-gray-400">
                                        We're available for a friendly chat to discuss your project. Get in touch with us through our contact details below.
                                    </p>
                                    <div className="space-y-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="bg-purple-900/50 p-3 rounded-full text-purple-300 flex-shrink-0"><MailIcon /></div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">Email</h3>
                                                <a href="mailto:pixodeofficial@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors">pixodeofficial@gmail.com</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-4">
                                            <div className="bg-purple-900/50 p-3 rounded-full text-purple-300 flex-shrink-0"><PhoneIcon /></div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">Phone</h3>
                                                <a href="tel:+639926622310" className="text-gray-400 hover:text-purple-400 transition-colors">(+63) 992-662-2310</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-4">
                                            <div className="bg-purple-900/50 p-3 rounded-full text-purple-300 flex-shrink-0"><LocationIcon /></div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">Address</h3>
                                                <p className="text-gray-400">Legazpi City, Albay, 4500 Philippines</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ContactPage;