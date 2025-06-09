import React from 'react';

type PageWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '' }) => {
  return (
    <section
      className={`max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 ${className || 'text-center'}`}
    >
      {children}
    </section>
  );
};

export default PageWrapper;
