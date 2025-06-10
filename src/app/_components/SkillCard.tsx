import React from "react";

interface SkillCardProps {
  backgroundImage: string;
  text: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ backgroundImage, text }) => {
  return (
<div
  className="relative flex flex-col items-center justify-center bg-cover bg-center 
             px-4 sm:p-3 md:p-4 rounded-md border-4 border-accent-1 group 
             w-50 sm:w-46 md:w-50 h-20 sm:h-24 md:h-28 mx-auto"
  style={{ backgroundImage: `url(${backgroundImage})` }}
>
      {/* Hover-Overlay */}
      <div className="absolute inset-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md 
                      opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-0 rounded-md"></div>

      {/* Text */}
      <h2 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 dark:text-white 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 text-center">
        {text}
      </h2>
    </div>
  );
};

export default SkillCard;
