import { FC } from 'react';
import { useController } from 'react-hook-form';

interface IInput {
  type?: string;
  className?: string;
  control: any;
  name: string;
  placeholder?: string;
}

const Input: FC<IInput> = ({ type = 'text', className = '', control, ...props }) => {
  const { field } = useController({ control, name: props.name, defaultValue: '' });
  return (
    <input
      {...field}
      {...props}
      type={type}
      id={field.name}
      className={`${className} w-full shadow-sm bg-gray-200/50 pl-5 pr-12 py-3 rounded-md outline-none transition-all duration-300 ease-linear border border-transparent focus:bg-white focus:border focus:border-borderColor dark:bg-gray-200/20`}
    />
  );
};

export default Input;
