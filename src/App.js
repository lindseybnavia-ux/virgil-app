import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import LandingPage from './LandingPage';
import AuthScreen from './AuthScreen';
import VirgilApp from './VirgilApp';
import { LogOut } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        setShowAuth(true); // Auto-show app if logged in
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowAuth(false); // Go back to landing page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-900 text-lg font-medium">Loading Virgil...</p>
        </div>
      </div>
    );
  }

  // Show landing page if not logged in and haven't clicked "Get Started"
  if (!user && !showAuth) {
    return <LandingPage onGetStarted={() => setShowAuth(true)} />;
  }

  // Show auth screen if clicked "Get Started" but not logged in
  if (!user) {
    return <AuthScreen onAuthSuccess={() => setUser(auth.currentUser)} />;
  }

  // Show app if logged in
  return (
    <div className="relative">
      <button
        onClick={handleSignOut}
        className="fixed top-4 right-4 z-50 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2 text-gray-700 hover:text-blue-900"
      >
        <LogOut className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">Sign Out</span>
      </button>
      <VirgilApp userId={user.uid} userEmail={user.email} />
    </div>
  );
}
