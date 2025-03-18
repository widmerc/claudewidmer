import React from "react";

interface SkillCardProps {
  backgroundImage: string;
  text: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ backgroundImage, text }) => {
  return (
      <div
        className="relative flex flex-col items-center bg-cover bg-center p-8 rounded-lg border-4 border-accent-1 group"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* White overlay */}
        <div className="absolute inset-0 bg-white dark:bg-gray-800 opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-0"></div>

        {/* Text that appears on hover */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10">
          {text}
        </h2>
      </div>
  );
};

export default SkillCard;
