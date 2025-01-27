import React, { ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg px-2 py-1 z-10">
        {content}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-800 rotate-45"></div>
      </div>
    </div>
  );
};
