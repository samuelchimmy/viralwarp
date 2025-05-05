
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16">
        <div className="container max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">
              This Privacy Policy explains how ViralWarp ("we", "us", or "our") collects, uses, and shares information about you when you use our website and services.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p className="mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-8 mb-4">
              <li><strong>Account Information:</strong> When you connect your Farcaster account, we access your public Farcaster profile information.</li>
              <li><strong>Transaction Information:</strong> We record information about the requests you create or fulfill, including payment amounts and engagement details.</li>
              <li><strong>Usage Information:</strong> We collect information about how you use the Service, including actions you take and features you use.</li>
              <li><strong>Device Information:</strong> We may collect information about the device you use to access the Service.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-8 mb-4">
              <li>Provide, maintain, and improve the Service</li>
              <li>Process transactions and send related information</li>
              <li>Verify engagement activities</li>
              <li>Communicate with you about the Service</li>
              <li>Detect and prevent fraud or abuse</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Information Sharing</h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-8 mb-4">
              <li><strong>Other Users:</strong> Your public profile and engagement activities are visible to other users of the Service.</li>
              <li><strong>Service Providers:</strong> Companies that perform services on our behalf, such as payment processing and data analysis.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or if we believe it's necessary to protect our rights, property, or safety.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p className="mb-4">
              We implement reasonable security measures to protect your information. However, no system is completely secure, and we cannot guarantee the absolute security of your data.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Choices</h2>
            <p className="mb-4">
              You can access and update certain information through your account settings. You may also disconnect your Farcaster account from our Service at any time.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy, please contact @508 on Farcaster.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
