import { ICategory } from '@/types/category.type';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

const SpendCate = ({ category, setValue, control }: { category: ICategory[]; setValue: any; control: any }) => {
  const [isActive, setIsActive] = useState<string>();

  const handleClick = (id: string | undefined, name: string | undefined) => {
    setValue('catespend', name);
    setIsActive(id);
  };

  return (
    <div className="grid grid-cols-3 gap-5 mt-3">
      {category.length > 0 &&
        category.map(category => (
          <Controller
            key={category._id}
            name="catespend"
            control={control}
            render={({ field }) => (
              <div
                {...field}
                className={`flex flex-col items-center border-2 rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1 ${
                  isActive === category._id ? 'border-primary' : 'border-borderColor'
                }`}
                onClick={() => handleClick(category._id, category.name)}
              >
                <img src={`/icon/${category.icon}`} alt={category.name} className="w-16 h-16" />
                <span>{category.name}</span>
              </div>
            )}
          />
        ))}
    </div>
  );
};

export default SpendCate;
