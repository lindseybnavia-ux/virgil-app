import React from 'react';
import { Brain, ArrowLeft } from 'lucide-react';

export default function TermsOfService({ onBack }) {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-10">Last updated: February 12, 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Virgil ("the Service"), available at tryvirgil.co, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
            <p>
              Virgil is a personal growth accountability application that helps users capture insights from therapy, coaching, meditation, and other personal growth sessions, and generate AI-powered action items to support ongoing development. The Service includes session logging, AI-generated action items, progress tracking, growth insights, and optional Google Calendar integration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Account Registration</h2>
            <p>
              To use the Service, you must create an account with a valid email address. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information and to update it as needed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Subscription and Payment</h2>
            <p className="mb-3">
              Virgil offers paid subscription plans with a 7-day free trial. By subscribing, you agree to the following:
            </p>
            <p className="mb-1">• Payment is processed securely through Stripe.</p>
            <p className="mb-1">• Subscriptions automatically renew at the end of each billing period (monthly or annual) unless cancelled.</p>
            <p className="mb-1">• You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period.</p>
            <p>• Refunds are handled on a case-by-case basis. Please contact us at support@tryvirgil.co for refund requests.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Acceptable Use</h2>
            <p className="mb-3">You agree not to:</p>
            <p className="mb-1">• Use the Service for any unlawful purpose</p>
            <p className="mb-1">• Attempt to gain unauthorized access to the Service or its systems</p>
            <p className="mb-1">• Interfere with or disrupt the Service</p>
            <p className="mb-1">• Share your account credentials with others</p>
            <p>• Use the Service to store or transmit malicious content</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. AI-Generated Content</h2>
            <p className="mb-3">
              The Service uses artificial intelligence (Anthropic's Claude) to generate action items and growth insights based on your session notes. You acknowledge and agree that:
            </p>
            <p className="mb-1">• AI-generated content is provided as suggestions and should not be considered professional medical, psychological, or therapeutic advice.</p>
            <p className="mb-1">• Virgil is not a substitute for professional therapy, counseling, or medical treatment.</p>
            <p className="mb-1">• You are responsible for evaluating and deciding whether to act on any AI-generated suggestions.</p>
            <p>• AI outputs may occasionally be inaccurate or not fully relevant to your situation.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Third-Party Integrations</h2>
            <p>
              The Service offers optional integration with Google Calendar. By connecting your Google Calendar, you authorize Virgil to create, update, and delete calendar events on your behalf. You may disconnect this integration at any time. Your use of Google Calendar is also subject to Google's Terms of Service and Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Your Content</h2>
            <p>
              You retain ownership of all content you submit to the Service, including session notes, uploaded photos, and voice recordings. By using the Service, you grant us a limited license to process your content as necessary to provide the Service (including sending session notes to AI for action item generation). We do not claim ownership of your content and will not use it for purposes unrelated to providing the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Data and Privacy</h2>
            <p>
              Your use of the Service is also governed by our{' '}
              <button
                onClick={() => {
                  onBack();
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('navigate', { detail: 'privacy' }));
                  }, 100);
                }}
                className="text-blue-900 underline hover:text-blue-700"
              >
                Privacy Policy
              </button>
              , which describes how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Service Availability</h2>
            <p>
              We strive to keep the Service available at all times but do not guarantee uninterrupted access. We may modify, suspend, or discontinue the Service (or any part of it) at any time with reasonable notice. We are not liable for any downtime or service interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Virgil and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Our total liability for any claim related to the Service shall not exceed the amount you paid for the Service in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Disclaimer of Warranties</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Service will be error-free or that AI-generated content will be accurate or suitable for your needs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account if you violate these Terms. You may terminate your account at any time by cancelling your subscription and contacting us at support@tryvirgil.co. Upon termination, your right to use the Service ceases immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of material changes by updating the "Last updated" date. Your continued use of the Service after changes are posted constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">15. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of North Carolina, United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">16. Contact Us</h2>
            <p>
              If you have questions about these Terms of Service, please contact us at{' '}
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
