import { ReactNode } from 'react';

const Field = ({ children }: { children: ReactNode }) => {
  return <div className="mb-5 w-full">{children}</div>;
};

export default Field;
