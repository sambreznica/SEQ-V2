import React from 'react';
import Hero from '../sections/Hero';
import TrustRow from '../sections/TrustRow';
import HowItWorks from '../sections/HowItWorks';
import WhoItsFor from '../sections/WhoItsFor';
import Evidence from '../sections/Evidence';
import CTA from '../sections/CTA';

const Landing: React.FC = () => {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      
      <TrustRow />

      <div id="how">
        <HowItWorks />
      </div>
      
      <div id="who">
        <WhoItsFor />
      </div>
      
      <div id="evidence">
        <Evidence />
      </div>
      
      <div id="cohort">
        <CTA />
      </div>
    </>
  );
};

export default Landing;




