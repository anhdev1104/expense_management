import { ReactNode } from 'react';

type TypeButton = 'button' | 'submit';

interface IButton {
  type: TypeButton;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

const Button = ({ type = 'button', className = '', onClick = () => {}, children, ...props }: IButton) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} mx-auto block bg-primary py-3 px-10 text-white font-semibold rounded-lg hover:bg-primary/70 transition-all duration-300 ease-linear shadow-sm disabled:bg-gray-300/60 disabled:pointer-events-none`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
