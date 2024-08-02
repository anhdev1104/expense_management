import { ICategory } from '@/types/category.type';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

const SpendCate = ({
  category,
  setValue,
  control,
  resetCate,
}: {
  category: ICategory[];
  setValue: any;
  control: any;
  resetCate: boolean;
}) => {
  const [isActive, setIsActive] = useState<string | null>();

  const handleClick = (id: string | undefined, name: string | undefined) => {
    setValue('category', name);
    setIsActive(id);
  };

  useEffect(() => {
    setIsActive(null);
  }, [resetCate]);

  return (
    <div className="grid grid-cols-3 gap-5 mt-3">
      {category.length > 0 &&
        category.map(category => (
          <Controller
            key={category._id}
            name="category"
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
