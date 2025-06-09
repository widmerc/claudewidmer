import React from 'react';

type PageWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '' }) => {
  return (
<section className={`max-w-[1600px] mx-auto mb-3 px-4 py-5 bg-gray-50 dark:bg-gray-900 backdrop-blur border border-white/20 dark:border-white/10 shadow-lg rounded-xl  ${className}`}>
      {children}
    </section>
  );
};

export default PageWrapper;
