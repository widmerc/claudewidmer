import React from 'react';

type PageWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '' }) => {
  return (
    <section className={`max-w-8xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg mt-10 mb-12 ${className}`}>
      {children}
    </section>
  );
};

export default PageWrapper;
