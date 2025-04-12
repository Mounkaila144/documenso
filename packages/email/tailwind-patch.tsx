import React from 'react';
// Utiliser la méthode recommandée pour importer un module CommonJS
import pkg from 'tw-to-css';
const { tailwindToCSS } = pkg;

export interface TailwindProps {
  children: React.ReactNode;
  config?: Record<string, unknown>;
}

export const PatchedTailwind: React.FC<TailwindProps> = ({ children, config }) => {
  const { twi } = tailwindToCSS({
    config,
  });

  return (
    <div
      style={{
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      }}
      className={twi`font-sans text-base text-black`}
    >
      {children}
    </div>
  );
}; 