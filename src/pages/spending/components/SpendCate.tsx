interface ICategory {
  id: number;
  icon: string;
  title: string;
}

const spendCateData: ICategory[] = [
  {
    id: 1,
    icon: 'food-icon.svg',
    title: 'Ăn uống',
  },
  {
    id: 2,
    icon: 'clothes-icon.svg',
    title: 'Quần áo',
  },
  {
    id: 3,
    icon: 'hopital-icon.svg',
    title: 'Y tế',
  },
  {
    id: 4,
    icon: 'washing-icon.svg',
    title: 'Chi tiêu hàng ngày',
  },
  {
    id: 5,
    icon: 'cosmetics-icon.svg',
    title: 'Mỹ phẩm',
  },
  {
    id: 6,
    icon: 'beer-icon.svg',
    title: 'Giao lưu',
  },
  {
    id: 7,
    icon: 'education-icon.svg',
    title: 'Giáo dục',
  },
  {
    id: 8,
    icon: 'water-icon.svg',
    title: 'Điện nước',
  },
  {
    id: 9,
    icon: 'bus-icon.svg',
    title: 'Đi lại',
  },
];

const SpendCate = () => {
  return (
    <div className="grid grid-cols-3 gap-5 mt-3">
      {spendCateData.length > 0 &&
        spendCateData.map(category => (
          <div
            className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1"
            key={category.id}
          >
            <img src={`/icon/${category.icon}`} alt="icon food" className="w-16 h-16" />
            <span>{category.title}</span>
          </div>
        ))}
    </div>
  );
};

export default SpendCate;
