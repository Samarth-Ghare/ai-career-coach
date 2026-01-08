
import React from 'react';
// Correct import from react-router-dom for internal links
import { Link } from 'react-router-dom';

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-gray-800/40 backdrop-blur-md p-8 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all group">
        <div className="flex justify-center mb-6">
            <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                <i data-lucide={icon} className="h-10 w-10 text-primary-600 dark:text-primary-400"></i>
            </div>
        </div>
        <h3 className="text-xl font-black mb-3 text-gray-900 dark:text-white uppercase tracking-tight">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">{description}</p>
    </div>
);


const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 selection:bg-primary-100">
            <header className="container mx-auto px-6 py-8 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200">
                        <i data-lucide="brain-circuit" className="h-6 w-6 text-white"></i>
                    </div>
                    <span className="text-2xl font-black uppercase tracking-tighter">AI Coach</span>
                </div>
                <nav className="flex items-center gap-4">
                    <Link to="/login" className="px-6 py-2.5 text-sm font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-primary-600 transition">Login</Link>
                    <Link to="/signup" className="px-6 py-2.5 text-sm font-black uppercase tracking-widest text-white bg-primary-600 rounded-full hover:bg-primary-700 shadow-lg shadow-primary-200 dark:shadow-none transition">Join Now</Link>
                </nav>
            </header>

            <main>
                <section className="container mx-auto px-6 py-24 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 text-[10px] font-black uppercase tracking-widest mb-8 animate-bounce">
                        <i data-lucide="sparkles" className="w-3 h-3"></i>
                        Powered by Gemini 3 Pro
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 text-gray-900 dark:text-white tracking-tighter leading-tight">
                        Navigate Your <br />
                        <span className="text-primary-600">Career Future</span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
                        The all-in-one AI ecosystem for college students. Master interviews, optimize resumes, and get real-time market data—all in one place.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link to="/signup" className="w-full md:w-auto px-12 py-5 text-sm font-black text-white bg-primary-600 rounded-2xl hover:bg-primary-700 shadow-2xl shadow-primary-200 dark:shadow-none transition-all uppercase tracking-widest">
                            Start Your Journey
                        </Link>
                        <a href="#features" className="w-full md:w-auto px-12 py-5 text-sm font-black text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all uppercase tracking-widest">
                            Explore Features
                        </a>
                    </div>
                </section>

                <section id="features" className="py-32 bg-gray-50 dark:bg-gray-900/30">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-4">Engineered for Success</h2>
                            <p className="text-gray-500 font-medium">State-of-the-art AI tools designed to get you hired.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard 
                                icon="file-text" 
                                title="Smart Parsing" 
                                description="Deep-scan your resume for ATS compatibility and get instant AI-driven strength scores." 
                            />
                            <FeatureCard 
                                icon="mic" 
                                title="Live Interviews" 
                                description="Voice-to-voice mock interviews with real-time behavioral tracking via TensorFlow.js." 
                            />
                            <FeatureCard 
                                icon="search" 
                                title="Market Insights" 
                                description="Real-time company data and salary trends using Google Search Grounding." 
                            />
                            <FeatureCard 
                                icon="target" 
                                title="Skill Mastery" 
                                description="Adaptive testing framework that evolves as you learn core technical concepts." 
                            />
                        </div>
                    </div>
                </section>
            </main>

            <footer className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <i data-lucide="brain-circuit" className="h-5 w-5 text-primary-500"></i>
                    <span className="text-sm font-black uppercase tracking-tighter">AI Career Coach</span>
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">&copy; {new Date().getFullYear()} Professional Edition. Built for Excellence.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
