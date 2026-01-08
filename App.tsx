
import React, { useEffect } from 'react';
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

    useEffect(() => {
        if(window.lucide) {
            window.lucide.createIcons();
        }
    }, [location.pathname]);

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
