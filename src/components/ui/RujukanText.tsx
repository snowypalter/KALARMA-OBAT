import React from 'react';

export interface RujukanTextProps {
  text: string;
  className?: string;
  block?: boolean;
}

export const RujukanText: React.FC<RujukanTextProps> = ({
  text,
  className = '',
  block = false,
}) => {
  return (
    <span
      className={`text-sm text-ink leading-relaxed ${
        block ? 'block' : 'inline'
      } ${className}`}
    >
      {text}
    </span>
  );
};
