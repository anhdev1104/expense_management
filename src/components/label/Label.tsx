import { ReactNode } from 'react';

const Label = ({ htmlFor = '', children, ...props }: { htmlFor?: string; children: ReactNode }) => {
  return (
    <label htmlFor={htmlFor} className="font-medium cursor-pointer" {...props}>
      {children}
    </label>
  );
};

export default Label;
