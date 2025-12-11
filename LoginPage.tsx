
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';

// Back Icon
const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '' // Added for setup mode
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSetupMode, setIsSetupMode] = useState(false);
    const [checkingSetup, setCheckingSetup] = useState(true);
    const [isConfigured, setIsConfigured] = useState(true);

    // Check if user is already logged in AND check if system needs setup (No CEO exists)
    useEffect(() => {
        const checkStatus = async () => {
            // Check if Supabase keys are default/placeholder
            // @ts-ignore
            const currentUrl = supabase.supabaseUrl;
            // @ts-ignore
            const currentKey = supabase.supabaseKey;
            
            if (!currentUrl || currentUrl.includes('YOUR_SUPABASE_URL_HERE') || !currentKey || currentKey.includes('YOUR_SUPABASE_ANON_KEY_HERE')) {
                setIsConfigured(false);
                setCheckingSetup(false);
                return;
            }

            try {
                // 1. Check Session
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    navigate('/dashboard');
                    return;
                }

                // 2. Check if any CEO exists in the profiles table
                const { count, error: dbError } = await supabase
                    .from('profiles')
                    .select('*', { count: 'exact', head: true })
                    .eq('role', 'CEO');

                if (dbError && dbError.message.includes('relation "public.profiles" does not exist')) {
                    console.warn("Profiles table does not exist, assuming setup mode required.");
                    setIsSetupMode(true);
                } else if (dbError) {
                    console.error("Error checking for CEO profiles:", dbError.message);
                    // Don't block login if DB check fails, just let them try to sign in
                } else if (count === 0) {
                    setIsSetupMode(true);
                }
            } catch (err) {
                console.warn("System check failed.", (err as Error).message);
            } finally {
                setCheckingSetup(false);
            }
        };
        checkStatus();
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                if (error.message.includes("Invalid login credentials")) {
                    throw new Error("Invalid email or password.");
                }
                if (error.message.includes("Email not confirmed")) {
                    throw new Error("Please verify your email address.");
                }
                throw error;
            }

            if (data.session) {
                // Check if profile exists before proceeding
                const { data: existingProfile } = await supabase
                    .from('profiles')
                    .select('id')
                    .eq('id', data.session.user.id)
                    .maybeSingle();

                if (!existingProfile) {
                    // Self-heal: Create missing profile using available metadata
                    // NOTE: DB uses 'name' column, not 'full_name' based on logs
                    await supabase.from('profiles').upsert({
                        id: data.session.user.id,
                        name: data.session.user.user_metadata.full_name || data.session.user.user_metadata.name || 'User',
                        role: data.session.user.user_metadata.role || 'Employee',
                        email: data.session.user.email
                    });
                }
                
                navigate('/dashboard');
            }
        } catch (err: any) {
            console.error("Login error:", err.message);
            setError(err.message || 'Authentication failed.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSetup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName, // Stored in Auth Metadata
                        role: 'CEO'
                    }
                }
            });

            if (error) throw error;

            if (data.session) {
                // Manually insert profile (using 'name' column)
                await supabase.from('profiles').upsert({
                    id: data.session.user.id,
                    name: formData.fullName,
                    role: 'CEO',
                    email: formData.email
                });
                
                alert("System Owner created successfully! You are now logged in.");
                navigate('/dashboard');
            } else if (data.user) {
                setError("Account created! PLEASE CHECK YOUR EMAIL to confirm your account before logging in.");
                setIsSetupMode(false);
            }
        } catch (err: any) {
            console.error("Setup error:", err.message);
            setError(err.message || "Failed to create owner account.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    if (!isConfigured) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a031a] px-4">
                <div className="w-full max-w-lg bg-red-900/10 border border-red-500/30 rounded-2xl p-8 text-center backdrop-blur-md">
                    <h2 className="text-2xl font-bold text-white mb-4">Configuration Required</h2>
                    <p className="text-gray-300 mb-6">
                        Supabase credentials are missing. Please update <code className="bg-black/40 px-2 py-1 rounded text-red-300">supabaseClient.ts</code>.
                    </p>
                    <div className="mt-8">
                        <Link to="/" className="text-white bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-colors">
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (checkingSetup) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a031a]">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a031a] px-4">
            <div className="w-full max-w-md bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-purple-500/20 text-centerPv relative">
                <button
                    onClick={handleGoBack}
                    className="absolute top-4 left-4 p-2 bg-white/5 border border-white/10 text-gray-300 rounded-full hover:bg-white/10 transition-colors flex items-center group"
                    aria-label="Go back"
                >
                    <BackIcon />
                </button>

                <h1 className="text-4xl font-extrabold font-montserrat animate-text-lights mb-6 mt-8">
                    {isSetupMode ? 'System Setup' : 'Welcome Back'}
                </h1>
                <p className="text-gray-400 mb-8">
                    {isSetupMode ? 'Create the first owner account.' : 'Sign in to access dashboard.'}
                </p>

                {error && (
                    <div className="bg-red-900/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={isSetupMode ? handleSetup : handleLogin} className="space-y-5">
                    {isSetupMode && (
                        <div>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name (CEO)"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-purple-500 focus:border-purple-500 transition"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                                className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-purple-500 focus:border-purple-500 transition"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                                className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-purple-500 focus:border-purple-500 transition"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-8 py-4 text-lg font-semibold text-white animate-background-lights rounded-lg focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading && (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        )}
                        {isSetupMode ? (isLoading ? 'Creating Account...' : 'Create Owner Account') : (isLoading ? 'Signing In...' : 'Sign In')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
