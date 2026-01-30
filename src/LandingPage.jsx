import React from 'react';
import { Brain, Sparkles, Calendar, TrendingUp, ArrowRight } from 'lucide-react';

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Turn Your Insights Into Action
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Virgil captures your insights from therapy, coaching, and other personal development sessions then turns them into actionable next steps you'll actually complete.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3 group"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Action Items</h3>
            <p className="text-gray-600">
              Automatically generate personalized action items from your session notes.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Your Progress</h3>
            <p className="text-gray-600">
              Hold yourself accountable. Visualize your action items in a calendar and celebrate as you complete them.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Growth Insights</h3>
            <p className="text-gray-600">
              Unlock detailed insights about your patterns and progress over time.
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <p className="text-gray-500 text-sm mb-4">Trusted by people committed to personal growth</p>
          <div className="flex justify-center items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white"></div>
            </div>
            <span className="text-gray-700 font-medium ml-2">Join the beta</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-gray-200 mt-16">
        <p className="text-gray-500 text-sm">© 2026 Virgil. Turn your insights into action.</p>
      </div>
    </div>
  );
}
