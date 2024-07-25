import { ReactNode } from 'react';
import LoadingSpin from '../loading/LoadingSpin';

type TypeButton = 'button' | 'submit';

type IButton = {
  type: TypeButton;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  children: ReactNode;
};

const Button = ({
  type = 'button',
  className = '',
  onClick = () => {},
  isLoading = false,
  disabled = false,
  children,
  ...props
}: IButton) => {
  const child = isLoading ? <LoadingSpin /> : children;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} mx-auto flex justify-center items-center min-w-[180px] bg-primary py-3 px-10 text-white font-semibold rounded-lg hover:bg-primary/70 transition-all duration-300 ease-linear shadow-sm disabled:bg-gray-300/60 disabled:pointer-events-none ${
        disabled && 'opacity-50 pointer-events-none'
      }`}
      {...props}
    >
      {child}
    </button>
  );
};

export default Button;
