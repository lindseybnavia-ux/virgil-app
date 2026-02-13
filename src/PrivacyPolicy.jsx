import React from 'react';
import { Brain, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-800">Virgil</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: February 12, 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Virgil ("we," "our," or "us") operates the website at tryvirgil.co and the Virgil personal growth accountability application (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect the following types of information:</p>
            <p className="mb-2">
              <strong>Account Information:</strong> When you create an account, we collect your name and email address.
            </p>
            <p className="mb-2">
              <strong>Session Data:</strong> When you log sessions in the app, we store your session type, date, and notes. This may include text you type, voice recordings that are transcribed, or text extracted from uploaded photos.
            </p>
            <p className="mb-2">
              <strong>Action Items:</strong> AI-generated action items, their completion status, due dates, and priority levels.
            </p>
            <p className="mb-2">
              <strong>Payment Information:</strong> Payment processing is handled by Stripe. We do not store your credit card number or full payment details. We receive confirmation of your subscription status from Stripe.
            </p>
            <p className="mb-2">
              <strong>Google Calendar Data:</strong> If you choose to connect your Google Calendar, we store authentication tokens to sync your action items as calendar events. We only access your calendar to create, update, and delete events created by Virgil. We do not read or store your existing calendar events.
            </p>
            <p>
              <strong>Usage Data:</strong> We may collect general usage information such as pages visited and features used to improve the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <p className="mb-1">• Provide, maintain, and improve the Service</p>
            <p className="mb-1">• Generate personalized action items and growth insights using AI</p>
            <p className="mb-1">• Sync your action items with Google Calendar when authorized</p>
            <p className="mb-1">• Process your payments and manage your subscription</p>
            <p className="mb-1">• Communicate with you about the Service</p>
            <p>• Protect against fraudulent or unauthorized use</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. AI Processing</h2>
            <p>
              Your session notes are sent to Anthropic's Claude API to generate action items and insights. This data is processed according to Anthropic's usage policies. We send only the minimum information needed to generate your action items. Your session data is not used to train AI models.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Storage and Security</h2>
            <p>
              Your data is stored using Firebase, a service provided by Google. We implement appropriate technical and organizational measures to protect your personal information. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services:</p>
            <p className="mb-1">• <strong>Firebase</strong> (Google) — Authentication and data storage</p>
            <p className="mb-1">• <strong>Anthropic (Claude API)</strong> — AI-powered action item and insight generation</p>
            <p className="mb-1">• <strong>Stripe</strong> — Payment processing</p>
            <p className="mb-1">• <strong>Google Calendar API</strong> — Calendar sync (optional, user-initiated)</p>
            <p>• <strong>Vercel</strong> — Application hosting</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We share data only with the third-party service providers listed above as necessary to operate the Service, or if required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <p className="mb-1">• Access the personal data we hold about you</p>
            <p className="mb-1">• Request correction of inaccurate data</p>
            <p className="mb-1">• Request deletion of your data</p>
            <p className="mb-1">• Disconnect third-party integrations (such as Google Calendar) at any time</p>
            <p>• Cancel your subscription at any time</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Cookies</h2>
            <p>
              We use essential cookies and local storage for authentication and app functionality. We do not use advertising or tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Children's Privacy</h2>
            <p>
              The Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected data from a child under 13, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this page. Your continued use of the Service after any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or your data, please contact us at{' '}
              <a href="mailto:support@tryvirgil.co" className="text-blue-900 underline hover:text-blue-700">
                support@tryvirgil.co
              </a>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Virgil. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
