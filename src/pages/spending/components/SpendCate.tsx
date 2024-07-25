import { useState } from 'react';
import { Controller } from 'react-hook-form';

interface ICategory {
  id: number;
  icon: string;
  title: string;
}

const spendCateData: ICategory[] = [
  { id: 1, icon: 'food-icon.svg', title: 'Ăn uống' },
  { id: 2, icon: 'clothes-icon.svg', title: 'Quần áo' },
  { id: 3, icon: 'hopital-icon.svg', title: 'Y tế' },
  { id: 4, icon: 'washing-icon.svg', title: 'Chi tiêu hàng ngày' },
  { id: 5, icon: 'cosmetics-icon.svg', title: 'Mỹ phẩm' },
  { id: 6, icon: 'beer-icon.svg', title: 'Giao lưu' },
  { id: 7, icon: 'education-icon.svg', title: 'Giáo dục' },
  { id: 8, icon: 'water-icon.svg', title: 'Điện nước' },
  { id: 9, icon: 'bus-icon.svg', title: 'Đi lại' },
];

const SpendCate = ({ control, setValue }: { control: any; setValue: any }) => {
  const [isActive, setIsActive] = useState<number>();

  const handleClick = (category: ICategory) => {
    setValue('catespend', category.title);
    setIsActive(category.id);
  };

  return (
    <div className="grid grid-cols-3 gap-5 mt-3">
      {spendCateData.length > 0 &&
        spendCateData.map(category => (
          <Controller
            key={category.id}
            name="catespend"
            control={control}
            render={({ field }) => (
              <div
                {...field}
                className={`flex flex-col items-center border-2 rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1 ${
                  isActive === category.id ? 'border-primary' : 'border-borderColor'
                }`}
                onClick={() => handleClick(category)}
              >
                <img src={`/icon/${category.icon}`} alt={category.title} className="w-16 h-16" />
                <span>{category.title}</span>
              </div>
            )}
          />
        ))}
    </div>
  );
};

export default SpendCate;
