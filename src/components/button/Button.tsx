import { ReactNode } from 'react';

interface IButton {
  type: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

const Button = ({ type = 'button', className = '', onClick = () => {}, children, ...props }: IButton) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} max-w-[300px] w-full mx-auto block bg-primary py-3 px-10 text-white font-semibold rounded-lg hover:bg-primary/70 transition-all duration-300 ease-linear shadow-sm`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
