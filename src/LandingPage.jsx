import React, { useState, useEffect } from 'react';

export default function LandingPage({ onGetStarted, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: '#FDFCF8', color: '#0F172A', WebkitFontSmoothing: 'antialiased' }}>

      {/* ─── NAV ─── */}
      <nav className="fixed w-full z-50 transition-all duration-300 border-b border-gray-100" style={{ backgroundColor: 'rgba(253,252,248,0.9)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-semibold tracking-tight text-slate-900">Virgil</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
              <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button onClick={onGetStarted} className="text-sm font-medium text-slate-900 hover:text-slate-700">Log in</button>
              <button onClick={onGetStarted} className="bg-blue-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-800 transition-all shadow-lg shadow-slate-200">Get Started</button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 hover:text-slate-900 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <a href="#pricing" className="block text-sm font-medium text-slate-600 hover:text-slate-900 py-2">Pricing</a>
              <a href="#faq" className="block text-sm font-medium text-slate-600 hover:text-slate-900 py-2">FAQ</a>
              <button onClick={onGetStarted} className="block w-full text-left text-sm font-medium text-slate-900 py-2">Log in</button>
              <button onClick={onGetStarted} className="block w-full bg-blue-900 text-white px-5 py-2.5 rounded-full text-sm font-medium text-center">Get Started</button>
            </div>
          )}
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl lg:text-7xl font-semibold leading-[1.1] mb-6 text-slate-900">
                Don't let your <br />
                <span className="italic text-blue-800" style={{ fontFamily: "'Playfair Display', serif" }}>breakthroughs</span> fade.
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
                Virgil captures your coaching sessions, therapy breakthroughs, and personal reflections—transforming them into actionable plans so you actually grow.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button onClick={onGetStarted} className="w-full sm:w-auto bg-blue-900 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-blue-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group">
                  Start your journey
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="mt-10 flex items-center gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {['JD', 'AS', 'MK'].map((initials, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600 ${['bg-slate-200', 'bg-slate-300', 'bg-slate-400'][i]}`}>{initials}</div>
                  ))}
                </div>
                <p>Trusted by 2,000+ early adopters</p>
              </div>
            </div>

            {/* Floating App Preview */}
            <div className="hidden md:block lg:w-1/2 relative">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-100 rounded-full blur-xl opacity-60" style={{ animation: 'float 6s ease-in-out infinite 1s' }} />
              <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden" style={{ animation: 'float 6s ease-in-out infinite' }}>
                <div className="bg-slate-50/80 border-b border-slate-100 px-6 py-4 flex items-center justify-between" style={{ backdropFilter: 'blur(8px)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                  </div>
                  <div className="text-xs font-medium text-slate-400">Weekly Reflection - Oct 24</div>
                </div>
                <div className="p-8">
                  <div className="bg-blue-50 rounded-xl p-5 mb-4 border border-blue-100/50">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-700">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <div>
                        <h4 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-medium text-slate-900 mb-1">Breakthrough Moment</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">"I realized that my procrastination isn't laziness, it's a fear of not meeting my own high standards. I need to focus on shipping, not perfecting."</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Generated Actions</h5>
                    {['Schedule 30 mins daily for "messy work"', 'Share draft with mentor by Friday'].map((action, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors group cursor-pointer">
                        <div className="w-5 h-5 rounded border-2 border-slate-300 group-hover:border-blue-600" />
                        <span className="text-sm text-slate-700">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 bg-slate-900 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  Syncing to Calendar...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCROLLING TICKER ─── */}
      <section className="py-12 border-y border-slate-100 bg-white/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-slate-400 mb-8 uppercase tracking-widest">Capturing your insights from:</p>
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-8 whitespace-nowrap" style={{ display: 'inline-flex', animation: 'scroll 30s linear infinite' }}>
              {[...Array(2)].map((_, j) => (
                <React.Fragment key={j}>
                  {['Breathwork', 'Meditation', 'Journaling', 'Prayer', 'Therapy', 'Coaching', 'Workshops', 'Journeys'].map((item, i) => (
                    <React.Fragment key={`${j}-${i}`}>
                      <span className="text-lg font-medium text-slate-600">{item}</span>
                      <span className="text-blue-900 text-2xl">◆</span>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── INSIGHT GAP ─── */}
      <section className="py-24" style={{ backgroundColor: '#F5F5F0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl font-semibold mb-6 text-slate-900">The "Insight Gap" is real.</h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              We spend hours in therapy, coaching, and journaling. We have profound realizations. But without a system to capture and operationalize them, 90% of these insights fade within 48 hours.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '★', color: 'yellow', title: 'Ephemeral Clarity', desc: 'That "aha!" moment during a session feels permanent, but it evaporates as soon as you return to your daily routine.' },
              { icon: 'clipboard', color: 'blue', title: 'Scattered Notes', desc: 'Insights get lost in messy notebooks, random phone memos, and forgotten voice notes. No structure means no retrieval.' },
              { icon: 'block', color: 'slate', title: 'Zero Accountability', desc: 'Knowing what to do is different from doing it. Without follow-through mechanisms, growth stagnates.' }
            ].map((card, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${card.color === 'yellow' ? 'bg-yellow-50 text-yellow-500' : card.color === 'blue' ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600'}`}>
                  {card.icon === '★' && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>}
                  {card.icon === 'clipboard' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
                  {card.icon === 'block' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-medium mb-3">{card.title}</h3>
                <p className="text-slate-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE VIRGIL METHOD ─── */}
      <section id="how-it-works" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-blue-700 tracking-wider uppercase">The Virgil Method</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="mt-3 text-4xl md:text-5xl text-slate-900">From reflection to reality.</h2>
          </div>

          {/* Step 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative rounded-2xl bg-slate-900 p-6 shadow-2xl lg:rotate-1 lg:hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-white/60 text-sm">Recording... 24:12</div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </div>
                <div className="flex items-center gap-1 h-16 justify-center mb-8">
                  {[4, 8, 6, 10, 5, 12, 8, 4, 6, 10, 3].map((h, i) => (
                    <div key={i} className="w-1 bg-blue-500 rounded-full animate-bounce" style={{ height: `${h * 4}px`, animationDuration: `${0.8 + i * 0.1}s` }} />
                  ))}
                </div>
                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-slate-300 text-lg italic" style={{ fontFamily: "'Playfair Display', serif" }}>"...I realized I've been avoiding the difficult conversation because..."</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold border border-slate-200">1</span>
                <h3 className="text-2xl font-bold text-slate-900">Capture effortlessly</h3>
              </div>
              <p className="text-lg text-slate-600 mb-6">Whether it's a voice memo after a session, a photo of your journal, or quick text notes, Virgil ingests your raw reflections. No need to format or organize—just dump your thoughts.</p>
              <ul className="space-y-3">
                {['Voice-to-text with human-level accuracy', 'Photo text extraction, right from your notebook', 'Secure, private, and encrypted'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <svg className="w-5 h-5 text-blue-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold border border-slate-200">2</span>
                <h3 className="text-2xl font-bold text-slate-900">Synthesize & Distill</h3>
              </div>
              <p className="text-lg text-slate-600 mb-6">Our AI acts as a second brain, sifting through the noise to find the signal. It identifies core themes, behavioral patterns, and key breakthroughs that might have slipped your mind.</p>
              <ul className="space-y-3">
                {['Automatic "Key Insight" extraction', 'Pattern recognition across multiple sessions', 'Weekly growth summaries'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <svg className="w-5 h-5 text-blue-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl bg-white border border-slate-200 p-8 shadow-2xl lg:-rotate-1 lg:hover:rotate-0 transition-transform duration-500">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-100 text-blue-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-200">AI Synthesis</div>
                <div className="space-y-6 mt-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Core Theme Identified</h4>
                    <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-600">
                      <h5 className="font-semibold text-slate-900">Fear of Vulnerability</h5>
                      <p className="text-sm text-slate-600 mt-1">Recurred in 3 of last 4 sessions. Often triggered by workplace feedback.</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Suggested Reframing</h4>
                    <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-indigo-400">
                      <p className="text-sm text-slate-800 italic">"Feedback is data for improvement, not a judgment of character."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative rounded-2xl bg-slate-50 border border-slate-200 p-2 shadow-2xl lg:rotate-1 lg:hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-xl overflow-hidden border border-slate-100">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600">Action Items</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Active</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    <div className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                      <div className="mt-1 w-4 h-4 rounded border-2 border-slate-300" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">Draft response to team lead</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-400">Due Tomorrow</span>
                          <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">Work</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                      <div className="mt-1 w-4 h-4 rounded border-2 border-blue-600 bg-blue-600 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-400 line-through">Meditation session (10m)</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-blue-700 font-medium">Completed</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#1D4ED8"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" /></svg>
                        </div>
                        <span className="text-xs font-medium text-slate-600">Synced to Calendar</span>
                      </div>
                      <button className="text-xs text-blue-700 hover:underline">View</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold border border-slate-200">3</span>
                <h3 className="text-2xl font-bold text-slate-900">Act & Follow Through</h3>
              </div>
              <p className="text-lg text-slate-600 mb-6">Insights without action are just dreams. Virgil converts your insights into concrete tasks and syncs them directly to Google Calendar so nothing falls through the cracks.</p>
              <ul className="space-y-3">
                {['One-click sync to Google Calendar', 'Gentle reminders for accountability', 'Progress tracking over time'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <svg className="w-5 h-5 text-blue-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative rounded-2xl bg-white border border-slate-200 p-8 shadow-2xl lg:rotate-1 lg:hover:rotate-0 transition-transform duration-500">
                <div className="absolute -top-3 -right-3 bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">Session #10</div>
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">10-Session Progress Report</h4>
                  <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-semibold text-slate-900 mb-2">Your Growth Journey</h3>
                  <p className="text-sm text-slate-500">October 1 - December 15, 2024</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-600">
                    <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Top Breakthrough</h5>
                    <p className="text-sm text-slate-800 font-medium">Reframing perfectionism as a growth opportunity</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-700">87%</div>
                      <p className="text-xs text-slate-600">Action completion</p>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-indigo-700">23</div>
                      <p className="text-xs text-slate-600">Key insights tracked</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Recurring Themes</h5>
                    <div className="flex flex-wrap gap-2">
                      {['Self-compassion', 'Boundaries', 'Communication'].map((theme, i) => (
                        <span key={i} className="px-3 py-1 bg-white rounded-full text-xs text-slate-700 border border-slate-200">{theme}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold border border-slate-200">4</span>
                <h3 className="text-2xl font-bold text-slate-900">Track & Reflect</h3>
              </div>
              <p className="text-lg text-slate-600 mb-6">Every 10 sessions, Virgil generates a personalized progress report highlighting your biggest breakthroughs, recurring patterns, and growth trajectory. See how far you've come and where to focus next.</p>
              <ul className="space-y-3">
                {['Comprehensive progress summaries', 'Theme and pattern analysis', 'Personalized next-step recommendations'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <svg className="w-5 h-5 text-blue-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOUNDER STORY ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-2/5">
              <div className="w-full aspect-square rounded-2xl bg-slate-200 overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-blue-200 to-slate-300 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white/50" style={{ fontFamily: "'Playfair Display', serif" }}>LN</span>
                </div>
              </div>
            </div>
            <div className="lg:w-3/5">
              <span className="text-sm font-semibold text-blue-700 tracking-wider uppercase mb-4 block">Our Story</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl text-slate-900 mb-6">Why I Built Virgil</h2>
              <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>After years of therapy and coaching, I had notebooks full of insights but no system to turn them into lasting change. I'd leave sessions feeling enlightened, only to forget everything by the next week.</p>
                <p>I realized the problem wasn't the quality of the work—it was the lack of infrastructure to support it. We needed a bridge between reflection and action, between insight and implementation.</p>
                <p>Virgil is that bridge. It's the tool I wish I'd had during my own growth journey, and I'm grateful to share it with you.</p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl text-slate-900 mb-1">Lindsey Navia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-800/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl text-center mb-16">Growth, quantified.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { quote: "I used to leave therapy feeling great but forgetting everything by Tuesday. Virgil changed that. It's like having a personal secretary for my mental health.", initials: 'SM', name: 'Sarah M.' },
              { quote: "I'm not a big note taker so I love Virgil's voice note feature. I talk about what came up for me after a journey and it helps generate a clear path forward so I don't lose the magic from those sessions.", initials: 'DR', name: 'David R.' },
              { quote: "I do a lot of breath work and meditation and my notes were in different journals or on my phone. Virgil helped me create a command center of all my insights, and generate doable action items so I don't miss important progress I wanted to make.", initials: 'EL', name: 'Elena L.' }
            ].map((t, i) => (
              <div key={i} className={`bg-white/10 p-8 rounded-2xl border border-white/10 ${i === 2 ? 'md:hidden lg:block' : ''}`} style={{ backdropFilter: 'blur(12px)' }}>
                <div className="flex text-blue-300 mb-4">★★★★★</div>
                <p className="text-lg leading-relaxed text-slate-200 mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold">{t.initials}</div>
                  <div className="font-medium">{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTEGRATIONS ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-slate-500 mb-8">Seamlessly integrated with the tools you already use</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 pt-2">
            <div className="px-6 py-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-3 text-slate-700 font-medium">
              <div className="w-2 h-2 rounded-full bg-blue-600" /> Google Cal
            </div>
            {['Notion', 'Todoist', 'Asana', 'Slack'].map((tool, i) => (
              <div key={i} className="px-6 py-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-3 text-slate-700 font-medium relative">
                <div className={`w-2 h-2 rounded-full ${['bg-black', 'bg-blue-700', 'bg-indigo-500', 'bg-blue-900'][i]}`} /> {tool}
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">COMING SOON</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLATFORM AVAILABILITY ─── */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-slate-500 mb-6">Available on</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="px-8 py-4 rounded-lg bg-white border border-slate-200 flex items-center gap-3 text-slate-700 font-medium shadow-sm">
              <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Web App
            </div>
            <div className="px-8 py-4 rounded-lg bg-white border border-slate-200 flex items-center gap-3 text-slate-700 font-medium shadow-sm relative">
              <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
              iOS App
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">COMING SOON</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900 z-0" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl text-white mb-6">Be accountable to your own growth</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Close the gap between who you are and who you want to be.</p>
          <button onClick={onGetStarted} className="w-full sm:w-auto bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-xl">
            Get Started for Free
          </button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-900 to-blue-700 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-semibold text-slate-900">Virgil</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">Capture, synthesize, and act on your most important insights.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-slate-600 hover:text-slate-900 text-sm">How it Works</a></li>
                <li><a href="#testimonials" className="text-slate-600 hover:text-slate-900 text-sm">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="mailto:support@tryvirgil.co" className="text-slate-600 hover:text-slate-900 text-sm">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('privacy')} className="text-slate-600 hover:text-slate-900 text-sm">Privacy Policy</button></li>
                <li><button onClick={() => onNavigate('terms')} className="text-slate-600 hover:text-slate-900 text-sm">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">© 2026 House of Navia, LLC. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* ─── GLOBAL ANIMATIONS ─── */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

