
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import HowItWorks from '@/components/HowItWorks';
import ActiveRequestsPreview from '@/components/ActiveRequestsPreview';
import CTASection from '@/components/CTASection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeatureSection />
        <HowItWorks />
        <ActiveRequestsPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
