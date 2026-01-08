
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import RecommendationsPage from './pages/RecommendationsPage';
import ChatbotPage from './pages/ChatbotPage';
import SettingsPage from './pages/SettingsPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import QuizzesPage from './pages/QuizzesPage';

const AppRoutes: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const [isCheckingKey, setIsCheckingKey] = useState(true);

    useEffect(() => {
        if(window.lucide) {
            window.lucide.createIcons();
        }
    }, [location.pathname]);

    // Global check for API key on first load
    useEffect(() => {
        const checkInitialKey = async () => {
            if (window.aistudio) {
                const hasKey = await window.aistudio.hasSelectedApiKey();
                if (!hasKey && !process.env.API_KEY) {
                    console.warn("API Key missing. User needs to select a project.");
                }
            }
            setIsCheckingKey(false);
        };
        checkInitialKey();
    }, []);

    if (isCheckingKey) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Initializing AI Environment...</p>
                </div>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/dashboard" />} />

            {isAuthenticated ? (
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/interview-prep" element={<InterviewPrepPage />} />
                    <Route path="/quizzes" element={<QuizzesPage />} />
                    <Route path="/recommendations" element={<RecommendationsPage />} />
                    <Route path="/chatbot" element={<ChatbotPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Route>
            ) : (
                <Route path="*" element={<Navigate to="/" />} />
            )}
        </Routes>
    );
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
            <AppRoutes />
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
