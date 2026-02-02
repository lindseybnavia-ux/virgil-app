import React from 'react';
import { Brain, Sparkles, Calendar, TrendingUp, ArrowRight } from 'lucide-react';

export default function LandingPage({ onGetStarted }) {
   const [activeTestimonial, setActiveTestimonial] = React.useState(0);
  
  const testimonials = [
    {
      quote: "I do a lot of breath work and meditation and my notes were in different journals or on my phone. Virgil helped me create a command center of all my insights, and generate doable action items so I don't miss important progress I wanted to make.",
      author: "Sarah G."
    },
    {
      quote: "As someone in therapy, I used to leave sessions with great insights but no clear next steps. I drop a quick summary into Virgil and I instantly have items to focus on.",
      author: "Michael T."
    },
    {
      quote: "I'm not a big note taker so I love Virgil's voice note feature. I talk about what came up for me after a journey and it helps generate a clear path forward so I don't lose the magic from those sessions.",
      author: "Priya K."
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Insight isn't the breakthrough. Action is. 
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Virgil turns your insights from personal development sessions like therapy or meditation into follow through, so your growth shows up in real life. 
          </p>
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3 group"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Capture. Commit. Act. Repeat. </h2>
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <h3 className="text-xl font-semibold text-gray-900">Capture Your Session</h3>
                </div>
                <p className="text-gray-600 ml-11">
                  Type your notes, create a voice recording, or upload a photo from your journal. Whatever method feels best for you.
                </p>
              </div>
              <div className="hidden md:block text-gray-300 text-3xl">→</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <h3 className="text-xl font-semibold text-gray-900">Generate Action Items</h3>
                </div>
                <p className="text-gray-600 ml-11">
                  Instantly transform your insights into personalized, actionable next steps.
                </p>
              </div>
            </div>
          </div>
        </div>

                {/* Problem Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-12 md:p-16 text-white">
            
            <div className="space-y-6 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              <p>
                You think deeply, you do the work. You notice patterns. You have moments of real clarity.
              </p>
              <p>
                And then life happens.
              </p>
              <p>
                The insight fades. The note gets buried. And the same promises quietly expire.
              </p>
              <p className="text-white font-semibold pt-4">
                Virgil exists for the moments in between sessions, when most tools disappear.
              </p>
            </div>
        </div>
        
  {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-10 md:p-12 shadow-lg border border-blue-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mb-6"></div>
              
              {/* Quote */}
              <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6 max-w-3xl min-h-[120px] flex items-center">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              
              {/* Author */}
              <cite className="text-gray-900 font-semibold not-italic mb-8">
                — {testimonials[activeTestimonial].author}
              </cite>

              {/* Carousel Controls */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeTestimonial 
                          ? 'w-8 bg-blue-900' 
                          : 'bg-blue-300 hover:bg-blue-400'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                  aria-label="Next testimonial"
                >
                  <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Action Items</h3>
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
              Hold yourself accountable. Visualize your action items in the calendar and celebrate as you complete them.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Growth Insights</h3>
            <p className="text-gray-600">
              Unlock detailed insight reports about your patterns and personal development progress over time.
            </p>
          </div>
        </div>

        {/* Social Proof / CTA */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <p className="text-gray-500 text-sm mb-6">Start keeping promises to yourself. Quietly, consistently and for real.</p>
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white"></div>
            </div>
          </div>
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3 group"
          >
            Join the Beta
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200 mt-16">
          <p className="text-gray-500 text-sm">© 2026 Virgil. Turn your insights into action.</p>
        </div>
      </div>
    </div>
  );
}
