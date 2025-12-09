import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <section id={id} className={`relative py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
};

export default Section;