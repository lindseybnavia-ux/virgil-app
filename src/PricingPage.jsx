import React, { useState } from 'react';
import { Brain, Check, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const pricing = {
    monthly: {
      price: 8.99,
      period: 'month',
      stripeLink: 'https://buy.stripe.com/3cI9AT6zZ4Rd94S4JG2cg02'
    },
    annual: {
      price: 75,
      period: 'year',
      savings: '30%',
      stripeLink: 'https://buy.stripe.com/aFadR94rR4Rdch46RO2cg01'
    }
  };

  const currentPlan = pricing[billingPeriod]; 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
       <button 
            onClick={() => window.location.href = 'https://tryvirgil.co'} 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Virgil</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose your plan</h1>
            <p className="text-gray-600">Start your 7-day free trial</p>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors relative ${
                billingPeriod === 'annual'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Annual
              {billingPeriod === 'annual' && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Save $33
                </span>
              )}
            </button>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-900 p-8">
            {/* Badge */}
            <div className="flex items-center justify-between mb-4">
  <h2 className="text-2xl font-bold text-gray-900">Virgil Pro</h2>
  {billingPeriod === 'annual' && (
    <span className="bg-blue-100 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full">
      Best Value
    </span>
  )}
</div>

            <p className="text-gray-600 mb-6">Turn insights into action</p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-gray-900">${currentPlan.price}</span>
                <span className="text-gray-600">/{currentPlan.period}</span>
              </div>
              {billingPeriod === 'annual' && (
                <p className="text-sm text-green-600 font-semibold mt-1">Save {pricing.annual.savings}/year</p>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Unlimited sessions & action items</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">AI-powered action item generation</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Voice recording & photo upload</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Calendar tracking & progress insights</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Growth insights & pattern analysis</span>
              </li>
            </ul>

{/* CTA Button */}
            
              <a
                href={currentPlan.stripeLink}
              className="block w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white py-4 rounded-lg font-semibold hover:shadow-2xl transition-all text-center"
            >
              <span className="flex items-center justify-center gap-2">
                Start 7 day free trial
                <ArrowRight className="w-5 h-5" />
              </span>
            </a>

            {/* Fine print */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <Check className="w-4 h-4 text-green-600" />
              <p className="text-sm text-gray-600">$0.00 due today, cancel anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
