import { FC, InputHTMLAttributes, forwardRef, Ref } from 'react';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  name: string;
  className?: string;
}

const Input: FC<IInput> = forwardRef<HTMLInputElement, IInput>(
  ({ type = 'text', name, className = '', ...props }, ref: Ref<HTMLInputElement>) => {
    return (
      <div>
        <input
          type={type}
          id={name}
          className={`${className} w-full shadow-sm bg-gray-200/50 px-5 py-3 rounded-md outline-none transition-all duration-300 ease-linear border border-transparent focus:bg-white focus:border focus:border-borderColor`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
