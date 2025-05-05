
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16">
        <div className="container max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using ViralWarp ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Service</h2>
            <p className="mb-4">
              ViralWarp is a platform that facilitates incentivized engagement on Farcaster. Users can create and fulfill requests for follows, recasts, likes, and comments in exchange for payment.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Responsibilities</h2>
            <p className="mb-4">
              You are responsible for all activity that occurs under your account. You agree not to:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Use the Service for any illegal purpose or in violation of Farcaster's Terms of Service</li>
              <li>Create fake engagements or manipulate the platform</li>
              <li>Impersonate others or provide false information</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to gain unauthorized access to the Service</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Fees and Payments</h2>
            <p className="mb-4">
              ViralWarp charges a 10% processing fee on all transactions. By using the Service, you agree to pay all applicable fees. All payments are processed through Farcaster's wallet feature. Refunds may be issued at the sole discretion of the Service provider.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
            <p className="mb-4">
              THE SERVICE AND ITS CONTENT ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. THE SERVICE PROVIDER, JadeOfWallstreet (@508), SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
            </p>
            <p className="mb-4">
              The Service provider is not responsible for any content posted by users or for any transactions between users. Users engage in transactions at their own risk.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Compliance with Farcaster Terms</h2>
            <p className="mb-4">
              ViralWarp operates as a mini-app on the Farcaster protocol. Users must comply with Farcaster's Terms of Service while using ViralWarp. The Service provider does not guarantee that the Service will always be compatible with Farcaster as protocols and terms may change.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Termination</h2>
            <p className="mb-4">
              The Service provider reserves the right to terminate or suspend your account at any time for violation of these terms or for any other reason deemed appropriate by the Service provider.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
            <p className="mb-4">
              These Terms of Service may be updated from time to time. You are responsible for reviewing these terms periodically for changes. Your continued use of the Service constitutes acceptance of any changes.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Governing Law</h2>
            <p className="mb-4">
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the Service provider operates, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms of Service, please contact @508 on Farcaster.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
